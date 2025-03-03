/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

const initialState = {
  activeModal: "", // Values: "" / "cart" / "checkout"
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext(initialState);

export function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState("");

  const closeModal = useCallback(() => {
    setActiveModal("");
  }, []);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal: setActiveModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
