const containerElem = document.querySelector(".container");
const resetBtn = document.querySelector("button");
resetBtn.addEventListener("click", recordInputAndGenerateGrid);

function resetGrid() {
    while (containerElem.firstChild) {
        containerElem.removeChild(containerElem.firstChild);
    }
}

function colorOnHover(e) {
    e.target.style.backgroundColor = 'chocolate';
}

function colorOnLeave(e) {
    e.target.style.backgroundColor = 'gray';
}

function generateGrid(gridSize) {
    resetGrid();
    for (let ii = 0; ii < gridSize; ii++) {
        let currRow = document.createElement("div");
        currRow.classList.add("row");
        for (let jj = 0; jj < gridSize; jj++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("mouseenter", colorOnHover);
            //cell.addEventListener("mouseleave", colorOnLeave);
            currRow.appendChild(cell);
        }
        containerElem.appendChild(currRow);
    }
}

function recordInputAndGenerateGrid(event) {
    let input_number = prompt("Enter grid size.");
    if (!isNaN(input_number) && input_number.trim() !== "") {
        let gridSize = Number.parseInt(input_number);
        if (gridSize > 0 && gridSize <= 100) {
            generateGrid(gridSize);
        }
    }
}

generateGrid(16);