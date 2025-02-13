React components
- contains all the necessary HTML, JS and potentially CSS;
- related code is stored together;
- different components have different responsibilities => separation of concerns;
Component:
- must be a JS function;
- its name must start with an uppercase character;
- returns "renderable" content - most cases JSX, but can also return number, string, boolean, null or an array of those;

Can use component like a normal HTML element.
Entrypoint: `ReactDOM.createRoot(entryPoint).render(<App />);`




