//Snakes Game
// Game loop -- Init, Draw, Update

function init() {
    console.log("init");
    canvas = document.getElementById("myCanvas");
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;

    food = getRandomFood();
    score = 5;
    gameOver = false;
    var x = 0;


    snake = {
        init_length: 5,
        color: "aqua",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "white";
                pen.lineWidth = 3;
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
            }

        },

        updateSnake: function () {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            //Assuming snake is moving right
            //Insertion at head
            // nextHeadX = headX + 1;
            // this.cells.unshift({x:nextHeadX, y:headY});

            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }
            else{
                //pop last cell if food not eaten
                this.cells.pop();

            }

            if (snake.direction == "right") {
                nextHeadX = headX + 1;
                nextHeadY = headY;
            }

            else if (snake.direction == "left") {
                nextHeadX = headX - 1;
                nextHeadY = headY;
            }

            else if (snake.direction == "down") {
                nextHeadX = headX;
                nextHeadY = headY + 1;
            }

            else {
                nextHeadX = headX;
                nextHeadY = headY - 1;
            }

            //Insert the new cell at the head
            this.cells.unshift({ x: nextHeadX, y: nextHeadY });

            //Find Boundaries for snake
            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);

            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                alert("Game Over");
                gameOver = true;
            }
        }
    };
    snake.createSnake();

    //Add eventlistner to the game
    //listen to keyboard
    function keyPressed(e) {
        console.log("You pressed a key");
        console.log(e);

        if (e.key == 'ArrowRight') {
            snake.direction = "right";
        }

        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }

        else if (e.key == "ArrowUp") {
            snake.direction = "up";
        }

        else {
            snake.direction = "down";
        }

    }
    document.addEventListener('keydown', keyPressed);

}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    //Draw the food
    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 10);
    pen.fillStyle = "white";
    pen.font ="14px Roboto";
    pen.fillText("Score : " + score,10,10);

}

function update() {
    snake.updateSnake();

}


function gameLoop() {
    draw();
    update();

    if(gameOver == true){
        clearInterval(f);
    }

}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - 10) / 10);
    var foodY = Math.round(Math.random() * (H - 10) / 10);

    foodColors = ["red", "green", "aqua", "coral", "orchid"];
    var i = Math.round(Math.random() * foodColors.length);

    food = {
        x: foodX,
        y: foodY,
        color: foodColors[i]
    };

    return food;
}

init();


//call gameLoop after t time interval
var f = setInterval(gameLoop, 100);