import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/store-redux";
import { togglePauseGame } from "../../stores/game-redux";
import { GameStatusEnum } from "../../stores/game-redux";
import "./Paused.css";

export function Paused() {
  const score = useSelector((state: RootState) => state.game.score);
  const status = useSelector((state: RootState) => state.game.status);
  const dispatch = useDispatch();

  if (status !== GameStatusEnum.Paused) return null;

  return (
    <div id="paused-container">
      <div id="paused">
        <h1>Paused game</h1>
        <p>Current score: {score}</p>
        <button onClick={() => dispatch(togglePauseGame())}>Resume</button>
      </div>
    </div>
  );
}
