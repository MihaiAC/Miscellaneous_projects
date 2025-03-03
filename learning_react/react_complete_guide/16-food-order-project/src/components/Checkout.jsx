import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ModalContext, ModalNames } from "./ModalContext";
import useFetch from "../hooks/useFetch.js";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

export default function Checkout() {
  const { products, totalPrice } = useContext(CartContext);
  const { activeModal, closeModal } = useContext(ModalContext);
  const {
    loading: fetchSending,
    error: fetchError,
    sendRequest,
  } = useFetch("http://localhost:3000/orders");

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData);

    const config = JSON.stringify({
      order: {
        customer: customerData,
        items: Array.from(products, ([key, value]) => ({
          id: key,
          ...value,
        })),
      },
    });
    sendRequest(config);

    //TODO: empty form
    //TODO: empty Cart (need new function...)
  }

  let actions;
  if (fetchSending) {
    actions = <span>Sending order data...</span>;
  } else {
    actions = (
      <>
        {" "}
        <Button className="text-button" onClick={closeModal}>
          Close
        </Button>
        {products.size > 0 && (
          <Button className="button" onClick={() => {}}>
            Place Order
          </Button>
        )}
      </>
    );
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

        {fetchError && <p>Encountered an error: {fetchError.message}</p>}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
