const grid = document.querySelector(".grid");
const startBtn = document.querySelector("#start");
const displayScore = document.querySelector("#score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 20;
let appleIndex = 0;
let timerId = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;

function createGrid() {
  //create 100 elements
  for (let i = 0; i < width * width; i++) {
    //create elements
    const square = document.createElement("div");
    // add styling to elements
    square.classList.add("square");
    //put element into grid
    grid.appendChild(square);
    //save the elements into an arrary
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  clearInterval(timerId);
  //get rid of snake class so no snake on board
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //get rid of apple
  squares[appleIndex].classList.remove("apple");
  //reset snake back to starting length
  currentSnake = [2, 1, 0];
  //put snake back on the board
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  // new apple
  generateApples();
  // reset the score
  score = 0;
  displayScore.textContent = score;
  //reset the speed of snake
  intervalTime = 1000;
  // set direction
  direction = 1;
  timerId = setInterval(move, intervalTime);
}
function move() {
  if (
    //if snake hits bottom wall
    (currentSnake[0] + width >= width * width && direction === width) ||
    //if snake has hit rigth wall
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    //if snake has hit left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    //if snake has hit top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }

  //remove last element from current snake array
  const tail = currentSnake.pop();
  //remove styles from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are going
  currentSnake.unshift(currentSnake[0] + direction);

  //deal with snake head getting apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class apple
    squares[currentSnake[0]].classList.remove("apple");
    //grow our snake add class of snake
    squares[tail].classList.add("snake");
    //add to snake array
    currentSnake.push(tail);
    //generate new apple
    generateApples();
    //add one to score
    score++;
    displayScore.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  //styling to where we are going
  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    //gen a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

generateApples();

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
function control(e) {
  if (e.which === 39) {
    direction = 1;
  } else if (e.which === 38) {
    direction = -width;
  } else if (e.which === 37) {
    direction = -1;
  } else if (e.which === 40) {
    direction = +width;
  }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
