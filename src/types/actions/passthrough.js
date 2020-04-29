const Action = require("./action.js");

class PassthroughAction extends Action {
	async execute() {
		await this.run();
		return this.context.input;
	}
}
module.exports = PassthroughAction;