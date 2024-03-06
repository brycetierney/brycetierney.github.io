// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let canSpawn = random(0, 10);
let x = 0;
let y = 0;
let radius = 65;
let canSpeed = 3;
let state = "down";
let recentContact = 0;
let explodeWait = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  if (state === "down" || state === "downRight" || state === "downLeft") {
    y += canSpeed;
    if (y + radius === height || (x + radius === 0 || x + radius === width)) {
      state = "timeToExplode";
      y = height - radius;
    }
  }

  if (state === "timeToExplode") {
    if (millis() >= recentContact + explodeWait) {
      recentContact = millis();
    }
  }
  
  circle(x, y, radius);
}

// function everythingDown() {}

// function moveCamera() {
//   if (y >= hieght / 1.5) {
//     everythingDown();
//   }
// }
