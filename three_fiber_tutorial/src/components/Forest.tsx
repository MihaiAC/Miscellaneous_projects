import { Row } from "../types";
import { Grass } from "./Grass";
import Tree from "./Tree";

type Props = {
  rowIndex: number;
  rowData: Extract<Row, { type: "forest" }>;
};

export default function Forest({ rowIndex, rowData }: Props) {
  return (
    <>
      <Grass rowIndex={rowIndex}>
        {rowData.trees.map((tree, index) => (
          <Tree
            key={index}
            tileIndex={tree.tileIndex}
            canopyHeight={tree.height}
          />
        ))}
      </Grass>
    </>
  );
}
