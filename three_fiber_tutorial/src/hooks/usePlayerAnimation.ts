import { useFrame } from "@react-three/fiber";
import { stepCompleted, state } from "../stores/player";
import { tileSize } from "../constants";
import { Group, Clock, MathUtils } from "three";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store-redux";
import { addRows } from "../stores/map-redux";
import { GameStatusEnum, updateScore } from "../stores/game-redux";

export default function usePlayerAnimation(ref: React.RefObject<Group | null>) {
  const moveClock = new Clock(false);
  const dispatch = useDispatch();

  const numRows = useSelector((state: RootState) => state.map.rows.length);
  const gameState = useSelector((state: RootState) => state.game.status);

  let pausedTime = 0;

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    // No moves queued up.
    if (!state.movesQueue.length) {
      return;
    }

    // If game is paused, pause the clock.
    if (gameState === GameStatusEnum.Paused) {
      if (moveClock.running) {
        pausedTime = moveClock.getElapsedTime();
        moveClock.stop();
      }
      return;
    }

    // Get player component.
    const player = ref.current;

    // Start the clock.
    if (!moveClock.running) {
      moveClock.start();
    }

    // Time(s) to take a step.
    const stepTime = 0.2;

    // Value between 0 and 1.
    const progress = Math.min(
      1,
      pausedTime + moveClock.getElapsedTime() / stepTime
    );

    setPosition(player, progress);
    setRotation(player, progress);

    // Player move ended.
    if (progress >= 1) {
      stepCompleted();

      // Add new rows if player is running out of them.
      if (state.currentRow === numRows - 10) {
        dispatch(addRows());
      }

      // Update score.
      dispatch(updateScore(state.currentRow));
      moveClock.stop();
      pausedTime = 0;
    }
  });
}

// Calculate start -> end positions based on current tile +
// direction of move command.
// Interpolate to current position based on progress.
// Oz movement - sin
// Ox Oy movement - line
function setPosition(player: Group, progress: number) {
  const startX = state.currentTile * tileSize;
  const startY = state.currentRow * tileSize;

  let endX = startX;
  let endY = startY;

  switch (state.movesQueue[0]) {
    case "left":
      endX -= tileSize;
      break;
    case "right":
      endX += tileSize;
      break;
    case "forward":
      endY += tileSize;
      break;
    case "backward":
      endY -= tileSize;
      break;
    default: {
      console.log("Invalid move in queue: " + state.movesQueue[0]);
      return;
    }
  }

  player.position.x = MathUtils.lerp(startX, endX, progress);
  player.position.y = MathUtils.lerp(startY, endY, progress);

  // Inner group only must be moved on the z-axis so camera won't.
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
}

// Player must turn in the direction of the move command.
function setRotation(player: Group, progress: number) {
  let endRotation = 0;
  switch (state.movesQueue[0]) {
    case "forward":
      endRotation = 0;
      break;
    case "left":
      endRotation = Math.PI / 2;
      break;
    case "right":
      endRotation = -Math.PI / 2;
      break;
    case "backward":
      endRotation = Math.PI;
      break;
    default:
      console.log("Invalid move in queue: " + state.movesQueue[0]);
      return;
  }

  // Camera shouldn't rotate so we rotate only the inner group.
  player.children[0].rotation.z = MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
