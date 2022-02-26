const Action = require("../types/actions/action.js");

class CombineAction extends Action {
	getSeparator() {
		switch (this.parameters.textSeparator) {
			case "New Lines":
			default:
				return "\n";
			case "Spaces":
				return " ";
			case "Custom":
				return this.parameters.textCustomSeparator || "";
		}
	}

	run() {
		if (!Array.isArray(this.parameters.text)) {
			return this.parameters.text;
		}

		const separator = this.getSeparator();
		return this.parameters.text.join(separator);
	}
}
CombineAction.identifier = "is.workflow.actions.text.combine";

module.exports = CombineAction;
