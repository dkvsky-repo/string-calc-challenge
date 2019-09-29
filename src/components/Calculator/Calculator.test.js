import { getOperands, sumEntries } from '../../utils/utils';

describe('getOperands', () => {
  test('returns array of number operands', () => {
    const expected = [1, 2];
    let operands = getOperands('1,2');
    expect(operands).toEqual(expected);
  });

  test('replaces invalid value with zero', () => {
    const expected = [0, 0];
    expect(getOperands('tytyt, abc123')).toEqual(expected);
  });

  test('replaces missing values with zero', () => {
    const expected = [0, 2];
    expect(getOperands(',   2  ')).toEqual(expected);
  });

  test('limits operands to two items', () => {
    const expected = [1, 2];
    expect(getOperands('1,2,3,4,5', { itemLimit: 2 })).toEqual(expected);
  });

  test('return negative numbers introduced', () => {
    const stringValue = '1,2,-3,4,-5';
    const expected = { invalid: '-3,-5' };
    expect(getOperands(stringValue)).toEqual(expect.objectContaining(expected));
  });
});

describe('sumEntries', () => {
  test('array of numbers produces expected number value', () => {
    expect(sumEntries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(78);
  });
});

describe('support a newline character as an alternative delimiter', () => {
  test('retrieve operands', () => {
    expect(getOperands('1\n2,3')).toEqual([1, 2, 3]);
  });
});

describe('ignore numbers greater than 1000', () => {
  test('getOperands filters out numbers > 1000', () => {
    const stringValue = '2,1001,6';
    const expectedOperands = [2, 6];
    expect(getOperands(stringValue)).toEqual(expectedOperands);
  });
  test('sumEntries ignores numbers > 1000', () => {
    const stringValue = '2,1001,6';
    const expectedResult = 8;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });
});

describe('support for custom delimiters', () => {
  test('custom single character length delimiter (;)', () => {
    const stringValue = '//;\n2;5,3\n7';
    const expectedResult = 17;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });

  test('custom single character length delimiter (*)', () => {
    const stringValue = '//*\n2*5,3\n7';
    const expectedResult = 17;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });

  test('custom single character length delimiter - backwards compatibility', () => {
    const stringValue = '//;\n5;5;5,5\n5';
    const expectedResult = 25;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });
});

describe('support for multiple custom delimiters', () => {
  test('custom single delimiter of any length (***)', () => {
    const stringValue = '//[***]\n11***22***33';
    const expectedResult = 66;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });

  test('custom single delimiter of any length - backwards compatibility', () => {
    const stringValue = '//[***]\n11***22***33,1,\n1,2';
    const expectedResult = 70;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });
});

describe('support for multiple delimiters of any length', () => {
  test('multiple delimiter of any length (i.e. [*][!!][r9r])', () => {
    const stringValue = '//[*][!!][r9r]\n11r9r22*33!!44';
    const expectedResult = 110;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });

  test('multiple delimiter of any length - backwards compatibility', () => {
    const stringValue = '//[*][!!][r9r]\n11r9r22*33!!44\n5,5';
    const expectedResult = 120;
    expect(sumEntries(getOperands(stringValue))).toEqual(expectedResult);
  });
});
