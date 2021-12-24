class PlatformHook {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 'lightblue';
  }
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
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
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
}