// Space Shooter
// Bryce Tierney
// April 21th, 2024
//
// Extra for Experts:
// I don't seem to have done anything that wasnt taught in class, but while i was making this, it felt like most things
// I had to do werent taught in class.
// I am very sorry for how late this is and instead of trying to give reasons as to why it was late, I will just make
// sure it does not happens again.

// Possible states: "START", "PLAYING", "GAMEOVER".
let gameState = "START";
let player;
let myBullets = [];
let enemies = [];
let enemyBullets = [];
let score = [0];

// Setting game screen to the size of the width and height of the current window.\
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    x: width / 2,
    y: height - 50,
    size: 100,
    speed: 15,
  };
}

// Setting the correct screen to display based off of the current state.
function draw() {
  background(220);

  if (gameState === "START") {
    displayStartScreen();
  }
  else if (gameState === "GAMEOVER") {
    displayGameOver();
  }
  else if (gameState === "PLAYING") {
    movePlayer();
    handleMyBullets();
    handleEnemies();
    handleEnemyBullets();
    displayScore();

    checkCollisions();
  }
}


// Making your score display on the top right hand corner.
function displayScore() {
  if (gameState === "PLAYING") {
    textSize(40);
    fill("black");
    text("Score: "+ score, width - 100 , 50);
  }
}

// Moving my circle with the arrow keys.
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) && player.x > player.size / 2) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) && player.x < width - player.size / 2) {
    player.x += player.speed;
  }
  fill("blue");
  circle(player.x, player.y, player.size);
}

// Calling my bullets into play and identifying them by their index value in an array (also killing if it goes off screen)
function handleMyBullets() {
  for (let i = myBullets.length - 1; i >= 0; i--) {
    myBullets[i].y -= 20;
    fill("red");
    circle(myBullets[i].x, myBullets[i].y, 20);
    if (myBullets[i].y < 0) {
      myBullets.splice(i, 1);
    }
  }
}

// Making a randomly spawned enemy every so often.
function handleEnemies() {
  if (frameCount % 60 === 0) {
    let enemy = {
      x: random(width),
      y: -50,
      size: random(40, 80),
      speed: random(3, 6),
    };
    enemies.push(enemy);
  }
  // Every time frameCount % 60 = 0, this loop will initate.
  for (let enemy of enemies) {
    // This makes the enemies move once they spawn from above.
    enemy.y += enemy.speed;
    fill("black");
    square(enemy.x, enemy.y, enemy.size);
    // Making the enemy bullets spawn at good ratio/speed
    if (random(1) < 0.05) {
      let enemyBullet = {
        x: random(enemy.x - enemy.size / 8, enemy.x + enemy.size),
        y: enemy.y + enemy.size / 2,
      };
      enemyBullets.push(enemyBullet);
    }
  }
}
// Calling my bullets into play and identifying them by their index value in an array (also killing if it goes off screen)
// (Also just the same thing as handleMyBullets funciton)
function handleEnemyBullets() {
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].y += 10;
    fill("orange");
    circle(enemyBullets[i].x, enemyBullets[i].y, 10);
    if (enemyBullets[i].y > height) {
      enemyBullets.splice(i, 1);
    }
  }
}

// Checking for collision between the bullets, or between either the enemies bullet and you, or your bullet and the enemy, in which you would get a point added to score.
function checkCollisions() {
  // If you hit an enemy, it dies and you get a point
  for (let i = myBullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (dist(myBullets[i].x - 15, myBullets[i].y, enemies[j].x, enemies[j].y) < 15 + enemies[j].size / 2) {
        myBullets.splice(i, 1);
        enemies.splice(j, 1);
        score ++;
        break;
      }
    }
  }
  // If your bullet hits an enemy bullet, they both get killed.
  for (let i = myBullets.length - 1; i >= 0; i--) {
    for (let j = enemyBullets.length - 1; j >= 0; j--) {
      if (dist(myBullets[i].x, myBullets[i].y, enemyBullets[j].x, enemyBullets[j].y) < 20) {
        myBullets.splice(i, 1);
        enemyBullets.splice(j, 1);
        break;
      }
    }
  }
  // If a bullet hits you, you die.
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (dist(enemyBullets[i].x, enemyBullets[i].y, player.x, player.y) < 15 + player.size / 2) {
      gameState = "GAMEOVER";
    }
  }
}

// Displaying startScreen
function displayStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("black");
  text("Press SPACE to Start", width / 2, height / 2);
}

// Displaying gameOver screen
function displayGameOver() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("red");
  text("Game Over", width / 2, height / 2);
  textSize(30);
  fill("black");
  text("Press SPACE to Restart", width / 2, height / 2 + 100);
  textSize(40);
  fill("black");
  text("Score: "+ score, width / 2, height / 2 + 50);
}

// Only allowing the space bar to do one thing at a time/allowing it to have multiple uses based off of the gameState.
function keyPressed() {
  if (gameState === "START" && key === " ") {
    gameState = "PLAYING";
  }
  else if (gameState === "PLAYING" && key === " ") {
    let myBullet = {
      x: player.x,
      y: player.y - player.size / 2,
    };
    myBullets.push(myBullet);
  }
  else if (gameState === "GAMEOVER" && key === " ") {
    restartGame();
  }
}

// Resetting all the variables as they would be when you refresh the page.
function restartGame() {
  player.x = width / 2;
  player.y = height - 50;
  myBullets = [];
  enemies = [];
  enemyBullets = [];
  score = [0];
  gameState = "PLAYING";
}