function removeFromArray(array, ...args) {
    let args_set = new Set(args);
    let ans = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (!args_set.has(element)) {
            ans.push(element);
        }
    }

    return ans;
}

// Do not edit below this line
module.exports = removeFromArray;
