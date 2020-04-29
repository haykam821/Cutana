const Action = require("./action.js");

class PassthroughAction extends Action {
	async execute() {
		await super.execute();
		return this.context.input;
	}
}
module.exports = PassthroughAction;