import { ColoredTile, TileType } from "./map/ColoredTile";
import Row from "./Row";
import useStore from "../stores/map";

export function Map() {
  const rows = useStore((state) => state.rows);

  return (
    <>
      {Array.from({ length: 11 }).map((_, idx) => (
        <ColoredTile
          key={idx - 10}
          rowIndex={idx - 10}
          tileType={TileType.Grass}
        />
      ))}
      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
    </>
  );
}
