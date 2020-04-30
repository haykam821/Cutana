const PassthroughAction = require("../types/actions/passthrough.js");

const brightness = require("brightness");

class SetBrightnessAction extends PassthroughAction {
	async run() {
		if (typeof this.parameters.brightness === "number") {
			await brightness.set(this.parameters.brightness);
		} else {
			await brightness.set(0.5);
		}
	}
}
SetBrightnessAction.identifier = "is.workflow.actions.setbrightness";

module.exports = SetBrightnessAction;