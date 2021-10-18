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

export function createCalculator() {
  // TODO:
  throw "Not implemented";
}

let resMultiplier;
export function callableMultiplier(...args) {
  return args
    ? (resMultiplier = args.reduce((a, b) => {
        return a * b;
      }))
    : (resMultiplier ? resMultiplier++ : null);
}
