import Header from "./components/UI/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  // TODO: Display number of items in cart in header.
  // TODO: Open the cart when pressing the cart button in header.
  return (
    <>
      <Header />
      <Products />
      <Cart />
    </>
  );
}

export default App;
