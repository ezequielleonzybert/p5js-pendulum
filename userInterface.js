class UserInterface {
    constructor() {
      this.butL = { x: 0, y: h, r: pow(h * w, 1 / 2.7), pres: false };
      this.butR = { x: w, y: h, r: pow(h * w, 1 / 2.7), pres: false };
      this.reset = {x: w/2-100, y: h-50, w:200, h: 50, text: "RESET", pres: false};
      this.life = {x: w/2 -150, y: 20, w: 300, h: 20};
    }
    update(){
        //PRESSED BUTTONS
        if (
            mouseX < this.butL.x + this.butL.r &&
            mouseX > this.butL.x - this.butL.r &&
            mouseY < this.butL.y + this.butL.r &&
            mouseY > this.butL.y - this.butL.r
        ) {
            this.butL.pres = true;
        }
        else{
            this.butL.pres = false;
        }
        if (
            mouseX < this.butR.x + this.butR.r &&
            mouseX > this.butR.x - this.butR.r &&
            mouseY < this.butR.y + this.butR.r &&
            mouseY > this.butR.y - this.butR.r
        ){
            this.butR.pres = true;
        }
        else{
            this.butR.pres = false;
        }
        if(mouseX < this.reset.x + this.reset.w &&
            mouseX > this.reset.x &&
            mouseY < this.reset.y + this.reset.h &&
            mouseY > this.reset.y){
            this.reset.pres = true;
        }
        else{
            this.reset.pres = false;
        }
    }
    draw() {
        
        // noStroke();
        // if (!(frameCount % 5)) {
        //     fps = round(frameRate());
        // }
        // textSize(15);
        // text("FPS = " + fps, 20, 30);
        // fill(220);
        // circle(this.butL.x, this.butL.y, this.butL.r * 2);
        // circle(this.butR.x, this.butR.y, this.butR.r * 2);
        // rect(this.reset.x,this.reset.y,this.reset.w,this.reset.h,20,20,0,0);
        // fill(180);
        // textSize(35);
        // text(this.reset.text,w/2-56,h-10);
        // fill('black');
        // rect(this.life.x-2, this.life.y-2, this.life.w+4, this.life.h+4, 13,13,13,13)
        // fill('yellow');
        // rect(this.life.x, this.life.y, this.life.w * pendulum.life, this.life.h, 11,10,10,10)
    }
}