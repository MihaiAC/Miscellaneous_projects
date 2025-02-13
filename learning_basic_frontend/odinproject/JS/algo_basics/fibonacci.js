function fib(num) {
  if (!Number.isInteger(num) || num <= 0) {
    return [];
  }

  if (num == 1) {
    return [0];
  } else if (num == 2) {
    return [0, 1];
  } else {
    var retArray = [0, 1];
    for (let index = 0; index < num - 2; index++) {
      retArray.push(
        retArray[retArray.length - 1] + retArray[retArray.length - 2]
      );
    }
    return retArray;
  }
}

function fibRec(num) {
  if (num == 0) {
    return [];
  } else if (num == 1) {
    return [0];
  } else if (num == 2) {
    return [0, 1];
  } else {
    var retArray = fibRec(num - 1);
    retArray.push(
      retArray[retArray.length - 1] + retArray[retArray.length - 2]
    );
    return retArray;
  }
}

console.log(fib(10));
console.log(fibRec(10));
