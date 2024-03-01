// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
// let dx = 2;
// let dy = 2;
let mario;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function preload() {
  mario = loadImage("mario.png");
}
function moveToMouse() {
  if (mouseIsPressed) {
    image(mario, mouseX, mouseY);
  }
}

// function everythingDown() {}

// function moveCamera() {
//   if (y >= hieght / 1.5) {
//     everythingDown();
//   }
// }
