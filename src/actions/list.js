const Action = require("../types/actions/action.js");

class ListAction extends Action {
	run() {
		return this.parameters.items;
	}
}
ListAction.identifier = "is.workflow.actions.list";

module.exports = ListAction;
