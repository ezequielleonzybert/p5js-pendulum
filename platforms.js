class PlatformHook {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 'lightblue';
  }
  draw() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
}

class LineCollide{
  constructor(x0,y0,x1,y1){
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.m = (y1 - y0) / (x1 - x0); 
    this.b = (x1*y0 - x0*y1) / (x1 - x0); 
    this.ang = atan2(y1 - y0, x1 - x0);
    this.len = sqrt((x1 - x0)**2 + (y1 - y0)**2);
  }
  f(x){
    return this.m * x + this.b;
  }
  normalInBobB(x,y){
    return -this.m * x - y;
  }
  draw(){
    stroke(0);
    line(this.x0,this.y0,this.x1,this.y1);
  }
}

class PlatformCollide {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 180;
  }
  draw() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
}

class PlatformLava {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 'red';
  }
  draw() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
}