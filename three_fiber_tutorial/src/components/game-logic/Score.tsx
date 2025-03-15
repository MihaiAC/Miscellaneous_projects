import { useSelector } from "react-redux";
import { RootState } from "../../stores/store-redux";
import "./Score.css";

export function Score() {
  const score = useSelector((state: RootState) => state.game.score);
  return <div id="score">{score}</div>;
}
