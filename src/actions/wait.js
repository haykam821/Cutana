const PassthroughAction = require("../types/actions/passthrough.js");

class WaitAction extends PassthroughAction {
	run() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, (this.parameters.delayTime || 1) * 1000);
		});
	}
}
WaitAction.identifier = "is.workflow.actions.delay";

module.exports = WaitAction;
