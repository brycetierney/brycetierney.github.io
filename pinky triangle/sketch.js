// Sir Pinky's Triangle
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialTriangle = [
  {x: 750, y:20},
  {x: 300, y:780},
  {x: 1200, y:780},
];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, 1);
}

function sierpinski(points) {
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y,);
  if (depth > 0) {
    sierpinski([midpoint(points[0], points[1]), midpoint(points[1], points[2]), points[1]], depth - 1);
  }
}

function midpoint(point1, point2) {
  let newX = (point1.x + point2.x);
  let newY = (point1.y + point2.y);
  return {x: newX, y: newY};
}