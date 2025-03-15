import { ColoredTile } from "./ColoredTile";
import { TileType } from "./tileType";
import Row from "./Row";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store-redux";
import { nGrassTilesInit } from "../../constants";

export function Map() {
  const rows = useSelector((state: RootState) => state.map.rows);

  return (
    <>
      {Array.from({ length: nGrassTilesInit + 1 }).map((_, idx) => (
        <ColoredTile
          key={idx - nGrassTilesInit}
          rowIndex={idx - nGrassTilesInit}
          tileType={TileType.Grass}
        />
      ))}
      {rows.map((rowData, index) => (
        <Row key={index} rowIndex={index + 1} rowData={rowData} />
      ))}
    </>
  );
}
