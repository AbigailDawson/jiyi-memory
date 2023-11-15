/*----- constants -----*/

/*----- state variables -----*/

let cardDeck;
let board;
let matches;
let turns;
let firstPick;
let remaining;
let cardCount;

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
studyCheckbox.addEventListener('change', handleToggle);
document.getElementById('reset').addEventListener('click', resetBoard);
document.getElementById('create-deck').addEventListener('click', openForm);
document.getElementById('my-list-btn').addEventListener('click', openList);

// allow for enter key to click button while form input is selected
document.getElementById('card-text').addEventListener('keyup', function(evt) {
    if (evt.key === 'Enter') {
        evt.preventDefault();
        document.getElementById('add-card').click();
    }
});

/*----- functions -----*/

document.getElementById('starter-btn').classList.add('active-deck');

init();

function resetBoard() {
    init(cardDeck);   
}

function setDeck(evt) {
    evt.preventDefault();
    const idx = deckBtns.indexOf(evt.target);
    if (idx === -1) return;  // ignore a click in between the buttons

    deckBtns.forEach((deckBtn) => {
        deckBtn.classList.remove('active-deck');
    })
    
    evt.target.classList.add('active-deck');
    
    switch(evt.target.innerText) {
        case 'Start Here!':
            cardDeck = starter;
        break;
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
        case 'Numbers':
            cardDeck = numbers;
        break;
        default:
            cardDeck = starter;
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
        deckBtn.style.pointerEvents = 'none';
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
            deckBtn.style.pointerEvents = 'auto';

        }, 1000)
    }
}

function render() {
    renderBoard();
    renderMessage();
    renderMatches();
}

let savedCards = [];

function renderMatches() {
    matches.forEach((item, index) => {
        const matchId = `${index}`;
        const matchEl = document.getElementById(matchId);

        if (item !== 0) {
            matchEl.classList.add('reveal-card');
            matchEl.style.backgroundColor = 'var(--flipped-card-color)';
            matchEl.innerText = item.text;

            if (item.text.match(/[\u3400-\u9FBF]/) && !savedCards.includes(item)) {
                matchEl.style.fontSize = '2vmin'; 
                matchEl.style.border = `.4vmin solid ${cardDeck.color}`;
                matchEl.style.cursor = 'pointer';
                matchEl.classList.add('mild-grow');

                matchEl.addEventListener('click', function(evt) {
                    evt.preventDefault();
                    if (!savedCards.includes(item)) {
                        savedCards.push(item);
                        matchEl.style.border = 'none';
                        matchEl.style.cursor = 'auto';
                        matchEl.classList.remove('mild-grow');
                    } 
                })

            } else {
                matchEl.style.fontSize = '1.7vmin';
                matchEl.style.fontWeight = '600';
            }
        } else if (item === 0) {
            matchEl.style.backgroundColor = 'var(--matches-color)';
            matchEl.innerText = '';
            
            matchEl.removeEventListener('click', function() {
                evt.preventDefault();
                savedCards.push(item);
            });
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
            } else {
                cellEl.style.fontSize = '2.3vmin';
            }

            if (card.matched === true) { // if the card is a match
                cellEl.style.backgroundColor = 'var(--card-color)';
                cellEl.style.boxShadow = 'none';
                cellEl.removeAttribute('class', 'grow');
                cellEl.innerText = '';
            } 

            if (card.flipped === false) { // if the card is facedown
                cellEl.style.background = cardDeck.color;
                cellEl.style.boxShadow = '.2vmin .2vmin .5vmin .3vmin rgba(0, 0, 0, .4)';
                cellEl.innerText = '';

            } else if (card.matched !== true && card.flipped === true) { // if the card has been flipped
                cellEl.style.backgroundColor = 'var(--flipped-card-color)';
                cellEl.style.boxShadow = '.2vmin .2vmin .5vmin .3vmin rgba(0, 0, 0, .4)';
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

        if (turns === 20) {
            document.querySelector('.cleared-title').innerText = 'Perfect Game!';
            document.querySelector('.cleared-subtitle').innerText = 'You matched all the cards on the first try! That\'s really quite an impressive feat. Congratulations!';
        } else if (turns > 20 && turns <= 30) {
            document.querySelector('.cleared-title').innerText = 'Almost Perfect!';
            document.querySelector('.cleared-subtitle').innerText = 'You matched nearly all the cards on your first try! You either have some serious luck or some mad skills. Either way, great job!';
        } else if (turns > 30 && turns <= 40) {
            document.querySelector('.cleared-title').innerText = 'Success!';
            document.querySelector('.cleared-subtitle').innerText = 'Excellent work! Your studies have paid off! Remember, you can always activate Study Mode to review the vocabulary and improve your score.';
        } else if (turns > 40) {
            document.querySelector('.cleared-title').innerText = 'Great Effort!';
            document.querySelector('.cleared-subtitle').innerText = 'Great work! If you\'d like to get even faster at recognizing these words, try activating Study Mode before playing to review the vocabulary!';
        }

        document.getElementById('play-again').addEventListener('click', function() {
            document.getElementById('cleared').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            resetBoard();
        });
        document.getElementById('close-btn').addEventListener('click', function() {
            document.getElementById('cleared').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        })
    }   
}

function openForm(evt) {
    deckBtns.forEach((deckBtn) => {
        deckBtn.classList.remove('active-deck');
    })
    evt.target.classList.add('active-deck');

    document.getElementById('create-modal').classList.add('active');
    document.getElementById('create-overlay').classList.add('active');
    document.getElementById('create-close-btn').addEventListener('click', function() {
        document.getElementById('create-modal').classList.remove('active');
        document.getElementById('create-overlay').classList.remove('active');
    });

    document.getElementById('card-id').focus();
}

function addCard() {
    cardCount++;

    // get input values from form
    const engText = document.getElementById('card-id').value;
    const chText = document.getElementById('card-text').value;

    // display card on list
    const cardList = document.querySelector('.card-list')
    const listLine = document.createElement('div');
    listLine.classList.add('list-line');

    const listNum = document.createElement('div');
    listNum.classList.add('num');
    listNum.innerText = `${cardCount}.`
    
    const listBlockEng = document.createElement('div');
    const listBlockCh = document.createElement('div');
    listBlockEng.classList.add('list-block');
    listBlockCh.classList.add('list-block');
    listBlockEng.innerText = engText
    listBlockCh.innerText = chText;
    
    listLine.appendChild(listNum);
    listLine.appendChild(listBlockEng);
    listLine.appendChild(listBlockCh);

    cardList.appendChild(listLine);

    custom.newCard(engText, chText, false, false);
    custom.newCard(engText, engText, false, false);

    cardDeck = custom;

    document.getElementById('card-id').value = '';
    document.getElementById('card-text').value = '';
    document.getElementById('card-id').focus();


    if (cardCount === 10) {
        document.getElementById('card-id').setAttribute('disabled', 'disabled');
        document.getElementById('card-text').setAttribute('disabled', 'disabled');

        const colorPicker = document.createElement('div');
        colorPicker.classList.add('color-picker')
        const colorPickerLabel = document.createElement('label');
        colorPickerLabel.setAttribute('for', 'color-picker');
        colorPickerLabel.classList.add('color-picker');
        colorPickerLabel.innerText = 'Choose a color for your deck: '
        const colorPickerInput = document.createElement('input');
        colorPickerInput.setAttribute('type', 'color');
        colorPickerInput.setAttribute('id', 'color-picker');
        colorPickerInput.setAttribute('value', '#b7efd0');
        colorPicker.appendChild(colorPickerLabel);
        colorPicker.appendChild(colorPickerInput);
        cardList.appendChild(colorPicker);

        const playBtn = document.createElement('button');
        playBtn.classList.add('add-card');
        playBtn.innerText = 'Play!'
        playBtn.style.marginTop = '2vmin';
        playBtn.addEventListener('click', function(evt) {
            evt.preventDefault();
            custom.color = colorPickerInput.value;
            document.getElementById('create-modal').classList.remove('active');
            document.getElementById('create-overlay').classList.remove('active');
            init(custom);
        });
        cardList.appendChild(playBtn);
    }
}

let custom = new Cards('custom', '#b7efd0');

function openList(evt) {
    evt.preventDefault();
    document.getElementById('my-list-modal').classList.add('active');
    document.getElementById('my-list-overlay').classList.add('active');

    const myListText = document.querySelector('.my-list-text');
    const myList = document.createElement('ul');

    savedCards.forEach((card) => {
        const newListItem = document.createElement('li');
        newListItem.innerText = card.text + Array(3).fill('\xa0').join('') + card.id;
        myList.appendChild(newListItem);
        myListText.appendChild(myList);
    });

    document.getElementById('my-list-close-btn').addEventListener('click', function() {
        document.getElementById('my-list-modal').classList.remove('active');
        document.getElementById('my-list-overlay').classList.remove('active');
    })
}

function init(selectedDeck) { // take selectedDeck as a parameter, if no deck has been selected, default to the starter deck. here, selectedDeck represents the expected input
    cardDeck = selectedDeck || starter;

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
    cardCount = 0;

    render();
}

