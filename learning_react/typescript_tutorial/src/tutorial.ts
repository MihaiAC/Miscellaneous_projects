console.log("Testing our first TypeScript file");

let name: string = "Stephen";
name = "John";
console.log(name.toUpperCase());

const numbers: number[] = [1, 2, 3];
numbers.push(4);
console.log(numbers.length);

const booleanArray: Array<boolean> = [true, true, false];
console.log(booleanArray.length);
// booleanArray.push(2) - error

// Type inference
const message = "Hello TypeInferenceScript";
console.log(message);
//message = 2; - error, inferred type was string.

const numbersInferred = [1, 2, 3];
numbersInferred.push(4);
// numbersInferred.push(false); -> error
console.log(numbersInferred);

const mixedArray = [1, "apple", true];
mixedArray.push(2);
// mixedArray.push((elem) => {
//   return elem + 1;
// }); - error, since the array has inferred type number | string | boolean

// Union Types.
let value: string | number;
value = "Hello";
value = 42;
console.log(value);
// value = true; - error

// Can declare a custom type.
type ID = string | number;
function getUser(id: ID): void {
  console.log(`Fetching user with ID: ${id}`);
}
getUser(12345);

// any = use only as a last resort;
// Leads to loss of type safety.

// Alternative: "unknown"
// Requires you to perform type checks before using the value.
function processValue(input: unknown): string {
  if (typeof input === "string") {
    return `The input is a string: ${input}`;
  } else if (typeof input === "number") {
    return `The input is a number: ${input}`;
  } else {
    return `The input is a ${typeof input}`;
  }
}
console.log(processValue("Hi"));
console.log(processValue(42));
console.log(processValue(true));

// ? = optional type
const tomato = { name: "Tomato", price: 2 };
const potato = { name: "Potato", price: 1 };
const carrot = { name: "Carrot" };
const vegetables: readonly { name: string; price?: number }[] = [
  tomato,
  potato,
  carrot,
];
console.log(vegetables);

// readonly = make a property immutable

// Default params (just like in Python + typing)
function calculateFinalScore(
  baseScore: number,
  deductions: number = 0
): number {
  return baseScore - deductions;
}
console.log(calculateFinalScore(50));

// Object param
function printStudent(student: { id: number; name: string }): void {
  console.log(student.name);
}
printStudent({ id: 1, name: "John" });

// Type aliases
type UserInfo = { name: string; age: number; address: string };
const user: UserInfo = { name: "Alice", age: 20, address: "123 fake street" };
console.log(user);

// Type intersection
type User = {
  name: string;
  age: number;
};

type Address = {
  city: string;
  country: string;
};

type UserWithAddress = User & Address;
const userWithAddr: UserWithAddress = {
  name: "Alice",
  age: 25,
  city: "New York",
  country: "US",
};
console.log(userWithAddr);

// Interfaces vs type aliases.
// Can be extended using "extends".
// Interfaces allow optional, readonly, function signatures.
interface Add {
  (a: number, b: number): number;
}
const add: Add = (a, b) => a + b;
console.log(add(5, 4));

// Interfaces can define dynamic property names.
interface StringDictionary {
  [key: string]: string | number;
}
const dictionary: StringDictionary = {
  hello: "world",
  name: "Alice",
  age: 30,
};
console.log(dictionary);

// Tuples in TS
const userTuple: [string, number] = ["Alice", 25];
console.log(userTuple);
userTuple.push(2); // no error
console.log(userTuple); // no error
// console.log(userTuple[2]); //error - tuple of type string, number has no element at index 2
// TypeScript does not enforce length constraint on tuples.
// To make it immutable like in Python, add readonly to the declaration.

// Enum type
enum Status {
  Pending = 1,
  InProgress = "Bla",
  Completed = 3,
}
console.log(Status.Pending);
console.log(Status.InProgress);
// Int enums, string enums - recommended;
// Heterogeneous enums - not recommended;

// Type never = values that never occur
// Used for functions that do not return or always throw an error.

// Generics - just like in Java!
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello!"));
console.log(identity<number>(42));

// Can be used to enforce type safety with arrays more conveniently.

function reverseArray<T>(arr: T[]): T[] {
  return arr.reverse();
}

console.log(reverseArray<number>([1, 2, 3]));

// Generics + interfaces - just like in Java (?)
// Generics + classes - same
// Multiple generic types: function swap<T, U> ...

// Generics + constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
console.log(getLength([1, 2, 3]));

// K extends keyof T
// K is a type representing one of T's properties' name
// How can a key represent a property name?
// The property name is part of the type T, so it is considered itself a type (?)
// T[K] will represent the type of the value returned by the key
// K is typically treated as a string, but it can be a number or a symbol (?)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
