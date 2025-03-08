import { Scene } from "./components/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/Map";

export default function Game() {
  return (
    <Scene>
      <Player />
      <Map />
    </Scene>
  );
}
