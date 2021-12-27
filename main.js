var fps;
var prevShot = 0;
var g = 0.4;
var w = 800;
var h = 400;
var bounce = 0.8;
var friction = 0.992;
var strength = 12;
var platformH = [];
var platformC = [];
var translateX=0, translateY=0;
var platformC = [];
var platformH = [];
var lineCollide = [];

function setup() {
  UI = new UserInterface();
  createCanvas(w, h);
  noStroke();

  // for(var i = 0; i < 10; i++){
  //   platformH[i] = new PlatformHook(random()*3000-1500, random()*1000-500, w/2, h / 20);
  //   platformC[i] = new PlatformCollide((i-5)*500, random()*50+h-50, 500,h/20);
  // }
  
  // COLLIDING LINES
  lineCollide.push(new LineCollide(50,50,1500,50));
  lineCollide.push(new LineCollide(50,350,1500,350));
  lineCollide.push(new LineCollide(50,50,50,350));
  lineCollide.push(new LineCollide(1500,50,1500,350));

  platformH.push(new PlatformHook(w/6,h/4, 7*w/5, h/15));

  pendulum = new Pendulum();
  pendulum.setup(w/3.5,h/2);
}

function draw() {
  background(190);
  UI.update();
  pendulum.update();

  // CAMERA MOVEMENT
  // if(!pendulum.hook){
    if(pendulum.posX < w/2 - translateX){
      translateX += pow(abs(pendulum.posX - (w/2 - translateX)),2)*0.0001;
    }else{
      if(pendulum.posX > w/2 - translateX){
        translateX -= pow(abs(pendulum.posX - (w/2 - translateX)),2)*0.0001;
      }
    }
    if(pendulum.posY < h/4 - translateY){
      translateY += pow(abs(pendulum.posY - (h/4 - translateY)),0.35);
    }else{
      if(pendulum.posY > 3*h/4 - translateY){
        translateY -= pow(abs(pendulum.posY - (3*h/4 - translateY)),0.35);
      }
    }
   translate(translateX, translateY);

  for(var i = 0; i < platformC.length; i++){
    platformC[i].draw();
  }
  for(var i = 0; i < platformH.length; i++){
    platformH[i].draw();
  }
  for(var i = 0; i < lineCollide.length; i++){
    lineCollide[i].draw();
  }

  pendulum.draw();
  resetMatrix();
  UI.draw();
}

function mousePressed() {
  if(pendulum && !pendulum.hook){
    if (frameCount > prevShot + 15 || !prevShot) {
    prevShot = frameCount;
      if (UI.butL.pres) {
        pendulum.trig = true;
        pendulum.hposX = pendulum.posX;
        pendulum.hposY = pendulum.posY;
        pendulum.hvelX = -strength;
        pendulum.hvelY = -strength;
      } else {
        if (UI.butR.pres) {
          pendulum.trig = true;
          pendulum.hposX = pendulum.posX;
          pendulum.hposY = pendulum.posY;
          pendulum.hvelX = strength;
          pendulum.hvelY = -strength;
        }
      }
    }
  }
  else{
    if (UI.butL.pres || UI.butR.pres) {
      prevShot = frameCount;
      pendulum.hook = false;
      pendulum.trig = false;
      pendulum.velX = pendulum.velA * cos(pendulum.ang) * pendulum.len;
      pendulum.velY = -pendulum.velA * sin(pendulum.ang) * pendulum.len;
    }
  }
  if(UI.reset.pres){
    pendulum.setup();
  }
}

function keyPressed() {
  if(!pendulum.hook){
    if (keyCode === LEFT_ARROW) {
      UI.butL.pres = true;
      pendulum.trig = true;
      pendulum.hposX = pendulum.posX;
      pendulum.hposY = pendulum.posY;
      pendulum.hvelX = -strength;
      pendulum.hvelY = -strength;
    } 
    if (keyCode === RIGHT_ARROW) {
      UI.butR.pres = true;
      pendulum.trig = true;
      pendulum.hposX = pendulum.posX;
      pendulum.hposY = pendulum.posY;
      pendulum.hvelX = strength;
      pendulum.hvelY = -strength;
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    if(pendulum.hook){      
      pendulum. hook = false;
      pendulum.velX = pendulum.velA * cos(pendulum.ang) * pendulum.len;
      pendulum.velY = -pendulum.velA * sin(pendulum.ang) * pendulum.len;
    }
    pendulum.trig = false;
  }  
}
