const div = document.querySelector(".container");
const divStyle = getComputedStyle(div); // * getComputedStyle gets the element's attributes.

// * Removes the 'px' and converts into an integer.
const divWidth = parseInt(divStyle.width.slice(0, -2));
const divHeight = parseInt(divStyle.height.slice(0, -2));

let gridSize = 16; // * Default grid size
createGrid(gridSize);

const resize = document.querySelector(".resize");
resize.addEventListener("click", resizeGrid);

const reset = document.querySelector(".reset");
reset.addEventListener("click", clearGrid);

function createGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${divWidth / size}px`;
    cell.style.height = `${divHeight / size}px`;
    cell.classList.add("cell");
    div.appendChild(cell);
  }

  // * Colors the cell black when mouse over.
  const blocks = document.querySelectorAll(".cell");

  // * Uncomment the code block below for rainbow cell
  // blocks.forEach((block) => {
  //   block.addEventListener("mouseover", colorGen);
  // });

  // * Uncomment the block below for black cell
  blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
      block.classList.add("hovering");
    });
  });
}

function colorGen() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function resizeGrid() {
  let newSize = prompt("Size? (Min: 4, Max: 50)");
  if (newSize == null) return;
  if (Number.isInteger(parseInt(newSize))) {
    if (newSize > 50 || newSize < 4) {
      alert("Invalid size");
      return;
    }

    // * Deletes all the cell grid before calling createGrid
    const element = document.querySelectorAll(".cell");
    element.forEach((cell) => {
      cell.remove();
    });

    createGrid(newSize);
  } else {
    alert("Input is not a number");
  }
}

function clearGrid() {
  const element = document.querySelectorAll(".cell");
  element.forEach((cell) => {
    cell.classList.remove("hovering");
    cell.style.removeProperty("background-color");
  });
}
