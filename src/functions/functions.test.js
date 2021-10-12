import { callableMultiplier, counter, createCalculator } from './functions';

// Counter function should utilize the closure concept
// Each counter should have an internal named counter or default name
// Each counter should have an internal count value or default value
// By calling counter we could provide a few parameters:
// 1. initial counter value (0 if absent)
// 2. counter name (default if absent)
// On call counter function, we need to check and decide following process
// check if this counter by name exist
// - exist case - then check if initial value was passed
// -- value exist
// --- reset count value for counter by name and set count value to specified value, return count value
// -- value not exist
// --- increment count value for counter by name, return count value
// - not exist case - then check if initial value was passed
// -- value exist
// --- create a new counter by specified name or default name and set count value to specified value, return count value
// -- value not exist
// --- create a new counter by specified name or default name and set count value to 0, return count value

describe('counter', () => {
  test('default state unnamed counter', () => {
    expect(counter()).toBe(0);
    expect(counter()).toBe(1);
  });

  test('initial state unnamed counter', () => {
    expect(counter(10)).toBe( 10);
    expect(counter()).toBe(11);

    expect(counter(10)).toBe(10);
    expect(counter()).toBe(11);
  });

  test('default state named counter', () => {
    expect(counter('counter1')).toBe(0);
    expect(counter('counter1')).toBe(1);
    expect(counter('counter2')).toBe(0);
    expect(counter('counter2')).toBe(1);
    expect(counter()).toBe(0);
  });

  test('initial state named counter', () => {
    expect(counter(10, 'counter1')).toBe(10);
    expect(counter('counter1')).toBe(11);
    expect(counter(100, 'counter2')).toBe(100);
    expect(counter('counter2')).toBe(101);
    expect(counter(5)).toBe(5);
    expect(counter()).toBe(6);
  });
});

// callableMultiplier function should utilize the closure and high-order functions concepts
// Rules
// - should have internal count value
// - should return count value when it is called without parameters
// - should take any amount of parameters
// - should be called any amount of times
// - should return callableMultiplier, when there was passed at least one parameter
// - should multiply all parameters one-by-one
// Multiplying
// Each callableMultiplier call could take arbitrary count of numeric parameters, they should be multiplied from left to right
// After callableMultiplier call, we could call callableMultiplier with or without parameters
// - with parameters
// -- same rules as for default call, multiplying process from left to right between different calls
// - without parameters
// -- return count value for all provided values previously

describe('callableMultiplier', () => {
  test('default callableMultiplier', () => {
    expect(callableMultiplier()).toBe(null);
  });

  test('one parameter', () => {
    expect(callableMultiplier(2)()).toBe(2);
  });

  test('two parameters', () => {
    expect(callableMultiplier(2, 2)()).toBe(4);
  });

  test('double two parameters', () => {
    expect(callableMultiplier(2, 2)(2, 2)()).toBe(16);
  });

  test('arbitrary single parameters', () => {
    expect(callableMultiplier(1)(2)(3)(4)(5)()).toBe(120);
  });

  test('arbitrary multiple parameters', () => {
    expect(callableMultiplier(1, 2)(2, 3, 1)(1, 2, 3, 2)()).toBe(144);
  });
});

// createCalculator function should utilize the closure and OOP concepts
// createCalculator should return calculator instance
// createCalculator could take optional initial count value
// - initial count value exist
// -- create calculator and set count value to specified value
// - initial count value not exist
// -- create calculator and set count value to 0
// calculator
// calculator methods
// - add - add specified value to count value
// - subtract - subtract specified value from count value
// - multiply - multiply by specified value the count value
// - divide - divide by specified value the count value
// calculator properties
// - value - represent current count value
// - log - represent historical operation log

describe('calculator', () => {
  test('should set default state', () => {
    expect(createCalculator().value).toBe(0);
  });

  test('should set initial state', () => {
    expect(createCalculator(10).value).toBe(10);
  });

  test('should record initial state log', () => {
    const calculator = createCalculator();

    expect(calculator.log).toEqual([{ operation: 'init', value: 0 }]);
  });

  test('set be immutable state', () => {
    const calculator = createCalculator(10);

    calculator.value = 1;

    expect(calculator.value).toBe(10);
  });

  test('calculator operations', () => {
    const calculator = createCalculator(10);

    expect(calculator.value).toBe(10);

    calculator.add(10);

    expect(calculator.value).toBe(20);

    calculator.subtract(20);

    expect(calculator.value).toBe(0);

    calculator.add(2);
    calculator.multiply(3);

    expect(calculator.value).toBe(6);

    calculator.divide(2);

    expect(calculator.value).toBe(3);

    expect(calculator.log).toEqual([
      { operation: 'init', value: 10 },
      { operation: 'add', value: 10 },
      { operation: 'subtract', value: 20 },
      { operation: 'add', value: 2 },
      { operation: 'multiply', value: 3 },
      { operation: 'divide', value: 2 },
    ]);
  });
});
