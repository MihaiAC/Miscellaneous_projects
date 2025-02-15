inputArray = [3, 2, 1, 13, 8, 5, 0, 1];

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const leftArray = mergeSort(array.slice(0, mid));
  const rightArray = mergeSort(array.slice(mid));

  return merge(leftArray, rightArray);
}

function merge(left, right) {
  let res = [];
  let ii = 0,
    jj = 0;

  while (ii < left.length && jj < right.length) {
    if (left[ii] < right[jj]) {
      res.push(left[ii]);
      ii += 1;
    } else {
      res.push(right[jj]);
      jj += 1;
    }
  }

  while (ii < left.length) {
    res.push(left[ii]);
    ii += 1;
  }

  while (jj < right.length) {
    res.push(right[jj]);
    jj += 1;
  }

  return res;
}

console.log(mergeSort(inputArray));
