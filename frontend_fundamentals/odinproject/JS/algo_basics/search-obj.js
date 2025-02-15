var nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
          },
        },
      },
    },
  },
};

function contains(object, value) {
  for (const key in object) {
    if (typeof object[key] === "object") {
      return contains(object[key], value);
    }

    if (object[key] === value) {
      return true;
    }
  }
  return false;
}

console.log(contains(nestedObject, 44));
console.log(contains(nestedObject, "info"));
