import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { ModalContext, ModalNames } from "../ModalContext";

export default function Header() {
  const { products } = useContext(CartContext);
  const { openModal } = useContext(ModalContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="Reactfood logo" />
        <h1>Reactfood</h1>
      </div>
      <Button
        className="text-button"
        onClick={() => openModal(ModalNames.CART)}
      >
        Cart ({products.size})
      </Button>
    </header>
  );
}
