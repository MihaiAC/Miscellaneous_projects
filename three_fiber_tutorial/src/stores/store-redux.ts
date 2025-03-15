import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game-redux";
import mapReducer from "./map-redux";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
