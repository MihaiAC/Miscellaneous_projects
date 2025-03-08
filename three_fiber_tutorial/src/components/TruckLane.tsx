import { Row } from "../types";
import { Road } from "./Road";
import { Truck } from "./Truck";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "truck" }>;
};

export default function TruckLane({ rowIndex, rowData }: Props) {
  return (
    <Road rowIndex={rowIndex}>
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
    </Road>
  );
}
