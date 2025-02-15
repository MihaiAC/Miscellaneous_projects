function repeatString(input_string, repeats) {
    if (repeats < 0) {
        return "ERROR";
    }

    res = []
    for (let index = 0; index < repeats; index++) {
        res.push(input_string)

    }

    return res.join("")
}

// Do not edit below this line
module.exports = repeatString;
