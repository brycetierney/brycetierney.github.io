// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x = 0;
let y = 0;
let squareSize = 65;
let speed = 7;
let state = "right";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  if (state === "right") {
    x += speed;
    if (x + squareSize >= width) {
      state = "down";
      x = width - squareSize;
    }
  }
  
  else if (state === "down") {
    y += speed;
    if (y + squareSize >= height) {
      state = "left";
      y = height - squareSize;
    }
  }
  
  else if (state === "left") {
    x -= speed;
    if (x <= 0) {
      state = "up";
      x = 0;
    }
  }
 
  else if (state === "up") {
    y -= speed;
    if (y <= 0) {
      state = "right";
      y = 0;
    }
  }
  
  square(x, y, squareSize);
}

// function everythingDown() {}

// function moveCamera() {
//   if (y >= hieght / 1.5) {
//     everythingDown();
//   }
// }
