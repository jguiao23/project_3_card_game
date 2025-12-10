class Car {
  constructor(tempC, tempType, tempScore) {
    this.c = tempC;
    this.type = tempType;
    this.score = tempScore;
    this.xpos = 0;
    this.ypos = 0;
  }

  click(px, py) {
    let halfW = 100 / 2;
    let halfH = 200 / 2;
    return abs(px - this.xpos) < halfW && abs(py - this.ypos) < halfH;
  }

  info() {
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text(this.type, this.xpos, this.ypos);
    text(this.score, this.xpos, this.ypos - 60);
  }

  display(tempX, tempY) {
    this.xpos = tempX;
    this.ypos = tempY;
    stroke(0);
    fill(this.c);
    rectMode(CENTER);
    rect(this.xpos, this.ypos, 100, 200);
  }
}
