const PassthroughAction = require("../types/actions/passthrough.js");

class SetVariableAction extends PassthroughAction {
	run() {
		this.context.variables[this.parameters.variableName] = this.parameters.input;
	}
}
SetVariableAction.identifier = "is.workflow.actions.setvariable";

module.exports = SetVariableAction;