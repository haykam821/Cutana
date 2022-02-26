const Action = require("../types/actions/action.js");

class NumberAction extends Action {
	run() {
		const parsedNumber = parseInt(this.parameters.numberActionNumber);
		return isNaN(parsedNumber) ? 0 : parsedNumber;
	}
}
NumberAction.identifier = "is.workflow.actions.number";

module.exports = NumberAction;
