import { MathUtils, ColorRepresentation } from "three";
import { minTileIndex, maxTileIndex, tilesPerRow } from "../constants";
import { type Row, type RowType } from "../types";
import { carTileLength } from "../components/physical-objects/Car";
import { truckTileLength } from "../components/physical-objects/Truck";

const NUM_TREES = 4;
const NUM_CARS = 3;
const NUM_TRUCKS = 2;

export function generateRows(amount: number): Row[] {
  const rows: Row[] = [];
  for (let ii = 0; ii < amount; ii++) {
    const rowData = generateRow();
    rows.push(rowData);
  }
  return rows;
}

function generateRow(): Row {
  const type: RowType = randomElement(["car", "truck", "forest"]);

  if (type === "car") {
    return generateCarLaneMetadata();
  }

  if (type === "truck") {
    return generateTruckLaneMetadata();
  }

  return generateForestMetadata();
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateForestMetadata(): Row {
  const occupiedTiles = new Set<number>();
  const trees = [];
  const num_trees = Math.min(NUM_TREES, tilesPerRow - 2);

  for (let ii = 0; ii < num_trees; ii++) {
    let tileIndex;
    do {
      tileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex));

    const height = randomElement([20, 45, 60]);

    trees.push({ tileIndex, height });
  }

  return { type: "forest", trees };
}

function generateCarLaneMetadata(): Row {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);
  const num_cars = Math.min(
    NUM_CARS,
    Math.floor((tilesPerRow - 2) / (2 * carTileLength - 1))
  );
  const vehicles = [];

  const occupiedTiles = new Set<number>();

  for (let ii = 0; ii < num_cars; ii++) {
    let centerTileIndex;
    do {
      centerTileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (
      occupiedTiles.has(centerTileIndex) ||
      occupiedTiles.has(centerTileIndex - 1) ||
      occupiedTiles.has(centerTileIndex + 1)
    );

    // Leave more space to the cars than in the tutorial.
    // Handling car collisions is overkill.
    for (let dx = 0; dx < carTileLength; dx++) {
      occupiedTiles.add(centerTileIndex + dx);
      occupiedTiles.add(centerTileIndex - dx);
    }

    const color: ColorRepresentation = randomElement([
      0xff5733, 0x03c0ff, 0xdaf7a6,
    ]);

    vehicles.push({ initialTileIndex: centerTileIndex, color });
  }

  return { type: "car", direction, speed, vehicles };
}

function generateTruckLaneMetadata(): Row {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);
  const num_trucks = Math.min(
    NUM_TRUCKS,
    Math.floor((tilesPerRow - 2) / (2 * truckTileLength - 1))
  );
  const vehicles = [];

  const occupiedTiles = new Set<number>();

  for (let ii = 0; ii < num_trucks; ii++) {
    let centerTileIndex;
    do {
      centerTileIndex = MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (
      occupiedTiles.has(centerTileIndex) ||
      occupiedTiles.has(centerTileIndex - 1) ||
      occupiedTiles.has(centerTileIndex - 2) ||
      occupiedTiles.has(centerTileIndex + 2) ||
      occupiedTiles.has(centerTileIndex + 1)
    );

    for (let dx = 0; dx < truckTileLength; dx++) {
      occupiedTiles.add(centerTileIndex + dx);
      occupiedTiles.add(centerTileIndex - dx);
    }

    const color: ColorRepresentation = randomElement([
      0xa52523, 0xbdb638, 0x78b14b,
    ]);

    vehicles.push({ initialTileIndex: centerTileIndex, color });
  }

  return { type: "truck", direction, speed, vehicles };
}
