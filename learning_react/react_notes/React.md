React components
- contains all the necessary HTML, JS and potentially CSS;
- related code is stored together;
- different components have different responsibilities => separation of concerns;
Component:
- must be a JS function;
- its name must start with an uppercase character;
- returns "render-able" content - most cases JSX, but can also return number, string, boolean, null or an array of those;

Can use component like a normal HTML element.
Entry point: `ReactDOM.createRoot(entryPoint).render(<App />);`
Import an image with a relative path -> must do for deployment.

### Props ###
== passing data to components.
e.g: `function ComponentName(props)`, in HTML `<ComponentName arg1=val1 arg2=val2 etc.`

Different ways to pass props to components.
`Component({arg1, arg2=defaultVal})`
`Component({...obj})`

#### Children prop ####
props.children = refers to the content between the component tags;
Useful when passing JSX code as a value to another component.
Special prop, always forwarded to the component.

### CSS  ###
The styles for a component are not scoped by default only to that component.

Use 'className' instead of 'class' for CSS classes.

### React(-ing )to events ###
Normal JS = imperative = focuses on how + what should be done;
React JS = declarative = what should be done;
Aka, React will handle DOM updates under the hood.

Can pass a function as a component argument and call it on event trigger (e.g: onClick).

### React Hooks ###
By default, React components get executed only once, when the app gets loaded.
Starts with "use".
Only call Hooks inside of Component functions, on the top level (e.g: not inside a function that's inside a component).

`const [selectedTopic, setSelectedTopic] = useState(initial_value)` 

First return value (`selectedTopic`) = current state value, provided by React; - may change if the component function is executed again;
Second return value (`setSelectedTopic`) = updates the stored value and tells React to re-execute the component function in which useState() was called;
`initial_value` = initial value of `selectedTopic`;
`selectedTopic` is a state variable;

useState tells React when to re-execute a component

So, useState tells React that it should reload the component when the value of the variable changes.

Concepts to keep in mind:
- Derived state = state that can be computed from other state values; avoiding it => avoiding redundancy + consistency issues (updating one but not the other).
- Computed value = value that is calculated directly from the existing state whenever it's needed;

Ternary expressions to choose what is displayed {booly value ? iftrue : iffalse}
OR `{booly value && ifftrue}`

#### Updating state 
When updating a state value based on a previous state value, do not do `setX(!X)`, but pass a function instead: `setX((X) => (!X))`.  The argument to this function will automatically be the last avail. X.
**Why? `!X` is not executed immediately, but scheduled to be executed. In the meantime, X could be changed by something else, so you also need to keep this in mind.**
Passing a function guarantees that the latest available state value of X will be used.

Recommended: update state object immutably. If it's an object, make a deep copy then modify this copy.

**State should be treated as immutable.** -> why not make it immutable by default then?

If you mutate state directly, some changes might not be detected.

State updates are batched, which might explain why we're doing things like this  = modifying X twice in the same batch.

For simple state, shallow copies should be enough.

This reminds me a bit of making something thread-safe.
Isn't this going to make things really slow though?

Common pitfall: duplicating data represented by states (intersecting states). Reminds me a bit of DB normal forms and normalization.

#### Lifting the state up
= to the closest ancestor component that has access to all the components that need to work with the state in question.

#### Deriving state
Deriving the state of the current component based on other states (in the course example, based on its parent state). Could also reference objects by keys instead of reconstructing them each time?

### Displaying a list of items ###
`{CORE_CONCEPTS.map((conceptItem) => (<CoreConcept key={conceptItem.title} {...conceptItem} />))}`
Converts a list of objects (CORE_CONCEPTS) to a list of components.

### Fragment###
Alternative to wrapping the return statement in an unnecessary div.
Alternatively to fragment, `<> return JSX code </>`

### Forwarding props ###
```javascript
<Section className="x", id="y">

function Section({children, ...props}) {
return (<div {...props}> </div>);
}
```

### Setting components dynamically ###
JSX components must be wrapped in {}
Normal HTML elements should be passed as strings.
```
export default function Tabs({ children, buttons, buttonsContainer }) {
const ButtonsContainer = buttonsContainer;
return (
<>
<ButtonsContainer>{buttons}</ButtonsContainer>
{children}
</>
);
}
```
buttonsContainer can be something like "div" or {CustomComponent}
Or pass it as a "ButtonsContainer" from the get go.

### Public vs assets ###
Files in /public/ will be available to the public by the build process + server.
Files in src, like /src/assets/ are not available to the visitors, but they can be used in the code. The build process will put them automatically in public, with some optimizations.

Files put directly in public = things you don't want handled by the build process (e.g: images used directly in index.html or favicons)
Files used by components = put them in src

### Practical usage of Map ###
```javascript
const nums = [10, 20, 30];

nums.map((num, idx) => console.log(`Value: ${num}, Index: ${idx}`));
```
arr.map(single_elem => etc)
arr.map((single_elem, elemIdx) => etc)
arr.map((single_elem, elemIdx, array) => etc)

### Dynamically updating a value in a dictionary
Standard JS, but useful to know
```javascript
function handlePlayerNameChange(symbol, newName) {
	setPlayers((prevPlayers) => {
	return {
		...prevPlayers,
		[symbol]: newName,
	};
	});
}
```
Useful bit: `[keyToUpdate]: newValue`.

### ESLint
If I delete a function, VSCode does not point out errors where I still use the function.
Objective: fix this issue, ESLint seems the solution

Add to VS code settings.json
```
"eslint.enable": true,
"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
```

`npm prune` - to remove unneeded packages.

`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`

Run `npx eslint --init` to customize eslint, will install some react extension.

Disables the import React warning (since it is not needed for versions >=17): `pluginReact.configs.flat["jsx-runtime"]`

### Styling components
**Vanilla CSS:**
- "CSS code decoupled from JSX code" - that is not entirely true is it? if you use a specific className for a specific component?
- Could be written by someone who does not need to mess with the JSX code.
-  Is not scoped to components.

**Inline styles** (probably a precursor to Tailwind(?))
- Syntax: `<p style={{color: 'red', textAlign: 'left',...}}>` - dynamic value with an object declared on the fly, hence the double {{}}.
- Applied directly in the JSX component.
- Only affect the element to which they are added => need to style each element individually.
- No separation between CSS and JSX.
- Makes conditional (dynamic) styling easy.
For inline styles, set className with ternary expressions - return undefined or '' if empty.

**CSS Modules**: build tools option to have CSS file scoped only to a single file.
- "CSS code decoupled from JSX code "(literally contradicted in the example given)
- No CSS name clashes.
- CSS spread across multiple files.
Header.css -> Header.module.css (in Vite) then you have to import an object from it that maps the CSS classnames declared in Header.css to unique classNames across the whole project.
Usage: `[name_of_imported_object].[original_name_of_CSS_class]`
Example generated unique class name: `_paragraph_ewpvr_34` (from a class named `paragraph`).

**Styled components** (third-party app)
`npm install styled-components`
`import { styled } from "styled-components";` usage = Google it
Will create a new Component + forwards the rest of the props to where it would go if we hadn't used the app.

Need to know: how to create a styled component, how to pass conditional values to the style object, how to use pseudo selectors and media queries.

It does seem powerful, but I don't like wrapping every element I want to style into yet another component. Maybe the appeal would be stronger with more experience, but right now it seems confusing. 
Then again, it would be good for importing already-styled components from somewhere else and re-using it across the app. Good for stuff like headers and footers that are on every page.

**Tailwind** 
Remember to run npx tailwind init -p + add index.html and js, ts, jsx file extensions to the config.



