function palindromes(input_string) {
    let arr = input_string.split("");
    let regexp = RegExp("[a-z]|[A-Z]|[0-9]");
    arr = arr.filter((char) => regexp.test(char));

    let forward = arr.join("");
    let backward = arr.reverse().join("");

    return (forward.toLowerCase() === backward.toLowerCase());
}

// Do not edit below this line
module.exports = palindromes;
