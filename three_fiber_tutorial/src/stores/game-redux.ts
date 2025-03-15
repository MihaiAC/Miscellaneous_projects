import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store-redux";
import { reset as resetMapStore } from "./map-redux";
import { reset as resetPlayerStore } from "./player";

interface GameState {
  status: "running" | "over";
  score: number;
}

const initialState: GameState = {
  status: "running",
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = Math.max(action.payload, state.score);
    },
    endGame: (state) => {
      state.status = "over";
    },
    resetState: (state) => {
      state.status = "running";
      state.score = 0;
    },
  },
});

export const { updateScore, endGame } = gameSlice.actions;
export default gameSlice.reducer;

export const resetGame = () => (dispatch: AppDispatch) => {
  dispatch(resetMapStore());
  resetPlayerStore();
  dispatch(gameSlice.actions.resetState());
};
