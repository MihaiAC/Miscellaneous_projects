import { tilesPerRow, tileSize } from "../../constants";

export enum TileType {
  Grass = "grass",
  Road = "road",
}

type Props = {
  rowIndex: number;
  tileType: TileType;
  children?: React.ReactNode;
};

const COLORS: Record<TileType, string> = {
  [TileType.Grass]: "0xbaf455",
  [TileType.Road]: "0x454a59",
};

export function ColoredTile({ rowIndex, children, tileType }: Props) {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={Number(COLORS[tileType])} flatShading />
      </mesh>
      {children}
    </group>
  );
}
