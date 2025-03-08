import type { MoveDirection } from "../types";

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
}
