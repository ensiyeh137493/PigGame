'use strict';

//Selecting Elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')


const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


let scores;
let currentScore;
let activePlayer;
let playing;

const initialConditions = function () {
    //Starting conditions
    score0EL.textContent = 0;
    score1El.textContent = 0;
    diceEL.classList.add('hidden')

    scores = [0, 0] // total scores , keep accumilating
    currentScore = 0;
    activePlayer = 0;
    playing = true;




    current0El.textContent = 0
    current1El.textContent = 0

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')


}

initialConditions()



const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}


//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1.Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.Display dice
        diceEL.classList.remove('hidden')
        diceEL.src = `dice-${dice}.png`

        //3.Check for rolld 1 : if true 
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }

        // switch to next player
        else {
            switchPlayer()
        }
    }
})


btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. add currentScore to the score of active player score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        //2. check if player's score is >=100
        //finish the game
        if (scores[activePlayer] >= 25) {
            playing = false
            diceEL.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }

        else {
            //switch to nextPlayer
            switchPlayer();

        }
    }
})

btnNew.addEventListener('click', initialConditions)

