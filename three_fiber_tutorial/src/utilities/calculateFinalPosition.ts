import type { MoveDirection } from "../types";

export function calculateFinalPosition(
  currentPosition: { rowIndex: number; tileIndex: number },
  moves: MoveDirection[]
) {
  return moves.reduce((position, direction) => {
    switch (direction) {
      case "forward":
        return {
          rowIndex: position.rowIndex + 1,
          tileIndex: position.tileIndex,
        };
      case "backward":
        return {
          rowIndex: position.rowIndex - 1,
          tileIndex: position.tileIndex,
        };
      case "left":
        return {
          rowIndex: position.rowIndex,
          tileIndex: position.tileIndex - 1,
        };
      case "right":
        return {
          rowIndex: position.rowIndex,
          tileIndex: position.tileIndex + 1,
        };
      default:
        return position;
    }
  }, currentPosition);
}
