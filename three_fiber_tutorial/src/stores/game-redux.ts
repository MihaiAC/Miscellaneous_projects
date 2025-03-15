import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store-redux";
import { reset as resetMapStore } from "./map-redux";
import { reset as resetPlayerStore } from "./player";

export enum GameStatusEnum {
  Running = "running",
  Over = "over",
  Paused = "paused",
}

interface GameState {
  status: GameStatusEnum;
  score: number;
}

const initialState: GameState = {
  status: GameStatusEnum.Running,
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
      state.status = GameStatusEnum.Over;
    },
    resetState: (state) => {
      state.status = GameStatusEnum.Running;
      state.score = 0;
    },
    togglePauseGame: (state) => {
      console.log("TOGGLE CALLED");
      if (state.status === GameStatusEnum.Running) {
        state.status = GameStatusEnum.Paused;
      } else if (state.status === GameStatusEnum.Paused) {
        state.status = GameStatusEnum.Running;
      }
    },
  },
});

export const { updateScore, endGame, togglePauseGame } = gameSlice.actions;
export default gameSlice.reducer;

export const resetGame = () => (dispatch: AppDispatch) => {
  dispatch(resetMapStore());
  resetPlayerStore();
  dispatch(gameSlice.actions.resetState());
};
