let guyX;
let guyY;
let guySpeed = 10;
let guyRadius = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(guyX + guySpeed, guyY + guySpeed, guyRadius);
  moveBall();
}

function moveBall() {
  if (keyIsDown(LEFT_ARROW)) {
    guyX -= guySpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    guyX += guySpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    guyY += guySpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    guyY -= guySpeed;
  }
  // guyX = constrain(guyX, 0, width);
}