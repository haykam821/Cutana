class Action {
	constructor(rawAction) {
		this.rawAction = rawAction;
		this.parameters = rawAction.parameters;
	}

	/**
	 * @abstract
	 */
	run() {
		return false;
	}

	execute(input, context) {
		return this.run(input, context);
	}
}
module.exports = Action;