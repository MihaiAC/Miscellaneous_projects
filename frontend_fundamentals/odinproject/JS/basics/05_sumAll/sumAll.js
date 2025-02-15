function sumAll(n1, n2) {
    if (!Number.isInteger(n1) || !Number.isInteger(n2) || n1 <= 0 || n2 <= 0) {
        return "ERROR";
    }

    if (n1 > n2) {
        [n1, n2] = [n2, n1]
    }

    let sum = 0;
    for (let index = n1; index < n2 + 1; index++) {
        sum += index;
    }

    return sum;
}

// Do not edit below this line
module.exports = sumAll;
