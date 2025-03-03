import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ModalContext, ModalNames } from "./ModalContext";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

export default function Checkout() {
  const { products, totalPrice } = useContext(CartContext);
  const { activeModal, closeModal } = useContext(ModalContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData);

    try {
      const body = JSON.stringify({
        order: {
          customer: customerData,
          items: Array.from(products, ([key, value]) => ({
            id: key,
            ...value,
          })),
        },
      });
      console.log("BODY: " + body);
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      //TODO: empty form
      //TODO: empty Cart (need new function...)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Modal open={activeModal === ModalNames.CHECKOUT}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: ${totalPrice}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="text" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Post Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <div className="modal-actions">
          <Button className="text-button" onClick={closeModal}>
            Close
          </Button>
          {products.size > 0 && (
            <Button className="button" onClick={() => {}}>
              Place Order
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
