// Global Constants
const computer = "computer";
const player = "player";
const tie = "tie";
const rock = "Rock";
const paper = "Paper";
const scissors = "Scissors";

// Global Variables
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

// DOM Elements
const mainInfo = document.getElementById('main-info');
const secInfo = document.getElementById('secondary-info');

const playerScoreElement = document.getElementById('player-score');
const playerImgElement = document.getElementById('player-img');
const computerScoreElement = document.getElementById('computer-score');
const computerImgElement = document.getElementById('computer-img');

const rockButton = document.getElementById('rock-btn');
rockButton.addEventListener('click', () => handleClick(rock));
const paperButton = document.getElementById('paper-btn');
paperButton.addEventListener('click', () => handleClick(paper));
const scissorsButton = document.getElementById('scissors-btn');
scissorsButton.addEventListener('click', () => handleClick(scissors));

// GAME LOGIC 
function handleClick(playerSelection){
    const computerSelection = getComputerWeapon();
    calculateRoundWinner(playerSelection, computerSelection);
    updateElements(playerSelection, computerSelection);
}

function getComputerWeapon() {
    const weapons = [paper, rock, scissors]
    return (weapons[Math.floor(Math.random() * 3)]);
}

function calculateRoundWinner(playerSelection, computerSelection) {
    // Check who the winner
    if (computerSelection === rock){
        if (playerSelection === rock){
            // Rock - Rock : Tie
            roundWinner = tie;

        }else if (playerSelection ===paper){
            // Rock - Paper : Player
            roundWinner = player;
            playerScore++;
        } else if (playerSelection === scissors) {
            // Rock - Scissors : Computer
            roundWinner = computer;
            computerScore++;
        }
    }else if (computerSelection === paper){
        if (playerSelection === rock){
            // Paper - Rock : Computer
            roundWinner = computer;
            computerScore++;

        }else if (playerSelection === paper){
            // Paper - paper : Tie
            roundWinner = tie;
    
        } else if (playerSelection === scissors) {
            // Paper - scissors : Player
            roundWinner = player;
            playerScore++;
        }

    } else if (computerSelection === scissors) {
        if (playerSelection === rock){
            // Scissors - Rock : Player
            roundWinner = player;
            playerScore++;

        }else if (playerSelection === paper){
            // Scissors - Paper : Computer
            roundWinner = computer;
            computerScore++;
        } else if (playerSelection === scissors){
            // Scissors - Scissors : Tie
            roundWinner = tie;
        }
    }
}

function updateElements(playerSelection, computerSelection){
    updateInfoSection(playerSelection, computerSelection);
    updateScoreSection(playerSelection, computerSelection);
}

function updateInfoSection(playerSelection, computerSelection) {
    if (roundWinner === tie) {
        mainInfo.textContent = "It is a Tie!";
        secInfo.textContent = `${playerSelection} ties with ${computerSelection}`;
    } else if (roundWinner === player) {
        mainInfo.textContent = "You won this round!";
        secInfo.textContent = `${playerSelection} beats ${computerSelection}`;
    }else if (roundWinner === computer){
        mainInfo.textContent = "You lost this round!";
        secInfo.textContent = `${playerSelection} is beaten by ${computerSelection}`;
    }
}

function updateScoreSection(playerSelection, computerSelection) {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    switch (playerSelection) {
        case rock:
            playerImgElement.src = "images/rock.jpg";
            break;
        case paper:
            playerImgElement.src = "images/paper.jpg";
            break;
        case scissors:
            playerImgElement.src = "images/scissors.jpg";
    }

    switch (computerSelection) {
        case rock:
            computerImgElement.src = "images/rock.jpg";
            break;
        case paper:
            computerImgElement.src = "images/paper.jpg";
            break;
        case scissors:
            computerImgElement.src = "images/scissors.jpg";
    }
}