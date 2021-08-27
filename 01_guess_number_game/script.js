'use strict';

const headerEl = document.querySelector('header > h1');
const checkBtn = document.querySelector('.btn.check');
const currentScoreEl = document.querySelector('.label-score > span');
const highScoreEl = document.querySelector('.label-highscore > span');
const userGuessEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');
const playAgainBtn = document.querySelector('.btn.again');
const numberEl = document.querySelector('.number');
const bodyEl = document.querySelector('body');

let highestScore = 0;
let currentScore = 20;
let isGuessTrue = false;
let computerAnswer;
let userGuessedArray = [];

function generateAnswer() {
  computerAnswer = Math.trunc(Math.random() * 20) + 1;

  //// you can activate below line if you are developing the game
  // console.log('correctAnswerIs: ', computerAnswer);
}

function playAgain() {
  currentScore = 20;
  isGuessTrue = false;
  generateAnswer();
  currentScoreEl.textContent = currentScore;
  numberEl.textContent = '?';
  userGuessEl.value = '';
  bodyEl.classList.remove('guessCorrect');
}

function correctAnswerFound() {
  // change background etc.
  checkBtn.value = '';
  numberEl.textContent = computerAnswer;
  //highestScoreStore
  handleHighestScore();
  bodyEl.classList.add('guessCorrect');
}

function handleHighestScore() {
  if (currentScore > highestScore) {
    highestScore = currentScore;
    highScoreEl.textContent = highestScore;
  }
}

function startGame() {
  //generate new Answer
  generateAnswer();
}

function updateScore() {
  if (!isGuessTrue) {
    currentScore--;
    currentScoreEl.textContent = currentScore;
  }
}

function checkUserGuess() {
  const userGuess = Number(userGuessEl.value);

  if (userGuess <= 0 || userGuess >= 21) {
    messageEl.textContent = 'Invalid Input!';
    userGuessEl.value = '';
    userGuessEl.focus();
    return;
  }

  if (userGuessedArray.includes(userGuess)) {
    messageEl.textContent =
      'you already guessed this number before, please guess something else!';
    userGuessEl.value = '';
    userGuessEl.focus();
    return;
  }

  if (userGuess > computerAnswer) {
    messageEl.textContent = 'too high, guess again';
    userGuessEl.value = '';
    userGuessEl.focus();
    updateScore();
    userGuessedArray.push(userGuess);
  } else if (userGuess < computerAnswer) {
    messageEl.textContent = 'too low, guess again';
    userGuessEl.value = '';
    userGuessEl.focus();
    updateScore();
    userGuessedArray.push(userGuess);
  } else if (userGuess === computerAnswer) {
    messageEl.textContent = 'Correct Answer! Gz!';
    //correct answer function should run
    correctAnswerFound();
  }
}

//listeners
checkBtn.addEventListener('click', checkUserGuess);
playAgainBtn.addEventListener('click', playAgain);

// 0- we need start game function
// 1- we have a guess by user
// 2- we have an answer created by computer at beginner between 1- 20
// 3- we need to check user input with computer answera and give information if its too low or too high etc.
// 4- once we found corrent answer we need take currentScore to highesScore.
// 5- when we reset, we need to keep highestScore but reset others ( new Answer by computer, currentScore)

//

//onLoad
startGame();
