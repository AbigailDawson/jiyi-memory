let cardDeck;
let board;
let matches;
let turns;
let firstPick;
let remaining;
let cardCount;

let savedCards = [];

// Creates new custom card deck if player uses Create Deck feature (see addCard() funtion)
let custom = new Cards('custom', '#b7efd0');

const boardEls = [...document.querySelectorAll('.board > div')];
const boardEl = document.querySelector('.board');
const matchEls = [...document.querySelectorAll('.match-board > div')];
const studyCheckbox = document.getElementById('check');
const deckBtns = [...document.querySelectorAll('.deck-btn')];
const deckBtn = document.querySelector('.deck-btns');

deckBtn.addEventListener('click', setDeck);
boardEl.addEventListener('click', handleCardFlip);
studyCheckbox.addEventListener('change', handleToggle);
document.getElementById('reset').addEventListener('click', resetBoard);
document.getElementById('create-deck').addEventListener('click', openForm);
document.getElementById('my-list-btn').addEventListener('click', openList);

// Makes the starter deck active on page load, before init() is called
document.getElementById('starter-btn').classList.add('active-deck');

init();

function resetBoard() {
    init(cardDeck);   
}

const deckOptions = {
    'Start Here!': starter,
    'Numbers': numbers,
    'Adjectives': adjectives,
    'Animals': animals,
    'Hobbies': hobbies,
    'School': school,
    'Travel': travel,
    'Emotions': emotions,
}

function setDeck(evt) {
    evt.preventDefault();
    const targetBtn = evt.target.closest('.deck-btn');
    if (!targetBtn) return;

    const selectedDeck = deckOptions[evt.target.innerText] || starter;
    deckBtns.forEach((deckBtn) => deckBtn.classList.remove('active-deck'));
    evt.target.classList.add('active-deck');

    init(selectedDeck);
}

function init(selectedDeck) {

    cardDeck = selectedDeck || starter;

    board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]

    matches = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    // Assigns a random board index for each card object
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

function handleToggle(evt) {
    evt.preventDefault();
    if (studyCheckbox.checked = true) {
        document.getElementById('study-modal').classList.add('active');
        document.getElementById('overlay').classList.add('active');
        
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
            document.getElementById('study-modal').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            studyCheckbox.checked = false;
            studyText.innerHTML = '';
        })
    } 
}

function handleCardFlip(evt) {
    evt.preventDefault();
    const cellIdx = boardEls.indexOf(evt.target);
    if (cellIdx === -1) return;    

    // Gets clicked card object from evt.target
    const cardIdx = String(evt.target.id).split('');
    const cardColIdx = cardIdx[1];
    const cardRowIdx = cardIdx[3];
    let clickedCard = board[cardColIdx][cardRowIdx];

    // First flip
    if (clickedCard.flipped === false && firstPick === null) {
        clickedCard.flipped = true;
        firstPick = clickedCard;
        render();

    // Second flip
    } else if (clickedCard.flipped === false && firstPick !== null) {
        clickedCard.flipped = true;
        turns += 1;
        render();
        checkMatch();
    }
    
    function checkMatch() {
        // Ignores clicks while checking for match
        boardEl.style.pointerEvents = 'none'; 
        deckBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            if (clickedCard.id === firstPick.id) {
                clickedCard.matched = true;
                firstPick.matched = true;
                remaining -= 1;

                // Assign matched card objects a place in matches array
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

            firstPick = null;
            render();

            boardEl.style.pointerEvents = 'auto';
            deckBtn.style.pointerEvents = 'auto';

        }, 1000)
    }
}

function render() {
    renderBoard();
    renderMatches();
    renderMessage();
}

function renderBoard() {
    board.forEach((colArr, colIdx) => {
        colArr.forEach((card, rowIdx) => {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);

            cellEl.classList.remove('reveal-card');
            cellEl.classList.add('grow');

            if (card.text.match(/[\u4E00-\u9FFF]/)) {
                cellEl.style.fontFamily = '\'Noto Serif TC\', serif';
                cellEl.style.fontSize = '3vmin';
            }

            if (card.matched === true) {
                cellEl.style.backgroundColor = 'var(--card-color)';
                cellEl.style.boxShadow = 'none';
                cellEl.removeAttribute('class', 'grow');
                cellEl.innerText = '';
            } 

            if (card.flipped === false) {
                cellEl.style.background = cardDeck.color;
                cellEl.style.boxShadow = '.2vmin .2vmin .5vmin .3vmin rgba(0, 0, 0, .4)';
                cellEl.innerText = '';

            } else if (card.matched !== true && card.flipped === true) {
                cellEl.style.backgroundColor = 'var(--flipped-card-color)';
                cellEl.style.boxShadow = '.2vmin .2vmin .5vmin .3vmin rgba(0, 0, 0, .4)';
                cellEl.innerText = card.text;
            }
        })   
    })
}
    
function renderMatches() {
    matches.forEach((item, index) => {
        
        const matchId = `${index}`;
        const matchEl = document.getElementById(matchId);
        
        if(item === 0) {
            matchEl.style.backgroundColor = 'var(--matches-color)';
            matchEl.innerText = '';
            matchEl.style.border = 'none';
            matchEl.style.cursor = 'auto';
            matchEl.classList.remove('mild-grow');

        } else if (item !== 0) {
            matchEl.classList.add('reveal-card');
            matchEl.style.backgroundColor = 'var(--flipped-card-color)';
            matchEl.innerText = item.text;

            if (item.text.match(/[\u4E00-\u9FFF]/) && !savedCards.includes(item)) {
                matchEl.style.fontFamily = '\'Noto Serif TC\', serif';
                matchEl.style.fontSize = '2vmin';
                matchEl.style.border = `.4vmin solid ${cardDeck.color}`;
                matchEl.style.cursor = 'pointer';
                matchEl.classList.add('mild-grow');
                matchEl.addEventListener('click', saveCard);
                
            } else if (item.text.match(/[\u3400-\u9FBF]/) && savedCards.includes(item)) {
                    matchEl.style.fontFamily = '\'Noto Serif TC\', serif';
                    matchEl.removeEventListener('click', saveCard);
                    matchEl.style.border = 'none';
                    matchEl.style.cursor = 'auto';
                    matchEl.classList.remove('mild-grow');
            }
        }
    })
}

function saveCard(evt) {
    evt.preventDefault;
    const clickedMatchId = evt.target.id;
    const clickedMatchIdx = parseInt(clickedMatchId);
    const clickedMatch = matches[clickedMatchIdx];

    savedCards.push(clickedMatch);

    evt.target.style.border = 'none';
    evt.target.style.cursor = 'auto';
    evt.target.classList.remove('mild-grow');
    evt.target.removeEventListener('click', saveCard);
}

function renderMessage() {
    document.getElementById('remaining-count').innerText = `${remaining}`;
    document.getElementById('turn-count').innerText = `${turns}`;

    if (remaining === 0) {
        document.getElementById('cleared-modal').classList.add('active');
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
            document.getElementById('cleared-modal').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            resetBoard();
        });
        document.getElementById('close-btn').addEventListener('click', function() {
            document.getElementById('cleared-modal').classList.remove('active');
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
    document.getElementById('overlay').classList.add('active');
    document.getElementById('create-close-btn').addEventListener('click', function() {
        document.getElementById('create-modal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    document.getElementById('card-id').focus();
}

// Allows use of enter key to click button while input field is selected
document.getElementById('card-text').addEventListener('keyup', function(evt) {
    if (evt.key === 'Enter') {
        evt.preventDefault();
        document.getElementById('add-card').click();
    }
});

function addCard() {
    cardCount++;

    // Gets values from input fields
    const engText = document.getElementById('card-id').value;
    const chText = document.getElementById('card-text').value;

    // Displays cards on list
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
            document.getElementById('overlay').classList.remove('active');
            init(custom);
        });
        cardList.appendChild(playBtn);
    }
}

function openList(evt) {
    evt.preventDefault();
    document.getElementById('my-list-modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');

    const myListText = document.querySelector('.my-list-text');
    const myList = document.createElement('ul');

    savedCards.forEach((card) => {
        const newListItem = document.createElement('li');
        newListItem.innerText = card.text + Array(3).fill('\xa0').join('') + card.id;
        myList.appendChild(newListItem);
        myListText.appendChild(myList);
    });

    document.getElementById('my-list-close-btn').addEventListener('click', function() {
        savedCards = [];
        document.getElementById('my-list-modal').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    })
}