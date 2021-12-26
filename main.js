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
var translateX=0, translateY=0;
var sca=1;

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

  // CAMERA MOVEMENT
  // if(!pendulum.hook){
    if(pendulum.posX < w/3 - translateX){
      translateX += pow(abs(pendulum.posX - (w/3 - translateX)),0.5);
    }else{
      if(pendulum.posX > 2*w/3 - translateX){
        translateX -= pow(abs(pendulum.posX - (2*w/3 - translateX)),0.5);
      }
    }
    if(pendulum.posY < h/3 - translateY){
      translateY += pow(abs(pendulum.posY - (h/3 - translateY)),0.5);
    }else{
      if(pendulum.posY > 2*h/3 - translateY){
        translateY -= pow(abs(pendulum.posY - (2*h/3 - translateY)),0.5);
      }
    }
  // }
  // else{
  //   if(pendulum.hposX < w/3 - translateX){
  //     translateX += abs(pendulum.posX - (w/3 - translateX));
  //   }else{
  //     if(pendulum.hposX > 2*w/3 - translateX){
  //       translateX -= 1;
  //     }
  //   }
  //   if(pendulum.hposY < h/3 - translateY){
  //     translateY += 1;
  //   }else{
  //     if(pendulum.hposY > 2*h/3 + translateY){
  //       translateY -=1;
  //     }
  //   }
  // }
  translate(translateX, translateY);

  // if(pendulum.len > sca * 200 && sca > .7){
  //   sca -= .01;
  // }
  // else{
  //   if(pendulum.len < sca * 200 && sca < 1){
  //     sca += .01;
  //   }
  // }
  // scale(sca);

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
