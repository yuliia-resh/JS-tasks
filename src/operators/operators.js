export function add(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a + b;
  } else return null;
}

export function subtract(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a - b;
  } else return null;

  //throw 'Not implemented';
}

export function complex(arr1, arr2) {
  let firstStep = arr1.every((element) => {
    return Number.isInteger(element);
  });

  let secondStep = arr2.every((element) => {
    return Number.isInteger(element);
  });

  if (firstStep && secondStep) {
    return (arr1[0] * arr1[1]) ** (arr2[0] / arr2[1]);
  } else return null;

  //throw 'Not implemented';
}
