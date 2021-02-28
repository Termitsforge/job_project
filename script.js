let text = document.querySelector("#text"),
    buttons = document.querySelectorAll("button"),
    arrayAnimals = [];

/* Класс Животное */
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
/*Функция создание объекта и добавление его в массив*/
const objectFactory = (name, question, answer) => {
    arrayAnimals.push(new Animal(name, question, answer));
}

objectFactory("Кот", "У него много шерсти ?", true);
objectFactory("Жираф", "У него большая шея ?", true);
objectFactory("Волк", "У него большие зубы ?", true);

/* Стартовая страница */
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
/*Добавление нового животного*/
const AddNewAnimal = () => {
    let mainBox = document.querySelector(".main__box"),
        addAnimalBox = document.querySelector(".addNewAnimal"),
        inputsText = document.querySelectorAll("input"),
        radioButtuns = document.getElementsByName("answer"),
        button = document.querySelector(".AddAnimal");
    mainBox.style.display = "none";
    addAnimalBox.style.display = "block";
    button.onclick = function () {
        let answer;
        if (radioButtuns[0].checked) {
            answer = true;
            radioButtuns[0].checked = false;
        } else {
            answer = false;
            radioButtuns[1].checked = false;
        }

        objectFactory(inputsText[0].value, inputsText[1].value, answer);
        inputsText[0].value = "";
        inputsText[1].value = "";
        mainBox.style.display = "block";
        addAnimalBox.style.display = "none";
        start();
        for (let i = 0; i < arrayAnimals.length; i++) {
            arrayAnimals[i].toString();
        }
    }

}
/*Станица с перечислением вопросов*/
let i = 0;
const question = () => {
    /*Проверка массива */
    if (arrayAnimals.length === 0) {
        text.textContent = "Я не знаю ни одного животного. Расскажи)";
        buttons[0].textContent = "Слушай";
        buttons[1].textContent = "Пока";
        buttons[0].onclick = function () {
            i = 0;
            AddNewAnimal();

        };
        buttons[1].onclick = function () {
            i = 0;
            start();
        };

    } else if (arrayAnimals.length === 1) {
        text.textContent = `Я знаю только ${arrayAnimals[0].name}. Ты его загадал ?`;
        buttons[0].textContent = "Верно";
        buttons[1].textContent = "Не верно";

        buttons[0].onclick = function () {
            i = 0;
            start();
        };
        buttons[1].onclick = function () {
            i = 0;
            AddNewAnimal();
        };

    } else {
        text.textContent = arrayAnimals[i].question;
        buttons[0].textContent = "Да";
        buttons[1].textContent = "Нет";

        buttons[0].onclick = function () {
            text.textContent = `Это ${arrayAnimals[i].name} ?`;
            buttons[0].textContent = "Верно";
            buttons[1].textContent = "Не верно";

            buttons[0].onclick = function () {
                i = 0;
                start();
            };
            buttons[1].onclick = function () {
                i = 0;
                AddNewAnimal();
            };

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

}

start();
