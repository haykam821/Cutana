const Action = require("../types/actions/action.js");

const clipboard = require("clipboardy");

class GetClipboard extends Action {
	run() {
		return clipboard.read();
	}
}
GetClipboard.identifier = "is.workflow.actions.getclipboard";

module.exports = GetClipboard;