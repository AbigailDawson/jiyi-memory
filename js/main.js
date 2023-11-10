/*----- constants -----*/


/*----- state variables -----*/

// Create an array of instances of a class: https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class

class Card {
    constructor(id, text, flipped) {
        this.id = id;
        this.text = text;
        this.flipped = flipped;
    }
}

class Cards {
    constructor() {
        this.cards = [];
    }
    newCard(id, text, flipped) {
        let card = new Card(id, text, flipped);
        this.cards.push(card);
        return card;
    }
    get allCards() {
        return this.cards;
    }
}

let deck = new Cards(); // deck.cards is the array
deck.newCard('love', 'love', false);
deck.newCard('book', 'book', false);
deck.newCard('country', 'country', false);
deck.newCard('family', 'family', false);
deck.newCard('learn', 'learn', false);
deck.newCard('eat', 'eat', false);
deck.newCard('drink', 'drink', false);
deck.newCard('cat', 'cat', false);
deck.newCard('dog', 'dog', false);
deck.newCard('dream', 'dream', false);

deck.newCard('love', '愛', false);
deck.newCard('book', '書', false);
deck.newCard('country', '國', false);
deck.newCard('family', '家', false);
deck.newCard('learn', '學', false);
deck.newCard('eat', '吃', false);
deck.newCard('drink', '喝', false);
deck.newCard('cat', '貓', false);
deck.newCard('dog', '狗', false);
deck.newCard('dream', '夢', false);

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
                cellEl.innerText = card.text;
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
    
    // for each card object, assign a random board index
    deck.cards.forEach((card) => {
        let rndRowIdx = Math.floor(Math.random() * board.length);
        let rndColIdx = Math.floor(Math.random() * board[0].length);

        while(board[rndRowIdx][rndColIdx] !== 0) {
            rndRowIdx = Math.floor(Math.random() * board.length);
            rndColIdx = Math.floor(Math.random() * board[0].length);    
        }

        board[rndRowIdx][rndColIdx] = card;

    });

    turns = 0;

    render();
}
