// TODO: does it make sense to have a separate component for Wheel?
// TODO: hardcoded wdh values.
export default function Wheel({ x }: { x: number }) {
  return (
    <mesh position={[x, 0, 6]}>
      <boxGeometry args={[12, 33, 12]} />
      <meshLambertMaterial color={0x333333} flatShading />
    </mesh>
  );
}
