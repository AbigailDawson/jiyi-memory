/*----- constants -----*/


/*----- state variables -----*/

// Create an array of instances of a class: https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class

class Card {
    constructor(char, meaning, flipped) {
        this.char = char;
        this.meaning = meaning;
        this.flipped = flipped;
    }
}

class Cards {
    constructor() {
        this.cards = [];
    }
    newCard(char, meaning, flipped) {
        let card = new Card(char, meaning, flipped);
        this.cards.push(card);
        return card;
    }
    get allCards() {
        return this.cards;
    }
}

let deck = new Cards(); // deck.cards is the array
deck.newCard('愛', 'love', false);
deck.newCard('書', 'book', false);
deck.newCard('國', 'country', false);
deck.newCard('家', 'family', false);
deck.newCard('學', 'learn', false);
deck.newCard('吃', 'eat', false);
deck.newCard('喝', 'drink', false);
deck.newCard('貓', 'cat', false);
deck.newCard('狗', 'dog', false);
deck.newCard('夢', 'dream', false);

let board;
let turns;
let firstPick;

init();

/*----- cached elements -----*/

const boardEls = [...document.querySelectorAll('.board > div')];

/*----- event listeners -----*/

document.querySelector('.board').addEventListener('click', handleCardFlip);

/*----- functions -----*/

function handleCardFlip(evt) {
    const cellIdx = boardEls.indexOf(evt.target);

    // gaurd - don't listen to a click between the cards
    if (cellIdx === -1) return;    

    // get clicked card object from event target
    const cardIdx = String(evt.target.id).split('');
    const cardColIdx = cardIdx[1];
    const cardRowIdx = cardIdx[3];
    let clickedCard = board[cardColIdx][cardRowIdx];
    
    // Check if clicked card has already been flipped; if not, set firstPick to clickedCard and change flipped status to true
    if (clickedCard.flipped === false) {
        clickedCard.flipped = true;
        firstPick = clickedCard;
    } else if (clickedCard.flipped === true) {
        return;
    }

    render();
}

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() {
    board.forEach((colArr, colIdx) => {
        colArr.forEach((card, rowIdx) => {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            if (card.flipped === false) {
                cellEl.style.backgroundColor = '#a9def9';
            } else if (card.flipped === true) {
                cellEl.style.backgroundColor = '#fff';
                cellEl.innerText = card.meaning;
            }
        })
    })
}

function renderMessage() {

}

function init() {
    board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    
    // for each card object, assign to 2 random board indices
    deck.cards.forEach((card) => {
        let rndRowIdx = Math.floor(Math.random() * board.length);
        let rndColIdx = Math.floor(Math.random() * board[0].length);
        let rndRowIdx2 = Math.floor(Math.random() * board.length);
        let rndColIdx2 = Math.floor(Math.random() * board[0].length);
        while(board[rndRowIdx][rndColIdx] !== 0) {
            rndRowIdx = Math.floor(Math.random() * board.length);
            rndColIdx = Math.floor(Math.random() * board[0].length);    
        }
        board[rndRowIdx][rndColIdx] = card;
        while(board[rndRowIdx2][rndColIdx2] !== 0) {
            rndRowIdx2 = Math.floor(Math.random() * board.length);
            rndColIdx2 = Math.floor(Math.random() * board[0].length);    
        }
        board[rndRowIdx2][rndColIdx2] = card;
    });

    turns = 0;

    render();
}
