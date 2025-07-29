// this file contains the DOM manipulation code for the sudoku game solver

function hideTable() {
  let container = document.querySelector(".container");
  let grid = document.querySelector(".grid");
  container.removeChild(grid);
}

function showTable(sudoku) {
  let container = document.querySelector(".container");
  let grid = document.createElement("div");
  grid.classList.add("grid");
  container.appendChild(grid);
  for (let i = 0; i < 9; i++) {
    let line = document.createElement("div");
    line.classList.add("line");
    grid.appendChild(line);
    for (let j = 0; j < 9; j++) {
      let input = document.createElement("input");
      input.placeholder = sudoku.table[i][j] === 0 ? "" : sudoku.table[i][j];
      input.classList.add("numberInput");
      if (sudoku.given[i][j]) {
        input.classList.add("given");
        input.readOnly = true;
      }
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.value = sudoku.table[i][j] === 0 ? "" : sudoku.table[i][j];
      input.addEventListener("change", function () {
        const val = parseInt(input.value);
        sudoku.table[i][j] = isNaN(val) ? 0 : val;
        sudoku.given[i][j] = false; // User input is not a given anymore
      });
      line.appendChild(input);
    }
  }
}

export { hideTable, showTable };
