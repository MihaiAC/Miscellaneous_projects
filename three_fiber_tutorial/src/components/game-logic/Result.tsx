import { useSelector } from "react-redux";
import { RootState } from "../../stores/store-redux";
import { resetGame } from "../../stores/game-redux";
import { store } from "../../stores/store-redux";
import { GameStatusEnum } from "../../stores/game-redux";
import "./Result.css";

export function Result() {
  const score = useSelector((state: RootState) => state.game.score);
  const status = useSelector((state: RootState) => state.game.status);

  if (status !== GameStatusEnum.Over) return null;

  return (
    <div id="result-container">
      <div id="result">
        <h1>Game Over</h1>
        <p>Your score: {score}</p>
        <button onClick={() => store.dispatch(resetGame())}>Retry</button>
      </div>
    </div>
  );
}
