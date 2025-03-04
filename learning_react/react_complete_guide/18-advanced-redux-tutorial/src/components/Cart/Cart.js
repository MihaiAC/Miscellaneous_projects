import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Cart = (props) => {
  const displayCart = useSelector((state) => state.display.displayCart);
  const cart = useSelector((state) => state.cart.cart);

  console.log(cart);

  return (
    <Fragment>
      {" "}
      {displayCart && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            {cart &&
              Object.entries(cart).map(([productName, product]) => (
                <CartItem
                  key={productName}
                  title={productName}
                  quantity={product.quantity}
                  total={product.quantity * product.price}
                  price={product.price}
                />
              ))}
          </ul>
        </Card>
      )}
    </Fragment>
  );
};

export default Cart;
