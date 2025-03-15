import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { tileSize, minTileIndex, maxTileIndex } from "../constants";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store-redux";
import { GameStatusEnum } from "../stores/game-redux";

export default function useVehicleAnimation(
  ref: React.RefObject<Group | null>,
  direction: boolean,
  speed: number
) {
  const gameState = useSelector((state: RootState) => state.game.status);

  useFrame((_, delta) => {
    // If ref is null, return.
    // When is ref null? I assume when the car/truck lane is no longer
    // rendered by React.
    if (!ref.current) {
      return;
    }

    const vehicle = ref.current;
    const beginningOfRow = (minTileIndex - 2) * tileSize;
    const endOfRow = (maxTileIndex + 2) * tileSize;

    if (gameState === GameStatusEnum.Running) {
      if (direction) {
        if (vehicle.position.x > endOfRow) {
          vehicle.position.x = beginningOfRow;
        } else {
          // So are we ok with it leaving the road for a tiny delta?
          vehicle.position.x += speed * delta;
        }
      } else {
        if (vehicle.position.x < beginningOfRow) {
          vehicle.position.x = endOfRow;
        } else {
          vehicle.position.x -= speed * delta;
        }
      }
    }
  });
}
