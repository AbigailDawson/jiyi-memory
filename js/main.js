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
let matches;
let turns;
let firstPick;
let remaining;



/*----- cached elements -----*/

const boardEls = [...document.querySelectorAll('.board > div')];
const boardEl = document.querySelector('.board');
const matchEls = [...document.querySelectorAll('.match-board > div')];

/*----- event listeners -----*/

boardEl.addEventListener('click', handleCardFlip);

/*----- functions -----*/

init();

document.getElementById('reset').addEventListener('click', init)

function handleCardFlip(evt) {
    evt.preventDefault();
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
        render();

    } else if (clickedCard.flipped === false && firstPick !== null) { // if this is the second card being flipped:
        clickedCard.flipped = true; // flip card
        turns += 1;
        render();
        checkMatch();
        
    } else if (clickedCard.flipped === true) { // if the card being clicked has already been flipped (not sure if needed)
        return; 
    }
    
    function checkMatch() {
        boardEl.style.pointerEvents = 'none'; // do not allow clicks while checkMatch is running
        setTimeout(() => {
            if (clickedCard.id === firstPick.id) {
                // set matched property of both cards to true
                clickedCard.matched = true;
                firstPick.matched = true;
                remaining -= 1;

                // loop thru matches array and place matched cards
                for (let i = 0; i < matches.length; i++){
                    if (matches[i] === 0) {
                        // console.log(`value at index ${i} is 0`)
                        matches.splice(i, 2, firstPick, clickedCard);
                        console.log(matches);
                        break;
                    }
                }

            } else if (clickedCard.id !== firstPick.id) {
                clickedCard.flipped = false;
                firstPick.flipped = false;
            }
            firstPick = null; // reset firstPick to null
            render();
            boardEl.style.pointerEvents = 'auto';
        }, 1000)
    }
}

function render() {
    renderBoard();
    renderMessage();
    renderMatches();
}

function renderMatches() {
    matches.forEach((item, index) => {
        const matchId = `${index}`;
        const matchEl = document.getElementById(matchId);
        if (item !== 0) {
            matchEl.style.backgroundColor = 'var(--flipped-card-color)';
            matchEl.innerText = item.text;
        } else if (item === 0) {
            matchEl.style.backgroundColor = 'var(--card-color)';
            matchEl.innerText = '';
        }
    })
}

function renderBoard() {
    board.forEach((colArr, colIdx) => {
        colArr.forEach((card, rowIdx) => {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            if (card.matched === true) { // if the cards are matched
                cellEl.style.backgroundColor = 'var(--board)';
                cellEl.innerText = '';
            } 
            if (card.flipped === false) {
                cellEl.style.backgroundColor = 'var(--card-color)';
                cellEl.innerText = '';
            } else if (card.matched !== true && card.flipped === true) {
                cellEl.style.backgroundColor = 'var(--flipped-card-color)';
                cellEl.innerText = card.text;
                cellEl.setAttribute('class', 'animate');
            }
        })
    })   
}

function renderMessage() {
    document.getElementById('remaining-count').innerText = `${remaining}`;
    document.getElementById('turn-count').innerText = `${turns}`;
    if (remaining === 0) {
        document.getElementById('message').style.visibility = 'visible';
    }   
}

function init() {
    board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]

    matches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    // for each card object, assign a random board index
    deck.cards.forEach((card) => {
        card.flipped = false;
        card.matched = false;

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
    remaining = 10;

    render();
}
