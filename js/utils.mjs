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

let animals = new Cards(); // deck.cards is the array
animals.newCard('horse', 'horse', false, false);
animals.newCard('lion', 'book', false, false);
animals.newCard('bear', 'country', false, false);
animals.newCard('tiger', 'family', false, false);
animals.newCard('rabbit', 'learn', false, false);
animals.newCard('bird', 'eat', false, false);
animals.newCard('deer', 'drink', false, false);
animals.newCard('cat', 'cat', false, false);
animals.newCard('dog', 'dog', false, false);
animals.newCard('snake', 'dream', false, false);

animals.newCard('horse', '馬', false, false);
animals.newCard('lion', '獅子', false, false);
animals.newCard('bear', '熊', false, false);
animals.newCard('tiger', '老虎', false, false);
animals.newCard('rabbit', '兔子', false, false);
animals.newCard('bird', '鳥', false, false);
animals.newCard('deer', '鹿', false, false);
animals.newCard('cat', '貓', false, false);
animals.newCard('dog', '狗', false, false);
animals.newCard('snake', '蛇', false, false);

let hobbies = new Cards(); // deck.cards is the array
hobbies.newCard('reading', 'reading', false, false);
hobbies.newCard('weight lifting', 'weight lifting', false, false);
hobbies.newCard('hiking', 'hiking', false, false);
hobbies.newCard('cycling', 'cycling', false, false);
hobbies.newCard('studying', 'studying', false, false);
hobbies.newCard('travel', 'travel', false, false);
hobbies.newCard('art', 'art', false, false);
hobbies.newCard('music', 'music', false, false);
hobbies.newCard('cooking', 'cooking', false, false);
hobbies.newCard('horseback riding', 'horseback riding', false, false);

hobbies.newCard('reading', '看書', false, false);
hobbies.newCard('weight lifting', '舉重', false, false);
hobbies.newCard('hiking', '爬山', false, false);
hobbies.newCard('cycling', '自行車', false, false);
hobbies.newCard('studying', '學習', false, false);
hobbies.newCard('travel', '旅遊', false, false);
hobbies.newCard('art', '美術', false, false);
hobbies.newCard('music', '音樂', false, false);
hobbies.newCard('cooking', '做飯', false, false);
hobbies.newCard('horseback riding', '騎馬', false, false);

export const animalCards = animals.cards;
export const hobbyCards = hobbies.cards;
