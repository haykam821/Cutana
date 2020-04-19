const actions = require("./utils/get-actions.js")();

const { main: log } = require("./utils/debug.js");

const previousInput = Symbol("Previous input");

/**
 * Evaluates a shortcut.
 * @param {ShortcutMetadata} metadata The shortcut metadata.
 * @param {Object} options Additional options.
 */
async function evaluateShortcut(metadata, options = {}) {
	log("evaluating shortcut with %d actions", metadata.actions.length);

	let context = {
		[previousInput]: options.input,
	};

	for await (const rawAction of metadata.actions) {
		if (Array.isArray(options.blacklistedActions) && options.blacklistedActions.includes(rawAction.identifier)) {
			throw new Error("Blacklisted action: " + rawAction.identifier);
		}

		const action = actions[rawAction.identifier];
		if (!action) {
			throw new Error("Unsupported action: " + rawAction.identifier);
		}

		log("evaluating action with identifier '%s' with input of '%s' and parameters: %o", rawAction.identifier, context[previousInput], rawAction.parameters);
		
		const actionInstance = new action(rawAction);
		context[previousInput] = await actionInstance.execute(context[previousInput], context);
	}

	return context[previousInput];
}
module.exports = evaluateShortcut;