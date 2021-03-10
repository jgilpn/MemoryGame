/*
Grid Class for Memory Game.
*/
class Grid {
  constructor(row, col, numTargets) {
    this.grid = document.querySelector(".game-grid");
    this.row = row;
    this.col = col;
    this.numTargets = numTargets;
    this.allTiles = [];
    this.dudTiles = [];
    this.targetTiles = [];

    this.createGrid();
    this.assignTargetTiles();
  }

  /*
  Dynamically create a Row Div
  */
  createRow() {
    const row = document.createElement("div");
    row.className = "row";
    return row;
  }

  /*
  Dynamically create the Tile Divs in a Row Div.
  */
  createTile(row, col) {
    const tile = document.createElement("div");
    tile.id = `${row}-${col}`;
    tile.className = "game-tile";
    return tile;
  }

  /*
  Dynamically populate the Game Grid Div with Row and Tile Divs.
  */
  createGrid() {
    let numTiles = 0;
    // Delete previous Game Grid contents.
    this.grid.innerHTML = "";

    // Create all Rows
    for (let i = 1; i <= this.row; i++) {
      const row = this.createRow();

      // Create Tiles per Row
      for (let j = 1; j <= this.col; j++) {
        const tile = this.createTile(i, j);

        this.allTiles[numTiles] = tile;
        this.dudTiles[numTiles++] = tile;
        row.appendChild(tile); // attach tile to parent row
      }
      this.grid.appendChild(row);
    }
    return this.grid;
  }

  /*
  Determine if specific tile is a target.
  */
  isTarget(tile) {
    let result = false;
    this.targetTiles.forEach((target) => {
      if (target.id === tile.id) {
        result = true;
      }
    });
    return result;
  }

  /*
  Randomly assign a number of target tiles on the grid.
  */
  assignTargetTiles() {
    for (let i = 0; i < this.numTargets; i++) {
      let target = this.dudTiles[
        Math.floor(Math.random() * this.dudTiles.length)
      ];
      this.targetTiles[i] = target;
      this.dudTiles = this.dudTiles.filter((tile) => tile !== target);
    }
  }

  /*
  Change all target tiles to green (Revealed).
  */
  showTargets() {
    this.colorTiles(this.targetTiles, "#23A587");
  }

  /*
  Change all target tiles to dark blue (Hidden).
  */
  hideTargets() {
    this.colorTiles(this.targetTiles, "#3D4F5C");
  }

  /*
  Change the specified tiles to a specific color.
  */
  colorTiles(tiles, color) {
    tiles.forEach((tile) => {
      tile.style.backgroundColor = color;
    });
  }

  /*
  Rotate this Game Grid by a specific degree.
  */
  rotateGrid(deg) {
    this.grid.style.webkitTransform = "rotate(" + deg + "deg)";
    this.grid.style.mozTransform = "rotate(" + deg + "deg)";
    this.grid.style.msTransform = "rotate(" + deg + "deg)";
    this.grid.style.oTransform = "rotate(" + deg + "deg)";
    this.grid.style.transform = "rotate(" + deg + "deg)";
  }
}
