import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
  name: "display",
  initialState: { displayCart: false },
  reducers: {
    toggleCart(state) {
      state.displayCart = !state.displayCart;
    },
  },
});

export const { toggleCart } = displaySlice.actions;
export default displaySlice.reducer;
