import { useFrame, useThree } from "@react-three/fiber";
import { state as playerState } from "../stores/player";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store-redux";
import { endGame, GameStatusEnum } from "../stores/game-redux";
import { tileSize } from "../constants";
import { initialCameraY as INITIAL_Y } from "../constants";

// Camera speed in tiles per second.
const NORMAL_SPEED = 0.3;
const CATCH_UP_SPEED = 5;

// If player is GAME_OVER_THRESHOLD tiles behind the camera, game over.
const GAME_OVER_THRESHOLD = 10;

// If camera is BONUS_THRESHOLD tiles behind the player, use catch-up speed.
const BONUS_THRESHOLD = 2;

export default function Camera() {
  const camera = useThree((state) => state.camera);

  const gameState = useSelector((state: RootState) => state.game.status);
  const dispatch = useDispatch();

  let deltaY = 0;

  useFrame((_, deltaT) => {
    // If game is not running, camera should not move.
    if (gameState !== GameStatusEnum.Running) {
      return;
    }

    const playerRow = playerState.currentRow;

    // If game is running, camera should move.
    // Calculate current camera tile.
    const cameraRow = Math.floor(deltaY / tileSize);

    if (playerRow - cameraRow >= BONUS_THRESHOLD) {
      // If camera is two tiles behind the player, use catch-up speed.
      deltaY += deltaT * CATCH_UP_SPEED * tileSize;
    } else if (cameraRow - playerRow >= GAME_OVER_THRESHOLD) {
      // Player fell behind, game over.
      dispatch(endGame());
    } else {
      // Else, use normal camera speed.
      deltaY += deltaT * NORMAL_SPEED * tileSize;
    }

    camera.position.set(300, INITIAL_Y + deltaY, 300);
    camera.lookAt(0, deltaY, 0);
  });

  return null;
}
