function mapToProfile(arr) {
  const res = arr.map((profile) => {
    return Object.defineProperties(
      {
        name: profile.name || null,
        surname: profile.surname || null,
        fullname:
          profile.name || profile.surname
            ? `${profile.name ? profile.name : "_"} ${
                profile.surname ? profile.surname : "_"
              }`
            : null,
        age: profile.age || null,
      },
      {
        isOld: {
          get: function () {
            return this.age >= 18;
          },
        },
        isAnonymous: {
          get: function () {
            return this.name === null;
          },
        },
      }
    );
  });

  return res;
}

const inputList = [
  { name: "Test1", surname: "Test1" },
  { surname: "Test2" },
  { name: "Test3", age: 10 },
  { age: 65, name: "Test2" },
  {},
];

//let result = mapToProfile(inputList);
//console.log(mapToProfile(inputList), result[2].isOld);

function reduceTo(arr, properties) {
  if (Number.isInteger(arr[0])) {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    });
  } else if (!Array.isArray(properties)) {
    let numbers = arr.map((elem) => {
      return elem[properties];
    });
    return numbers.reduce((prev, curr) => {
      return prev + curr;
    });
  } else {
    let allNumbers = properties.map((el) => {
      return arr.map((elem) => {
        return elem[el];
      });
    });
    console.log(allNumbers);
    return allNumbers.map((el) => {
      return el.reduce((prev, curr) => {
        return prev + curr;
      });
    });
  }
}

let reduceTest = [
  { total: 10, difference: 5 },
  { total: 7, difference: 2 },
  { total: 8, difference: 1 },
];
function sort(arr, keys) {
  if (keys === undefined) return arr.sort((a, b) => a - b);
  if (typeof keys === "string") return arr.sort((a, b) => a[keys] - b[keys]);
  let result = [];

  keys.forEach((key, index) => {
    return keys.length <= 2 && index === 1
      ? result
      : (result = arr.sort((a, b) => {
          if (typeof key === "string") {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            if (a[key] === b[key]) {
              let i = index + 1;
              if (typeof keys[i] === "object") {
                if (a[keys[i].field] > b[keys[i].field]) {
                  return keys[i].order === "desc" ? -1 : 1;
                }
                if (a[keys[i].field] < b[keys[i].field]) {
                  return keys[i].order === "desc" ? 1 : -1;
                }
              }
              return a[keys[i]] > b[keys[i]]
                ? 1
                : a[keys[i]] < b[keys[i]]
                ? -1
                : 0; // Can I write code like this?
            }
          }
        }));
  });
  return result;
}

let sortTest = [
  { age: 4, total: 10 },
  { age: 2, total: 15 },
  { age: 11, total: 70 },
  { age: 10, total: 7 },
  { age: 4, total: 7 },
  { age: 11, total: 7 },
];
//console.log(sort(sortTest, ["age", "total"]));

function complex(data, tasks) {
  tasks.forEach((task) => {
    if (task.operation === "filter") {
      data = data.filter((elem) => {
        return task.callback(elem[task.property]);
      });
      return data;
    } else if (task.operation === "map") {
      data = data.map((elem) => {
        return elem[task.property];
      });
      return data;
    } else if (task.operation === "reduce") {
      data = data
        .map((elem) => {
          return elem[task.property];
        })
        .reduce((prev, curr) => {
          return prev + curr;
        });
      return data;
    } else if (task.operation === "sort") {
      data = data.sort((a, b) => {
        return b - a;
      });
      return data;
    }
  });
  return data;
}

let complexTest = [
  { age: 4, total: 10 },
  { age: 2, total: 15 },
  { age: 11, total: 70 },
  { age: 10, total: 7 },
  { age: 4, total: 7 },
  { age: 11, total: 7 },
];

// console.log(
//   complex(complexTest, [
//     {
//       operation: "filter",
//       property: "total",
//       callback: (value) => value < 10,
//     },
//     {
//       operation: "reduce",
//       property: "total",
//     },
//   ])
// );

const counter = (function () {
  let count = 0;
  let counters = [];

  return function (param1, param2) {
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
  };
})();

console.log(counter());
console.log(counter());
console.log(counter(10));
console.log(counter(11));
console.log(counter("counter1"));
console.log(counter("counter1"));
console.log(counter("counter2"));
console.log(counter("counter2"));
console.log(counter());
console.log(counter());
console.log(counter());

function callableMultiplier(...args) {
  if (args.length > 0) {
    const result = args.reduce((accumulator, value) => accumulator * value, 1);
    const sum = (...innerArgs) => {
      if (innerArgs.length === 0) return result;
      return callableMultiplier(...args, ...innerArgs);
    };
    return sum;
  }
  return null;
}

// console.log(callableMultiplier());
// console.log(callableMultiplier(2)());
// console.log(callableMultiplier(2, 2));
// console.log(callableMultiplier(2, 2)(2, 2)());
// console.log(callableMultiplier(1)(2)(3)(4)(5)());
// console.log(callableMultiplier(1, 2)(2, 3, 1)(1, 2, 3, 2)());
