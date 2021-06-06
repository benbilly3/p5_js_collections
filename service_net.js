let textList=['python','量化投資','回測','策略開發','監控儀錶板',
							'colab','技術分析','基本面','籌碼分析','API',
							'程式教學',	'Fdata資料庫','機器學習','神經網路','深度學習',
							'資料視覺化','比特幣','加密貨幣','程式交易','量化投資社群'
							];
let netCunsum=0, netLimit=textList.length;
let objs = [];
let objsNum = 10;
const noiseScale = 0.03; 
let colorA, colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textSize(24);
	textStyle(BOLD);
  colorA = color(255, 223, 66, 100);
  colorB = color(0, 255, 255, 100);

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
  background(0);
}

// 重新拉伸畫布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
  }

function draw() {
  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].checkLife();

    objs[i].display();
  }
  pop();
}

class Obj {
  constructor() {
    this.init();
  }

  init() {
    this.vel = createVector(0, 0);
    this.pos = createVector(0, 0);
    this.t = random(0, 360);
    this.lifeMax = random(20, 40);
    this.life = this.lifeMax;
    this.step = random(0.05, 0.1);
    this.dMax = random(10) >= 5 ? 10 : 15;
    this.d = this.dMax;
    this.c = lerpColor(colorA, colorB, random(2));
  }

  move() {
    let theta = map(noise(this.pos.x * noiseScale, this.pos.y * noiseScale), 0, 1, 0, 360) + this.t;
    this.vel.x = sin(theta);
    this.vel.y = cos(theta);
    this.pos.add(this.vel);
  }

  checkLife() {
    this.life -= this.step;
    this.d = map(this.life, 0, this.lifeMax, 0, this.dMax);
    if (this.life < 0) {
			fill(255)
			text(textList[netCunsum],this.pos.x, this.pos.y)
			netCunsum++
			if(netCunsum<netLimit)(
      this.init());else{noLoop()}
			
    }
  }

  display() {

    stroke(this.c);
    fill(255, 100);

    circle(this.pos.x, this.pos.y, this.d);
  }
}