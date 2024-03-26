// Arrays and Object Notation Assignment
// Bryce Tierney
// April 8th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let radius = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function spawnShooter() {
  circle(width/2, height - radius, radius);
}


function draw() {
  background(220);
  spawnShooter();
}
