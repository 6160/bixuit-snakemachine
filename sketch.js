const REZ = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const UP_ARROW = 38;
const W_GRID = 10;
const H_GRID = 10;
const W = W_GRID * REZ;
const H = H_GRID * REZ;
const TEXTSIZE = 16;
const sprites = {};
const defaultPositions = {}

let  MESSAGES;
let snake;
let food;
let started = false;
let end;

function preload() {
  sprites.food = loadImage('assets/food_red.png');
  sprites.snake = loadImage('assets/snake.png');
  sprites.startscreen = loadImage('assets/startscreen.png');

  for (let x = 0; x < W_GRID; x++) {
    for (let y = 0; y <H_GRID; y++) {
      const index = `${x}-${y}`;
      defaultPositions[index] = {x, y};
    }
  }
}

function setup() {
  textAlign(CENTER);
  createCanvas(W,H);
  frameRate(5);

  MESSAGES = {
    start: {
      text: "Press arrow key to start.",
      width: textWidth("Press arrow key to start."),
      scale: 1,
    },
    end: {
      text: "YOU LOSE!\nDUMBASS",
      width: textWidth("YOU LOSE!\nDUMBASS"),
      scale: 1,
    }
  }

  button_left = createButton('←');
  button_left.position(80, H+30);
  button_left.mousePressed(() => changeVector(LEFT_ARROW));

  button_right = createButton('→');
  button_right.position(130, H+30);
  button_right.mousePressed(() => changeVector(RIGHT_ARROW));

  button_up = createButton('↑');
  button_up.position(180, H+30);
  button_up.mousePressed(() => changeVector(UP_ARROW));

  button_down = createButton('↓');
  button_down.position(230, H+30);
  button_down.mousePressed(() => changeVector(DOWN_ARROW));
  
  button_down = createButton('reset');
  button_down.position(W/2 - 50, H+70);
  button_down.mousePressed(() => initGame());
  

  initGame();
}

function initGame() {
  const params = {
    snake: {
      REZ,
      sprite: sprites.snake,
      world: {
        x: W_GRID,
        y: H_GRID,
      }
    },
    food: {
      REZ,
      sprite: sprites.food,
      H_GRID,
      W_GRID,
      defaultPositions
    },
  }
  
  snake = new Snake(params.snake);
  food = new Food(params.food);
  started = false;
}

function changeVector(direction) {
  started = true;
  const vectorMap = {
    [LEFT_ARROW]: {xdir: -1, ydir: 0},
    [RIGHT_ARROW]: {xdir: 1, ydir: 0},
    [DOWN_ARROW]: {xdir: 0, ydir: 1},
    [UP_ARROW]: {xdir: 0, ydir: -1},
  }

  const vector = vectorMap[direction];

  console.log(vector)

  if (vector) { snake.changeDirection(vector); }
}

function keyPressed() { 
  if (keyCode === 32) return initGame();
  changeVector(keyCode)
}

function showStartScreen() {
  fill('rgba(174,15,10, 0.70)')
  rect(0, 0, W, H )
  image(sprites.startscreen, 0, 0)
  
  fill(255)
  textSize(TEXTSIZE * 1.5);
  textSize(TEXTSIZE);
  text('Press arrow key to start', W/2, (H) - (TEXTSIZE*2))
  textSize(TEXTSIZE / 2)
  text('if you\'re on mobile, well it sucks to be you', W/2, H- (TEXTSIZE))
}

function showScore(score) {
  fill(255)
  textSize(TEXTSIZE);
  text(`score: ${score}`, 35, H - TEXTSIZE)
}

function draw() {
  background(174,15,10);

  if (!started) return showStartScreen()
  if (snake.alive) {



    snake.update();
    snake.eat(food) 
    snake.show(); 
    food.show();
    
    if (started) showScore(snake.score())    
  } else {
    
    fill(255);
    textSize(TEXTSIZE * 3)
    text(MESSAGES.end.text,W/2, (H/2) - TEXTSIZE*1.5)
    textSize(TEXTSIZE)
    text('press spacebar to retry', (W/2), (H - TEXTSIZE))
  }
}
