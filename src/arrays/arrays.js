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
  if (!properties) {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    });
  }
  if (typeof properties === "string") {
    return arr.reduce((prev, curr) => {
      return prev + curr[properties];
    }, 0);
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

  return arr.sort((a, b) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const field = key.field ?? key;
      const order = key.order ?? "asc";

      if (a[field] > b[field]) {
        return order === "asc" ? 1 : -1;
      }
      if (a[field] < b[field]) {
        return order === "asc" ? -1 : 1;
      }
    }
  });
}

export function complex(data, tasks) {
  tasks.forEach((task) => {
    switch (task.operation) {
      case "filter":
        data = data.filter((elem) => {
          return task.callback(elem[task.property]);
        });
        return data;

      case "map":
        data = data.map((elem) => {
          return elem[task.property];
        });
        return data;

      case "reduce":
        data = data
          .map((elem) => {
            return elem[task.property];
          })
          .reduce((prev, curr) => {
            return prev + curr;
          });
        return data;

      case "sort":
        data = data.sort((a, b) => {
          return b - a;
        });
        return data;
    }
  });
  return data;
}
