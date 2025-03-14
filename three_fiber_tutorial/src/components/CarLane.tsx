import { Row } from "../types";
import { ColoredTile, TileType } from "./map/ColoredTile";
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
