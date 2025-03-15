import { useEffect } from "react";
import { queueMove } from "../stores/player";
import { MoveDirection } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store-redux";
import { GameStatusEnum } from "../stores/game-redux";
import { togglePauseGame } from "../stores/game-redux";

const keyToMove: Record<string, MoveDirection> = {
  ArrowUp: "forward",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
};

const escapeKey = "Escape";

// Runs on mount, cleans after itself on unmount.
export default function useEventListeners() {
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameStatus === GameStatusEnum.Over) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in keyToMove) {
        event.preventDefault();
        queueMove(keyToMove[event.key]);
      } else if (event.key === escapeKey) {
        // Pause the game.
        dispatch(togglePauseGame());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStatus, dispatch]);
}
