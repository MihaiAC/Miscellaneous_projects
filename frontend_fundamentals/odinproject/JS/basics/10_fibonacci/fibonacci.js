function fibonacci(idx) {
    idx = Number.parseInt(idx);

    if (idx < 0) {
        return "OOPS";
    }

    if (idx === 0) {
        return 0;
    }
    else if (idx === 1) {
        return 1;
    } else if (idx === 2) {
        return 1;
    }
    return fibonacci(idx - 2) + fibonacci(idx - 1);
}

// Do not edit below this line
module.exports = fibonacci;
