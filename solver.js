//this file contains the logic for solving the sudoku puzzle
import { showTable } from "./structure.js";

function findEmptySquare(table) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (table[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [true, true];
}
function isSafeRow(number, rowIndex, table) {
  return !table[rowIndex].some((cell) => parseInt(cell) === number);
}
function isSafeCol(number, colIndex, table) {
  for (let i = 0; i < 9; i++) {
    if (parseInt(table[i][colIndex]) === number) {
      return false;
    }
  }
  return true;
}

function isSafeBox(number, rowIndex, colIndex, table) {
  let boxRowStart = Math.floor(rowIndex / 3) * 3;
  let boxColStart = Math.floor(colIndex / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (parseInt(table[boxRowStart + i][boxColStart + j]) === number) {
        return false;
      }
    }
  }
  return true;
}

function isSafe(number, row, col, table) {
  if (
    isSafeRow(number, row, table) &&
    isSafeCol(number, col, table) &&
    isSafeBox(number, row, col, table)
  ) {
    return true;
  } else return false;
}

function solveSudoku(table) {
  let [row, col] = findEmptySquare(table);
  if (row === true && col === true) return true;
  for (let num = 1; num <= 9; num++) {
    if (isSafe(num, row, col, table)) {
      table[row][col] = num;

      if (solveSudoku(table)) {
        return true;
      }
      table[row][col] = 0; // Reset the square if no solution found
    }
  }
  return false;
}

async function solveSudokuAnimated(sudoku) {
  let container = document.querySelector(".container");
  let [row, col] = findEmptySquare(sudoku.table);
  if (row === true && col === true) return true;
  for (let num = 1; num <= 9; num++) {
    if (isSafe(num, row, col, sudoku.table)) {
      sudoku.table[row][col] = num;
      container.innerHTML = "";
      showTable(sudoku);
      await new Promise((resolve) => setTimeout(resolve, 20)); // 20ms delay for animation

      if (await solveSudokuAnimated(sudoku)) {
        return true;
      }
      sudoku.table[row][col] = 0; // Reset the square if no solution found
      container.innerHTML = "";
      showTable(sudoku);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }
  return false;
}
export {
  solveSudoku,
  solveSudokuAnimated,
  findEmptySquare,
  isSafeRow,
  isSafeCol,
  isSafeBox,
  isSafe,
};
