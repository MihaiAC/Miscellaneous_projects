import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../store/displaySlice";

const CartButton = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  function handlePress() {
    dispatch(toggleCart());
  }

  return (
    <button className={classes.button} onClick={handlePress}>
      <span>My Cart</span>
      <span className={classes.badge}>{Object.keys(cart).length}</span>
    </button>
  );
};

export default CartButton;
