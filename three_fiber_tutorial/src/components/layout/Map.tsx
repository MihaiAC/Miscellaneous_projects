import { ColoredTile } from "./ColoredTile";
import { TileType } from "./tileType";
import Row from "./Row";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store-redux";

export function Map() {
  // TODO: check Redux change
  const rows = useSelector((state: RootState) => state.map.rows);

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
