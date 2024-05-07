// Snake Game
// Bryce Tierney
// May 6, 2024


// Defining variables
let GRID_SIZE;
let CELL_SIZE;
let grid;
let snake;
let food;
let direction;
let gameState = "home";

// Setup function to initialize the game
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(9);

  // Calculate grid and cell size based on canvas dimensions
  GRID_SIZE = floor(height / 45);
  CELL_SIZE = floor(height / GRID_SIZE);

  // Initialize the grid
  grid = drawGrid();

  // Initialize snake, food and direction
  snake = [];
  food = createVector();
  direction = createVector();
}

// Calling and initializing funcitons depending on what the gamegameState is
function draw() {
  background(255);

  if (gameState === "home") {
    drawHomeScreen();
  }
  else if (gameState === "normal" || gameState === "easy") {
    moveSnake();
    drawSnake();
    checkCollisions();
    drawFood();
    drawGrid();
  }
}

// Drawing the home screen and giving options for which game mode to play
function drawHomeScreen() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Snake Game", width / 2, height / 4);
  textSize(20);
  text("Press 1 for Normal Mode", width / 2, height / 2);
  text("Press 2 for Easy Mode", width / 2, height / 2 + 40);
}

// Checking if the gameState is the home screen and changing gameState to either normal or easy mode, then initializing the game
function keyPressed() {
  if (gameState === "home") {
    if (key === "1") {
      gameState = "normal";
      displayGame();
    }
    else if (key === "2") {
      gameState = "easy";
      displayGame();
    }
  }

  // Checking your current direction and deciding if you can move that way
  else if (keyCode === UP_ARROW && direction.y === 0) {
    direction = createVector(0, -1);
  }
  else if (keyCode === DOWN_ARROW && direction.y === 0) {
    direction = createVector(0, 1);
  }
  else if (keyCode === LEFT_ARROW && direction.x === 0) {
    direction = createVector(-1, 0);
  }
  else if (keyCode === RIGHT_ARROW && direction.x === 0) {
    direction = createVector(1, 0);
  }
}

// Initialize the game
function displayGame() {
  snake = [{ x: 10, y: 10 }];

  // Call the food
  spawnFood();

  // Spawn the initial snake (standing still)
  direction = createVector(0, 0);
}

// Draw the grid with the desired dimensions
function drawGrid() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      stroke(0);
      noFill();
      square(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE);
    }
  }
}

// Draw the snake and making the head a lighter green than the rest of the body
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) { // The index value 0 indicates the head of the snake, therefore make it light green
      fill(0, 255, 0);
    }
    else { // Rest of the body will be a darker green
      fill(0, 155, 0);
    }
    // Constantly re drawing the snake at the new coordinates based on the index value of i
    square(snake[i].x * CELL_SIZE, snake[i].y * CELL_SIZE, CELL_SIZE);
  }
}

// Draw the food and make it red
function drawFood() {
  fill(255, 0, 0);
  square(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE);
}

// Allowing food to be able to spawn at a random location (excluding where the snake currently is)
function spawnFood() {
  let validSpawns = [];

  // Look through each cell on the grid to check if it is occupied and if not, consider it a spawnable location (validSPawns)
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let isOccupied = false;
      // If the current cell is occupied by the snake, end the funciton.
      for (let k = 0; k < snake.length; k++) {
        if (snake[k].x === i && snake[k].y === j) {
          isOccupied = true;
          break;
        }
      }
      // If the cell is not occupied, add it's location to the validSpawns array
      if (!isOccupied) {
        validSpawns.push({ x: i, y: j });
      }
    }
  }

  // Choose a random position from the validSpawns array for food to spawn
  let randomIndex = floor(random(validSpawns.length));
  food = createVector(validSpawns[randomIndex].x, validSpawns[randomIndex].y);
}

// Function to move snake
function moveSnake() {
  let head = createVector(snake[0].x, snake[0].y);
  head.add(direction); // Moving in correct direction
  snake.unshift(head); // Adding head to the beggining of the snake array, moving it forward
  if (!head.equals(food)) { // If the head's location didnt just match the food's, get rid of the tail giving it the moving effect
    snake.pop();
  }
  else { // This means that the food was just eaten, and the tail will essentially gain 1 length by not popping it
    spawnFood();
  }
}

// Function to check for collisions and to end the game if there are any
function checkCollisions() {
  let head = snake[0];
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    if (gameState !== "easy") {
      gameOver();
    }
    else {
      // Wrap around to the opposite side if in easy mode
      if (head.x < 0) {
        head.x = GRID_SIZE - 1;
      }
      else if (head.x >= GRID_SIZE) {
        head.x = 0;
      }
      if (head.y < 0) {
        head.y = GRID_SIZE - 1;
      }
      else if (head.y >= GRID_SIZE) {
        head.y = 0;
      }
    }
  }

  if (gameState !== "easy") {
    for (let i = 1; i < snake.length; i++) {
      if (head.equals(snake[i])) { // This means the snake collided with itself and game over
        gameOver();
      }
    }
  }
}

// Function to put you back to the home screen after you die
function gameOver() {
  gameState = "home";
}