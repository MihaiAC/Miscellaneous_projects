import React from "react";
import ReactDOM from "react-dom/client";
import { CartContextProvider } from "./components/CartContext.jsx";
import { ModalContextProvider } from "./components/ModalContext.jsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </CartContextProvider>
);
