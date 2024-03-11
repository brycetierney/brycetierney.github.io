// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cX = 0;
let cY = 0;
let cSpawn;
let cSpeed = 3;
let cRadius = 65;


let guyX = 0;
let guyY = 0;
let guySpeedX;
let guySpeedY;
let guyRadius = 35;


let state = "down";


function setup() {
  createCanvas(windowWidth, windowHeight);
  random(0, windowWidth);
}

function draw() {
  background(220);
  
  if (state === "down") {
    cY += cSpeed;
    if (cY - cSpeed === height || (cX - cSpeed === 0 || cX + cSpeed === width)) {
      state = "timeToExplode";

    }
  }
  if (state === "downRight") {
    cX += cSpeed/2;
    cY += cSpeed;
    if (cY - cSpeed === height || (cX - cSpeed === 0 || cX + cSpeed === width)) {
      state = "timeToExplode";

    }
  }
  if (state === "downLeft") {
    cX -= cSpeed/2;
    cY += cSpeed;
    if (cY - cSpeed === height || (cX - cSpeed === 0 || cX + cSpeed === width)) {
      state = "timeToExplode";

    }
  }

  function moveGuy(){
    if (cX + cSpeed/2 <= width) {
      cX += cSpeed;
      circle(cX, cY, cSpeed);
    }
  }
  if (state === "timeToExplode") {
    circle(0, 0, 0);
  }
  

  function guyCircle() {
    if (keyIsDown(87)) { //w
      cY -= guySpeedY;
    }
    if (keyIsDown(83)) { //s
      cY += guySpeedY;
    }
    if (keyIsDown(68)) { //d
      cX += guySpeedY;
    }
    if (keyIsDown(65)) { //a
      cX -= guySpeedY;
    }
    circle(guyX, guyY, guyRadius);
  }
  





  // circle(cx, cy, cRadius);
  // bowser(bx, by, bRadius);
}



circle(cX, cY, cRadius);
guyCircle();

// function everythingDown() {}

// function moveCamera() {
//   if (y >= hieght / 1.5) {
//     everythingDown();
//   }
// }
