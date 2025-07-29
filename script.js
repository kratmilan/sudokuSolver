import { showTable, hideTable } from "./structure.js";
import {
  solveSudoku,
  solveSudokuAnimated,
  findEmptySquare,
  isSafeRow,
  isSafeCol,
  isSafeBox,
  isSafe,
} from "./solver.js";

const sudoku = {
  table: [],
  given: [],
};
let quickSolve = false;
let container = document.querySelector(".container");

function createTable(sudoku) {
  for (let i = 0; i < 9; i++) {
    let line = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let givenLine = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    sudoku.table.push(line);
    sudoku.given.push(givenLine);
  }
}

createTable(sudoku);

showTable(sudoku);

let solveButton = document.querySelector(".solve");
solveButton.addEventListener("click", async function () {
  solveButton.disabled = true;
  if (quickSolveCheckbox.checked) {
    await solveSudoku(sudoku.table);
  } else {
    solveSudokuAnimated(sudoku);
  }
  container.innerHTML = "";
  showTable(sudoku);
  solveButton.disabled = false;
});

let quickSolveCheckbox = document.querySelector("#quickSolve");
quickSolveCheckbox.addEventListener("change", function () {
  if (quickSolveCheckbox.checked) {
    // Enable quick solve mode
    console.log("Quick solve enabled");
  } else {
    // Disable quick solve mode
    console.log("Quick solve disabled");
  }
});

let exampleButton = document.querySelector(".example");
exampleButton.addEventListener("click", function () {
  fetch("https://sudoku-api.vercel.app/api/dosuku", { mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      // Support both old and new API formats
      let board;
      if (
        data.newboard &&
        data.newboard.grids &&
        data.newboard.grids[0] &&
        data.newboard.grids[0].value
      ) {
        board = data.newboard.grids[0].value;
      } else if (data.grids && data.grids.value) {
        board = data.grids.value;
      } else {
        throw new Error("Unknown board format");
      }
      // Copy board into table and update given
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          sudoku.table[i][j] = board[i][j];
          sudoku.given[i][j] = board[i][j] !== 0;
        }
      }
      container.innerHTML = "";
      showTable(sudoku);
    })
    .catch((error) => console.error("Error fetching example:", error));
});
