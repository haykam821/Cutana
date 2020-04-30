const Action = require("../types/actions/action.js");

class AppendVariableAction extends Action {
	run() {
		// Create variable if it doesn't exist yet
		if (!this.context.variables[this.parameters.variableName]) {
			return this.context.variables[this.parameters.variableName] = this.parameters.input;
		}

		return this.context.variables[this.parameters.variableName] += this.parameters.input;
	}
}
AppendVariableAction.identifier = "is.workflow.actions.appendvariable";

module.exports = AppendVariableAction;