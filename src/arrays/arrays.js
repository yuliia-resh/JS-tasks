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
    return properties.map((el) => {
      return arr.reduce((acc, elem) => {
        return Number(acc + elem[el]);
      }, []);
    });
}

export function sort(arr, keys) {
  if (keys === undefined) return arr.sort((a, b) => a - b);
  if (typeof keys === "string") return arr.sort((a, b) => a[keys] - b[keys]);
  let result = [];

  keys.forEach((key, index) => {
    return keys.length <= 2 && index === 1 ? result :  
    result = arr.sort((a, b) => {
      
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
          return a[keys[i]] > b[keys[i]] ? 1 : a[keys[i]] < b[keys[i]] ? -1 : 0; // Can I write code like this?
        }
      }
    });
    
  });
  return result;
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
