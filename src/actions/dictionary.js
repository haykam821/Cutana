const Action = require("../types/actions/action.js");

class DictionaryAction extends Action {
	run() {
		return this.parameters.items;
	}
}
DictionaryAction.identifier = "is.workflow.actions.dictionary";

module.exports = DictionaryAction;