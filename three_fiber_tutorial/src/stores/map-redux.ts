import { createSlice } from "@reduxjs/toolkit";
import { generateRows } from "../utilities/generateRows";
import type { Row } from "../types";

interface MapState {
  rows: Row[];
}

const initialState: MapState = {
  rows: generateRows(20),
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addRows: (state) => {
      state.rows = [...state.rows, ...generateRows(20)];
    },
    reset: (state) => {
      console.log("Reset called");
      state.rows = generateRows(20);
    },
  },
});

export const { addRows, reset } = mapSlice.actions;
export default mapSlice.reducer;
