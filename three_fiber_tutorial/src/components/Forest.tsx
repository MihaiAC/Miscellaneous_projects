import { Row } from "../types";
import { ColoredTile, TileType } from "./map/ColoredTile";
import Tree from "./Tree";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "forest" }>;
};

export default function Forest({ rowIndex, rowData }: Props) {
  return (
    <>
      <ColoredTile tileType={TileType.Grass} rowIndex={rowIndex}>
        {rowData.trees.map((tree, index) => (
          <Tree
            key={index}
            tileIndex={tree.tileIndex}
            canopyHeight={tree.height}
          />
        ))}
      </ColoredTile>
    </>
  );
}
