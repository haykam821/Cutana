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
	return Object.values(actions);
}
module.exports = getActions;
