import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X"
    );

    setGameTurns((prevTurns) => {
      // Not using activePlayer in order to not mix states.
      // But then, doesn't this mean that our gameTurns includes the current active player?
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        ></GameBoard>
      </div>
      <Log></Log>
    </main>
  );
}

export default App;
