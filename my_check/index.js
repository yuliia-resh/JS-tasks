function mapToProfile(arr) {
  let properties = ["name", "surname", "fullname", "age"];
  let res = arr.map((elem) => {
    properties.every((el) => {
      if (elem[el] === undefined) {
        elem[el] = null;
      }
      if (el === "fullname") {
        if (elem.name === null && elem.surname === null) {
          elem.fullname = null;
        } else if (elem.name === null) {
          elem.fullname = "_" + " " + elem.surname;
        } else if (elem.surname === null) {
          elem.fullname = elem.name + " " + "_";
        } else {
          elem.fullname = elem.name + " " + elem.surname;
        }
      }

      return elem;
    });
    return elem;
  });

  console.log(res[2].isAnonymous);
}

const inputList = [
  { name: "Test1", surname: "Test1" },
  { surname: "Test2" },
  { name: "Test3", age: 10 },
  { age: 65, name: "Test2" },
  {},
];

function reduceTo(arr, properties) {
  if (Number.isInteger(arr[0])) {
    let res = arr.reduce((prev, curr) => {
      return prev + curr;
    });
    console.log(res);
  } else if (!Array.isArray(properties)) {
    let mapping = arr.map((elem) => {
      return elem[properties];
    });
    let res = mapping.reduce((prev, curr) => {
      return prev + curr;
    });
    console.log(res, " 2");
  } else {
    let mapping = arr.map((elem) => {
      let numbers = properties.every((el) => {
        return elem[el];
      });
      console.log(numbers);
      return numbers;
    });
    console.log(mapping);
    let res = mapping.reduce((prev, curr) => {
      return prev + curr;
    });

    console.log(res);
  }
  console.log(typeof properties);
}

let reduceTest = [
  { total: 10, difference: 5 },
  { total: 7, difference: 2 },
  { total: 8, difference: 1 },
];

reduceTo(reduceTest, ["total", "difference"]);
