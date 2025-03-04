import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
  name: "display",
  initialState: { displayCart: false, notification: null },
  reducers: {
    toggleCart(state) {
      state.displayCart = !state.displayCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const { toggleCart, showNotification } = displaySlice.actions;
export default displaySlice.reducer;
