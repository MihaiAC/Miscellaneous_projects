### Basics###

.append -> .push
.split, .join, .reverse
new Set(), in -> .has(elem)
let = variable available only in current block
n1, n2 = n2, n1 -> `[n1, n2] = [n2, n1]`
Number.isInteger
arr. filter, map, reduce, splice, slice, concat, forEach, indexOf (uses `===`, doesn't work with NaN), includes (works with NaN), find (returns undefined), findIndex, findLastIndex, sort, reverse, split, join, Array.isArray

### Web usage basics ###

**Selecting an element:**
`const container = document.querySelector("#container")`
`const display = container.firstElementChild;`
Can also select class + based on relationships `.previousElementSibling`
`.querySelectorAll(selectors)` -> returns a "NodeList", not an array. Can convert with `Array.from()`

**Creating an element:**
`document.createElement(tagName, [options])`

**Append an element:**
`parentNode.appendChild(childNode), parentNode.insertBefore(newNode, referenceNode)`

**Remove an element:**
`parentNode.removeChild(child)` -> removes child + returns reference to it.

**Altering style:**
`element.style.backgroundColor` or `element.style["backgroundColor"]` , don't use -

**Editing attributes:**
`setAttribute("attr_name", "attr_value")`, `getAttribute, removeAttribute`

**Working with classes:**
`element.classList.(add|remove|toggle)`

**Adding text:**
`element.textContent=...`

**Adding HTML content:**
`element.innerHTML = "some HTML code"`

### Events ###
A DOM element can have only one onclick.
`addEventListener(action, function)`

Callback = function that is passed as an argument to another function.
Callback parameter e = references the event, that contains some info about the trigger. e.g: `e.target.style.background = "blue"`

### Objects ###
```
function Book(author, title) {
	this.author = author;
	this.title = title;
	this.info = function() {
		console.log(`${this.author} ${this.title}`);
	}
}
book = new Book("Author", "Title");
```
All objects have a prototype object.
`Object.getPrototypeOf(book) === Book.prototype;` = returns true;
By attaching an attribute or function to a prototype, you attach it to all instances of the corresponding object.
Also, every object inherits from Object, since: `Object.getPrototypeOf(Player.prototype) === Object.prototype` is true
Aka, access to general object functions like: `.hasOwnProperty(propertyName) or .valueOf()`
Inheriting: `Object.setPrototypeOf(Player.prototype, Person.prototype)` = should be done before object instantiation.

### Closures ###
Inheritance with closure:
```javascript
function createPlayer (name, level) {
  const user = createUser(name);

  const increaseLevel = () => level++;
  return Object.assign({}, user, { increaseLevel });
}
```
Another one:
```javascript
function createPlayer (name, level) {
  const { getReputation, giveReputation } = createUser(name);

  const increaseLevel = () => level++;
  return { name, getReputation, giveReputation, increaseLevel };
}
```
Modules (wrapping in {} and invoking it):
```javascript
const calculator = (function () {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return { add, sub, mul, div };
})();
```
The parentheses transform it into a function, which immediately gets called.

Making it useful  = return an object containing the functions / variables inside.

### Classes ###
`get propName(), set propName()` = they do have access to `this`;
`class MyClass {constructor() {}, method1() {}, etc}`
`new MyClass()` = create new obj;
Can have static methods and fields.
Public class fields.
`#height` = private property, should not be referenced outside the class; can have private methods too, must have unique names within the class.
Inheritance with `extends`

### ES6 Modules ###
Default vs named exports
Entrypoints

### npm ###
`package.json`
`devDependencies vs dependencies`

### webpack ###
Provide entry point -> build dep graph -> combines all needed files
`npm install --save-dev webpack webpack-cli`
`npm install --save-dev html-webpack-plugin`
`npm install --save-dev style-loader css-loader`


Dev dependencies = won't get added to the code the browser will run. e.g: webpack, testing
`src` = for website code
`dist` = where the src code gets built
Need to write a `webpack.config.js` file.
`npx webpack` = run command

`html-webpack-plugin` for loading html
`style-loader, css-loader` for loading css
`html-loader` for images

Webpack runs the loaders starting at the end(??) `use: ["second", "first"]`

Importing a module for its side effects will only run its global code.

Custom command line scripts (in package.json) e.g: 
```
"scripts": {
	"build": "webpack",
	"dev": "webpack serve",
	"deploy": "some complicated git command"
}
```
Usage: `npm run build` or `npm run deploy` etc.

Separate config scripts for dev and prod (instead of `webpack.config.js`)
- `"build": "webpack --config webpack.prod.js"`;
- `"dev": "webpack serve --config webpack.dev.js"`;

Webpack-merge for when dev and prod scripts have common parts you don't want to repeat.
Createapp.dev -> customizing a config file.

### JSON ###
`JSON.parse()` = transform JSON to a JS object;
`JSON.stringify()` = transform JS object to JSON;

### Linters and code formatters ###
Include as project dependencies even if using the VScode extensions.

### T.O.P. postponed projects (after React, probably never) ###
TODO app: https://www.theodinproject.com/lessons/node-path-javascript-todo-list
Battleship: https://www.theodinproject.com/lessons/node-path-javascript-battleship

### Form validation in JS ###
Can do a combination of constraint validation API + custom validation methods.
MDN example.

### Babel ###
Can transpile modern JS features into ES6?

### Callbacks and async code ###
Convention: `function handleFile(error, file)` -> have error as first argument + handle it inside the function;

Avoid callback hell == nesting functions declared on the fly. Declare them separately to make the code more readable.

Callbacks = functions that will be called at a later time.

Promises = when you need to await the result of an async function.
`resolve(x), reject(x)` = solving a promise
`.then(f(x))` = function that gets called after the promise is solved;
`.catch(f(x))` = function that gets called if solving a promise encounters an error;
`.finally(f(x))` = function that gets called regardless of how the promise is solved.

CORS = cross-origin resource sharing
Safe vs unsafe requests
Safe request = safe method (GET, POST, HEAD) + safe headers (standard headers + allowed custom headers: Accept, Accept-Language, Content-Language, Content-Type);
Server decides if the request is safe and adds the header "Access-Control-Allow-Origin"
If you want to use unsafe headers/HTTP methods, must send a "preflight" request to the server to ask for permission to use them.
```javascript
fetch('url.url.com/api', {
  mode: 'cors'
});
``` 
The Fetch API

Instead of then, catch, finally -> async and await;
Async functions = syntactic sugar for Promises;
Returning in an async function = resolving a promise.
Awaiting = using then.
Try/Catch

### Set ###
Lack of a tuple object (like in Python) and of being able to override equals so Set can work properly with objects (like in Java) makes doing algo stuff in JS so painful.

If the objects in the set are simple, you can use something like toString and fromString to serialize/deserialize, since set does work with strings.

### Better for ###
`for (const hobby of hobbies)`  == `for x in arr:` 

