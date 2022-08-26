const cards = document.querySelectorAll('.memo-card');
const minutesInStopWatch = document.querySelector('#minutes');
const secondsInStopWatch = document.querySelector('#secs');
const flipsNumber = document.querySelector('#flipsNumber');
const currentScore = document.querySelector('#currentScore');
const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');
const stopWatchForGame = document.querySelector('.stopWatchForGame');
const win = document.querySelector('#winner')

let flippedCard = false;
let lockTheBoard = true;
let firstCard, secondCard;
let numberOfFlips = 0;
let numberOfPairs = 0;
let seconds = 0;
let minutes = 0;
let interval = null;

function winner() {
    if(numberOfPairs === 12){
        lockTheBoard = true;

    }
}
function stopWatch() {
    seconds++;
    let second = seconds % 60;
    let minute = Math.floor(seconds / 60)
    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;
    stopWatchForGame.innerText = `Playing Time: ${minute}:${second}`
}
function startStopWatch() {
    if (interval) {
        return
    }
    interval = setInterval(stopWatch, 1000);
}

function startTheGame(){
    if(startBtn.innerText.toLowerCase() === 'start') {
        lockTheBoard = false;
        startBtn.innerText = 'Pause'
        startStopWatch()
    } else {
        lockTheBoard = true;
        startBtn.innerText = 'Start'
    }
}

function flipCard() {
    if (lockTheBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        numberOfFlips++;
        flipsNumber.innerText = numberOfFlips;
    } else {
        secondCard = this;
        numberOfFlips++;
        flipsNumber.innerText = numberOfFlips;
        checkForPair();
    }
};
    function checkForPair() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        numberOfPairs++;
        currentScore.innerText = numberOfPairs;
        disableCards();
        if (numberOfPairs === 12) {
            win.classList.remove('hidden')
            clearInterval(interval);
        }
    } else {
        unFlipCards();
    }
};
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('locked-cards', 'flip');
    secondCard.classList.add('locked-cards');
    resetBoard()
}
function unFlipCards() {
        lockTheBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1500);
};

function resetBoard() {
    [flippedCard, lockTheBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));
startBtn.addEventListener('click', startTheGame);
startBtn.addEventListener('click', () => {
    if(startBtn.innerText === 'Start') {
        clearInterval(interval);
        interval = null;
    }
})
restartBtn.addEventListener('click', () =>{
    window.location.reload();
});