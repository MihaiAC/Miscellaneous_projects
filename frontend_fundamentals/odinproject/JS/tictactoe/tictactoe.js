const gameboard = (function () {
    winningConfigs = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    const newGrid = function () {
        return [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.']
        ];
    }

    let grid = newGrid();

    const startNewGame = function () {
        grid = newGrid();
    }

    const isWinner = (player) => {
        let symbol = player.symbol;

        for (let configIdx = 0; configIdx < winningConfigs.length; configIdx++) {
            let currentConfig = winningConfigs[configIdx];
            let isWinner = true;

            for (let [rowIdx, colIdx] of currentConfig) {
                if (grid[rowIdx][colIdx] !== symbol) {
                    isWinner = false;
                    break;
                }
            }

            if (isWinner) {
                console.log(configIdx);
                return true;
            }
        }

        return false;
    }

    const play = (player, rowIdx, colIdx) => {
        grid[rowIdx][colIdx] = player.symbol;
        return isWinner(player);
    }

    return { play, startNewGame };
})();

const game = (function () {

    function Player(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    // Initialise board (on page load, once).
    const htmlBoard = document.getElementById("tictactoe");
    let actionBtn = document.createElement("button");
    let rematchBtn = null;
    var boardButtons = [];
    let player1 = null;
    let player2 = null;
    let currentPlayer = null;
    let isGameFinished = false;
    let isGameStarted = false;
    let nElementsSet = 0;

    let dialog = document.getElementById("dialog");
    let p1Input = document.getElementById("player1");
    let p2Input = document.getElementById("player2");
    let submitNames = document.getElementById("js-close");
    submitNames.addEventListener("click", (e) => {
        e.preventDefault();
        player1 = new Player(p1Input.value, 'x');
        player2 = new Player(p2Input.value, "o");
        p1Input.value = '';
        p2Input.value = '';
        currentPlayer = player1;
        dialog.close();
    })

    const resetGame = function () {
        [player1, player2, currentPlayer] = [null, null, null];
        gameboard.startNewGame();
        boardButtons.forEach(btn => {
            btn.textContent = "";
        });
        isGameFinished = false;
        isGameStarted = false;
        nElementsSet = 0;

        // If rematch btn is shown, remove it.
        if (rematchBtn !== null && htmlBoard.contains(rematchBtn)) {
            htmlBoard.removeChild(rematchBtn);
            rematchBtn = null;
        }
    }

    const rematchGame = function () {
        gameboard.startNewGame();
        boardButtons.forEach(btn => {
            btn.textContent = "";
        });
        isGameFinished = false;
        isGameStarted = true;
        nElementsSet = 0;

        htmlBoard.removeChild(rematchBtn);
    }

    const startGame = function () {
        dialog.showModal();
    }

    const actionButtonPress = function () {
        if (!isGameStarted) {
            startGame();
            isGameStarted = true;
            actionBtn.textContent = "Reset";
        } else {
            resetGame();
            actionBtn.textContent = "Start";
        }
    }

    // Make valid move and return result.
    const makeMove = function (rowIdx, colIdx) {
        let result = gameboard.play(currentPlayer, rowIdx, colIdx);

        if (result) {
            isGameFinished = true;
            alert(`${currentPlayer.name} won!`);
        } else {
            nElementsSet += 1;
            if (nElementsSet === 9) {
                isGameFinished = true;
                alert("You tied!");
            }
        }

        if (isGameFinished) {
            rematchBtn = document.createElement("button");
            rematchBtn.textContent = "Rematch";
            rematchBtn.addEventListener("click", () => rematchGame());
            rematchBtn.classList.add("rematch-btn");
            htmlBoard.appendChild(rematchBtn);
        }
    }

    // Called only if move was valid.
    const swapPlayers = function () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        for (let colIdx = 0; colIdx < 3; colIdx++) {
            let newBtn = document.createElement('div');
            newBtn.classList.add(`cell`);
            newBtn.classList.add(`${rowIdx}${colIdx}`);
            newBtn.addEventListener('click', (e) => {
                if (newBtn.textContent.trim() === "" && (!isGameFinished) && isGameStarted) {
                    newBtn.textContent = currentPlayer.symbol;
                    makeMove(rowIdx, colIdx);
                    swapPlayers();
                }
            })
            boardButtons.push(newBtn);
            htmlBoard.appendChild(newBtn);
        }
    }


    actionBtn.textContent = "Start";
    actionBtn.addEventListener('click', () => actionButtonPress());
    actionBtn.classList.add("action-btn");
    htmlBoard.appendChild(actionBtn);
})();
