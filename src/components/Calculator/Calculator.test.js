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
});

describe('sumEntries', () => {
  test('array of numbers produces expected number value', () => {
    expect(sumEntries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(78);
  });
});
