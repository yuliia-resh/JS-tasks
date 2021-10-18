export function mapTo(arr, property) {
  if (Number.isInteger(arr[0])) {
    return arr.map((_, index) => {
      return index;
    });
  }
  const res = arr.reduce((acc, item) => {
    if (item[property]) {
      return [...acc, item[property]];
    }
    return acc;
  }, []);

  return res;
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
  }

  if (typeof property === "string") {
    return arr.filter((elem) => {
      return elem.hasOwnProperty(property);
    });
  }
  return arr.filter((elem) => {
    return (
      elem.hasOwnProperty(property.property) && property.filterCb(elem.age)
    );
  });
}

export function reduceTo(arr, properties) {
  if (Number.isInteger(arr[0])) {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    });
  } if (!Array.isArray(properties)) {
    let numbers = arr.map((elem) => {
      return elem[properties];
    });
    return numbers.reduce((prev, curr) => {
      return prev + curr;
    });
  } 
    let allNumbers = properties.map((el) => {
      return arr.map((elem) => {
        return elem[el];
      });
    });

    return allNumbers.map((el) => { // TODO: move to map
      return el.reduce((prev, curr) => {
        return prev + curr;
      });
    });
  
}

export function sort(arr, keys) {
  if (keys === undefined) return arr.sort((a, b) => a - b);
  if (typeof keys === "string") return arr.sort((a, b) => a[keys] - b[keys]);
  if (typeof keys[1] !== "object") {
    return arr.sort((a, b) => {
      if (a[keys[0]] === b[keys[0]]) {
        if (a[keys[1]] > b[keys[1]]) return 1;
        if (a[keys[1]] < b[keys[1]]) return -1;
        return 0;
      }
      if (a[keys[0]] > b[[keys[0]]]) return 1;
      if (a[keys[0]] < b[keys[0]]) return -1;
    });
  }

  return arr.sort((a, b) => {
    if (a[keys[0]] === b[keys[0]]) {
      if (a[keys[1].field] > b[keys[1].field]) return keys[1].order === "desc" ? -1 : 1;
      if (a[keys[1].field] < b[keys[1].field]) return keys[1].order === "desc" ? 1 : -1;
      return 0;
    }
    if (a[keys[0]] > b[keys[0]]) return 1;
    if (a[keys[0]] < b[keys[0]]) return -1;
  });
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
