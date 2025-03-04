import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./displaySlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    display: displayReducer,
    cart: cartReducer,
  },
});
