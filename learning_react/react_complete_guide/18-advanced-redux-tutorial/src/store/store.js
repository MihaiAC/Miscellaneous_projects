import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./displaySlice";

export const store = configureStore({
  reducer: {
    display: displayReducer,
  },
});
