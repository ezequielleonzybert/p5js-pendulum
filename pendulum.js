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
    }
    setup(){
      this.accX = 0;
      this.accY = 0;
      this.velX = (random()-0.5)*40;
      this.velY = (random()-0.5)*40;
      this.posX = w / 2;
      this.posY = h / 3 ;
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

      if(!this.hook){
        this.accY = g;
        this.accX = 0;
        this.velY = this.velY * friction + this.accY;
        this.velX *= friction;
        this.colliding = false;
        
        //BOB COLLISIONS
        for(var i = 0; i < 10; i++){
          if(
            this.posX + this.velX > platformC[i].x - this.r &&
            this.posX + this.velX < platformC[i].w + platformC[i].x + this.r &&
            this.posY + this.velY > platformC[i].y - this.r &&
            this.posY + this.velY < platformC[i].h + platformC[i].y + this.r
          ){
            this.velY *= -bounce;
            this.colliding = true;
            if(this.alive){
              this.life -= (abs(this.velX) + abs(this.velY))/this.stamina;
              if(this.life <= 0){
                this.alive = false;
                this.life = 0;
              }
            }            
          }
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
        this.colliding = false;
        for(let i = 0 ; i< platformC.length; i++){
          if(
            this.posX + this.r >= platformC[i].x &&
            this.posX - this.r <= platformC[i].x + platformC[i].w &&
            this.posY + this.r >= platformC[i].y &&
            this.posY - this.r <= platformC[i].y + platformC[i].h             
          ){
            this.velA *= -1;
            this.colliding = true;
            if(this.alive){
              this.life -= (abs(this.velX) + abs(this.velY))/this.stamina;
              if(this.life <= 0){
                this.alive = false;
                this.life = 0;
              }
            }            
          } 
        }
        // PENDULUM MOVEMENT
        this.accA = -g * sin(this.ang) / this.len;
        this.velA += this.accA;
        this.ang += this.velA; 
        this.posX = this.len * sin(this.ang) + this.hposX;
        this.posY = this.len * cos(this.ang) + this.hposY;
      }
    }
      
    draw() {
      fill(255);
      circle(this.posX, this.posY, this.r * 2);
      circle(this.hposX, this.hposY, this.r/2);
    }
}