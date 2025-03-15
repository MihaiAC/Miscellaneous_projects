import { Bounds } from "@react-three/drei";
import { useRef, useEffect } from "react";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { Group } from "three";
import DirectionalLight from "./DirectionalLight";
import { DirectionalLight as ThreeDirectionalLight } from "three";
import { setRef } from "../stores/player";

export function Player() {
  const player = useRef<Group>(null);
  const lightRef = useRef<ThreeDirectionalLight>(null);

  usePlayerAnimation(player);

  useEffect(() => {
    if (!player.current || !lightRef.current) {
      return;
    }

    lightRef.current.target = player.current;

    // Set player reference in the player store
    // (for collision detection with vehicles).
    setRef(player.current);
  });

  // Second mesh is the player "hat".
  return (
    <Bounds fit clip observe margin={10}>
      <group ref={player}>
        <group>
          {" "}
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[15, 15, 20]} />
            <meshLambertMaterial color={0xff7900} flatShading />
          </mesh>
          <mesh position={[0, 0, 21]} castShadow receiveShadow>
            <boxGeometry args={[2, 4, 2]} />
            <meshLambertMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={lightRef} />
      </group>
    </Bounds>
  );
}
