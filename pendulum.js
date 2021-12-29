class Pendulum {
  constructor() {
    // BOB
    this.r = h / 20;
    this.colliding = false;
    this.stamina = 50;
    // HARPOON
    this.haccX = 0;
    this.haccY = g;
    this.hvelX = 0;
    this.hvelY = 0;
    this.hposX = this.posX;
    this.hposY = this.posY;
    this.len;
    this.start = true;
  }
  setup(x,y){
    this.accX = 0;
    this.accY = 0;
    this.velX = 0;
    this.velY = 0;
    this.posX = x;
    this.posY = y ;
    this.posXP = 0;
    this.posYP = 0;
    this.velA = 0;
    this.trig = false;
    this.hook = false;
    this.alive = true;
    this.life = 1;
  }
  
  update() {
    if(this.life < 1 && this.alive){
      this.life += .0005;
    } 
    this.colliding = false;
    // UNHOOKED PHYSICS
    if(!this.hook){
      this.accY = g;
      this.accX = 0;
      this.velY = this.velY * friction + this.accY;
      this.velX *= friction;
      
      // BOB COLLISIONS
      for(var i = 0; i < lineCollide.length; i++){
        let l = lineCollide[i];
        let vx = this.velX;
        let vy = this.velY;
        if(this.collide(l.x0, l.y0, l.x1, l.y1, this.posX+vx, this.posY+vy, this.r) && !this.colliding){
          this.colliding = true;
          let velMag = sqrt(vx**2 + vy**2);
          let bounce = 10**(-velMag)/10+0.9;
          vx = (vy * sin(l.ang*2) + vx * cos(l.ang*2)) * .8;
          vy = -(vy * cos(l.ang*2) + vx * sin(l.ang*2)) * .8;
        }
        this.velX = vx;
        this.velY = vy;
      }
    
      // HARPOON SHOT:
      if (!this.trig) {
        this.hposX = this.posX;
        this.hposY = this.posY;
      } 
      else {
        this.hvelY += this.haccY*0.5;
        this.hposX += this.hvelX;
        this.hposY += this.hvelY;
        this.len = sqrt(pow(this.posX-this.hposX,2)+pow(this.posY-this.hposY,2));
        // HARPOON PLATFORM COLLISION
        for(var i = 0; i < platformH.length; i++){
          if (
            this.hposX > platformH[i].x &&
            this.hposX < platformH[i].x + platformH[i].w &&
            this.hposY > platformH[i].y &&
            this.hposY < platformH[i].y + platformH[i].h &&
            this.len > 50
          ) {
            this.hook = true;
            this.m = (this.posX - this.hposX) / abs(this.posY - this.hposY);
            this.mp = (this.posX - this.posXP) / abs(this.posY - this.posYP);
            this.ang = atan(this.m);
            this.velA = sqrt((pow(this.velX,2) + pow(this.velY,2)) / pow(this.len,2)) * 
              (atan(this.mp) - atan(this.m));
          }
        }            
      }
      this.posXP = this.posX;
      this.posYP = this.posY;
      this.posX += this.velX;
      this.posY += this.velY;
    }
    // HOOKED PHYSICS
    // BOB COLLISIONS
    else{
      // PENDULUM MOVEMENT
      for(var i = 0; i < lineCollide.length; i++){
        let l = lineCollide[i];
        if(!this.colliding){
          if(this.collide(l.x0, l.y0, l.x1, l.y1, this.posX+this.velX, this.posY+this.velY, this.r)){
            this.colliding = true;
            this.velA *= -1;
          }
        }
      } 
      this.accA = -g * sin(this.ang) / this.len;
      if(!this.colliding) this.velA += this.accA;
      this.ang += this.velA; 
      this.posX = this.len * sin(this.ang) + this.hposX;
      this.posY = this.len * cos(this.ang) + this.hposY;          
    }
  }
    
  draw() {
    noStroke();
    fill(255);
    circle(this.posX, this.posY, this.r * 2);
    if(this.trig) circle(this.hposX, this.hposY, this.r/2);
  }

  collide(x1 , y1 , x2 , y2 , cx , cy , radius){
    var dx31
    var dx21
  
    var dy31
    var dy21
  
    var d
  
    var dx
    var dy
    var result // Int Or Bool
  
    // Calculate Closest Point To Circle Center
  
    dx31 = cx - x1
    dx21 = x2 - x1
  
    dy31 = cy - y1
    dy21 = y2 - y1
  
    d = ((dx21 * dx21) + (dy21 * dy21))
    
    if (d != 0){
      d = ((dx31 * dx21) + (dy31 * dy21)) / d
    }
  
    // Clip To The Line Segments Legal Bounds
    if (d < 0.0){
      d = 0
    }
  
    if (d > 1.0){
      d = 1
    }
  
    dx = cx - (x1 + (dx21 * d))
    dy = cy - (y1 + (dy21 * d))
  
    let magnitude = sqrt((dx * dx) + (dy * dy)) // Square Root
    if (radius >= magnitude){
  
      result = true // True = Collision Occurred
  
      let circle_to_line_intersection_x_pos = -dx
      let circle_to_line_intersection_y_pos = -dy
    }
    else result = false // False = No Collision
  
    return result
  
  };

}