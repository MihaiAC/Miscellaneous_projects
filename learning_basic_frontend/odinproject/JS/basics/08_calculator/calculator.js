function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function sum(list) {
  return list.reduce(add, 0);
}

function multiply(list) {
  return list.reduce((accum, val) => accum * val, 1);
}

function power(base, exp) {
  return Math.pow(base, exp);
}

function factorial(number) {
  if (number == 0) {
    return 1;
  }

  let base = 1;
  for (let N = 1; N <= number; N++) {
    base *= N;
  }

  return base;
}

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
