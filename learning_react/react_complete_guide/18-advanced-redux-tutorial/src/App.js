import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/cartActions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const displayCart = useSelector((state) => state.display.displayCart);
  const notification = useSelector((state) => state.display.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {displayCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
