'use strict';
// Getting elements
// way_01 : Selecting id using querySelector method
const score0El = document.querySelector('#score--0');
// way_02 : Selecting id using getElementBuId method
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice'); // this will return a img tag
// const diceEl2= document.getElementsByClassName('dice'); // this will return a HTML COLLECTION ARRAY
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Declaring a varibale
let scores, currentScore, activePlayer, playing;
const init = function () {
  // setting initial values to the elements
  scores = [0, 0];
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`#winner--0`).classList.remove('winner');
  document.querySelector(`#winner--1`).classList.remove('winner');
  document.querySelector(`#winner--0`).style.display = 'none';
  document.querySelector(`#winner--1`).style.display = 'none';
};
// Setting initial values
init();
// Switch player function
const switchPlayer = function () {
  // switch the next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  // if class is present then remove , if class not present then add using toggle
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Create random dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.attributes.src.nodeValue = `dice-${dice}.png`;
    // 3. Check if dice is 1
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch to next user
    else {
      switchPlayer();
    }
  }
});

// Creting event Handeler for Hold Button

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add the current score to the active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if players score is >=100 , then finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      // Hiding dice
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`#winner--${activePlayer}`)
        .classList.add('winner');
      document.querySelector(`#winner--${activePlayer}`).style.display =
        'block';
    }

    // Switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
