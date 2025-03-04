import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ModalContext, ModalNames } from "./ModalContext";
import useFetch from "../hooks/useFetch.js";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/priceFormatting.js";

const initialFetchState = { data: null, error: null, loading: false };

export default function Checkout() {
  const { products, totalPrice, clearCart } = useContext(CartContext);
  const { activeModal, closeModal } = useContext(ModalContext);
  const {
    loading: fetchSending,
    error: fetchError,
    sendRequest,
    data,
    resetState,
  } = useFetch("http://localhost:3000/orders", initialFetchState);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData);

    sendRequest({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          customer: customerData,
          items: Array.from(products, ([key, value]) => ({
            id: key,
            ...value,
          })),
        },
      }),
    });

    // The form should ideally be handled with state.
    event.target.reset();
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

  // Display success if order was accepted by the backend.
  if (data && !fetchError) {
    return (
      <Modal
        open={activeModal === ModalNames.CHECKOUT}
        onClose={() => {
          clearCart();
          resetState();
        }}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button
            className="button"
            onClick={() => {
              clearCart();
              resetState();
              closeModal();
            }}
          >
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  // Display the form by default.
  return (
    <Modal open={activeModal === ModalNames.CHECKOUT} onClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="text" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Post Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {fetchError && <p>Encountered an error: {fetchError}</p>}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
