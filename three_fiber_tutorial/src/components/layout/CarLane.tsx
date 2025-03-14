import { Row } from "../../types";
import { ColoredTile } from "./ColoredTile";
import { TileType } from "./tileType";
import Car from "../physical-objects/Car";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "car" }>;
};

export default function CarLane({ rowIndex, rowData }: Props) {
  return (
    <ColoredTile tileType={TileType.Road} rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Car
          key={index}
          rowIndex={rowIndex}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
          color={vehicle.color}
        />
      ))}
    </ColoredTile>
  );
}
