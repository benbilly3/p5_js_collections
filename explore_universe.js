// 密集度幀數
let fig = []
for (var i = 0; i < 600; i++) {
  fig[i] = 1
}
let diagonal;
const Y_AXIS = 1;
const X_AXIS = 2;


function setup() {
  for (var i = 0; i < fig.length; i++) {
    fig[i] = new Particle();
    fig[i].o = random(1, random(1, width / fig[i].n));
  }
  createCanvas(windowWidth, windowHeight);
  // star fig area
  diagonal = sqrt(width * width + height * height) / 3;
  noStroke();
  fill(255);
  frameRate(10);
}

// 重新拉伸畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


// background gradient
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


let rotation = 0;

function draw() {
  push();
  setGradient(0, 0, width, height, color(5, 12, 81), color(23, 25, 28), X_AXIS);
  setGradient(0, 0, width, height, color(5, 12, 81), color(23, 25, 28), Y_AXIS);
  translate(width / 2 + 350, height / 2);
  rotation -= (width / 2 - mouseX) / 40000;
  rotate(rotation);

  for (var i = 0; i < fig.length; i++) {
    fig[i].draw();
    if (fig[i].drawDist() > diagonal) {
      fig[i] = new Particle();
    }
  }
  pop();

}

class Particle {
  constructor(args) { //初始化物件的時候會被執行的方法
    this.l = 1;
    this.n = random(1, width / 3);
    this.r = random(0, TWO_PI);
    this.o = random(1, random(1, width / this.n));
  }

  draw() {
    this.l++;
    push();
    rotate(this.r);
		rotate(frameCount / -100.0);
    translate(this.drawDist(), 0);
		noStroke();
		colorMode(HSB);
    fill(150+mouseX/15+mouseY/15+sin(frameCount/30)*150, random(20,80),sin(frameCount/20)*15+random(20,70));
		drawingContext.shadowOffsetX = 15;
		drawingContext.shadowOffsetY = -5;
		drawingContext.shadowBlur = 5;
		drawingContext.shadowColor = 'white';
    ellipse(0, 0, width/this.o/8+sin(frameCount/20)*6, width/this.o/8+sin(frameCount/40)*3);
    // star(0, 0, width/this.o/20,width/this.o/10, 6);
    pop();
    this.o += (mouseY / 2 - height / 3) / 600;
  }

  drawDist() {
    return atan(this.n / this.o) * width / HALF_PI;
  }

}