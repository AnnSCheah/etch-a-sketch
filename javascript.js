const div = document.querySelector(".container");
const divStyle = getComputedStyle(div); // * getComputedStyle gets the element's attributes.
let blocks;

// * Removes the 'px' and converts into an integer.
const divWidth = parseInt(divStyle.width.slice(0, -2));
const divHeight = parseInt(divStyle.height.slice(0, -2));

let gridSize = 16; // * Default grid size

const resize = document.querySelector(".resize");
resize.addEventListener("click", resizeGrid);

const reset = document.querySelector(".reset");
reset.addEventListener("click", clearGrid);

document.querySelector(".black-mode").disabled = true; // * Sets black mode as default

const blackMode = document.querySelector(".black-mode");
blackMode.addEventListener("click", modeSelect);

const colorMode = document.querySelector(".color-mode");
colorMode.addEventListener("click", modeSelect);

createGrid(gridSize);

function createGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${divWidth / size}px`;
    cell.style.height = `${divHeight / size}px`;
    cell.classList.add("cell");
    div.appendChild(cell);
  }

  blocks = document.querySelectorAll(".cell"); // * Selects all the cell div

  if (blackMode.disabled == false) {
    // * Color Mode
    blocks.forEach((block) => {
      block.addEventListener("mouseover", randomColorGen);
    });
  } else {
    // * Black Mode
    blocks.forEach((block) => {
      block.addEventListener("mouseover", () => {
        block.classList.add("hovering");
      });
    });
  }
}

function randomColorGen() {
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

    deleteGrid();

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

function deleteGrid() {
  const element = document.querySelectorAll(".cell");
  element.forEach((cell) => {
    cell.remove();
  });
}

function modeSelect() {
  if (this.className == "color-mode") {
    colorMode.disabled = true;
    blackMode.disabled = false;
    deleteGrid();
    createGrid(gridSize);
  } else {
    blackMode.disabled = true;
    colorMode.disabled = false;
    deleteGrid();
    createGrid(gridSize);
  }
}
