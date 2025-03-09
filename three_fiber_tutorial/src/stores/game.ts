import { create } from "zustand";

interface StoreState {
  status: "running" | "over";
  score: number;
  updateScore: (rowIndex: number) => void;
  endGame: () => void;
}

const useStore = create<StoreState>((set) => ({
  status: "running",
  score: 0,
  updateScore: (rowIndex: number) => {
    set((state) => ({ score: Math.max(rowIndex, state.score) }));
  },
  endGame: () => {
    set({ status: "over" });
  },
}));

export default useStore;
