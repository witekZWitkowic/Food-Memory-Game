const cards = document.querySelectorAll('.memo-card');

let flippedCard = false;
let lockTheBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockTheBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForPair();
    }
};
    function checkForPair() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unFlipCards();
    }
};
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
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