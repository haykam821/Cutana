const Action = require("../types/action.js");

class NothingAction extends Action {
	run() {
		return null;
	}
}
NothingAction.identifier = "is.workflow.actions.nothing";

module.exports = NothingAction;