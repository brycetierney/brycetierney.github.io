// Connected Nodes OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2, height/2);
  points.push(somePoint);
}

function draw() {
  background(255);

  for (let point of points) {
    point.update();
    point.connectTo(points);
  }
  
  for (let point of points) {
    point.display();
  }
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);

}


class MovingPoint {
  constructor(x, y) {
    this.speed = 5;
    this.radius = 15;
    this.maxRadius = 50;
    this.minRadius = 15;
    this.reach = 150;
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    stroke(this.color);
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      // Avoid drawing line to the same point
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
    
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    // Wrap around screen
    if (this.x < 0) {
      // Fell off left
      this.x += width;
    }
    if (this.x > width) {
      // Fell off right
      this.x -= width;
    }
    if (this.t < 0) {
      // Fell off top
      this.y += height;
    }
    if (this.y > height) {
      // Fell off bottom
      this.y -= height;
    }
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }
}