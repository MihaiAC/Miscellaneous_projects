import type { Row } from "../types";
import Forest from "./Forest";

type Props = {
  rowIndex: number;
  rowData: Row;
};

export default function Row({ rowIndex, rowData }: Props) {
  switch (rowData.type) {
    case "forest": {
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    }
    default: {
      return <></>;
    }
  }
}
