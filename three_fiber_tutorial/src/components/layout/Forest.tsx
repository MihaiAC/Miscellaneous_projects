import { Row } from "../../types";
import { ColoredTile } from "./ColoredTile";
import { TileType } from "./tileType";
import Tree from "../physical-objects/Tree";

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
