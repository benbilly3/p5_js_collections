let textList = ['python', '量化投資', '回測', '策略開發', '監控儀錶板',
    'colab', '技術分析', '基本面', '籌碼分析', 'API',
    '程式教學', 'Fdata資料庫', '機器學習', '神經網路', '深度學習',
    '資料視覺化', '比特幣', '加密貨幣', '程式交易', '投資社群'
];
let netCunsum = 0,
    netLimit = textList.length;
let objs = [];
let objs2 = [];
let objsNum = 20;
const noiseScale = 0.02;
let colorA, colorB;
let mColor;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    blendMode(LIGHTEST)
    textSize(16);
    textStyle(BOLD);
    colorA = color(255, 223, 66, 80);
    colorB = color(50, 68, 173, 80);
    for (let i = 0; i < objsNum; i++) {
        objs.push(new Obj());
        objs2.push(new Obj());
    }

    background(0);
}


// 重新拉伸畫布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function draw() {
    mColor = map(mouseX, 0, width, 10, 50)
    colorA = color(255, 223 + mColor, 66, 80);
    colorB = color(50, 68 + mColor, 173, 80);
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < objs.length; i++) {
        objs[i].move();
        objs[i].checkLife();
        objs[i].display();
        objs[i].printText = 1;
        objs[i].c = lerpColor(colorA, colorB, random(1));
    }
    pop();
    sideObj(width * 0.9, height * 0.9);
    sideObj(width * 0.1, height * 0.1);
    sideObj(width * 0.1, height * 0.9);
    sideObj(width * 0.9, height * 0.1);

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
        this.step = random(0.05, 0.15);
        this.dMax = random(10) >= 5 ? 10 : 20;
        this.d = this.dMax;
        this.c = lerpColor(colorA, colorB, random(2));
        this.printText = 0
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
            if (this.printText == 1) {
                text(textList[netCunsum], this.pos.x+random(-10,10), this.pos.y+random(-10,10))
                netCunsum++
            }
            if (netCunsum < netLimit)(
                this.init());
            else {
                noLoop()
            }

        }
    }

    display() {
        noStroke();
        fill(this.c);
        circle(this.pos.x, this.pos.y, this.d);
    }
}


function sideObj(w, h) {
    push();
    translate(w, h)
    for (let i = 0; i < objs.length; i++) {
        objs2[i].move();
        objs2[i].checkLife();
        objs2[i].display();
        objs2[i].c = lerpColor(colorA, colorB, random(1));
    }
    pop();
}