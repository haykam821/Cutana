const requireAll = require("require-all");
const path = require("path");

/**
 * Gets all actions.
 * @returns {Action[]}
 */
function getActions() {
	const actions = requireAll({
		dirname: path.resolve(__dirname, "../actions"),
		filter: /(.+)\.js$/,
	});
	return Object.fromEntries(Object.values(actions).map(action => {
		return [
			action.identifier,
			action,
		];
	}));
}
module.exports = getActions;