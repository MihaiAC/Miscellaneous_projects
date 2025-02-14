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

Use 'className' instead of 'class' for CSS classes.

### Props ###
== passing data to components.
e.g: `function ComponentName(props)`, in HTML `<ComponentName arg1=val1 arg2=val2 etc.`

Different ways to pass props to components.
`Component({arg1, arg2=defaultVal})`
`Component({...obj})`

#### Children prop ####
props.children = refers to the content between the component tags;
Useful when passing JSX code as a value to another component.

### Splitting CSS files ###
The styles for a component are not scoped by default only to that component.

### React(-ing )to events ###
Normal JS = imperative = focuses on how + what should be done;
React JS = declarative = what should be done;
Aka, React will handle DOM updates under the hood.

Can pass a function as a component argument and call it on event trigger (e.g: onClick).






