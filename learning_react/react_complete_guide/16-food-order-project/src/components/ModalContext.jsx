/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

const initialState = {
  activeModal: "", // Values: "" / "cart" / "checkout"
  openCart: () => {},
  openCheckout: () => {},
  closeActiveModal: () => {},
};

// Tight coupling between ModalContext and what components
// use the modals.
const ModalTypes = Object.freeze({
  CART: "cart",
  CHECKOUT: "checkout",
  NONE: "",
});

export const ModalContext = createContext(initialState);

export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState("");

  const openCart = useCallback(() => {
    setActiveModal(ModalTypes.CART);
  }, []);

  const openCheckout = useCallback(() => {
    setActiveModal(ModalTypes.CHECKOUT);
  }, []);

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  return (
    <ModalContext.Provider
      value={{ activeModal, openCart, openCheckout, closeActiveModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
