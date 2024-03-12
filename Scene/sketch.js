// Underdeveloped dodge the projectiles game
// Bryce Tierney
// March 11th, 2024
//
// Extra for Experts:
// The overall game is very underdeveloped and I was very surprised on how hard it was to make some of these things. If I were to look at this I would not think that this would be nearly as hard as it was. The most challanging parts were trying to figure out colision detection as it was very time consuming trying to find a way to code it so that I could  understand what was happening. I also couldnt figure out how to get balls to spawn in periodically so it's kind of like a wave of them every few seconds. I used the "constrain" function to make sure my guy circle wouldnt be able to go outside of the screen.

// Defining the x and y coordinates of the circles (c) that will fall from above as well as the speed in which they fall and the radius
let cX1, cY1, cSpeed1, cRadius1;
let cX2, cY2, cSpeed2, cRadius2;
let cX3, cY3, cSpeed3, cRadius3;
let cX4, cY4, cSpeed4, cRadius4;
let cX5, cY5, cSpeed5, cRadius5;

// Doing the exact same thing as above, however now it is for the circle that you move (guy) to dodge the other circles.
let guyX;
let guyY;
let guySpeed = 10;
let guyRadius = 40;

// Changing initial game state to the start screen ("start")
let gameState = "start";

// Spawning in my 5 balls that fall from the sky
function setup() {
  createCanvas(windowWidth, windowHeight);
  moveBall1();
  moveBall2();
  moveBall3();
  moveBall4();
  moveBall5();
  guyX = width / 2;
  guyY = height - 50;
}

function draw() {
  background(220);
  // Checking what the state is in order to display the proper screen
  if (gameState === "start") {
    startScreen();
  }
  else if (gameState === "playing") {
    moveBalls();
    drawBalls();
    moveGuy();
    drawGuy();
    checkCollision();
  }
  else if (gameState === "gameOver") {
    showGameOver();
  }
}
// Displaying start screen
function startScreen() {
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Press anywhere to start!", width / 2, height / 2);
}
// Starting the game after pressing mouse
function mousePressed() {
  if (gameState === "start") {
    gameState = "playing";
  }
}
// (moveBall 1-5) spawning in a ball randomly along the x axis and assigning random speeds and sizes
function moveBall1() {
  cX1 = random(width);
  cY1 = 0;
  cSpeed1 = random(8, 25);
  cRadius1 = random(24, 75);
}

function moveBall2() {
  cX2 = random(width);
  cY2 = 0;
  cSpeed2 = random(10, 15);
  cRadius2 = random(30, 45);
}

function moveBall3() {
  cX3 = random(width);
  cY3 = 0;
  cSpeed3 = random(10, 20);
  cRadius3 = random(30, 60);
}

function moveBall4() {
  cX4 = random(width);
  cY4 = 0;
  cSpeed4 = random(3, 10);
  cRadius4 = random(9, 30);
}

function moveBall5() {
  cX5 = random(width);
  cY5 = 0;
  cSpeed5 = random(10, 20);
  cRadius5 = random(30, 60);
}

// Pretty much just saying once the ball goes off the screen to redraw it up top by calling the function again
function moveBalls() {
  if (cY1 > height + cRadius1) {
    moveBall1();
  }
  else if (cY2 > height + cRadius2) {
    moveBall2();
  }
  else if (cY3 > height + cRadius3) {
    moveBall3();
  }
  else if (cY4 > height + cRadius4) {
    moveBall4();
  }
  else if (cY5 > height + cRadius5) {
    moveBall5();
  }
  cY1 += cSpeed1;
  cY2 += cSpeed2;
  cY3 += cSpeed3;
  cY4 += cSpeed4;
  cY5 += cSpeed5;
}

// Drawing the balls again
function drawBalls() {
  circle(cX1, cY1, cRadius1 * 2);
  circle(cX2, cY2, cRadius2 * 2);
  circle(cX3, cY3, cRadius3 * 2);
  circle(cX4, cY4, cRadius4 * 2);
  circle(cX5, cY5, cRadius5 * 2);
}

// Making the movement for the guy (circle), as well as limiting him to within the screen
function moveGuy() {
  if (keyIsDown(LEFT_ARROW)) {
    guyX -= guySpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    guyX += guySpeed;
  }
  guyX = constrain(guyX, 0, width);
}

function drawGuy() {
  circle(guyX, guyY, guyRadius * 2);
}

// Allowing d 1-5 to equal the measurments between the distance between 2 points, (the x, y value of the respective circle falling from the sky, and the guy (circle) that you control and move around), and if they collide it will display the game over screen
function checkCollision() {
  let d1 = dist(cX1, cY1, guyX, guyY);
  let d2 = dist(cX2, cY2, guyX, guyY);
  let d3 = dist(cX3, cY3, guyX, guyY);
  let d4 = dist(cX4, cY4, guyX, guyY);
  let d5 = dist(cX5, cY5, guyX, guyY);

  if (d1 < cRadius1 + guyRadius || d2 < cRadius2 + guyRadius || d3 < cRadius3 + guyRadius || d4 < cRadius4 + guyRadius || d5 < cRadius5 + guyRadius) {
    gameState = "gameOver";
  }
}
// Defining function for the game over screen
function showGameOver() {
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  text("Press anywhere to play again", width / 2, height / 2 + 45);
}
// Saying that if you click the screen it will restart the game by changing the state from game over screen to the playing screen
function mouseClicked() {
  if (gameState === "gameOver") {
    moveBall1();
    moveBall2();
    moveBall3();
    moveBall4();
    moveBall5();
    gameState = "playing";
  }
}