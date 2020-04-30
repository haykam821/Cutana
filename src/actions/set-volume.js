const PassthroughAction = require("../types/actions/passthrough.js");

const volume = require("vol");

class SetVolumeAction extends PassthroughAction {
	async run() {
		if (typeof this.parameters.volume === "number") {
			await volume.set(this.parameters.volume);
		} else {
			await volume.set(0.5);
		}
	}
}
SetVolumeAction.identifier = "is.workflow.actions.setvolume";

module.exports = SetVolumeAction;