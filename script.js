'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 7;
let highScore = localStorage.getItem('highscore') || 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const winSound = new Audio('assets/win.mp3');
const loseSound = new Audio('assets/lose.mp3');
const clickSound = new Audio('assets/click.mp3');

document.querySelector('.highscore').textContent = highScore;

document.querySelector('.check').addEventListener('click', function () {
  clickSound.play();
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔ No Number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.body.style.background =
      'linear-gradient(135deg, #28a745, #218838)';
    document.querySelector('.number').classList.add('win-animate');

    winSound.play();

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highscore', highScore);
      document.querySelector('.highscore').textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;

      loseSound.play();
      document.body.style.background =
        'linear-gradient(135deg, #e63946, #b71c1c)';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  clickSound.play();
  score = 7;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.body.style.background = 'linear-gradient(135deg, #1e1e2f, #3a3a5a)';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').classList.remove('win-animate');
});
