import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart.cart);

  return (
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
  );
};

export default Cart;
