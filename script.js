let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let wonStatus = false;

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2],
];

(function () {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
  restartBtn.addEventListener('click', restartGame);
}())

function boxClicked(e) {
  const id = e.target.id;
  if(!wonStatus && !spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if(playerHasWon() !== false ) {
      playerText.innerText = `Player ${currentPlayer} has won!`;
      let winningBlocks = playerHasWon();
      winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      wonStatus = true;
      return;
    }
    currentPlayer = (currentPlayer == X_TEXT) ? O_TEXT : X_TEXT;
  }
}

function playerHasWon () {
  for (const condition of winningCombos) {
    let [a,b,c] = condition;
    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a,b,c];
    }
  }
  return false;
}

function restartGame(e) {
  // Restart the game.
  if(spaces.includes('X') || spaces.includes('O')) {
    spaces.fill(null);
    boxes.forEach(box => {
      box.innerText = '';
      box.style.backgroundColor = '';
    })
    playerText.innerText = 'Tic Tac Toe Game';
    currentPlayer = X_TEXT;
    wonStatus = false;
  }
}
