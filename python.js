let num = 30; // circle quantity
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 60.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let numList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

// 重新拉伸畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  // print(w,dx,yvalues.length);
  background(0);
  push();
  calcWave();
  renderWave(16);
  translate(0, 50)
  calcWave();
  renderWave(50, head = 1);
  translate(0, 50)
  calcWave();
  renderWave(16);
  pop();
  push();
  translate(-100, -350)
  rotate(PI / 7.0);
  calcWave();
  renderWave(10);
  translate(0, 30)
  calcWave();
  renderWave(30, head = 1);
  translate(0, 30)
  calcWave();
  renderWave(10);
  pop();

}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  // if (theta<1){
  // theta += 0.01;}

  theta += 0.01;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < num; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave(radius, head) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    fill(50 + random(130), 200 - mouseX / 10, 50 + random(130));
    ellipse(x * xspacing, height / 3 * 2 + yvalues[x], radius, radius);
    let check = x % num;
    if (check == num - 1 & head == 1) {
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x], radius + 150, radius + 100);
      fill(206, 100, 88);
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] + 30, 20, 25);
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] - 30, 20, 25);
      rect(x * xspacing + 180, height / 3 * 2 + yvalues[x] - 10, 80, 25, 20);
      fill(0);
      triangle(x * xspacing + 230, height / 3 * 2 + yvalues[x], x * xspacing + 260, height / 3 * 2 + yvalues[x] - 5, x * xspacing + 260, height / 3 * 2 + yvalues[x] + 15);
    } else {
      ellipse(x * xspacing, height / 3 * 2 + yvalues[x], radius, radius);
    }
  }
}