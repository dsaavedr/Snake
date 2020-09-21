var size = 600, //squared
    gridSize = 40,
    c = 0,
    initialSpeed = 4,
    increase = 0.2,
    speed,
    d,
    food,
    snake,
    n,
    mouse,
    WIDTH, HEIGHT;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    size = Math.floor(size / gridSize) * gridSize;

    if (WIDTH >= size) {
        WIDTH = size;
        HEIGHT = WIDTH;
    }

    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    mouse = new Image();
    mouse.src = "mouse.png";

    speed = initialSpeed;

    n = size / gridSize;

    ctx.strokeStyle = 'white';
    ctx.font = "30px sans-serif";

    var ix = Math.floor(n / 2) * gridSize;
    var iy = Math.floor(n / 2) * gridSize;

    d = Math.floor(random(4));

    var x, y;

    switch (d) {
        case 0:
            x = gridSize;
            y = 0;
            break;
        case 1:
            x = 0;
            y = gridSize;
            break;
        case 2:
            x = -gridSize;
            y = 0;
            break;
        case 3:
            x = 0;
            y = -gridSize;
            break;
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "ArrowRight":
                x = gridSize;
                y = 0;
                break;
            case "ArrowDown":
                x = 0;
                y = gridSize;
                break;
            case "ArrowLeft":
                x = -gridSize;
                y = 0;
                break;
            case "ArrowUp":
                x = 0;
                y = -gridSize;
                break;
        }
        let newDir = new Vector(x, y);

        if (legalDir(newDir)) {
            snake.nextDir.set(x, y);
        }
    });

    d = new Vector(x, y);

    snake = new Snake(ix, iy, gridSize, d);
    snake.nextDir = d.copy();

    food = newFood();

    ani();
}

function ani() {
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (!snake.dead) {
        drawFood();

        snake.update();
        snake.draw();
        snake.ate();
    } else {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillText("You lost!", WIDTH / 2 - 40, 100);
        ctx.font = "20px sans-serif";
        ctx.fillText("Press any key to restart...", WIDTH / 2 - 90, 300);
        ctx.restore();

        window.addEventListener('keydown', handleClick, true);
    }

    c++;
    setTimeout(ani, 1000 / speed);
}

init();

function drawFood() {
    // rect(food.x, food.y, gridSize, gridSize, false, true, "#f66");
    let ar = 18 / 27;
    let w = gridSize + 2
    ctx.drawImage(mouse, 0, 0, 27, 18, food.x, food.y + 5, w, w * ar);
}

function newFood() {
    let f = new Vector(
        Math.floor(random(n)) * gridSize,
        Math.floor(random(n)) * gridSize
    );

    for (i = 0; i < snake.segments.length; i++) {
        let seg = snake.segments[i];
        if (seg.x == f.x && seg.y == f.y) {
            return newFood();
        }
    }

    speed += increase;

    return f;
}

function legalDir(newDir) {
    if (newDir.x == snake.dir.x && newDir.y == snake.dir.y) {
        return false;
    } else if (newDir.x == -snake.dir.x) {
        return false;
    } else if (newDir.y == -snake.dir.y) {
        return false;
    } else {
        return true;
    }
}

function handleClick() {
    var ix = Math.floor(n / 2) * gridSize;
    var iy = Math.floor(n / 2) * gridSize;

    snake = new Snake(ix, iy, gridSize, d);
    snake.nextDir = d.copy();

    speed = initialSpeed;

    window.removeEventListener("keydown", handleClick, true);
}