//NOTES FROM TYLER

//MAKE THE CARDS READIBLE BY ENLARGING THE CARDS
//Make When making the choices, Limit the amount of stuff happening alll at the same time

//Ex if you win, Place win card to slot, after, show animation, then reset the canvas.


//CREDITS
// Round timer logic was helped with AI
let cars = [];
let carsAI = [];
let score = 0;
let aiScore = 0;

let gameState = "start";

// cards currently shown at the top
let selectedPlayerCard = null;
let selectedAICard = null;
let lastResult = "";

// roundState: "waitingForPlayer" or "roundResolved"
let roundState = "waitingForPlayer";

// when the result started being shown (in ms from millis())
let resultShownAt = 0;

// how long to show the result (10 seconds)
const RESULT_DURATION = 3000; // 3000 ms = 3 seconds

//ASSET LOADING
let bg;
let pixel;
let cycleImg;
let compare;
let redBattle;
let frame = 0;
let blueBattle;
let blue;
let red;
let crown;
function preload(){
 bg= loadImage("assets/castle.png");
 pixel = loadFont("assets/dogicapixel.ttf");
 cycleImg = loadImage("assets/cycle.png");
 compare = loadImage("assets/compare.png")
 redBattle=loadImage("assets/red_big.png")
 blueBattle = loadImage("assets/blue_big.png")
 crown = loadImage("assets/wcrown.png")
}
function setup() {
  createCanvas(1280, 1000);
  push()
   red = new Sprite(redBattle,width/2,height/2+100)
   pop()
   blue = new Sprite(blueBattle,width/2-165,height/2+100)
  Decks();
}

function draw() {
  background(0);
  textFont(pixel);
  switch (gameState) {
    case "start":
      startScreen();
      break;
    case "gameplay":
      imageMode(CENTER);
      image(bg,width/2,height/2.8);
      push()
      scale(-1,1)
      red.draw();
      red.x= -width +450;
      pop();
      blue.draw();
      gameplay();
      if(score ===5){
        push();
        imageMode(CENTER);
        rectMode(CENTER);
        rect(width/2,height/2,600,600)
        image(crown,width/2,height/2-100)
        fill(0)
        textSize(32)
        text("YOU WIN", width/2,height/2+50)
        text("Press Space \nto Play Again", width/2,height/2+200)

        
        pop();
      }
      break;
    case "instructions":
      directions();
      break;
  }
}

 

function keyPressed() {
  if (key === " ") {
    if(score>=5){
      resetGame();
      gameState = "gameplay"
    }
  }
}

function mousePressed() {
//changing gameStates
if(gameState === "start"){
  if(isHovering(width/2,height/2-50,500,150)){
    gameState = "gameplay";
    return;
  }else if(isHovering(width/2,height/2+200,500,150)){
    gameState = "instructions";
    return;
  }
}
if(gameState==="instructions"){
  if(isHovering(width/2+450,height/2-300,200,100)){
    gameState ="start"
}
}



//gameplay functions
  if (gameState !== "gameplay") return;

  // Only allow choosing a card when we are waiting for the player
  if (roundState === "waitingForPlayer") {
    comparison();
  }
}

//CUSTOM FUNCTIONS

//Spite RED
function Sprite(sheet,x,y){
  this.sheet= sheet;
  this.x = x;
  this.y = y;
  this.h = sheet.height
  this.frame = 0;
  this.frames=sheet.width / sheet.height
  this.draw = function(){
    image(this.sheet,this.x,this.y,this.h,this.h,this.h*floor(this.frame),0,this.h,this.h)
    this.frame +=0.05
    if(this.frame > 2){
      this.frame = 0;

    }
  }
}


//StartScreen
function startScreen() {
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text("ROCK-PAPER-MAGIC?!", width/2, height/2 - 300);
  startButton()
  instructionButton();
}
function startButton() {
  rectMode(CENTER);
  textSize(40);

  let bx = width / 2;
  let by = height / 2 - 50; // button center

  // Hover logic
  if (isHovering(bx, by, 500, 150)) {
    cursor(HAND);
    fill(100);
  } else {
    cursor(ARROW);
    fill(255);
  }

  rect(bx, by, 500, 150);

  fill(0);
  textAlign(CENTER);
  text("PLAY", bx, by+10);
}

function instructionButton() {
  rectMode(CENTER);
  textSize(40);

  let bx = width / 2;
  let by = height / 2 + 200; // button center

  // Hover logic
  if (isHovering(bx, by, 500, 150)) {
    fill(30);
    cursor(HAND);
    

  } else {
    cursor(ARROW);
    fill(255);

  }

  rect(bx, by, 500, 150);

  fill(0);
  text("Instructions", bx, by+10);
}

//hover for all buttons
function isHovering(x, y, w, h) {
  let halfW = w / 2;
  let halfH = h / 2;
  return (
    abs(mouseX - x) < halfW &&
    abs(mouseY - y) < halfH
  );
}


//instruction
// function direction(){
//   rectMode(CENTER);
//   imageMode(CENTER);
//   rect(width/2,height/2,1200,800);
//   textSize((50))
//   textAlign(CENTER);
//   text("How to Play",width/2,height/2-300);
//   strokeWeight(10)
//   rect(width/2-400,height/2,300)
//   rect(width/2,height/2,300)
//   rect(width/2+400,height/2,300)
// }
function directions() {
  push();  // save current style + transform
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  background(0);
  stroke(255);
  strokeWeight(4);
  fill(30);

  rect(width/2, height/2, 1200, 800);

  fill(255);
  noStroke();
  textSize(50);
  text("How to Play", width/2, height/2 - 300);

  stroke(255);
  noFill();
  strokeWeight(8);   // this now only affects stuff inside push/pop
  rect(width/2 - 400, height/2, 300, 300);
  image(cycleImg,width/2-400,height/2,300,300);

  rect(width/2,height/2, 400, 300);
  image(compare,width/2,height/2,400,)
  text("<",width/2,height/2);
  rect(width/2 + 400, height/2, 300, 300);
  push()
  strokeWeight(1);
  fill(255);
  text("5/5",width/2+400,height/2)
  pop();

  fill(255);
  noStroke();
  textSize(24);
  text("Explain rule 1 here", width/2 - 400, height/2+200);
  text("If tied, \nhighest \nnumber wins", width/2,       height/2+200);
  text("Get to 5 Points\n before your\n opponent!", width/2 + 400, height/2+200);

  // close button
  let bx = width / 2 + 450;
  let by = height / 2 - 300;

  if (isHovering(bx, by, 200, 100) && gameState === "instructions") {
    fill(30);
    cursor(HAND);
  } else {
    cursor(ARROW);
    fill(255);
  }

  rectMode(CENTER);
  rect(bx, by, 200, 100);

  fill(0);
  textAlign(CENTER, CENTER);
  text("Close", bx, by);

  pop();  // restore previous style + transform
}



//Gameplay
function gameplay() {
  // If we are showing a result and 10 seconds have passed, hide the cards
  if (roundState === "roundResolved") {
    if (millis() - resultShownAt >= RESULT_DURATION) {
      selectedPlayerCard = null;
      selectedAICard = null;
      roundState = "waitingForPlayer";
    }
  }

  // Show scores and last result
  fill(255);
  textAlign(LEFT);
  textSize(20);
  text("Player: " + score, width/2-230, height/2-10);
  text("AI: " + aiScore, width/2+150, height/2-10);

  textSize(16);
  text("Last result: " + lastResult, width-600, height -150);

  // Draw player's 3 cards at the bottom
  for (let i = 0; i < 3 && i < cars.length; i++) {
    let x = 150 + i * 200;
    cars[i].display(x, 850);
    cars[i].info();

   
  }

  // Top area
  // Show player's selected card at the top-left only while we are showing the result
  if (roundState === "roundResolved" && selectedPlayerCard !== null) {
    selectedPlayerCard.display(470, 270);
    selectedPlayerCard.info();
  }

  // Show AI's card at the top-right
  if (roundState === "roundResolved" && selectedAICard !== null) {
    // AI card revealed
    selectedAICard.display(820, 270);
    selectedAICard.info();
  } else {
    // AI card hidden (face-down)
    rectMode(CENTER);
    stroke(0);
    fill(100);
    rect(820, 270, 100, 200); // face-down card
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("?", 820, 280);
  }

  // Instructions
  textAlign(CENTER);
  textSize(16);
  fill(255);
  if (roundState === "waitingForPlayer") {
    text("Click one of your bottom cards to play.", width / 2-300, height - 30);
  } else {
    text("Showing result...", width / 2-300, height - 30);
  }
}

// ---------- DECK SETUP ----------
function Decks() {
  let car1 = new Car(color(200, 0, 0), "fire", 1);
  let car2 = new Car(color(0, 50, 200), "water", 1);
  let car3 = new Car(color(0, 150, 200), "ice", 1);
  let car4 = new Car(color(200, 0, 0), "fire", 2);
  let car5 = new Car(color(0, 50, 200), "water", 2);
  let car6 = new Car(color(0, 150, 200), "ice", 2);
  let car7 = new Car(color(200, 0, 0), "fire", 3);
  let car8 = new Car(color(0, 50, 200), "water", 3);
  let car9 = new Car(color(0, 150, 200), "ice", 3);

  cars.push(car1, car2, car3, car4, car5, car6, car7, car8, car9);
  carsAI.push(car1, car2, car3, car4, car5, car6, car7, car8, car9);

  shuffle(cars, true);
  shuffle(carsAI, true);
}



// ---------- HANDLE CLICK + COMPARISON ----------
function comparison() {
  // Only check the 3 visible cards
  for (let i = 0; i < 3 && i < cars.length; i++) {
    if (cars[i].click(mouseX, mouseY)) {
      // Store chosen cards for drawing at the top
      selectedPlayerCard = cars[i];
      selectedAICard = carsAI[0]; // AI uses first card in its deck

      // Resolve result and update scores
      let result = resolveRound(selectedPlayerCard, selectedAICard);
      lastResult = result;

      // ALWAYS move used cards to the back of each deck,
      // including perfect ties (as you requested)
      let clickedCar = cars.splice(i, 1)[0];
      let aiCar = carsAI.splice(0, 1)[0];
      cars.push(clickedCar);
      carsAI.push(aiCar);

      // Round is now in "resolved" state (cards stay shown for 10s)
      roundState = "roundResolved";
      resultShownAt = millis();
      break; // stop after one card is clicked
    }
    
  }
}


// ---------- ROUND RESOLUTION ----------
function resolveRound(player, ai) {
  // Same type: compare scores
  if (player.type === ai.type) {
    if (player.score > ai.score) {
      score++;
      return "Tie element! Player wins by higher number.";
    } else if (player.score < ai.score) {
      aiScore++;
      return "Tie element! AI wins by higher number.";
    } else {
      // same type AND same number (perfect tie)
      return "Perfect tie!";
    }
  }

  // Element advantage: water > fire > ice > water
  if (
    (player.type === "water" && ai.type === "fire") ||
    (player.type === "fire" && ai.type === "ice") ||
    (player.type === "ice" && ai.type === "water")
  ) {
    score++;
    return "Player wins the round!";
  }

  // Otherwise AI wins
  aiScore++;
  return "AI wins the round!";
}


//RESET GAME
function resetGame() {
  // scores
  score = 0;
  aiScore = 0;

  // round + cards
  lastResult = "";
  selectedPlayerCard = null;
  selectedAICard = null;
  roundState = "waitingForPlayer";
  resultShownAt = 0;

  // decks
  cars = [];
  carsAI = [];
  Decks(); // re-create and shuffle the decks
}
