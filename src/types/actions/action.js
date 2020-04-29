const { actions: log } = require("../../utils/debug.js");

class Action {
	constructor(executor, context, rawAction) {
		/**
		 * @type {ShortcutExecutor}
		 */
		this.executor = executor;
		this.context = context;

		this.rawAction = rawAction;
		this.parameters = this.getParameters(rawAction.parameters);

		const identifier = this.constructor.identifier.split(".");
		this.log = log.extend(identifier[identifier.length - 1]);
	}

	getParameters(parameters) {
		return Object.fromEntries(Object.entries(parameters).map(([ key, value ]) => {
			return [
				this.getParameterKey(key),
				this.getParameterValue(value),
			];
		}));
	}

	getParameterKey(key) {
		if (key.startsWith("WF")) {
			key = key[2].toLowerCase() + key.slice(3);
		}
		return key;
	}

	getParameterValue(value) {
		if (!value.Value || !value.Value.Type) {
			return value;
		}

		switch (value.Value.Type) {
			case "ExtensionInput":
				return this.executor.initialInput;
			case "ActionOutput":
				return this.context.variables[value.Value.OutputUUID];
		}

		this.log("could not get value for value type '%s': %o", value.Value.Type, value);
		return null;
	}

	/**
	 * @abstract
	 * @returns {*} The output of the action.
	 */
	run() {
		return;
	}

	/**
	 * @returns {*} The output of the action.
	 */
	execute() {
		return this.run();
	}
}
module.exports = Action;