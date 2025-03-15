import { tilesPerRow, tileSize } from "../../constants";
import { TileType } from "./tileType";
import { extraTiles } from "../../constants";

type Props = {
  rowIndex: number;
  tileType: TileType;
  children?: React.ReactNode;
};

const COLORS: Record<TileType, string[]> = {
  [TileType.Grass]: ["0xbaf455", "0x9bd041"],
  [TileType.Road]: ["0x454a59", "0x353a46"],
};

// Secondary color used for out of bounds, on either side of the strip.
export function ColoredTile({ rowIndex, children, tileType }: Props) {
  const mainWidth = tilesPerRow * tileSize;
  const extraWidth = extraTiles * tileSize;

  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[mainWidth, tileSize, 3]} />
        <meshLambertMaterial color={Number(COLORS[tileType][0])} flatShading />
      </mesh>
      <mesh position={[-(mainWidth + extraWidth) / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[extraWidth, tileSize, 3]} />
        <meshLambertMaterial color={Number(COLORS[tileType][1])} flatShading />
      </mesh>
      <mesh position={[(mainWidth + extraWidth) / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[extraWidth, tileSize, 3]} />
        <meshLambertMaterial color={Number(COLORS[tileType][1])} flatShading />
      </mesh>
      {children}
    </group>
  );
}
