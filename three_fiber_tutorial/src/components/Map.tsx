import { Grass } from "./Grass";
import { Road } from "./Road";
import { rows } from "../metadata";
import Row from "./Row";

export function Map() {
  return (
    <>
      <Grass rowIndex={-6} />
      <Grass rowIndex={-5} />
      <Grass rowIndex={-4} />
      <Grass rowIndex={-3} />
      <Grass rowIndex={-2} />
      <Grass rowIndex={-1} />
      <Grass rowIndex={0} />
      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
      <Road rowIndex={1} />
    </>
  );
}
