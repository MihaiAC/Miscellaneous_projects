import { Scene } from "./components/layout/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/layout/Map";
import { Controls } from "./components/game-logic/Controls";
import { Score } from "./components/game-logic/Score";
import { Result } from "./components/game-logic/Result";
import { Provider } from "react-redux";
import { store } from "./stores/store-redux";
import "./Game.css";

// TODO: Need to make camera move to "forward" direction. If player
// TODO: Fix overlapping cars (bug introduced when we changed tile length).
// gets caught up, game over. Delete unrendered tiles as you go (in player.ts).
export default function Game() {
  return (
    <Provider store={store}>
      <div className="game">
        <Scene>
          <Player />
          <Map />
        </Scene>
        <Score />
        <Controls />
        <Result />
      </div>
    </Provider>
  );
}
