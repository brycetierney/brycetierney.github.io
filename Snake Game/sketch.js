// Snake Game
// Bryce Tierney
// May 6, 2024

// Defining variables
let grid;
let snake;
let food;
let direction;
let state = "home";

// Setup function to initialize the game
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(9);

  // Calculate grid and cell size based on canvas dimensions
  GRID_SIZE = floor(width / 25);
  CELL_SIZE = floor(width / GRID_SIZE);


  // Initialize the grid
  grid = drawGrid();
}

// Initializing different funcitons depending on what the state is
function draw() {
  background(255);

  if (state === "home") {
    drawHomeScreen();
  } else {
    // Calling funcitons move, draw and check collisions
    moveSnake();
    drawSnake();
    checkCollisions();

    // Draw the grid and food
    drawGrid();
    drawFood();

    // Display messages if on god mode
    if (state === "god") {
      drawGodModeMessage();
    }
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
  text("Press 2 for God Mode", width / 2, height / 2 + 40);
}

// Checking if the state is the home screen and changing state to either normal or god then initializing the game
function keyPressed() {
  if (state === "home") {
    if (key === "1") {
      state = "normal";
      displayGame();
    } else if (key === "2") {
      state = "god";
      displayGame();
    }
  }

  // Checking your current direction and deciding if you can move that way
  else if (keyCode === UP_ARROW && direction.y === 0) {
    direction = createVector(0, -1);
  } else if (keyCode === DOWN_ARROW && direction.y === 0) {
    direction = createVector(0, 1);
  } else if (keyCode === LEFT_ARROW && direction.x === 0) {
    direction = createVector(-1, 0);
  } else if (keyCode === RIGHT_ARROW && direction.x === 0) {
    direction = createVector(1, 0);
  }
}

// Function to initialize the game
function displayGame() {
  snake = [{ x: 10, y: 10 }];

  // Initialize the food
  spawnFood();

  // Spawn the initial snake stabnding still
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

// Function to draw the snake and making the head a lighter green than the rest of the body
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      fill(0, 255, 0);
    } else {
      fill(0, 155, 0);
    }
    // Drawing the snake and constantly moving it based on its index value changing as it moves
    square(snake[i].x * CELL_SIZE, snake[i].y * CELL_SIZE, CELL_SIZE);
  }
}

// Function to draw the food and make it red
function drawFood() {
  fill(255, 0, 0);
  square(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE);
}

// Function to draw the God Mode message
function drawGodModeMessage() {
  fill(0);
  textAlign(RIGHT, TOP);
  textSize(15);
  text("God Mode: You cannot die", width - 10, 10);
}

// Function to spawn food at a random location (excluding where the snake currently is)
function spawnFood() {
  let validSpawns = [];

  // Loop through each cell on the grid to check if it is occupied and if not, consider it a spawnable location (validSPawns)
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let isOccupied = false;

      // Check if the current cell is occupied by the snake, if it is, end the funciton
      for (let k = 0; k < snake.length; k++) {
        if (snake[k].x === i && snake[k].y === j) {
          isOccupied = true;
          break;
        }
      }

      // If the cell is not occupied, add it to the validSpawns array which will have a random position picked from it to have the food spawn at
      if (!isOccupied) {
        validSpawns.push({ x: i, y: j });
      }
    }
  }

  // Choose a random position from the validSpawns array for food to spawn
  let randomIndex = floor(random(validSpawns.length));
  food = createVector(validSpawns[randomIndex].x, validSpawns[randomIndex].y);
}

// Function to move the snake
function moveSnake() {
  let head = createVector(snake[0].x, snake[0].y);
  head.add(direction);
  snake.unshift(head);
  if (!head.equals(food)) {
    snake.pop();
  } else {
    spawnFood();
  }
}

// Function to check for collisions and to end the game if there are any
function checkCollisions() {
  let head = snake[0];
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    if (state !== "god") {
      gameOver();
    } else {
      // Wrap around to the opposite side if in god mode
      if (head.x < 0) head.x = GRID_SIZE - 1;
      else if (head.x >= GRID_SIZE) head.x = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
      else if (head.y >= GRID_SIZE) head.y = 0;
    }
  }

  if (state !== "god") {
    for (let i = 1; i < snake.length; i++) {
      if (head.equals(snake[i])) {
        // Snake collided with itself, game over
        gameOver();
      }
    }
  }
}

// Function to put you back to the home screen after you die
function gameOver() {
  state = "home";
}