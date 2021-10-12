export function mapTo(arr, property) {
  if (Number.isInteger(arr[0])) {
    return arr.map((elem, index) => {
      return index;
    });
  } else {
    let res = arr.filter((elem) => {
      return elem[property] !== undefined;
    });

    return res.map((elem) => {
      return elem[property];
    });
  }
}

export function mapToProfile(arr) {
  let properties = ["name", "surname", "fullname", "age"];
  return arr.map((elem) => {
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
}

export function filterBy(arr, property) {
  if (Number.isInteger(arr[0])) {
    return arr.filter((elem) => {
      return elem >= property;
    });
  } else if (typeof property === "string") {
    return arr.filter((elem) => {
      return elem.hasOwnProperty(property);
    });
  } else {
    return arr.filter((elem) => {
      return (
        elem.hasOwnProperty(property.property) && property.filterCb(elem.age)
      );
    });
  }
}

export function reduceTo(arr, properties) {
  if (Number.isInteger(arr[0])) {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    });
  } else if (!Array.isArray(properties)) {
    let mapping = arr.map((elem) => {
      return elem[properties];
    });
    return mapping.reduce((prev, curr) => {
      return prev + curr;
    });
  }
}

export function sort() {
  // TODO:
  throw "Not implemented";
}

export function complex() {
  // TODO:
  throw "Not implemented";
}
