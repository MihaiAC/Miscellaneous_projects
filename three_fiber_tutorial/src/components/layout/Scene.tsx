import { Canvas } from "@react-three/fiber";
import {
  initialCameraX,
  initialCameraY,
  initialCameraZ,
} from "../../constants";

export const Scene = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      orthographic={true}
      shadows={true}
      camera={{
        up: [0, 0, 1],
        position: [initialCameraX, initialCameraY, initialCameraZ],
      }}
    >
      <ambientLight />
      {children}
    </Canvas>
  );
};
