/*----- constants -----*/


/*----- state variables -----*/

// Create an array of instances of a class: https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class

class Card {
    constructor(id, text, flipped, matched) {
        this.id = id;
        this.text = text;
        this.flipped = flipped;
        this.matched = matched
    }
}

class Cards {
    constructor() {
        this.cards = [];
    }
    newCard(id, text, flipped, matched) {
        let card = new Card(id, text, flipped, matched);
        this.cards.push(card);
        return card;
    }
    get allCards() {
        return this.cards;
    }
}

let deck = new Cards(); // deck.cards is the array
deck.newCard('love', 'love', false, false);
deck.newCard('book', 'book', false, false);
deck.newCard('country', 'country', false, false);
deck.newCard('family', 'family', false, false);
deck.newCard('learn', 'learn', false, false);
deck.newCard('eat', 'eat', false, false);
deck.newCard('drink', 'drink', false, false);
deck.newCard('cat', 'cat', false, false);
deck.newCard('dog', 'dog', false, false);
deck.newCard('dream', 'dream', false, false);

deck.newCard('love', '愛', false, false);
deck.newCard('book', '書', false, false);
deck.newCard('country', '國', false, false);
deck.newCard('family', '家', false, false);
deck.newCard('learn', '學', false, false);
deck.newCard('eat', '吃', false, false);
deck.newCard('drink', '喝', false, false);
deck.newCard('cat', '貓', false, false);
deck.newCard('dog', '狗', false, false);
deck.newCard('dream', '夢', false, false);

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
    
    // update state depending on whether this is the 1st or 2nd card being flipped
    if (clickedCard.flipped === false && firstPick === null) { // if this is the first card being flipped:
        clickedCard.flipped = true; // flip card
        firstPick = clickedCard; // store in firstPick variable
        console.log(`${clickedCard.id} is the first card being flipped`);

    } else if (clickedCard.flipped === false && firstPick !== null) { // if this is the second card being flipped:
        clickedCard.flipped = true; // flip card
        console.log(`${clickedCard.id} is the second card being flipped`);

        checkMatch();

    } else if (clickedCard.flipped === true) { // if the card being clicked has already been flipped (not sure if needed)
        return; 
    }
    
    
    function checkMatch() {
        setTimeout(() => {
            if (clickedCard.id === firstPick.id) {
                console.log(`${clickedCard.id} and ${firstPick.id} are a match!`)
                // set matched property of both cards to true
                clickedCard.matched = true;
                firstPick.matched = true;

                render();

            } else if (clickedCard.id !== firstPick.id) {
                console.log(`${clickedCard.id} and ${firstPick.id} are NOT a match!`)

                clickedCard.flipped = false;
                firstPick.flipped = false;
                firstPick = null; // reset firstPick to null

                console.log('The cards are flipped back over');

                render();
            }
        }, 2000)
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
            if (card.matched === true) {
                cellEl.style.backgroundColor = '#eee';
                cellEl.innerText = '';
            } 
            if (card.flipped === false) {
                cellEl.style.backgroundColor = '#a9def9';
                cellEl.innerText = '';
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
    firstPick = null;

    render();
}
