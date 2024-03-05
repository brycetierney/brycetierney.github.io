// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 0;
let y = 0;
let squareSize = 65;
let canSpeed = 3;
let state = "down";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  if (state === "down" || state === "downRight" || state === "downLeft") {
    y += canSpeed;
    if (y + squareSize === height || (x + squareSize === 0 || x + squareSize === width)) {
      state = "timeToExplode";
      y = height - squareSize;
    }
  }

  if (state === "timeToExplode") {
    x = 0;
    y = 0;
  }
  
  square(x, y, squareSize);
}

// function everythingDown() {}

// function moveCamera() {
//   if (y >= hieght / 1.5) {
//     everythingDown();
//   }
// }
