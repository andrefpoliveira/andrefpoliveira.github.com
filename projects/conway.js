var rows = 35;
var cols = 112;

let started = false;
let timer;
let evolutionSpeed = 200;

let currGen = [rows];
let nextGen = [rows];

function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}

function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createWorld() {
    let world = document.querySelector("#world");
    let tbl = document.createElement("table");
    tbl.setAttribute("id", "worldgrid");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td")
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.addEventListener("click", cellClick)

            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);

    if (this.className === "alive") {
        this.setAttribute("class", "dead");
        currGen[row][col] = 0;
    } else {
        this.setAttribute("class", "alive");
        currGen[row][col] = 1;
    }
}

function getNeighborCount(row, col) {
    var count = 0;
    var nRow = Number(row);
    var nCol = Number(col)

    // Top
    if (nRow - 1 > 0) {
        if (currGen[nRow-1][nCol] == 1) count++;
    }

    // Top Left
    if (nRow - 1 > 0 && nCol - 1 > 0) {
        if (currGen[nRow-1][nCol-1] == 1) count++;
    }

    // Top Right
    if (nRow - 1 > 0 && nCol + 1 < cols) {
        if (currGen[nRow-1][nCol+1] == 1) count++;
    }

    // Left
    if (nCol - 1 > 0) {
        if (currGen[nRow][nCol-1] == 1) count++;
    }

    // Right
    if (nCol + 1 < cols) {
        if (currGen[nRow][nCol+1] == 1) count++;
    }

    // Bottom
    if (nRow + 1 < rows) {
        if (currGen[nRow+1][nCol] == 1) count++;
    }

    // Bottom Left
    if (nRow + 1 < rows && nCol - 1 > 0) {
        if (currGen[nRow+1][nCol-1] == 1) count++;
    }

    // Bottom Right
    if (nRow + 1 < rows && nCol + 1 < cols) {
        if (currGen[nRow+1][nCol+1] == 1) count++;
    }

    return count;
}

function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            let count = getNeighborCount(row, col)

            if (currGen[row][col] == 1) {
                if (count < 2) {
                    nextGen[row][col] = 0;
                } else if (count > 3) {
                    nextGen[row][col] = 0;
                } else if (count == 2 || count == 3) {
                    nextGen[row][col] = 1;
                }
            } else {
                if (count == 3) {
                    nextGen[row][col] = 1;
                }
            }
        }
    }
}

function updateCurrGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = 0;
        }
    }
}

function updateWorld() {
    for (row in currGen) {
        for (col in currGen[row]) {
            cell = document.getElementById(row + "_" + col);
            if (currGen[row][col] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "alive");
            }
        }
    }
}

function startStopEvo() {
    let startstop = document.getElementById("startstopbtn");

    if (!started) {
        started = true;
        startstop.value='Stop Reproducing';
        evolve();
      
    } else {
        started = false;
        startstop.value='Start Reproducing';
        clearTimeout(timer); 
    }
}

function evolve() {
    createNextGen();
    updateCurrGen();
    updateWorld();

    if (started) {
        timer = setTimeout(evolve, evolutionSpeed);
    }
}

function resetEvo() {
    location.reload();
}

window.onload=()=> {
    createWorld();
    createGenArrays();
    initGenArrays();
}