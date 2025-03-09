import { useFrame } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import useGameStore from "../stores/game";
import { Box3, Group } from "three";

export default function useHitDetection(
  vehicle: React.RefObject<Group | null>,
  rowIndex: number
) {
  const endGame = useGameStore((state) => state.endGame);

  useFrame(() => {
    if (!vehicle.current) {
      return;
    }

    if (!playerState.ref) {
      return;
    }

    if (
      rowIndex === playerState.currentRow ||
      rowIndex === playerState.currentRow + 1 ||
      rowIndex === playerState.currentRow - 1
    ) {
      const vehicleBoundingBox = new Box3();
      vehicleBoundingBox.setFromObject(vehicle.current);

      const playerBoundingBox = new Box3();
      playerBoundingBox.setFromObject(playerState.ref);

      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        endGame();
      }
    }
  });
}
