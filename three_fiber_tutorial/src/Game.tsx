import { Scene } from "./components/layout/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/layout/Map";
import { Controls } from "./components/game-logic/Controls";
import { Score } from "./components/game-logic/Score";
import { Result } from "./components/game-logic/Result";
import { Provider } from "react-redux";
import { store } from "./stores/store-redux";
import "./Game.css";
import { Paused } from "./components/game-logic/Paused";
import Camera from "./components/Camera";

export default function Game() {
  return (
    <Provider store={store}>
      <div className="game">
        <Scene>
          <Player />
          <Map />
          <Camera />
        </Scene>
        <Score />
        <Controls />
        <Result />
        <Paused />
      </div>
    </Provider>
  );
}
