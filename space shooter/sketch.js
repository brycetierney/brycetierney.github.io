// Arrays and Object Notation Assignment
// Bryce Tierney
// April 8th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cx;
let cy;
let radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  spawnShooter();
}
function spawnShooter() {
  cx = width/2;
  cy = height - radius;
  radius = 60;

  circle(cx, cy, radius);
  constrain(circle(width - radius, height - radius));
}

function keyPressed() {
  if (keyIsPressed === "w") {
    cx -= 10;
  }
}