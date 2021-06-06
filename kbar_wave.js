let yoff = 0.01; // 2nd dimension of perlin noise
let y_pre;
let rextWidth=6;

function setup() {
  createCanvas(windowWidth, windowHeight);
	// frameRate(30);
}

// 重新拉伸畫布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
  }

function draw() {
  background(0);

  let xoff = 0; // Option #1: 2D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 20) {
    // Calculate a y value according to noise, map to
		// add bband
    let ind_y = map(noise(xoff, yoff), 0, 1, 20, 300);
	fill(255);
    circle(x, ind_y +300,5);
	circle(x, ind_y +50,5);
    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, 25, 600);

    // Set the vertex
    vertex(x, y);
    if(y>y_pre){
        fill(32, 112, 16);
        stroke(32, 112, 16);
    }else{
        fill(219, 41, 41);
        stroke(219, 41, 41);
    }

    // k bar
    rect(x,y,6,y/10);
    lineWidth=x+rextWidth/2
    topHeight=y-abs(sin(frameCount/50000*x)*15)
    bottomHeight=y+y/10+abs(cos(frameCount/50000*x)*25)
    line(lineWidth,y,lineWidth,topHeight);
    line(lineWidth,y+y/10,lineWidth,bottomHeight);
    
    if(bottomHeight>500){
    fill(239, 179, 179)
    text('entry',lineWidth,bottomHeight+25);}
    if(topHeight<150){
    fill(159, 249, 179)
    text('exit',lineWidth,topHeight-25);}
    // Increment x dimension for noise
    xoff += 0.1;
	y_pre=y;
    // print(topHeight);
    
    
  }
  // increment y dimension for noise
  yoff += 0.01;

}