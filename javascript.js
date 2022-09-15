const div = document.querySelector(".container");
const divStyle = getComputedStyle(div); // * getComputedStyle gets the element's attributes.
let blocks;

// * Removes the 'px' and converts into an integer.
const divWidth = parseInt(divStyle.width.slice(0, -2));
const divHeight = parseInt(divStyle.height.slice(0, -2));

let gridSize = 16; // * Default grid size

document.querySelector(".black-mode").disabled = true; // * Sets black mode as default

const resize = document.querySelector(".resize");
resize.addEventListener("click", resizeGrid);

const reset = document.querySelector(".reset");
reset.addEventListener("click", clearGrid);

const blackMode = document.querySelector(".black-mode");
blackMode.addEventListener("click", modeSelect);

const colorMode = document.querySelector(".color-mode");
colorMode.addEventListener("click", modeSelect);

const shadeMode = document.querySelector(".shade-mode");
shadeMode.addEventListener("click", modeSelect);

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

  if (colorMode.disabled == true) {
    // * Color Mode
    blocks.forEach((block) => {
      block.addEventListener("mouseover", randomColorGen);
    });
  } else if (blackMode.disabled == true) {
    // * Black Mode
    blocks.forEach((block) => {
      block.addEventListener("mouseover", () => {
        block.classList.add("hovering");
      });
    });
  } else if (shadeMode.disabled == true) {
    // * Shade Mode
    blocks.forEach((block) => {
      block.addEventListener("mouseover", shadeBlack);
    });
  }
}

function randomColorGen() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function shadeBlack() {
  // * Checks if the backgroundColor "rgba" attribute exist, if (cont)
  // * not a default backgroundColor of opacity 0.1 is set
  if (this.style.backgroundColor.match(/rgba/)) {
    let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
    if (currentOpacity <= 0.9) {
      this.style.backgroundColor = `rgba(0,0,0,${currentOpacity + 0.1})`;
    }
  } else if (this.style.backgroundColor == "rgb(0, 0, 0)") {
    return; // * Stops the function once opacity is 1
  } else {
    this.style.backgroundColor = "rgba(0,0,0,0.1)";
  }
}

function resizeGrid() {
  let newSize = prompt("Size? (Min: 4, Max: 50)");
  if (newSize == null) return;
  if (Number.isInteger(parseInt(newSize))) {
    if (newSize > 50 || newSize < 4) {
      alert("Invalid size");
      return;
    }

    gridSize = newSize;

    deleteGrid();
    createGrid(gridSize);
  } else {
    alert("Input is not a number");
  }
}

function clearGrid() {
  const element = document.querySelectorAll(".cell");
  element.forEach((cell) => {
    cell.style.transition = "0.3s";
    cell.classList.remove("hovering");
    cell.style.removeProperty("background-color");
  });

  // * Runs the function after 1000ms (1 second)
  setTimeout(function () {
    deleteGrid();
    createGrid(gridSize);
  }, 300);
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
    shadeMode.disabled = false;
    deleteGrid();
    createGrid(gridSize);
  } else if (this.className == "black-mode") {
    blackMode.disabled = true;
    colorMode.disabled = false;
    shadeMode.disabled = false;
    deleteGrid();
    createGrid(gridSize);
  } else if (this.className == "shade-mode") {
    shadeMode.disabled = true;
    colorMode.disabled = false;
    blackMode.disabled = false;
    deleteGrid();
    createGrid(gridSize);
  }
}
