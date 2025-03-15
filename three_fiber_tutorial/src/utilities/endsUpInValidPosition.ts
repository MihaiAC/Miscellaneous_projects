import { MoveDirection } from "../types";
import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { store } from "../stores/store-redux";

export function endsUpInValidPosition(
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) {
  // Calculate player position.
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // Bounds check.
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    return false;
  }

  // Tree collision check.
  const finalRow = store.getState().map.rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees?.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    return false;
  }

  return true;
}
