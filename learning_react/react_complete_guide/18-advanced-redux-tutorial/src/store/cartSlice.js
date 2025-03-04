import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: {}, changed: false },
  reducers: {
    increaseQuantity(state, action) {
      const productName = action.payload.productName;
      state.changed = true;
      if (state.cart[productName]) {
        state.cart[productName].quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const productName = action.payload.productName;
      state.changed = true;
      if (state.cart[productName]) {
        state.cart[productName].quantity -= 1;
        if (state.cart[productName].quantity === 0) {
          delete state.cart[productName];
        }
      }
    },

    addToCart(state, action) {
      const { productName, product } = action.payload;
      state.changed = true;
      if (state.cart[productName]) {
        state.cart[productName].quantity += 1;
      } else {
        state.cart[productName] = { ...product, quantity: 1 };
      }
    },

    replaceCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { increaseQuantity, decreaseQuantity, addToCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
