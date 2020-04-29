class Action {
	constructor(executor, rawAction) {
		/**
		 * @type {ShortcutExecutor}
		 */
		this.executor = executor;
		this.context = this.executor.context;

		this.rawAction = rawAction;
		this.parameters = this.getParameters(rawAction.parameters);
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
			key = key.slice(2);
		}
		key = key[0].toLowerCase() + key.slice(1);

		return key;
	}

	getParameterValue(value) {
		if (!value.Value || !value.Value.Type) {
			return value;
		}

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