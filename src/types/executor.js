const { main: log } = require("../utils/debug.js");
const defaultActions = require("../utils/get-actions.js")();

const Context = require("./context.js");
const Action = require("../types/actions/action.js");

class ShortcutExecutor {
	/**
	 * @param {Object} options Options for the executor.
	 */
	constructor(options) {
		this.actions = {};
		this.registerActions(defaultActions);

		this.initialInput = options.initialInput || options.input;
		this.blacklistedActions = Array.isArray(options.blacklistedActions) ? options.blacklistedActions : [];
		this.skipUnsupportedActions = options.skipUnsupportedActions;
	}

	/**
	 * Registers actions.
	 * @param {Action[]} actions The actions to register.
	 */
	registerActions(actions) {
		if (!Array.isArray(actions)) {
			throw new TypeError("The actions to register must be an array.");
		}

		for (const action of actions) {
			this.registerAction(action);
		}
	}

	/**
	 * Registers an action.
	 * @param {Action} action The action to register.
	 */
	registerAction(action) {
		if (!(action.prototype instanceof Action)) {
			throw new TypeError("Actions must extend the Action class");
		}
		if (!action.identifier) {
			throw new Error("Actions must have an identifier");
		}

		this.actions[action.identifier] = action;
	}

	/**
	 * Gets an action instance from a raw action.
	 * @param {ShortcutAction} rawAction The raw action to get an action instance of.
	 * @param {Context} context The context of the action.
	 * @returns {Action} The action instance.
	 */
	getActionInstance(rawAction, context) {
		const action = this.actions[rawAction.identifier];
		if (!action) {
			if (this.skipUnsupportedActions) {
				log("skipping action with identifier '%s' as it is unsupported", rawAction.identifier);
				return;
			}

			throw new Error("Unsupported action: " + rawAction.identifier);
		}

		const actionInstance = new action(this, context, rawAction);
		return actionInstance;
	}

	/**
	 * Executes an action.
	 * @param {ShortcutAction} rawAction The raw action to evaluate.
	 * @param {Context} context The context of the action.
	 */
	async executeAction(rawAction, context) {
		if (Array.isArray(this.blacklistedActions) && this.blacklistedActions.includes(rawAction.identifier)) {
			throw new Error("Blacklisted action: " + rawAction.identifier);
		}

		const actionInstance = this.getActionInstance(rawAction, context);
		if (actionInstance) {
			actionInstance.log("evaluating action with identifier '%s' with input of '%s' and parameters: %O", rawAction.identifier, context.input, actionInstance.parameters);

			const actionOutput = await actionInstance.execute();
			context.input = actionOutput;
			if (actionInstance.parameters.UUID) {
				context.variables[actionInstance.parameters.UUID] = actionOutput;
			}

			actionInstance.log("resulting context of previous: %O", context);
		}
	}

	/**
	 * Executes a shortcut.
	 * @param {ShortcutMetadata} metadata The shortcut metadata.
	 * @returns {*} The result of the final action.
	 */
	async execute(metadata) {
		if (!metadata || !metadata.actions) {
			throw new TypeError("Shortcut metadata is required");
		}

		log("evaluating shortcut with %d actions", metadata.actions.length);

		const context = new Context(this.initialInput);

		for await (const rawAction of metadata.actions) {
			await this.executeAction(rawAction, context);
			if (rawAction.parameters.UUID) {
				context.variables[rawAction.parameters.UUID] = context.input;
			}
		}

		return context.input;
	}
}
module.exports = ShortcutExecutor;
