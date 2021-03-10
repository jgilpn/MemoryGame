// Constants
const INIT_ROWS = 3;
const INIT_COLS = 3;

// Game Variables

let numRows = 3;
let numCols = 3;
let numTargets = 3;
let gameGrid = new Grid(numRows, numCols, numTargets);
let numTries = 0;
let numCorrect = 0;
let score = 0;
let deg = 0;
let canClick = false;

// Functions

/* 
Play audio
*/
function playAudio(audioID) {
  let audio = document.getElementById(audioID);
  audio.play();
}

/* 
Show the target tiles for one second before hiding it again.
*/
function showTargets() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gameGrid.showTargets();
      setTimeout(() => {
        gameGrid.hideTargets();
        resolve();
      }, 1500);
    }, 1000);
  });
}

/*
Tile Click Handler.
*/
function tileClicked(e) {
  // Prevent tile click until turned on
  if (!canClick) return;
  canClick = false;
  let tile = e.target;
  numTries++;

  // CORRECT tile clicked
  if (gameGrid.isTarget(tile)) {
    numCorrect++;
    score++;
    colorTile(tile, "#23A587");
    gameGrid.targetTiles = gameGrid.targetTiles.filter((target) => {
      return target != tile;
    });
    // CORRECT LAST tile clicked
    if (numCorrect === numTargets) {
      playAudio("ding");
      colorTile(tile, "#82E5BB");
      tile.innerHTML = "⦿";
      tile.style.color = "#3D4F5C";
    }
  }
  // INCORRECT tile clicked
  else {
    score--;
    colorTile(tile, "#EC3935");
  }

  // Update score after click
  tile.removeEventListener("click", tileClicked);
  updateScore();
  canClick = true;

  // END ROUND
  if (numTries === numTargets) {
    canClick = false;
    // reveal any missed tiles briefly
    revealRemaining();

    if (numTries === numCorrect) {
      // Progress to next level
      playAudio("levelup");
      nextLevel();
      setTimeout(startRound, 1000);
    } else {
      // Regress to previous level
      playAudio("wrong");
      prevLevel();
      setTimeout(startRound, 2000);
    }
  }
}

/*
Highlight remaining target tiles.
*/
function revealRemaining() {
  gameGrid.targetTiles.forEach((target) => {
    colorTile(target, "#82E5BB");
  });
}

/*
Increment Grid Dimensions.
*/
function nextLevel() {
  if (numRows === numCols) {
    numRows++;
  } else {
    numCols++;
  }
  numTargets++;
}

/*
Decrement Grid Dimensions.
*/
function prevLevel() {
  if (numRows === INIT_ROWS && numCols === INIT_COLS) return;
  if (numRows === numCols) {
    numCols--;
  } else {
    numRows--;
  }
  numTargets--;
}

/*
Add the Tile Click handler to all tiles.
*/
function addListeners() {
  gameGrid.allTiles.forEach((tile) => {
    tile.addEventListener("click", tileClicked);
  });
}

/*
Update the Score Display.
*/
function updateScore() {
  let scoreContainer = document.querySelector("#score");
  scoreContainer.innerHTML = ` ${score}`;
  if (score <= 0) {
    setTimeout(gameOver, 100);
  }
}

/*
Color one tile a specific color.
*/
function colorTile(tile, color) {
  tile.style.backgroundColor = color;
}

/*
Rotate the game grid 90 degrees in a random direction.
*/
function rotateGrid() {
  const isClockwise = Math.random() >= 0.5;
  deg += isClockwise ? 90 : -90;
  gameGrid.rotateGrid(deg);
}

/*
End the game loop and send user to the Summary page.
*/
function gameOver() {
  alert(GAME_OVER_MESSAGE);
  score = 0;
  location.href = `./summary.html?score=${score}`;
}

/*
Send user to Summary page with current score.
*/
function terminateGame() {
  if (confirm(TERMINATE_MESSAGE)) {
    location.href = `./summary.html?score=${score}`;
  }
}

/*
Game Loop
*/
async function startRound() {
  numCorrect = 0;
  numTries = 0;
  gameGrid = new Grid(numRows, numCols, numTargets);
  addListeners();
  await showTargets();
  rotateGrid();
  canClick = true;
}

/*
Populate String Constants
*/
function populateStringConstants() {
  const docTitle = document.getElementById("doc-title");
  const gameTitle = document.getElementById("game-title");
  const score = document.getElementById("score-tag");
  const terminate = document.getElementById("terminate");

  docTitle.innerHTML = GAME_TITLE;
  gameTitle.innerHTML = GAME_TITLE;
  score.innerHTML = SCORE_TAG;
  terminate.innerHTML = TERMINATE_BUTTON;
}

populateStringConstants();
startRound();
