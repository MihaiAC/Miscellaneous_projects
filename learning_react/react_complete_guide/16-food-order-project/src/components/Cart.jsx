import { CartContext } from "./CartContext";
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

export default function Cart() {
  const { products, totalPrice, increment, decrement } =
    useContext(CartContext);

  // TODO: Add your cart is empty message if it is empty.
  return (
    <Modal>
      <div id="cart">
        <h2>Your Cart</h2>
        <ul>
          {[...products.entries()].map(([productId, product]) => (
            <li key={productId} className="cart-item">
              <p>
                {product.name} - {product.quantity} x ${product.price}
              </p>
              <div className="cart-item-actions">
                <Button
                  className="text-button"
                  onClick={() => decrement(productId)}
                >
                  -
                </Button>
                <p>{product.quantity}</p>
                <Button
                  className="text-button"
                  onClick={() => increment(productId)}
                >
                  +
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">${totalPrice}</p>
        <div className="modal-actions">
          <Button className="text-button">Close</Button>
          <Button className="button">Go to Checkout</Button>
        </div>
      </div>
    </Modal>
  );
}
