const clipboard = require("clipboardy");

const { actions: log } = require("../../utils/debug.js");

const rangePattern = /{(\d+), (\d+)}/;

class Action {
	constructor(executor, context, rawAction) {
		/**
		 * @type {ShortcutExecutor}
		 */
		this.executor = executor;
		this.context = context;

		const identifier = this.constructor.identifier.split(".");
		this.log = log.extend(identifier[identifier.length - 1]);

		this.rawAction = rawAction;
		this.parameters = this.getParameters(rawAction.parameters);
	}

	getParameters(parameters) {
		return Object.fromEntries(Object.entries(parameters).map(([ key, value ]) => {
			return [
				this.getParameterKey(key),
				this.getParameterValue(value),
			];
		}));
	}

	getParameterKey(key) {
		if (key.startsWith("WF")) {
			key = key[2].toLowerCase() + key.slice(3);
		}
		return key;
	}

	/**
	 * Gets start and end indexes from a range string.
	 * @param {string} rangeString The range string to get indexes from.
	 * @returns {Object?} An object containing the start and end indexes.
	 */
	getAttachmentRange(rangeString) {
		const range = rangePattern.exec(rangeString);
		if (range === null) return null;

		return {
			end: parseInt(range[2]),
			start: parseInt(range[1]),
		};
	}

	/**
	 * Resolves attachments to a string.
	 * @param {Object} base The base string.
	 * @param {Object[]} attachments The attachments to apply to the base string.
	 * @returns {string} The string with attachments resolved.
	 */
	resolveAttachments(base = "", attachments) {
		for (const [ rangeString, value ] of attachments) {
			const range = this.getAttachmentRange(rangeString);
			if (range === null) continue;

			base = base.substr(0, range.start) + this.getSpecialValueType(value) + base.substr(range.end + base.length);
		}
		return base;
	}

	/**
	 * Resolves a special value type.
	 * @param {Object} value The value type to resolve.
	 * @returns {*} The resolved value.
	 */
	getSpecialValueType(value) {
		switch (value.Type) {
			case "ExtensionInput":
				return this.executor.initialInput;
			case "ActionOutput":
				return this.context.variables[value.OutputUUID];
			case "Clipboard":
				return clipboard.readSync();
		}

		this.log("could not get value for value type '%s': %o", value.Type, value);
		return null;
	}

	getParameterValue(value) {
		if (Array.isArray(value)) {
			return value.map(subValue => {
				return this.getParameterValue(subValue.WFValue || subValue);
			});
		} else if (!value.Value) {
			return value;
		} else if (value.Value.Type) {
			return this.getSpecialValueType(value.Value);
		} else if (value.Value.attachmentsByRange) {
			return this.resolveAttachments(value.Value.string, Object.entries(value.Value.attachmentsByRange));
		}
	}

	/**
	 * @abstract
	 * @returns {*} The output of the action.
	 */
	run() {
		return;
	}

	/**
	 * @returns {*} The output of the action.
	 */
	execute() {
		return this.run();
	}
}
module.exports = Action;