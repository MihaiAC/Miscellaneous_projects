import { tilesPerRow, tileSize } from "../constants";

type Props = {
  rowIndex: number;
  children?: React.ReactNode;
};

// TODO: Very similar to grass - imo too similar, should be the same component
// with a color prop (?) - Tile?
export function Road({ rowIndex, children }: Props) {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0x454a59} flatShading />
      </mesh>
      {children}
    </group>
  );
}
