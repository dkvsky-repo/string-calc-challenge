import { getOperands, sumEntries } from '../../utils/utils';

describe('getOperands', () => {
  test('returns array of number operands', () => {
    const expected = [1, 2];
    let operands = getOperands('1,2', { delimiter: ',' });
    expect(operands).toEqual(expected);
  });

  test('replaces invalid value with zero', () => {
    const expected = [0, 0];
    expect(getOperands('tytyt, abc123', { delimiter: ',' })).toEqual(expected);
  });

  test('replaces missing values with zero', () => {
    const expected = [0, 2];
    expect(getOperands(',   2  ', { delimiter: ',' })).toEqual(expected);
  });

  test('limits operands to two items', () => {
    const expected = [1, 2];
    expect(getOperands('1,2,3,4,5', { delimiter: ',', itemLimit: 2 })).toEqual(
      expected
    );
  });

  test('return negative numbers introduced', () => {
    const stringValue = '1,2,-3,4,-5';
    const expected = { invalid: '-3,-5' };
    expect(getOperands(stringValue, { delimiter: /,|\n/ })).toEqual(
      expect.objectContaining(expected)
    );
  });
});

describe('sumEntries', () => {
  test('array of numbers produces expected number value', () => {
    expect(sumEntries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(78);
  });
});

describe('support a newline character as an alternative delimiter', () => {
  test('retrieve operands', () => {
    expect(getOperands('1\n2,3', { delimiter: /,|\n/ })).toEqual([1, 2, 3]);
  });
});

describe('Ignore numbers greater than 1000', () => {
  test('getOperands filters out numbers > 1000', () => {
    const stringValue = '2,1001,6';
    const expectedOperands = [2, 6];
    expect(getOperands(stringValue, { delimiter: /,|\n/ })).toEqual(
      expectedOperands
    );
  });
  test('sumEntries ignores numbers > 1000', () => {
    const stringValue = '2,1001,6';
    const expectedResult = 8;
    expect(sumEntries(getOperands(stringValue, { delimiter: /,|\n/ }))).toEqual(
      expectedResult
    );
  });
});
