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

let animals = new Cards(); 
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

let hobbies = new Cards(); 
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

let school = new Cards();
school.newCard('textbook', 'textbook', false, false);
school.newCard('teacher', 'teacher', false, false);
school.newCard('student', 'student', false, false);
school.newCard('study', 'study', false, false);
school.newCard('classroom', 'classroom', false, false);
school.newCard('homework', 'homework', false, false);
school.newCard('exam', 'exam', false, false);
school.newCard('pencil', 'pencil', false, false);
school.newCard('notebook', 'notebook', false, false);
school.newCard('school', 'school', false, false);

school.newCard('textbook', '課本', false, false);
school.newCard('teacher', '老師', false, false);
school.newCard('student', '學生', false, false);
school.newCard('study', '唸書', false, false);
school.newCard('classroom', '教師', false, false);
school.newCard('homework', '功課', false, false);
school.newCard('exam', '考試', false, false);
school.newCard('pencil', '鉛筆', false, false);
school.newCard('notebook', '本子', false, false);
school.newCard('school', '學校', false, false);

let travel = new Cards();
travel.newCard('camping', 'camping', false, false);
travel.newCard('sightseeing', 'sightseeing', false, false);
travel.newCard('nature', 'nature', false, false);
travel.newCard('luggage', 'luggage', false, false);
travel.newCard('map', 'map', false, false);
travel.newCard('beach', 'beach', false, false);
travel.newCard('travel', 'travel', false, false);
travel.newCard('cruise ship', 'cruise ship', false, false);
travel.newCard('airplane', 'airplane', false, false);
travel.newCard('plan', 'plan', false, false);

travel.newCard('camping', '露營', false, false);
travel.newCard('sightseeing', '觀光', false, false);
travel.newCard('nature', '自然', false, false);
travel.newCard('luggage', '行李', false, false);
travel.newCard('map', '地圖', false, false);
travel.newCard('beach', '海灘', false, false);
travel.newCard('travel', '旅遊', false, false);
travel.newCard('cruise ship', '遊輪', false, false);
travel.newCard('airplane', '飛機', false, false);
travel.newCard('plan', '計畫', false, false);

let adjectives = new Cards();
adjectives.newCard('fast', 'fast', false, false);
adjectives.newCard('slow', 'slow', false, false);
adjectives.newCard('easy', 'easy', false, false);
adjectives.newCard('difficult', 'difficult', false, false);
adjectives.newCard('big', 'big', false, false);
adjectives.newCard('small', 'small', false, false);
adjectives.newCard('light', 'light', false, false);
adjectives.newCard('heavy', 'heavy', false, false);
adjectives.newCard('many', 'many', false, false);
adjectives.newCard('few', 'few', false, false);

adjectives.newCard('fast', '快', false, false);
adjectives.newCard('slow', '慢', false, false);
adjectives.newCard('easy', '容易', false, false);
adjectives.newCard('difficult', '難', false, false);
adjectives.newCard('big', '大', false, false);
adjectives.newCard('small', '小', false, false);
adjectives.newCard('light', '輕', false, false);
adjectives.newCard('heavy', '重', false, false);
adjectives.newCard('many', '多', false, false);
adjectives.newCard('few', '少', false, false);

let emotions = new Cards();
emotions.newCard('happy', 'happy', false, false);
emotions.newCard('sad', 'sad', false, false);
emotions.newCard('angry', 'angry', false, false);
emotions.newCard('excited', 'excited', false, false);
emotions.newCard('regretful', 'regretful', false, false);
emotions.newCard('bored', 'bored', false, false);
emotions.newCard('hopeful', 'hopeful', false, false);
emotions.newCard('scared', 'scared', false, false);
emotions.newCard('nervous', 'nervous', false, false);
emotions.newCard('content', 'content', false, false);

emotions.newCard('happy', '高興', false, false);
emotions.newCard('sad', '難過', false, false);
emotions.newCard('angry', '生氣', false, false);
emotions.newCard('excited', '興奮', false, false);
emotions.newCard('regretful', '遺憾', false, false);
emotions.newCard('bored', '無聊', false, false);
emotions.newCard('hopeful', '樂觀', false, false);
emotions.newCard('scared', '害怕', false, false);
emotions.newCard('nervous', '緊張', false, false);
emotions.newCard('content', '滿意', false, false);

export const animalCards = animals.cards;
export const hobbyCards = hobbies.cards;
export const schoolCards = school.cards;
export const travelCards = travel.cards;
export const adjectiveCards = adjectives.cards;
export const emotionCards = emotions.cards;
