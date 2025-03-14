import { Row } from "../types";
import { ColoredTile, TileType } from "./map/ColoredTile";
import { Truck } from "./Truck";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "truck" }>;
};

export default function TruckLane({ rowIndex, rowData }: Props) {
  return (
    <ColoredTile tileType={TileType.Road} rowIndex={rowIndex}>
      {rowData.vehicles.map((vehicle, index) => (
        <Truck
          key={index}
          rowIndex={rowIndex}
          color={vehicle.color}
          initialTileIndex={vehicle.initialTileIndex}
          direction={rowData.direction}
          speed={rowData.speed}
        />
      ))}
    </ColoredTile>
  );
}
