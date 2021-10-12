import { add, complex, subtract } from './operators';

describe('add', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds -1 + 1 to equal 0', () => {
    expect(add(-1, 1)).toBe(0);
  });

  test('adds Number.NEGATIVE_INFINITY + Number.POSITIVE_INFINITY to equal null', () => {
    expect(add(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(null);
  });

  test('adds empty string + 0 to equal null', () => {
    expect(add('', 0)).toBe(null);
  });

  test('adds string 1 + empty array to equal null', () => {
    expect(add('1', [])).toBe(null);
  });

  test('adds NaN + 1 to equal null', () => {
    expect(add(NaN, 1)).toBe(null);
  });

  test('adds null + null to equal null', () => {
    expect(add(null, null)).toBe(null);
  });
});

describe('subtract', () => {
  test('subtracts 2 - 1 to equal 1', () => {
    expect(subtract(2, 1)).toBe(1);
  });

  test('subtracts [1] - 1 to equal null', () => {
    expect(subtract([1], 1)).toBe(null);
  });

  test('subtracts 1 - empty string to equal null', () => {
    expect(subtract(1, '')).toBe(null);
  });

  test('subtracts 1 - null to equal null', () => {
    expect(subtract(1, null)).toBe(null);
  });

  test('subtracts 10 - undefined to equal null', () => {
    expect(subtract(10, undefined)).toBe(null);
  });
});

// Complex function should take two parameters, each of them it is a list of 2 values (like a tuple)
// The first list should multiply 2 values 
// The second list should divide 2 values  
// In summary we need to square the first result by the second result
// Example: 
// complex([4, 4], [4, 2])
// 1 - [4, 4] => 4 * 4 = 16
// 2 - [4, 2] => 4 / 2 = 2
// 3 - 16 and 2 => 16^2 = 256

describe('complex', () => {
  test('complex [4,4] and [4,2] to equal 1', () => {
    expect(complex([4, 4], [4, 2])).toBe(256);
  });

  test('complex [1,1] and [1,2] to equal 1', () => {
    expect(complex([1, 1], [1, 2])).toBe(1);
  });

  test('complex [10, 0.5] and [10, 0] to equal null', () => {
    expect(complex([10, 0.5], [10, 0])).toBe(null);
  });

  test('complex [-10, -5] and [9, -3] to equal 8e-6', () => {
    expect(complex([-10, -5], [9, -3])).toBe(8e-6);
  });

  test('complex [5, -3] and [null, 1] to equal null', () => {
    expect(complex([5, -3], [null, 1])).toBe(null);
  });

  test('complex ["4", "4"] and ["4", "2"] to equal null', () => {
    expect(complex(['', -''], ['', null])).toBe(null);
  });

  test('complex ["", -""] and ["", null] to equal null', () => {
    expect(complex(['', -''], ['', null])).toBe(null);
  });
});
