let text = document.querySelector("#text"),
    buttons = document.querySelectorAll("button"),
    arrayAnimals = [];

class Animal {
    constructor(name, question, answer) {
        this.name = name;
        this.question = question;
        this.answer = answer;
    }
    checkAnswer(mayBeAnswer) {
        if (mayBeAnswer === this.answer) {
            return true;
        } else return false;
    }
    toString() {
        console.log(`Name : ${this.name}; Question : ${this.question};  Answer : ${this.answer};`);
    }
}

const objectFactory = (name, question, answer) => {
    arrayAnimals.push(new Animal(name, question, answer));
}

objectFactory("Барсик", "Это кот ?", true);
objectFactory("Жираф", "У него большая шея ?", true);
objectFactory("Волк", "У него большие зубы ?", true);

const start = () => {
    text.textContent = "Привет, загадай животное";
    buttons[0].textContent = "Старт";
    buttons[1].textContent = "Сбросить все";

    buttons[0].onclick = function () {
        question();
    };
    buttons[1].onclick = function () {
        if (confirm("Вы серьёзно ? ")) {
            arrayAnimals = [];
        }
    };
};

let i = 0;
const question = () => {
    text.textContent = arrayAnimals[i].question;
    buttons[0].textContent = "Да";
    buttons[1].textContent = "Нет";

    buttons[0].onclick = function () {
        console.log("ПОБЕДА");
    };
    buttons[1].onclick = function () {
        if (i === arrayAnimals.length - 1) {
            console.log("Я сдаюсь");
        } else {
            i++;
            question();
        }
        
    };
}

start();