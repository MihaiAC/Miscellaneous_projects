import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../../store/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price } = props;
  const dispatch = useDispatch();

  function handleMinus() {
    dispatch(decreaseQuantity({ productName: title }));
  }

  function handlePlus() {
    dispatch(increaseQuantity({ productName: title }));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleMinus}>-</button>
          <button onClick={handlePlus}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
