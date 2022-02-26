const Action = require("../types/actions/action.js");

const chance = require("chance");
const random = new chance.Chance();

class RandomAction extends Action {
	run() {
		const min = Math.floor(parseFloat(this.parameters.randomNumberMinimum));
		const max = Math.floor(parseFloat(this.parameters.randomNumberMaximum));

		if (min > max) {
			return null;
		}

		return random.integer({
			max,
			min,
		});
	}
}
RandomAction.identifier = "is.workflow.actions.number.random";

module.exports = RandomAction;
