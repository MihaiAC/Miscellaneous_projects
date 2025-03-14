import { Row } from "../types";
import { ColoredTile } from "./map/ColoredTile";
import { TileType } from "./map/tileType";
import Car from "./Car";

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
