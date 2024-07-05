// 1
// Difine HTML elements

const board = document.getElementById("game-board");
//17
const instructionText = document.getElementById("instruction-tex");
const logo = document.getElementById("logo");

//20-23
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');


//2
// Define  game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
//9
let food = generateFood();
//27
let highScore = 0;

//13
let direction = "right";
// 16
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//3
// Draw game map, sanake, food

function draw() {
    board.innerHTML = "";
    drawSnake();

    //11
    drawFood();

    //24
    updateScore()
}

//4
//Draw snake

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });

}

//5
//Create a snake or food cube/div

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

//6
//Set the position of snake or food

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

//7
//Testin draw function
// draw();

//8
//Draw food

function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

//10
//generate random food 

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y };

}


//12

//Moving the snake
//Պատմել օբյեկտների անփոխարելիության մասին

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);
    // snake.pop();
    //15

    //Make snake biger when it eat food

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        // increaseSpeed()
        clearInterval(gameInterval ); // Clear past interval 
        gameInterval = setInterval(() => {
            move();
             checkCollision();
            draw();
        }, gameSpeedDelay);

    } else {
        snake.pop();
    }

}

//14
// Testing moving

// setInterval(()=>{
//     move();
//     //Then draw again
//     draw()
// },1000)


//16
// Start game function

function startGame() {
    gameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move(); 
        checkCollision();
        draw();
    }, gameSpeedDelay);
}


//18
// keypress event listener

function handleKeyPress(event) {
    if ((!gameStarted && event.code === "Space") ||
        (!gameStarted && event.key === " ")) {
        startGame();

    } else {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";

                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
            default:
                break;
        }
    }

}

document.addEventListener("keydown", handleKeyPress);


//19
//create function of increase speed

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
      } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
      } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
      } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
      }
    
}


//20
//check collosion
function checkCollision() {
    const head = snake[0];
  
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
      resetGame();
    }
  
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        resetGame();
      }
    }
  }


  //21
  //reset the game

  function resetGame() {
     //3
    updateHighScore();
    stopGame();

    //1
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;

    //2
    updateScore();
  }


  //22
  //update score

  function updateScore() {
    const currentScore = snake.length - 1;
    console.log(currentScore.toString());
    score.textContent = currentScore.toString().padStart(3, '0');
  }

  //25
  //stop game
  function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
  }

  //26
//update high score
//Վերևը հայտարարել highScore փոփոխականը
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
      highScore = currentScore;
      highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
  }
  
  




  //test
//   function createGameElement(tag, className) {
//     console.log("");

//     let element = document.createElement(tag);
//     if (className === "snake") {

//         // const container = document.createElement("div");
//         element.id = "icon-container";

//         // Create a new <i> element for the icon
//         const iconElement = document.createElement("i");
//         iconElement.className = "icon fa fa-star"; // Assuming you're using Font Awesome

//         // Optionally, set some styles directly on the icon
//         iconElement.style.fontSize = "32px";
//         iconElement.style.color = "green";
//         element.appendChild(iconElement);

//     }
//     // element.className = className;
//     console.log("kkkkkk", element);
//     return element;

// }