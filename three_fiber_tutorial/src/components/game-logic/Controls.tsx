import useEventListeners from "../../hooks/useEventListeners";
import { queueMove } from "../../stores/player";
import { useSelector } from "react-redux";
import "./Controls.css";
import { RootState } from "../../stores/store-redux";

export function Controls() {
  // Prevent movement if the game is over.
  const gameStatus = useSelector((state: RootState) => state.game.status);

  useEventListeners();

  // TODO: Hardcoded value to be removed.
  if (gameStatus === "over") {
    return <></>;
  }

  return (
    <div id="controls">
      <div>
        <button onClick={() => queueMove("forward")}>▲</button>
        <button onClick={() => queueMove("left")}>◀</button>
        <button onClick={() => queueMove("backward")}>▼</button>
        <button onClick={() => queueMove("right")}>▶</button>
      </div>
    </div>
  );
}
