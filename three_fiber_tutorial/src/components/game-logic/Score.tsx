import { useSelector } from "react-redux";
import { RootState } from "../../stores/store-redux";
import "./Score.css";

export function Score() {
  // TODO: check Redux changes.
  const score = useSelector((state: RootState) => state.game.score);
  return <div id="score">{score}</div>;
}
