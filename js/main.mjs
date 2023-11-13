import { auto, animals, hobbies, school, travel, adjectives, emotions } from './utils.mjs';

/*----- constants -----*/

/*----- state variables -----*/

let cardDeck;
let board;
let matches;
let turns;
let firstPick;
let remaining;

/*----- cached elements -----*/

const boardEls = [...document.querySelectorAll('.board > div')];
const boardEl = document.querySelector('.board');
const matchEls = [...document.querySelectorAll('.match-board > div')];
const studyCheckbox = document.getElementById('check');
const deckBtns = [...document.querySelectorAll('.deck-btn')];
const deckBtn = document.querySelector('.deck-btns');

/*----- event listeners -----*/

deckBtn.addEventListener('click', setDeck);
boardEl.addEventListener('click', handleCardFlip);
document.getElementById('reset').addEventListener('click', resetBoard);
studyCheckbox.addEventListener('change', handleToggle);

/*----- functions -----*/

init();

function resetBoard() {
    init(cardDeck);
}

function setDeck(evt) {
    evt.preventDefault();

    const idx = deckBtns.indexOf(evt.target);
    if (idx === -1) return;  // ignore a click in between the buttons
    
    switch(evt.target.innerText) {
        case 'Animals': 
            cardDeck = animals; // animals is the object, cardDeck.cards is the array of card objects, animals.color is the color
        break;
        case 'Hobbies':
            cardDeck = hobbies;
        break;
        case 'School':
            cardDeck = school;
        break;
        case 'Travel':
            cardDeck = travel;
        break;
        case 'Adjectives':
            cardDeck = adjectives;
        break;
        case 'Emotions':
            cardDeck = emotions;
        break;
        default:
            cardDeck = auto;
    }
    init(cardDeck); // call init() passing in the cardDeck variable - if no deck has been chosen, init() will run from the call above with no deck parameter
}

function handleToggle(evt) {
    evt.preventDefault();
    if (studyCheckbox.checked = true) {
        document.getElementById('study').classList.add('active');
        document.getElementById('study-overlay').classList.add('active');
        
        const studyText = document.querySelector('.study-text');
        const vocabList = document.createElement('ul');

        cardDeck.cards.forEach((card) => {
            if (card.text.match(/[\u3400-\u9FBF]/)) {
                const listItem = document.createElement('li');
                listItem.innerText = card.text + Array(3).fill('\xa0').join('') + card.id;
                vocabList.appendChild(listItem);
                studyText.appendChild(vocabList);
            }
        })

        document.getElementById('study-close-btn').addEventListener('click', function() {
            document.getElementById('study').classList.remove('active');
            document.getElementById('study-overlay').classList.remove('active');
            studyCheckbox.checked = false;
            studyText.innerHTML = '';
        })
    } 
}

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
        deckBtn.style.pointerEvents = 'none'; // do not allow clicks while checkMatch is running
        setTimeout(() => {
            if (clickedCard.id === firstPick.id) {
                // set matched property of both cards to true
                clickedCard.matched = true;
                firstPick.matched = true;
                remaining -= 1;

                // loop thru matches array and place matched cards
                for (let i = 0; i < matches.length; i++){
                    if (matches[i] === 0) {
                        matches.splice(i, 2, firstPick, clickedCard);
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
            matchEl.classList.add('reveal-card');
            matchEl.style.backgroundColor = 'var(--flipped-card-color)';
            matchEl.innerText = item.text;
            if (item.text.match(/[\u3400-\u9FBF]/)) {
                matchEl.style.fontSize = '2vmin'; 
            } else {
                matchEl.style.fontSize = '1.7vmin';
            }
        } else if (item === 0) {
            matchEl.style.backgroundColor = 'var(--matches-color)';
            matchEl.innerText = '';
        }
    })
}

function renderBoard() {
    board.forEach((colArr, colIdx) => {
        colArr.forEach((card, rowIdx) => {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.removeAttribute('class', 'reveal-card');
            cellEl.classList.add('grow');

            if (card.text.match(/[\u3400-\u9FBF]/)) {
                cellEl.style.fontSize = '3vmin'; // make font size larger for Chinese characters
                cellEl.style.fontWeight = '600';
            } else {
                cellEl.style.fontSize = '2.3vmin';
            }

            if (card.matched === true) { // if the card is a match
                cellEl.style.backgroundColor = 'var(--board)';
                cellEl.removeAttribute('class', 'grow');
                cellEl.innerText = '';
            } 

            if (card.flipped === false) { // if the card is facedown
                cellEl.style.background = cardDeck.color;
                cellEl.innerText = '';

            } else if (card.matched !== true && card.flipped === true) { // if the card has been flipped
                
                cellEl.style.backgroundColor = 'var(--flipped-card-color)';
                cellEl.innerText = card.text;
            }
        })   
    })
}

function renderMessage() {
    document.getElementById('remaining-count').innerText = `${remaining}`;
    document.getElementById('turn-count').innerText = `${turns}`;
    if (remaining === 0) {
        document.getElementById('cleared').classList.add('active');
        document.getElementById('overlay').classList.add('active');
        document.getElementById('close-btn').addEventListener('click', function() {
            document.getElementById('cleared').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        })
    }   
}

function init(selectedDeck) { // take selectedDeck as a parameter, if no deck has been selected, default to the auto deck. here, selectedDeck represents the expected input

    cardDeck = selectedDeck || auto;

    board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]

    matches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    // for each card object, assign a random board index
    cardDeck.cards.forEach((card) => {
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
