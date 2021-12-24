var fps;
var prevShot = 0;
var g = 0.4;
var w = window.innerWidth;
var h = window.innerHeight;
var bounce = 0.8;
var friction = 0.992;
var strength = 12;
var platformH = [];
var platformC = [];

function setup() {
  UI = new UserInterface();
  createCanvas(w, h);
  noStroke();

  for(var i = 0; i < 10; i++){
    platformH[i] = new PlatformHook(random()*3000-1500, random()*1000-500, w/2, h / 20);
    platformC[i] = new PlatformCollide((i-5)*500, random()*50+h-50, 500,h/20);
  }
  pendulum = new Pendulum();
  pendulum.setup();
}

function draw() {
  background(190);
  UI.update();
  pendulum.update();
  translate(-(pendulum.posX-w/2), -(pendulum.posY-h/2) );
  for(i = 0; i < platformH.length; i++){
    platformH[i].draw();
    platformC[i].draw();
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
