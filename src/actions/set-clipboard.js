const PassthroughAction = require("../types/actions/passthrough.js");

const clipboard = require("clipboardy");

class SetClipboard extends PassthroughAction {
	async run() {
		await clipboard.write(this.parameters.input);
	}
}
SetClipboard.identifier = "is.workflow.actions.setclipboard";

module.exports = SetClipboard;
