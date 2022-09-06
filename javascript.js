const div = document.querySelector(".container");

// * Adding the 16x16 grid divs
for (let i = 0; i < 16 * 16; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  div.appendChild(cell);
}

// * Colors the cell black when mouse over.
const blocks = document.querySelectorAll(".cell");
blocks.forEach((block) => {
  block.addEventListener("mouseover", () => {
    block.classList.add("hovering");
  });
});

const resize = document.querySelector(".resize");
resize.addEventListener("click", resizeGrid);

function resizeGrid() {}
