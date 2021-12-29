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
    // UNHOOKED PHYSICS
    if(!this.hook){
      this.accY = g;
      this.accX = 0;
      this.velY = this.velY * friction + this.accY;
      this.velX *= friction;
      this.colliding = false;
      
      // BOB COLLISIONS
      for(var i = 0; i < lineCollide.length; i++){
        let l = lineCollide[i];
        if(this.collide(l.x0,l.y0, l.x1, l.y1, this.posX, this.posY, this.r)){
          this.velX = sqrt((this.velY * sin(l.ang))**2 + (this.velX * cos(l.ang))**2);
          this.velY = -sqrt((this.velY * cos(l.ang))**2 + (this.velX * sin(l.ang))**2); 
        }
      }
      

      // for(var i = 0; i < lineCollide.length; i++){
      //   var l = lineCollide[i];
      //   var px1 = this.posX+this.velX + sin(l.ang)*this.r;
      //   var py1 = this.posY+this.velY + cos(l.ang)*this.r;
      //   var d1a = dist(l.x0, l.y0, px1, py1);
      //   var d2a = dist(l.x1, l.y1, px1, py1);
      //   var px2 = this.posX+this.velX - sin(l.ang)*this.r;
      //   var py2 = this.posY+this.velY - cos(l.ang)*this.r;
      //   var d1b = dist(l.x0, l.y0, px2, py2);
      //   var d2b = dist(l.x1, l.y1, px2, py2);
      //   if(d1a + d2a >= l.len - .1 && d1a + d2a <= l.len + .1){
      //     this.velX =  (this.velY * sin(l.ang) + this.velX * cos(l.ang));
      //     this.velY = -(this.velY * cos(l.ang) + this.velX * sin(l.ang)); 
          
      //   }
      //   if(d1b + d2b >= l.len - .1 && d1b + d2b <= l.len + .1){
      //     this.velX =  -(this.velY * sin(l.ang) + this.velX * sin(l.ang));
      //     this.velY =   (this.velY * cos(l.ang) + this.velX * sin(l.ang)); 
      //   }
      // }

      // for(var i = 0; i < platformC.length; i++){
      //   if(
      //     this.posX + this.velX > platformC[i].x - this.r &&
      //     this.posX + this.velX < platformC[i].w + platformC[i].x + this.r &&
      //     this.posY + this.velY > platformC[i].y - this.r &&
      //     this.posY + this.velY < platformC[i].h + platformC[i].y + this.r
      //   ){
      //     if(
      //       this.posX - this.velX < platformC[i].x - this.r || 
      //       this.posX - this.velX > platformC[i].w + platformC[i].x + this.r
      //       ){
      //       this.velX *= -bounce;
      //     }
      //     else{
      //       if(
      //         this.posY - this.velY < platformC[i].y - this.r ||
      //         this.posY - this.velY > platformC[i].h + platformC[i].y + this.r
      //         ){
      //         this.velY *= -bounce;
      //       }
      //     }
      //     this.colliding = true;
      //     if(this.alive){
      //       this.life -= (abs(this.velX) + abs(this.velY))/this.stamina;
      //       if(this.life <= 0){
      //         this.alive = false;
      //         this.life = 0;
      //       }
      //     }            
      //   }
      // }
    
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
      for(var i = 0; i < lineCollide.length; i++){
        let l = lineCollide[i];
        if(this.collide(l.x0,l.y0, l.x1, l.y1, this.posX, this.posY, this.r)){
          this.velA *= -1;
        }
      }
      // for(var i = 0; i < lineCollide.length; i++){
      //   var l = lineCollide[i];
      //   var px1 = this.posX+this.velX + sin(l.ang)*this.r;
      //   var py1 = this.posY+this.velY + cos(l.ang)*this.r;
      //   var d1a = dist(l.x0, l.y0, px1, py1);
      //   var d2a = dist(l.x1, l.y1, px1, py1);
      //   var px2 = this.posX+this.velX - sin(l.ang)*this.r;
      //   var py2 = this.posY+this.velY - cos(l.ang)*this.r;
      //   var d1b = dist(l.x0, l.y0, px2, py2);
      //   var d2b = dist(l.x1, l.y1, px2, py2);
      //   if(d1a + d2a > l.len - 1 && d1a + d2a < l.len + 1){
      //     this.velA *= -1;
      //   }
      //   if(d1b + d2b > l.len - 1 && d1b + d2b < l.len + 1){
      //     this.velA *= -1;
      //   }
      // }
      // this.colliding = false;
      // for(let i = 0 ; i< platformC.length; i++){
      //   if(
      //     this.posX + this.r >= platformC[i].x &&
      //     this.posX - this.r <= platformC[i].x + platformC[i].w &&
      //     this.posY + this.r >= platformC[i].y &&
      //     this.posY - this.r <= platformC[i].y + platformC[i].h             
      //   ){
      //     this.velA *= -1;
      //     this.colliding = true;
      //     if(this.alive){
      //       this.life -= (abs(this.velX) + abs(this.velY))/this.stamina;
      //       if(this.life <= 0){
      //         this.alive = false;
      //         this.life = 0;
      //       }
      //     }            
      //   } 
      // }
      // PENDULUM MOVEMENT
      this.accA = -g * sin(this.ang) / this.len;
      this.velA += this.accA;
      this.ang += this.velA; 
      this.posX = this.len * sin(this.ang) + this.hposX;
      this.posY = this.len * cos(this.ang) + this.hposY;
    }
  }
    
  draw() {
    noStroke();
    fill(255);
    circle(this.posX, this.posY, this.r * 2);
    circle(this.hposX, this.hposY, this.r/2);
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