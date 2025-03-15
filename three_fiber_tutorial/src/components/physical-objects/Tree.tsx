import { tileSize } from "../../constants";

export type Props = {
  tileIndex: number;
  canopyHeight: number;
};

// Tree dimensions.
const canopyWidth = 30;
const canopyDepth = 30;
const trunkWidth = 15;
const trunkDepth = 15;
const trunkHeight = 20;

// Render the tree trunks and canopy.
export default function Tree({ tileIndex, canopyHeight }: Props) {
  return (
    <group position-x={tileIndex * tileSize}>
      <mesh position-z={10} castShadow receiveShadow>
        <boxGeometry args={[trunkWidth, trunkDepth, trunkHeight]} />
        <meshLambertMaterial color={0x6b492b} flatShading />
      </mesh>
      <mesh position-z={canopyHeight / 2 + 20} castShadow receiveShadow>
        <boxGeometry args={[canopyWidth, canopyDepth, canopyHeight]} />
        <meshLambertMaterial color={0x7aa21d} flatShading />
      </mesh>
    </group>
  );
}
