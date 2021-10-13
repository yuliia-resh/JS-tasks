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

let result = mapToProfile(inputList);
console.log(mapToProfile(inputList), result[2].isOld);

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
      if (a[keys[0]] === b[keys[0]]) {
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
console.log(sort(sortTest, ["total", { field: "age", order: "desc" }]));
