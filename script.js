const gameSpace = document.querySelector("#gameSpace");
const c = gameSpace.getContext('2d');
const scoreCount = document.querySelector("#scoreCounter");
const reset = document.querySelector("#resetBTN");
const gameWidth = gameSpace.width;
const gameHeight = gameSpace.height;
const mainBoardColor = "white";
const paddle1Color = "lime";
const paddle2Color = "purple";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 10;
const paddleSpeed = 60;

let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let BallYDirection = 0;
let player1Score = 0;
let player2Score = 0;

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}

let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
}

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)
};
function clearBoard(){
    c.fillStyle = mainBoardColor;
    c.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
    c.strokeStyle = paddleBorder;

    c.fillStyle = paddle1Color;
    c.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    c.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);


    c.fillStyle = paddle2Color;
    c.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    c.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random == 1)){
        ballXDirection = 1;
    }
    else {
        ballXDirection = -1;
    }
        if(Math.round(Math.random == 1)){
        ballXDirection = 1;
    }
    else {
        ballXDirection = -1;
    }
    if(Math.round(Math.random == 1)){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    BallY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    c.fillStyle = ballColor;
    c.strokeStyle = ballBorderColor;
    c.lineWidth = 2;
    c.beginPath();
    c.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    c.stroke();
    c.fill();
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }

    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }

    if(ballX <= 0){
        player2Score += 1;
        updateScore();
        createBall();
        return;
    }

    if(ballX >= gameWidth){
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }

    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width + ballRadius); // if ball gets stuck in paddle 1
            ballXDirection * -1;
            ballSpeed += 1;
        }
    }

    if(ballX <= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = (paddle2.x + paddle2.width + ballRadius); // if ball gets stuck in paddle 2
            ballXDirection * -1;
            ballSpeed += 1;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0 ){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
};
function updateScore(){
    scoreCount.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;

    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};