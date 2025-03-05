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

`npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks`

Run `npx eslint --init` to customize eslint, will install some react extension.

Disables the import React warning (since it is not needed for versions >=17): `pluginReact.configs.flat["jsx-runtime"]`

Add to eslint.config.js:
```
{
	plugins: {
		"react-hooks": reactHooks,
	},
	rules: {
		...reactHooks.configs.recommended.rules,
	},
},
```

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

Same drawback as styled components in that plenty of wrapper functions will be necessary to avoid code duplication.

### Debugging React
- Browser dev tools + breakpoints
- StrictMode - executes every component, effect, ref callbacks an extra time + checks usage of deprecated APIs.
- React dev tools - can monitor the state and hooks for each component.

### Refs
x = useRef()
Add ref={x} on the element you want.
x.current.property = access property of the actual HTML element;

{x ?? false_value} = set to x if x truthy, else to false_value;

State:
- Causes component re-execution when changed.
- Should be used for values that are directly reflected in the UI.
- Should not be used for behind-the-scenes values with no direct UI impact.

Refs:
- Do not cause component re-execution when changed.
- Can be used to gain direct DOM elem access (reading values, browser APIs, etc.).

Refs are used to retain values across component re-executions (similar to state variables).
Do not read/write a ref's current value during rendering.

Forwarding refs to component:
- React 19: ref is a special variable when passing args to a component.
- < React 19: Wrapping the target component in a forwardRef function - necessary for old React versions.

UseImperativeHandle = exposing callable functions to outside of the component; Used as a layer of indirection; if I call dialog.current.showModal(), the current component has to know that the component it calls has a `<dialog>` element (tight coupling).
```javascript
useImperativeHandle(ref, () => {
	return {open() {
		dialog.current.showModal();
	},};
});
```
This way, we can call ref.current.open() from outside the component.

### Portals
Used to render a component someplace else in the DOM.

### Batching
(Just the general idea)
React batches updates that occur within the same event cycle (e.g., inside a click handler).
Prevents unnecessary re-renders.

### Things that are not React, but can cause bugs
Buttons = always specify the type. Submit for forms, button for everything else. Could trigger page reloads if it's submit and you don't preventDefault().

`<a>` elements: onClick => prevent event default, can trigger a page reload (-3 hours 🙃 ).

### Advanced state management
Prop drilling = passing props from root app to children, which are then passed to other children and so on.

Why prop drilling is bad:
- Harder to maintain code: every intermediate component must pass down the prop even if it doesn't directly use it => changing the prop required updating multiple components.
- Makes debugging more difficult.
- Unnecessary re-renders: every component in the chain re-renders when the prop changes even if they don't use it.

#### Alternatives to prop drilling
**A) Component composition**
Basically remove functionality from children and handle it in the root App component => large App component and wrapper descendant components.

**B) Context API**
You wrap multiple components in a Context.
Components in the context can directly access and modify state (specific to that context?).

How to use?
- Declare a context component in /src/store folder.
- Import + wrap the components needing this context in either contextName or contextName.Provider (React <19). Must provide a default value prop.
- useContext/use inside the component you need to consume the context. useContext cannot be used inside an if block (why?). use doesn't exist in React <19. use seems to be used to fetch async data, works with promises. Re-renders when it fetches new data, while useContext re-renders whenever Context changes.
- Can also consume context with contextName.Consumer, as a wrapper.
- Can add state variables, handlers to context.

**C) ContextAPI + useReducer**
Reducer = similar to reduce() - reduces a complex lists of values to a single one. Reducer is the analogue for state management.

`const [state, dispatch] = useReducer(reducer, initial_state)`
A reducer receives the state + action and returns the modified state.

useReducer is used to manage more complex state than with useState;

### Side effects
Side effect = Anything that affects something outside the component's rendering process.

E.g: fetching data from an API, updating DOM manually, subscribing to events, setting timeouts or intervals or updating local storage.

useEffect -> will be executed only after the component has been rendered.
- Dependencies specified: effect will only run if those dependencies changed. What can a dependency be? Anything that triggers a re-render when it changes (or is it anything that is changed on a re-render?). Using a prop/function as a dependency?
  
  Functions get re-created when the component they are in is executed again. So technically, they change - functions are objects in JS. Usage can lead to infinite loops. When passing functions as dependencies to useEffect, wrap them in useCallback to prevent re-creating them on component re-render. useCallback also has dependencies on which the function is re-created.
  
- Clean-up function: is run on component unmount and when the effect runs again.
- Empty dependencies ([ ])  -> effect only runs once, on component mounting. 
- No dependencies -> effect runs after each time app is rendered (can lead to infinite loop).

### Key prop
When it changes, it unmounts and re-mounts target component.
The key is passed as a prop.

### Behind the scenes
Knowledge consolidation.
React builds a component tree.
Flamegraph (react dev toold) - to see which component rendered
Record why components were rendered

React has a virtual DOM to figure out what it actually needs to change in the real DOM (by comparing snapshots of the virtual one).

React tracks state by component type & its position in the tree.
This is why the key is important when rendering lists - and why using the index may be a bad idea. You should have a unique id of some sorts when using key.

MillionJS -> package to suggest performance improvements.

#### Memo
memo - use to prevent component re-render.
Shallowly compares props, if the same => component not re-rendered.
Normally if parent changes, component gets re-rendered.
When to use? most useful on components near the root of the tree.
Checking props with memo is expensive => don't use it when props change frequently.

useMemo - use to prevent expensive normal function re-execution.

### Class-based components
Deprecated (?)
Cannot use hooks.
Has a render() method, must extend Component.
State is always an object. State is always named "state" (accessed with this.state). Set the state with "setState". Specifying only one field in setState will keep the others the same.
".bind(this)" = bind the current context to the function that's being executed (?).

Alternative to hooks: component lifecycle.
- componentDidMount() -> useEffect with empty dependency;
- componentDidUpdate() -> useEffect with a specific dependency; however you do need to check if the dependency you're interested in was the one changed;
- componentWillUnmount() -> clean-up function for useEffect;

Can use context, but only once.

### Error boundaries
Cannot try-catch in JSX code.
An error boundary is a class-based component that implements the `componentDidCatch()` method.
The method triggers whenever a child throws an error.
You wrap around components in which you want to catch errors.
It's like a decorator for catching errors.
Otherwise, it is a normal component: you can have state + handle it, etc.

### DB ops
Standard mode of operation: React interacts with a backend server (so frontend and backend are separated stacks).

Just like in JS, fetch() - to use and send data -> returns a Promise (wrapper around an eventually received Response object).

Cannot use async/await in a React component declaration.
But, can declare an async function inside a hook like useEffect. Does it work inside a component?

3 common states in components fetching data:
- Data state -> represents the data being fetched.
- Fetching states -> represents whether the data is being fetched or has been fetched.
- Error state -> did an error occur when fetching data?

Optimistic updating -> send request after displaying result. Handle error by reverting the change.

### Custom Hooks
Rules of hooks:
1. Only call Hooks inside of Component functions (or other Hook Functions?? - I thought you should not do that?. Although we already did set state inside useEffect).
2. Only call Hooks on the top level - not inside nested code statements.

Why create custom Hooks? -> mostly to reuse logic across multiple components. Main reasons:
1. Abstracting complex state logic.
2. Encapsulating side effects (e.g: fetching data).
3. Handling event listeners (window resize, scroll, etc.)
4. Memoizing expensive computations.
5. Managing authentication and user state.

Implementing hooks:
- Should be a function that starts with "use".
- Can return variables representing its own internal state.
- Internally, all the examples I've seen use `useEffect`.
- If state changes inside of the hook, it (can?) trigger a re-render in all the components using the hook's state.

Thing to remember: turning a non-async thing with Promise


### Forms :(
Input validation types:
- On keystroke -> shows errors too early
- On lost focus -> shows errors too long(?)
- On form submission -> shows errors too late. Especially heinous if getting a field wrong resets the whole field.

By default, pressing the button submits the form (refreshes the page).
Either add type="button" (it's "submit" by default) or event.preventDefault() (with onClick on the button or onSubmit on the form html) or with "Form Actions".

useRef should not be used to modify the DOM (resetting the form).

FormData -> fields must have the name attribute set. Loses multivalue things (forms with the same name e.g: multiple checkboxes)
```javascript
const fd = new FormData(event.target);
const data = Object.fromEntries(fd.entries());
const acquisitionChannel = fd.getAll("acquisition"); // Getting multiple inputs with the same name, as a list.
console.log(data);
```
Resetting the data: `event.target.reset()`

`onBlur()` - whenever an input loses focus

Custom React forms: React Hook FOrms + Formik.

#### Form Actions
action instead of submit
formData instead of event
useActionState hook
pending
useFormStatus
Can set a different formAction for each button inside of a form (?).
useOptimistic - meant to be used inside a form action, while the form is being submitted. Display result immediately, keep it if the form update was successful, revert otherwise. So, visual feedback for the user.

### Redux
Alternative: Zustand
Handling immutable states: Immer
Cross-component/app-wide state management.
Types of state:
- Local state = single component, useState/useReducer; e.g: listening to user input or toggling something.
- Cross-component state = state affecting multiple components; e.g: open/closed state of modals; prop drilling or useContext;
- App-wide state = state affecting the entire app like authentication or theme; requires prop drilling or useContext;

React Context potential disadvantages:
- Complex setup & management - applicable for larger projects. Stacked context providers.
- Performance - for states that change frequently (? - how frequently?).

Redux:
- Central data Store for state.
- Components subscribe to the store.
- Components never directly manipulate the store data. 
- Reducer functions do that instead.
- Components dispatch Actions, which describe the operations the Reducer must do.
- Reducers should be pure functions (same input leads to same output, no side effects).
- Subscriber = executes the code in it when the state changes.
- Dispatch = Triggers a Reducer.

`npm install redux react-redux`
useSelector, useDispatch

So far, Redux seems like a global useReducer, with some caveats.

Reducers do not replace missing values in state. It replaces the old state with the new state dumbly. Aka, create a new state, explicitly set all the values you need. Do not mutate the old state.

#### Redux Toolkit
`npm install @reduxjs/toolkit`
createSlice
Can alter old state, internally RTK uses immer to translate into immutable code.
configureStore replaces createStore, makes it easier to combine reducers.
slice.actions -> calling them with dispatch wraps arguments automatically in an action object, with a type and a payload.

Reducers must be pure, side-effect free (+ no async code). How to update components and run async tasks?
- Inside the components with useEffect.
- Inside "action creators".

Synchronous, side-effect free code -> reducers == avoid action creators or components.
Async code, code with side effects -> action creators / components.

#### Thunks
What is a **Thunk?**
An function that delays an action until later.
Does not return the action itself, but another function which eventually returns the action.

```javascript
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // Async code goes here
  };
};
```
An action creator normally returns a plain action object (e.g: {type: x, payload: y})
A thunk returns a function that takes dispatch as an argument. This means that you can dispatch actions after performing async logic.

NEVER HAVE A SLICE AND ONE OF ITS STATES HAVE THE SAME NAME!! 

Redux dev tools.

### React Router - multi-page apps
SPAs = gives illusion of multiple pages, when changing the link, a different component is loaded.
`npm install react-router-dom`
Route = mapping from URL to component
router object, RouterProvider wrapper (decorator-like)

