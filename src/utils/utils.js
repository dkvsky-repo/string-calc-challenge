/**
 * Extract operands from string value.
 *
 * @param {String} stringValue - String value from form.
 * @param {String} defaultDelimiterPattern - Comma or newline.
 * @param {Number} itemLimit - Number of results expected; i.e. 2 in step 1.
 *
 * @returns {Array|String} An array of numbers or string with invalid entries.
 */
export function getOperands(
  stringValue,
  { itemLimit } = {},
  defaultDelimiterPattern = /,|\n/
) {
  const customDelimiterPattern = /\/\/(.+)\n/;
  let cleanString;
  /**
   * Custom delimiter pattern starts with "//"
   * and ends with "\n". We first look for custom delimiter
   * because it is passed by user through the form.
   * If there is no custom delimiter, we use
   * the default delimiters (comma or newline).
   */
  if (stringValue.match(customDelimiterPattern)) {
    // const customDelimiter = stringValue.match(customDelimiterPattern)[1];
    const customDelimiter = stringValue
      .match(customDelimiterPattern)[1]
      .split(/\[|\]/)
      .filter(item => item != '');

    // Remove custom pattern from string.
    cleanString = stringValue.replace(
      stringValue.match(customDelimiterPattern)[0],
      ''
    );

    // Replace custom delimiter for a default one
    cleanString = cleanString.split(customDelimiter).join(',');

    // Apply default delimiter.
    cleanString = cleanString.split(defaultDelimiterPattern);
  } else {
    // No custom delimiter. Apply default delimiter directly to stringValue.
    cleanString = stringValue.split(defaultDelimiterPattern);
  }

  let operands = cleanString.map(operand => {
    operand = operand.trim();
    if (isNaN(operand) || operand === '') {
      operand = 0;
    }
    return parseInt(operand);
  });

  // Ignore values greater than 1000.
  operands = operands.filter(value => value < 1000);

  // Return negative values introduced.
  const negatives = operands.filter(number => number < 0);
  if (negatives.length > 0) {
    // This will trigger an exception if returned
    // and it will contain negative values introduced.
    return { invalid: negatives.join(',') };
  }

  // If there is itemLimit, like on step 1, we only
  // want to return that many operands to operate on.
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
