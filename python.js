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
  // title
  background(0);
  strokeWeight(2);
  push();
  fill(247, 200 + sin(frameCount * 0.08) * 50, 4);
  if (mouseIsPressed) {
    stroke(255);
  } else {
    noStroke();
  }
  textSize(80 + (abs(mouseX) / width) * 30);
  text("Our Classes", width * 0.45, 150);
  textSize(30 + (abs(mouseX) / width) * 10);
  text("Various subjects with python!", width * 0.55, 210);
  pop();
  fill(255);
  textSize(30 + (abs(mouseX) / width) * 5);
  text("Strategy Development", width * 0.55, 300);
  text("Machine Learning Applications", width * 0.6, 400);
  text("Quantitative Data Analysis", width * 0.55, 500);
  text("Visualization", width * 0.6, 600);

  push();
  calcWave();
  python(16);
  translate(0, 50)
  calcWave();
  python(50, head = 1);
  translate(0, 50)
  calcWave();
  python(16);
  pop();
  push();
  translate(-100, -330)
  rotate(PI / 7.0);
  calcWave();
  python(10);
  translate(0, 30)
  calcWave();
  python(30, head = 1);
  translate(0, 30)
  calcWave();
  python(10);
  pop();
  push();
  translate(50, -450)
  rotate(PI / 9.0);
  calcWave();
  python(10);
  translate(0, 30)
  calcWave();
  python(40, head = 1);
  translate(0, 30)
  calcWave();
  python(10);
  pop();

}

function calcWave() {
  theta += 0.01;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < num; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function python(radius, head) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
		if(x % 2==1){
			fill(170 + random(60), 50 + mouseX / 10  +mouseY / 10, 20 + random(60));
		}else{fill(70 + random(100), 200 - mouseX / 10 + -mouseY / 10, 50 + random(130));}
    ellipse(x * xspacing, height / 3 * 2 + yvalues[x], radius, radius);
    let check = x % num;
    if (check == num - 1 & head == 1) {
      // head
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x], radius + 150, radius + 100);
      fill(206, 100, 88);
      // eye
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] + 30, 40, 20 );
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] - 30, 40, 20 );
      // tongue
      rect(x * xspacing + 180, height / 3 * 2 + yvalues[x] - 10, 80, 25, 20);
      fill(0);
      //eyeball
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] + 30, 2 + (sin(frameCount/10)+2)*7, 4 + (sin(frameCount/10)+2)*8);
      ellipse(x * xspacing + 90, height / 3 * 2 + yvalues[x] - 30, 2 + (sin(frameCount/10)+2)*7, 4 + (sin(frameCount/10)+2)*8);
      // tongue
      triangle(x * xspacing + 230, height / 3 * 2 + yvalues[x], x * xspacing + 260, height / 3 * 2 + yvalues[x] - 5, x * xspacing + 260, height / 3 * 2 + yvalues[x] + 15);
    } else {
      ellipse(x * xspacing, height / 3 * 2 + yvalues[x], radius, radius);
    }
  }
}