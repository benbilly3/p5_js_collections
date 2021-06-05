let n = 30;
let kMax;
let step;
let radius = 2;
let inter = 0.001;
let numNoise = 600;
let lapse = 2;
let noiseProg = (x) => (x);
let vocabulary = 'Easy!,Intelligent!,Practical!,Diverse!';

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  angleMode(DEGREES);
  noFill();
  kMax = random(0.3, 1.0);
  step = 0.02;
  noStroke();
}

// 重新拉伸畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


function draw() {
  background(0.6, 0.7, 0.25);
	
	strokeWeight(2);
	push();
	colorMode(RGB);
  fill(247, 200 + sin(frameCount) * 50, 4+ sin(frameCount) * 50);
  if (mouseIsPressed) {
    stroke(255);
  }
  else {
    noStroke();
  }
  textSize(80 + (abs(mouseY) / width)*50);
  text("Our Services", width*0.05, 150);
	textSize(30 + (abs(mouseY) / width)*30);
	text("Easy! Intelligent! Practical! Diverse!", width*0.15, 210);

	pop();
	fill(255);
	textSize(30 + (abs(mouseY) / width)*20);
	text("Fdata DataBase", width*0.15, 300);
	text("Quantitative investment API", width*0.2, 400);
	text("Strategy Dashboard", width*0.15, 500);
	text("Online Classes", width*0.2, 600);
	
	push();
  translate(width / 3, height / 2.3)
  let t = frameCount / 100;
  for (let i = n; i > 0; i--) {
    let alpha = 1 - noiseProg(i / n) * 1.2;
    fill((alpha / 3.5 + 0.5) % 3, 1, 1, alpha);
    let size = radius + i * inter;
    let k = kMax * cos(i / n);
    let noisiness = numNoise * noiseProg(i / n);
    nebula(size, width / 2, height / 2, k, t - i * step, noisiness);
  }
  translate(100, -200)
  for (let i = n; i > 0; i--) {
    let alpha = 1 - noiseProg(i / n);
    fill((alpha / 3.5 + 0.5) % 4, 0.9, 0.8, alpha);
    let size = radius + i * inter;
    let k = kMax * cos(i / n);
    let noisiness = numNoise * noiseProg(i / n);
    nebula(size, width / 2, height / 2, k, t - i * step, noisiness);
  }
  translate(50, -200)
  for (let i = n; i > 0; i--) {
    let alpha = 1 - noiseProg(i / n);
    fill((alpha / 4.5 + 0.5) % 3, 0.8, 0.7, alpha);
    let size = radius + i * inter;
    let k = kMax * cos(i / n);
    let noisiness = numNoise * noiseProg(i / n);
    nebula(size, width / 2, height / 2, k, t - i * step, noisiness);
  }
pop();
}


function nebula(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
  let angleStep = 40;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
    r1 = tan(theta) + 1;
    r2 = cos(theta) + 1;
    let r = size + noise(k * r1, k * r2, t) * noisiness;
    let x = xCenter + r * sin(theta);
    let y = yCenter + r * cos(theta);
    curveVertex(x, y);
  }
  endShape();
}