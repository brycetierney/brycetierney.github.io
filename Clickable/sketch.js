// Clickable

let startButton;
let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = new Clickable();
  startButton.locate(300, 300);
  startButton.resize(300, 45);
  startButton.onPress = startWasPressed;
}

function draw() {
  if (state === "start") {
    background(220);

  }
  else {
    background(0);
  }
  startButton.draw();
}

function startWasPressed() {
  state = gameplay;
}