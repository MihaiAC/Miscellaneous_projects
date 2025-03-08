import { Grass } from "./Grass";
import { Road } from "./Road";
import { rows } from "../metadata";
import Row from "./Row";

export function Map() {
  return (
    <>
      <Grass rowIndex={0} />
      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
      <Road rowIndex={1} />
    </>
  );
}
