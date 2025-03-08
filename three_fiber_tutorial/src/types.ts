import { ColorRepresentation } from "three";

export type RowType = "forest" | "car" | "truck";

export type Row =
  | {
      type: "forest";
      trees: { tileIndex: number; height: number }[];
    }
  | {
      type: "car";
      direction: boolean;
      speed: number;
      vehicles: {
        initialTileIndex: number;
        color: ColorRepresentation;
      }[];
    }
  | {
      type: "truck";
      direction: boolean;
      speed: number;
      vehicles: {
        initialTileIndex: number;
        color: ColorRepresentation;
      }[];
    };

export type MoveDirection = "forward" | "backward" | "left" | "right";
