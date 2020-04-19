const Action = require("../types/action.js");

class PassthroughAction extends Action {
	async execute(input, context) {
		await this.run(input, context);
		return input;
	}
}
module.exports = PassthroughAction;