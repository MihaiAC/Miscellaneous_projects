import type { MoveDirection } from "../types";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import useMapStore from "./map";

export const state: {
  currentRow: number;
  currentTile: number;
  movesQueue: MoveDirection[];
} = {
  currentRow: 0,
  currentTile: 0,
  movesQueue: [],
};

// Queue player input.
export function queueMove(direction: MoveDirection) {
  // Check if move is valid.
  const isValidMove = endsUpInValidPosition(
    { rowIndex: state.currentRow, tileIndex: state.currentTile },
    [...state.movesQueue, direction]
  );

  if (!isValidMove) {
    return;
  }

  state.movesQueue.push(direction);
}

// Remove first movement command + move player.
export function stepCompleted() {
  const direction = state.movesQueue.shift();

  if (direction === "forward") {
    state.currentRow += 1;
  }

  if (direction === "left") {
    state.currentTile -= 1;
  }

  if (direction === "right") {
    state.currentTile += 1;
  }

  // TODO: is player supposed to be able to go backward?
  if (direction === "backward") {
    state.currentRow -= 1;
  }

  if (state.currentRow === useMapStore.getState().rows.length - 10) {
    useMapStore.getState().addRows();
  }
}
