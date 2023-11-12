import { animals, hobbies, school, travel, adjectives, emotions } from './utils.mjs';

/*----- constants -----*/

const DECK_COLORS = {
    animalCards: {
        cardColor: '#570216'
    },
    hobbyCards: {
        cardColor: '#074307'
    },
    schoolCards: {
        cardColor: '#074307'
    },
    travelCards: {
        cardColor: '#2f0743'
    },
    adjectiveCards: {
        cardColor: '#6d3b47'
    },
    emotionCards: {
        cardColor: '#074343'
    }
}

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
document.getElementById('reset').addEventListener('click', init);
studyCheckbox.addEventListener('change', handleToggle);

/*----- functions -----*/

init();

function setDeck(evt) {
    evt.preventDefault();

    const idx = deckBtns.indexOf(evt.target);
    if (idx === -1) return;  // ignore a click in between the buttons
    
    const deckName = evt.target.innerText.trim().toLowerCase();
    switch(deckName) {
        case 'animals': 
            cardDeck = animals; // assigning the Cards instance, not the array
        break;
        case 'hobbies':
            cardDeck = hobbies;
        break;
        case 'school':
            cardDeck = school;
        break;
        case 'travel':
            cardDeck = travel;
        break;
        case 'adjectives':
            cardDeck = adjectives;
        break;
        case 'emotions':
            cardDeck = emotions;
        break;
        default:
            cardDeck = animals;
    }
    console.log(cardDeck)
    console.log(cardDeck.name)

    init();
}

function handleToggle(evt) {
    evt.preventDefault();
    if (studyCheckbox.checked = true) {
        document.getElementById('study').classList.add('active');
        document.getElementById('study-overlay').classList.add('active');
        
        const studyText = document.querySelector('.study-text');
        const vocabList = document.createElement('ul');

        cardDeck.forEach((card) => {
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
    } else {
        console.log('study mode off');
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
            matchEl.classList.add('reveal-card');
            matchEl.style.backgroundColor = 'var(--flipped-card-color)';
            matchEl.innerText = item.text;
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
            cellEl.style.backgroundColor = DECK_COLORS[cardDeck.name].cardColor;
            cellEl.removeAttribute('class', 'reveal-card');
            cellEl.classList.add('grow');
            if (card.matched === true) { // if the card is a match
                cellEl.style.backgroundColor = 'var(--board)';
                cellEl.removeAttribute('class', 'grow');
                cellEl.innerText = '';
            } 
            if (card.flipped === false) { // if the card is facedown
                cellEl.style.backgroundColor = DECK_COLORS[cardDeck.name].cardColor;
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

function init() {
    cardDeck = animals;

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
