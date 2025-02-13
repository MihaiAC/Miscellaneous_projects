function reverseString(input_string) {
    let characters = input_string.split('');
    characters = characters.reverse();
    return characters.join('');
}

// Do not edit below this line
module.exports = reverseString;
