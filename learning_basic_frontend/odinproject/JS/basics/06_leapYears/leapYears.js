function leapYears(inputYear) {
    if (inputYear % 4 !== 0) {
        return false;
    } else if (inputYear % 100 !== 0) {
        return true;
    } else if (inputYear % 400 === 0) {
        return true;
    } else {
        return false;
    }
}

// Do not edit below this line
module.exports = leapYears;
