import type { Row } from "./types";

// Dummy forest lane.
// export const rows: Row[] = [
//   {
//     type: "forest",
//     trees: [
//       { tileIndex: -3, height: 50 },
//       { tileIndex: 2, height: 30 },
//       { tileIndex: 5, height: 50 },
//     ],
//   },
// ];

// Dummy car lane.
export const rows: Row[] = [
  {
    type: "car",
    direction: false,
    speed: 1,
    vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  },
];
