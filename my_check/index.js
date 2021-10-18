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
  else if (!Array.isArray(keys)) return arr.sort((a, b) => a[keys] - b[keys]);
  else if (typeof keys[1] !== Object) {
    return arr.sort((a, b) => {
      if (a[keys[0]] === b[keys[0]]) {
        if (a[keys[1]] > b[keys[1]]) return 1;
        if (a[keys[1]] < b[keys[1]]) return -1;
        if (a[keys[1]] === b[keys[1]]) return 0;
      }
      if (a[keys[0]] > b[[keys[0]]]) return 1;
      if (a[keys[0]] < b[keys[0]]) return -1;
    });
  } else {
    return arr.sort((a, b) => {
      if (a[keys[0]] == b[keys[0]]) {
        if (a[keys[1]] > b[keys[1]]) return -1;
        if (a[keys[1]] < b[keys[1]]) return 1;
        else return 0;
      }
      if (a[keys[0]] > b[keys[0]]) return 1;
      if (a[keys[0]] < b[keys[0]]) return -1;
    });
  }
}

let sortTest = [
  { age: 4, total: 10 },
  { age: 2, total: 15 },
  { age: 11, total: 70 },
  { age: 10, total: 7 },
  { age: 4, total: 7 },
  { age: 11, total: 7 },
];
//console.log(sort(sortTest, ["total", { field: "age", order: "desc" }]));

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

let counters = [];
let count = 0;

function counter(param1, param2) {
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
  }
}

// console.log(counter("counter1"));
// console.log(counter("counter1"));
// console.log(counter("counter2"));
// console.log(counter("counter2"));
// console.log(counter());
// console.log(counter());
// console.log(counter());

let resMultiplier;

function callableMultiplier(...args) {
  //let args = Array.from(arguments);
  return args.length > 0
    ? (resMultiplier = args.reduce((a, b) => {
        return a * b;
      }))
    : (resMultiplier ? resMultiplier++ : null);
}

console.log(callableMultiplier());
console.log(callableMultiplier(2)());
console.log(callableMultiplier(2, 2));
console.log(callableMultiplier(2, 2)(2, 2)());
console.log(callableMultiplier(1)(2)(3)(4)(5)());
console.log(callableMultiplier(1, 2)(2, 3, 1)(1, 2, 3, 2)());
