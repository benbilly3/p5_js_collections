let n = 30;
let kMax;
let step;
let radius = 2;
let inter = 0.001;
let numNoise = 600;
let lapse = 2;
let noiseProg = (x) => (x);

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