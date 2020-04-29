const { main: log } = require("../utils/debug.js");
const defaultActions = require("../utils/get-actions.js")();

const Context = require("./context.js");

class ShortcutExecutor {
	/**
	 * @param {Object} options Options for the executor.
	 */
	constructor(options) {
		this.actions = defaultActions;

		this.initialInput = options.initialInput || options.input;
		this.blacklistedActions = Array.isArray(options.blacklistedActions) ? options.blacklistedActions : [];
		this.skipUnsupportedActions = options.skipUnsupportedActions;
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

		const action = this.actions[rawAction.identifier];
		if (!action) {
			if (this.skipUnsupportedActions) {
				log("skipping action with identifier '%s' as it is unsupported", rawAction.identifier);
				return;
			}

			throw new Error("Unsupported action: " + rawAction.identifier);
		}

		log("evaluating action with identifier '%s' with input of '%s' and parameters: %o", rawAction.identifier, context.input, rawAction.parameters);

		const actionInstance = new action(this, rawAction);
		context.input = await actionInstance.execute();
		console.log(context);
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