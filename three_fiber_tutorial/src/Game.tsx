import { Scene } from "./components/layout/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/layout/Map";
import { Controls } from "./components/game-logic/Controls";
import { Score } from "./components/game-logic/Score";
import { Result } from "./components/game-logic/Result";
import { Provider } from "react-redux";
import { store } from "./stores/store-redux";
import "./Game.css";

// TODO: chaining input commands makes things laggy.
// TODO: make sure if two cars on lane, same speed or handle collision
// TODO: make out of bound tiles pretty
// TODO: Replace generateCarData and generateTruckData with generateVehicleData.
//  Things that differ: num trucks, color representation, speeds?
// TODO: Need to make camera move to "forward" direction. If player
// gets caught up, game over. Delete unrendered tiles as you go (in player.ts).
// TODO: get rid of hardcoded values, make local constants.
// TODO: Car - Truck -> Vehicle.
// TODO: Sounds?
// TODO: Add ability to pause game => stop all car movement once the game is over.
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
