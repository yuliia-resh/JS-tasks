let count = 0;
let counters = [];

export function counter(param1, param2) {
  if (typeof param1 !== "string" && param2 === undefined) {
    param1 ? (count = param1) : count;
    return count++;
  } else if (typeof param1 === "string" && param2 === undefined) {
    if (counters.length === 0) {
      counters.push({ counter: param1, count: 0 });
      return 0;
    } else {
      let res;
      counters.forEach((counter) => {
        if (counter.counter === param1) {
          res = ++counter.count;
        } else if (counter.counter[param1] === undefined) {
          counter.counter = param1;
          counter.count = 0;
          res = counter.count;
        }
      });
      return res;
    }
  } else {
    if (counters.length === 0) {
      counters.push({ counter: param2, count: param1 });
      return param1;
    } else {
      let res;
      counters.forEach((counter) => {
        if (counter.counter === param2) {
          res = ++counter.count;
        } else if (counter.counter[param2] === undefined) {
          counter.counter = param2;
          counter.count = param1;
          res = counter.count;
        }
      });
      return res;
    }
  }
}

export function callableMultiplier(...args) {
  if (args.length > 0) {
    const result = args.reduce((accumulator, value) => accumulator * value);
    const sum = (...innerArgs) => {
      if (innerArgs.length === 0) return result;
      return callableMultiplier(...args, ...innerArgs);
    };
    return sum;
  }
  return null;
}

export function createCalculator(value) {
  function Calculator(initValue = 0) {

    this._value = initValue

    Object.defineProperty(this, 'value', {
        get: function () {
            return this._value
        },
        set: function () {
        }

    })

    this.log = [{operation: 'init', value: this._value}]

    this.add = function (number) {
        this.operation = 'add'
        this._value = this._value + number
        this.log.push({operation: this.operation, value: number})
    }
    this.subtract = function (number) {
        this.operation = 'subtract'
        this._value = this._value - number
        this.log.push({operation: this.operation, value: number})
    }
    this.multiply = function (number) {
        this.operation = 'multiply'
        this._value = this._value * number
        this.log.push({operation: this.operation, value: number})
    }
    this.divide = function (number) {
        this.operation = 'divide'
        this._value = this._value / number
        this.log.push({operation: this.operation, value: number})
    }
}

return new Calculator(value)
}