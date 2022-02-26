const PassthroughAction = require("../types/actions/passthrough.js");

const darkMode = require("dark-mode");

class SetAppearanceAction extends PassthroughAction {
	async run() {
		if (this.parameters.style === "light") {
			await darkMode.disable();
		} else {
			await darkMode.enable();
		}
	}
}
SetAppearanceAction.identifier = "is.workflow.actions.appearance";

module.exports = SetAppearanceAction;
