import { useFrame } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import { Box3, Group } from "three";
import { useDispatch } from "react-redux";
import { endGame } from "../stores/game-redux";

export default function useHitDetection(
  vehicle: React.RefObject<Group | null>,
  rowIndex: number
) {
  const dispatch = useDispatch();

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
        dispatch(endGame());
      }
    }
  });
}
