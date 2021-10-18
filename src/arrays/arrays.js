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
  const res = arr.map((profile) => {
    return Object.defineProperties(
      {
        name: profile.name || null,
        surname: profile.surname || null,
        fullname:
          profile.name || profile.surname
            ? `${profile.name ?? "_"} ${profile.surname ?? "_"}`
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

    return allNumbers.map((el) => {
      return el.reduce((prev, curr) => {
        return prev + curr;
      });
    });
  }
}

export function sort(arr, keys) {
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

export function complex(data, tasks) {
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
