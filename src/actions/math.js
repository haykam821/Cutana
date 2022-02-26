const Action = require("../types/actions/action.js");

class MathAction extends Action {
	/**
	 * Gets the operation of the action.
	 * @returns {string} The operation of the action.
	 */
	getOperation() {
		if (this.parameters.mathOperation === "…") {
			return this.parameters.scientificMathOperation;
		}
		return this.parameters.mathOperation;
	}

	/**
	 * Gets the second operand of the action.
	 * @returns {number} The second operand of the action.
	 */
	getOperand() {
		return parseInt(this.parameters.mathOperand || this.parameters.scientificMathOperand);
	}

	/**
	 * Performs an operation.
	 * @param {string} operation The operation to perform.
	 * @param {number} operandA The first operand.
	 * @param {number} operandB The second operand.
	 * @returns {number} The result of the operation.
	 */
	performOperation(operation, operandA, operandB) {
		switch (operation) {
			case undefined:
				return operandA + operandB;
			case "-":
				return operandA - operandB;
			case "×":
				return operandA * operandB;
			case "÷":
				return operandA / operandB;
			case "Modulus":
				return operandA % operandB;
			case "x^2":
				return operandA ** 2;
			case "x^3":
				return operandA ** 3;
			case "x^y":
				return operandA ** operandB;
			case "e^x":
				return Math.E ** operandA;
			case "10^x":
				return 10 ** operandA;
			case "ln(x)":
				return Math.log(operandA);
			case "log(x)":
				return Math.log10(operandA);
			case "√x":
				return Math.sqrt(operandA);
			case "∛x":
				return Math.cbrt(operandA);
			case "x!":
				for (let index = operandA - 1; index > 0; index--) {
					operandA *= index;
				}
				return operandA;
			case "sin(x)":
				return Math.sin(operandA);
			case "cos(x)":
				return Math.cos(operandA);
			case "tan(x)":
				return Math.tan(operandA);
			case "abs(x)":
				return Math.abs(operandA);
		}

		this.log("could not find the '%s' operation", operation);
		return null;
	}

	run() {
		const operation = this.getOperation();
		return this.performOperation(operation, parseInt(this.parameters.input), this.getOperand());
	}
}
MathAction.identifier = "is.workflow.actions.math";

module.exports = MathAction;
