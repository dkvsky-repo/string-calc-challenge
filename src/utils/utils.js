/**
 * Extract operands from string value.
 *
 * @param {String} stringValue - String value from form.
 * @param {String} delimiter - Delimiter for splitting operation.
 * @param {Number} itemLimit - Number of results expected; i.e. 2 in step 1.
 *
 * @returns {Array} An array of numbers.
 */
export function getOperands(stringValue, { delimiter, itemLimit } = {}) {
  const operands = stringValue.split(delimiter).map(operand => {
    operand = operand.trim();
    if (isNaN(operand) || operand === '') {
      operand = 0;
    }
    return parseInt(operand);
  });
  return itemLimit ? operands.slice(0, itemLimit) : operands;
}

/**
 * Perform sum on operands array.
 *
 * @param {Array} operandArray - Array of number operands.
 *
 * @returns {Number} A number value.
 */
export function sumEntries(operandArray) {
  return operandArray.reduce((acc, cur) => acc + cur, 0);
}
