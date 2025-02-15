console.log("Linked file");

RPS = ["Rock", "Paper", "Scissors"];
humanScore = 0;
computerScore = 0;

const humanScoreElement = document.querySelector(".playerScore");
const computerScoreElement = document.querySelector(".computerScore");

const buttons_element = document.querySelector(".buttons");
buttons_element.addEventListener('click', (event) => {
    let target = event.target;
    switch (target.id) {
        case 'btnRock':
            playRound(RPS[0]);
            break;
        case 'btnPaper':
            playRound(RPS[1]);
            break;
        case 'btnScissors':
            playRound(RPS[2]);
            break;
    }
})

function getComputerChoice() {
    choice = Math.random()
    console.log(choice)
    if (choice < 1 / 3) {
        return RPS[0];
    }
    else if (choice < 2 / 3) {
        return RPS[1];
    }
    return RPS[2];
}

function getHumanChoice() {
    let human_choice = prompt("Input Rock | Paper | Scissors")
    if (RPS.includes(human_choice)) {
        return human_choice;
    } else {
        alert("Input discarded, refresh the page.")
    }
}

function calculateRoundWinner(humanChoice, computerChoice) {
    if ((humanChoice === RPS[0] && computerChoice === RPS[2]) ||
        (humanChoice === RPS[1] && computerChoice === RPS[0]) ||
        (humanChoice === RPS[2] && computerChoice === RPS[1])) {
        alert("You won this round!");
        humanScore++;
    } else if (humanChoice === computerChoice) {
        alert("You tied this round!");
    } else {
        alert("You lost this round!");
        computerScore++;
    }
}

function playRound(humanChoice) {
    let computerChoice = getComputerChoice();
    calculateRoundWinner(humanChoice, computerChoice);

    if (humanScore === 5 || computerScore === 5) {
        if (humanScore > computerScore) {
            alert("You won!");
        } else if (humanScore === computerScore) {
            alert("You tied!");
        } else {
            alert("You lost!");
        }
        humanScore = 0;
        computerScore = 0;
    }

    // Update score display.
    computerScoreElement.textContent = String(computerScore);
    humanScoreElement.textContent = String(humanScore);
}
