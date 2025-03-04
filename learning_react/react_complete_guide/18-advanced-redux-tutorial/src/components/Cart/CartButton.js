import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/displaySlice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  function handlePress() {
    dispatch(toggleCart());
  }

  return (
    <button className={classes.button} onClick={handlePress}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
