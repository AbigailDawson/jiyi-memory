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

let board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

// let rndCard = deck.cards[Math.floor(Math.random() * deck.cards.length)];

board.forEach((colArr, i) => {
    colArr.forEach((cellVal, j) => {
        board[i][j] = deck.cards[Math.floor(Math.random() * deck.cards.length)];;
    });
});



/*----- cached elements -----*/
/*----- event listeners -----*/
/*----- functions -----*/
