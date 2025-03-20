import ComponentOne from "./ComponentOne";
import ComponentTwo from "./ComponentTwo";

async function loader() {
  const res = await fetch("https://dummyjson.com/carts/1");
  const product = res.json();
  console.log(product);
  return product;
}

const routesConfig = [
  { path: "/", Component: ComponentOne },
  { path: "/two", Component: ComponentTwo, loader },
];

export default routesConfig;
