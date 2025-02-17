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




