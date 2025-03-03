import Header from "./components/UI/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  //TODO: add onClose to modals.
  return (
    <>
      <Header />
      <Products />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
