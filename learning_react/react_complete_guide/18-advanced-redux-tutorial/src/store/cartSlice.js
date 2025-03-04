import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: {} },
  reducers: {
    increaseQuantity(state, action) {
      const productName = action.payload.productName;
      if (state.cart[productName]) {
        state.cart[productName].quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const productName = action.payload.productName;
      if (state.cart[productName]) {
        state.cart[productName].quantity -= 1;
        if (state.cart[productName].quantity === 0) {
          delete state.cart[productName];
        }
      }
    },
    addToCart(state, action) {
      console.log(
        "ADDTOCART CALLED WITH: " +
          action.payload.productName +
          action.payload.product
      );
      const { productName, product } = action.payload;
      if (state.cart[productName]) {
        state.cart[productName].quantity += 1;
      } else {
        state.cart[productName] = { ...product, quantity: 1 };
      }
    },
  },
});

export const { increaseQuantity, decreaseQuantity, addToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
