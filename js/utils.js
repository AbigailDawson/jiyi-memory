// Create an array of instances of a class: https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class

class Card {
    constructor(id, text, flipped, matched, saved) {
        this.id = id;
        this.text = text;
        this.flipped = flipped;
        this.matched = matched
        this.saved = saved;
    }
}

class Cards {
    constructor(name, color) {
        this.name = name,
        this.color = color,
        this.cards = []
    }
    newCard(id, text, flipped, matched, saved) {
        let card = new Card(id, text, flipped, matched, saved);
        this.cards.push(card);
        return card;
    }
}

const starter = new Cards('starter', '#a8dadc'); 
starter.newCard('big', 'big', false, false, false);
starter.newCard('small', 'small', false, false, false);
starter.newCard('person', 'person', false, false, false);
starter.newCard('fire', 'fire', false, false, false);
starter.newCard('sun', 'sun', false, false, false);
starter.newCard('moon', 'moon', false, false, false);
starter.newCard('mountain', 'mountain', false, false, false);
starter.newCard('water', 'water', false, false, false);
starter.newCard('rain', 'rain', false, false, false);
starter.newCard('heart', 'heart', false, false, false);

starter.newCard('big', '大', false, false, false);
starter.newCard('small', '小', false, false, false);
starter.newCard('person', '人', false, false, false);
starter.newCard('fire', '火', false, false, false);
starter.newCard('sun', '日', false, false, false);
starter.newCard('moon', '月', false, false, false);
starter.newCard('mountain', '山', false, false, false);
starter.newCard('water', '水', false, false, false);
starter.newCard('rain', '雨', false, false, false);
starter.newCard('heart', '心', false, false, false);

const numbers = new Cards('numbers', '#e0fbfc');
numbers.newCard('1', '1', false, false, false);
numbers.newCard('2', '2', false, false, false);
numbers.newCard('3', '3', false, false, false);
numbers.newCard('4', '4', false, false, false);
numbers.newCard('5', '5', false, false, false);
numbers.newCard('6', '6', false, false, false);
numbers.newCard('7', '7', false, false, false);
numbers.newCard('8', '8', false, false, false);
numbers.newCard('9', '9', false, false, false);
numbers.newCard('10', '10', false, false, false);

numbers.newCard('1', '一', false, false, false);
numbers.newCard('2', '二', false, false, false);
numbers.newCard('3', '三', false, false, false);
numbers.newCard('4', '西', false, false, false);
numbers.newCard('5', '五', false, false, false);
numbers.newCard('6', '六', false, false, false);
numbers.newCard('7', '七', false, false, false);
numbers.newCard('8', '八', false, false, false);
numbers.newCard('9', '九', false, false, false);
numbers.newCard('10', '十', false, false, false);


const animals = new Cards('animalCards', '#fcd5ce'); 
animals.newCard('horse', 'horse', false, false, false);
animals.newCard('lion', 'lion', false, false, false);
animals.newCard('bear', 'bear', false, false, false);
animals.newCard('tiger', 'tiger', false, false, false);
animals.newCard('rabbit', 'rabbit', false, false, false);
animals.newCard('bird', 'bird', false, false, false);
animals.newCard('deer', 'deer', false, false, false);
animals.newCard('cat', 'cat', false, false, false);
animals.newCard('dog', 'dog', false, false, false);
animals.newCard('snake', 'snake', false, false, false);

animals.newCard('horse', '馬', false, false, false);
animals.newCard('lion', '獅子', false, false, false);
animals.newCard('bear', '熊', false, false, false);
animals.newCard('tiger', '老虎', false, false, false);
animals.newCard('rabbit', '兔子', false, false, false);
animals.newCard('bird', '鳥', false, false, false);
animals.newCard('deer', '鹿', false, false, false);
animals.newCard('cat', '貓', false, false, false);
animals.newCard('dog', '狗', false, false, false);
animals.newCard('snake', '蛇', false, false, false);

const hobbies = new Cards('hobbyCards', '#fad2e1'); 
hobbies.newCard('reading', 'reading', false, false, false);
hobbies.newCard('weight lifting', 'weight lifting', false, false, false);
hobbies.newCard('hiking', 'hiking', false, false, false);
hobbies.newCard('cycling', 'cycling', false, false, false);
hobbies.newCard('running', 'running', false, false, false);
hobbies.newCard('travel', 'travel', false, false, false);
hobbies.newCard('art', 'art', false, false, false);
hobbies.newCard('music', 'music', false, false, false);
hobbies.newCard('cooking', 'cooking', false, false, false);
hobbies.newCard('horseback riding', 'horseback riding', false, false, false);

hobbies.newCard('reading', '看書', false, false, false);
hobbies.newCard('weight lifting', '舉重', false, false, false);
hobbies.newCard('hiking', '爬山', false, false, false);
hobbies.newCard('cycling', '自行車', false, false, false);
hobbies.newCard('running', '跑步', false, false, false);
hobbies.newCard('travel', '旅遊', false, false, false);
hobbies.newCard('art', '美術', false, false, false);
hobbies.newCard('music', '音樂', false, false, false);
hobbies.newCard('cooking', '煮飯', false, false, false);
hobbies.newCard('horseback riding', '騎馬', false, false, false);

const school = new Cards('schoolCards', '#fde2e4');
school.newCard('textbook', 'textbook', false, false, false);
school.newCard('teacher', 'teacher', false, false, false);
school.newCard('student', 'student', false, false, false);
school.newCard('study', 'study', false, false, false);
school.newCard('classroom', 'classroom', false, false, false);
school.newCard('homework', 'homework', false, false, false);
school.newCard('exam', 'exam', false, false, false);
school.newCard('pencil', 'pencil', false, false, false);
school.newCard('notebook', 'notebook', false, false, false);
school.newCard('school', 'school', false, false, false);

school.newCard('textbook', '課本', false, false, false);
school.newCard('teacher', '老師', false, false, false);
school.newCard('student', '學生', false, false, false);
school.newCard('study', '唸書', false, false, false);
school.newCard('classroom', '教師', false, false, false);
school.newCard('homework', '功課', false, false, false);
school.newCard('exam', '考試', false, false, false);
school.newCard('pencil', '鉛筆', false, false, false);
school.newCard('notebook', '本子', false, false, false);
school.newCard('school', '學校', false, false, false);

const travel = new Cards('travelCards', '#f9dcc4');
travel.newCard('camping', 'camping', false, false, false);
travel.newCard('sightseeing', 'sightseeing', false, false, false);
travel.newCard('nature', 'nature', false, false, false);
travel.newCard('luggage', 'luggage', false, false, false);
travel.newCard('map', 'map', false, false, false);
travel.newCard('beach', 'beach', false, false, false);
travel.newCard('travel', 'travel', false, false, false);
travel.newCard('cruise ship', 'cruise ship', false, false, false);
travel.newCard('airplane', 'airplane', false, false, false);
travel.newCard('plan', 'plan', false, false, false);

travel.newCard('camping', '露營', false, false, false);
travel.newCard('sightseeing', '觀光', false, false, false);
travel.newCard('nature', '自然', false, false, false);
travel.newCard('luggage', '行李', false, false, false);
travel.newCard('map', '地圖', false, false, false);
travel.newCard('beach', '海灘', false, false, false);
travel.newCard('travel', '旅遊', false, false, false);
travel.newCard('cruise ship', '遊輪', false, false, false);
travel.newCard('airplane', '飛機', false, false, false);
travel.newCard('plan', '計畫', false, false, false);

const adjectives = new Cards('adjectiveCards', '#cbf3f0');
adjectives.newCard('fast', 'fast', false, false, false);
adjectives.newCard('slow', 'slow', false, false, false);
adjectives.newCard('easy', 'easy', false, false, false);
adjectives.newCard('difficult', 'difficult', false, false, false);
adjectives.newCard('big', 'big', false, false, false);
adjectives.newCard('small', 'small', false, false, false);
adjectives.newCard('light', 'light', false, false, false);
adjectives.newCard('heavy', 'heavy', false, false, false);
adjectives.newCard('many', 'many', false, false, false);
adjectives.newCard('few', 'few', false, false, false);

adjectives.newCard('fast', '快', false, false, false);
adjectives.newCard('slow', '慢', false, false, false);
adjectives.newCard('easy', '容易', false, false, false);
adjectives.newCard('difficult', '難', false, false, false);
adjectives.newCard('big', '大', false, false, false);
adjectives.newCard('small', '小', false, false, false);
adjectives.newCard('light', '輕', false, false, false);
adjectives.newCard('heavy', '重', false, false, false);
adjectives.newCard('many', '多', false, false, false);
adjectives.newCard('few', '少', false, false, false);

const emotions = new Cards('emotionCards', '#fff1e6');
emotions.newCard('happy', 'happy', false, false, false);
emotions.newCard('sad', 'sad', false, false, false);
emotions.newCard('angry', 'angry', false, false, false);
emotions.newCard('excited', 'excited', false, false, false);
emotions.newCard('regretful', 'regretful', false, false, false);
emotions.newCard('bored', 'bored', false, false, false);
emotions.newCard('hopeful', 'hopeful', false, false, false);
emotions.newCard('scared', 'scared', false, false, false);
emotions.newCard('nervous', 'nervous', false, false, false);
emotions.newCard('content', 'content', false, false, false);

emotions.newCard('happy', '高興', false, false, false);
emotions.newCard('sad', '難過', false, false, false);
emotions.newCard('angry', '生氣', false, false, false);
emotions.newCard('excited', '興奮', false, false, false);
emotions.newCard('regretful', '遺憾', false, false, false);
emotions.newCard('bored', '無聊', false, false, false);
emotions.newCard('hopeful', '樂觀', false, false, false);
emotions.newCard('scared', '害怕', false, false, false);
emotions.newCard('nervous', '緊張', false, false, false);
emotions.newCard('content', '滿意', false, false, false);