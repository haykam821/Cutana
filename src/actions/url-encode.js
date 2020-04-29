const Action = require("../types/actions/action.js");

class URLEncodeAction extends Action {
	run() {
		if (this.parameters.encodeMode === "Decode") {
			return decodeURI(this.parameters.input);
		} else {
			return encodeURI(this.parameters.input);
		}
	}
}
URLEncodeAction.identifier = "is.workflow.actions.urlencode";

module.exports = URLEncodeAction;