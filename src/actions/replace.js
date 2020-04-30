const Action = require("../types/actions/action.js");

const escape = require("escape-string-regexp");

class ReplaceAction extends Action {
	run() {
		if (this.parameters.replaceTextRegularExpression) {
			const expression = new RegExp(this.parameters.replaceTextFind, "g");
			return this.parameters.input.replace(expression, this.parameters.replaceTextReplace);
		} else if (!this.parameters.replaceTextCaseSensitive) {
			const expression = new RegExp(escape(this.parameters.replaceTextFind), "i");
			return this.parameters.input.split(expression).join(this.parameters.replaceTextReplace);
		} else {
			return this.parameters.input.split(this.parameters.replaceTextFind).join(this.parameters.replaceTextReplace);
		}
	}
}
ReplaceAction.identifier = "is.workflow.actions.text.replace";

module.exports = ReplaceAction;