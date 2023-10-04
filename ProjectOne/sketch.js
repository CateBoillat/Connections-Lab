let sun, sky;
// let drops;
let snowFall;

let raindrops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // drops = 100;
  snowFall = 200;
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let speed = random(2, 5);
    let len = random(10, 30);
    raindrops.push(new Raindrop(x, y, speed, len));
  }
}

function draw() {
  background(255, 255, 255);
  sun = color(252, 247, 182);
  sky = color(217, 241, 255);
  gradient(sun, sky);

  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].fall();
    raindrops[i].display();
  }

  //sun
  // circle(windowWidth/2, windowHeight/2, 300);
  // noStroke()
  // fill(255, 251, 191);

  // //rain
  // push();
  // noStroke();
  // fill(118, 162, 207);
  // ellipse(windowWidth / 5, drops, 10, 20);
  // ellipse((windowWidth * 2) / 5, drops, 10, 20);
  // ellipse((windowWidth * 3) / 5, drops, 10, 20);
  // ellipse((windowWidth * 4) / 5, drops, 10, 20);
  // drops = drops + 6;
  // pop();

  //snow
  push();
  noStroke();
  fill(235, 249, 255);
  //frameRate(1);
  for (let i = 0; i < 50; i += 1) {
    circle(random(width), random(height), 12);
  }
  pop();

  //clouds
  function gradient(sun, sky) {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let mixed = lerpColor(sun, sky, inter);
      stroke(mixed);
      line(0, y, width, y);
    }

  }

}

class Raindrop {
  constructor(x, y, speed, len) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.len = len;
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -100);
      this.x = random(width);
    }
  }

  display() {
    stroke(118, 162, 207);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.len);
  }

}