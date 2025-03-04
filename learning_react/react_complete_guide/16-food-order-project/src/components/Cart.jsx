import { CartContext } from "./CartContext";
import { ModalContext, ModalNames } from "./ModalContext";
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/priceFormatting";

export default function Cart() {
  const { products, totalPrice, increment, decrement } =
    useContext(CartContext);

  const { activeModal, openModal, closeModal } = useContext(ModalContext);

  return (
    <Modal open={activeModal === ModalNames.CART} onClose={closeModal}>
      <div id="cart">
        <h2>Your Cart</h2>
        {products.size === 0 && <p>Your cart is empty.</p>}
        <ul>
          {[...products.entries()].map(([productId, product]) => (
            <li key={productId} className="cart-item">
              <p>
                {product.name} - {product.quantity} x{" "}
                {currencyFormatter.format(product.price)}
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
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <div className="modal-actions">
          <Button className="text-button" onClick={closeModal}>
            Close
          </Button>
          {products.size > 0 && (
            <Button
              className="button"
              onClick={() => openModal(ModalNames.CHECKOUT)}
            >
              Go to Checkout
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
