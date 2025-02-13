const mda = [[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]];

function parseArray(object) {
  var nInts = 0;
  if (Array.isArray(object)) {
    object.forEach((element) => {
      if (Number.isInteger(element)) {
        nInts += 1;
      } else {
        nInts += parseArray(element);
      }
    });
  }
  return nInts;
}

console.log(parseArray(mda));
