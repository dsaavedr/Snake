// Vars initialization
var canvas,
    canvasContext;

var rectSize = 15,
    rects = 40;

var foodX,
    foodY;

var cX = 5 * rectSize,
    cY = 10 * rectSize;

var gameAcc = 0.2;

var showingLost = false;

var past = [[cX, cY]];

var startFrames = 4,
    framesPerSecond = startFrames;

var direction = 'right';

window.onload = function() {
  canvas = document.getElementById('gameC');
  canvasContext = canvas.getContext('2d');

  canvas.width = rects * rectSize;
  canvas.height = rects * rectSize;

  var i = 0;

  function loop() {
    update();
    draw();
    window.setTimeout(loop, 1000/framesPerSecond);
  }

  loop();

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode <= 40 && evt.keyCode >= 37) {
      changeDirection(evt.keyCode);
    }
  });

  newFood();
}


function update() {
  if (showingLost) {
    return;
  }


  cX = past[past.length - 1][0];
  cY = past[past.length - 1][1];

  if(direction == 'left' && cX > 0) {
    nPush = [cX - rectSize, cY];
  } else if (direction == 'up' && cY > 0) {
    nPush = [cX, cY - rectSize];
  } else if (direction == 'right' && cX < canvas.width - rectSize) {
    nPush = [cX + rectSize, cY];
  } else if (direction == 'down' && cY < canvas.height - rectSize){
    nPush = [cX, cY + rectSize];
  } else {
    showingLost = true;
  }

  // if (!past.includes(nPush)) {
  //   past.push(nPush);
  // } else {
    // showingLost = true;
  // }

  past.forEach(function(e, i) {
    if (e[0] == nPush[0] && e[1] == nPush[1]) {
      showingLost = true;
    } else if (i == past.length - 1){
      past.push(nPush);
    }
  });

  if (nPush[0] == foodX && nPush[1] == foodY) {
    newFood();
    framesPerSecond += gameAcc;
  } else {
    past.shift();
  }
}

function draw() {
  rect(0, 0, canvas.width, canvas.height, 'black');

  if (showingLost) {
    canvasContext.fillStyle = "white";
    canvasContext.fillText("You lost!", canvas.width/2 - 20, 200);

    canvasContext.fillText("Click to restart", canvas.width/2 - 30, 500);
    canvas.addEventListener('click', function () {
      cX = 5*rectSize;
      cY = 10*rectSize;
      past = [[cX, cY]];
      showingLost = false;
      framesPerSecond = startFrames;
    });

    return;
  }

  drawSnake();

  drawFood();

}

function changeDirection(code) {
  switch (code) {
    case 37:
      if (direction!='right') {
        direction = 'left';
      }
      break;
    case 38:
      if (direction!='down') {
        direction = 'up';
      }
      break;
    case 39:
      if (direction!='left') {
        direction = 'right';
      }
      break;
    default:
      if (direction!='up') {
        direction = 'down';
      }
  }
}

function rect(x, y, w, h, c) {
  canvasContext.fillStyle = c;
  canvasContext.fillRect(x, y, w, h);
}

function drawSnake() {
  past.forEach(function(e) {
    rect(e[0], e[1], rectSize, rectSize, 'white');
  });
}

function newFood() {
  foodX = Math.floor(Math.random() * Math.floor(rects)) * rectSize;
  foodY = Math.floor(Math.random() * Math.floor(rects)) * rectSize;
}

function drawFood() {
  rect(foodX, foodY, rectSize, rectSize, 'red');
}
