function printLine(text, HTMLobject) {
    let count = 0;
    let result = '';
    HTMLobject.textContent = "";

    function typeLine() {
        let interval = setTimeout(
            () => {
                result += text[count]
                HTMLobject.innerHTML = result + '|';
                count++;
                if (count >= text.length) {
                    clearTimeout(interval);
                    HTMLobject.innerHTML = result;
                    return true;
                }
                typeLine();
            }, 80)
    }
    typeLine();

}



let text = document.querySelector("#text"),
    buttons = document.querySelectorAll("button"),
    i = 0,
    arrayAnimals = [],
    arrayQuestionAsked = {
        "вопрос": false,
        "у него большая шея ?": true
    };

/* Класс Животное */
class Animal {
    constructor(name) {
        this.name = name;
        this.questions = {};
    }
    addQuestion(question, answer) {
        this.questions[question] = answer;
    }
    getQuestions() {
        return this.questions;
    }
    toString() {
        console.log(`Name : ${this.name}; Question : ${this.question};  Answer : ${this.answer};`);
    }
}

function checkAnswer(mayBeAnswer, answer) {
    if (mayBeAnswer === answer) {
        return true;
    } else return false;
}


/*Функция для проверки не был ли уже задан такой вопрос
Если такой вопрос ещё не задавали, то функция возвращала true, если задавали, то false */
const checkAskedQuestion = (question) => {
    let count = 0,
        result;
    array = Object.keys(arrayQuestionAsked);
    for (let i = 0; i < array.length; i++) {
        if (array[i] === question.toLowerCase()) {
            count++;
        }
    }
    if (count === 0) {
        result = true;
    } else result = false;

    return result;
   
}
/*Функция создание объекта и добавление его в массив
Если животное с таким именем уже созданно, то он просто добавляет ему вопрос*/
const objectFactory = (name, question, answer) => {
    let count = 0;
    for (let i = 0; i < arrayAnimals.length; i++) {
        if (arrayAnimals[i].name.toLowerCase() == name.toLowerCase()) {
            arrayAnimals[i].addQuestion(question, answer);
            count++;
        }
    }
    if (count === 0) {
        arrayAnimals.push(new Animal(name));
        arrayAnimals[arrayAnimals.length - 1].addQuestion(question, answer);
    }

}

objectFactory("Кот", "У него много шерсти ?", true);
objectFactory("Кот", "Оно говорит мяу?", true);
objectFactory("Жираф", "У него большая шея ?", true);
objectFactory("Волк", "У него большие зубы ?", true);
/* Стартовая страница */
const start = () => {
    printLine("Привет, загадай животное", text);
    buttons[0].textContent = "Старт";
    buttons[1].textContent = "Сбросить все";

    buttons[0].onclick = function () {
        i = 0;
        question();
    };
    buttons[1].onclick = function () {
        if (confirm("Вы серьёзно ? ")) {
            arrayAnimals = [];
            alert("Все животные удалены");
        }
    };
};
/*Добавление нового животного*/
const AddNewAnimal = () => {

    let mainBox = document.querySelector(".main__box"),
        addAnimalBox = document.querySelector(".addNewAnimal"),
        inputsText = document.querySelectorAll("input"),
        radioButtuns = document.getElementsByName("answer"),
        addText = document.querySelector(".add__h1");


    mainBox.style.display = "none";
    addAnimalBox.style.display = "block";
    printLine("Расскажи о животном", addText);
    buttons[2].onclick = function () {
        let answer;
        if (radioButtuns[0].checked) {
            answer = true;
            radioButtuns[0].checked = false;
        } else {
            answer = false;
            radioButtuns[1].checked = false;
        }
        if (!(inputsText[0].value === "") && !(inputsText[1].value === "")) {
            objectFactory(inputsText[0].value, inputsText[1].value, answer);
            inputsText[0].value = "";
            inputsText[1].value = "";
            mainBox.style.display = "block";
            addAnimalBox.style.display = "none";
            start();
        } else {
            printLine("Ошибка ввода", addText);
            setTimeout(() => printLine("Расскажи о животном", addText), 6000);
        }
    };

    buttons[3].onclick = function () {
        inputsText[0].value = "";
        inputsText[1].value = "";
        mainBox.style.display = "block";
        addAnimalBox.style.display = "none";
        start();
    };

}
/*Станица с перечислением вопросов*/
const question = () => {
    /*Проверка массива */
    if (arrayAnimals.length === 0) {
        printLine("Я не знаю ни одного животного. Расскажи)", text);
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
        printLine(`Я знаю только ${arrayAnimals[0].name}. Ты его загадал ?`, text);
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
        let arrayQuestins = Object.keys(arrayAnimals[i].getQuestions());
        let arrayAnswer = Object.values(arrayAnimals[i].getQuestions());
        for (let j = 0; j < arrayQuestins.length; j++) {
            /* j -- индекс вопроса */
            let answer = arrayAnswer[j];
            let question = arrayQuestins[j];
            if (checkAskedQuestion(question)) {
                printLine(question, text);
                buttons[0].textContent = "Да";
                buttons[1].textContent = "Нет";

                buttons[0].onclick = function () {
                    arrayQuestionAsked[question.toLowerCase()] = true;
                    let mayBeAnswer = true;
                    console.log("Ответ положительный");
                    if (checkAnswer(mayBeAnswer, answer)) {
                        // /* Вывод ответа */
                        // printLine(`Это ${arrayAnimals[i].name} ?`, text);
                        // buttons[0].textContent = "Верно";
                        // buttons[1].textContent = "Не верно";

                        // buttons[0].onclick = function () {
                        //     i = 0;
                        //     start();
                        // };
                        // buttons[1].onclick = function () {
                        //     i++;
                        //     question();
                        // };
                    } else if (i === arrayAnimals.length - 1) {
                        printLine("Я сдаюсь", text);
                        buttons[0].textContent = "На старт";
                        buttons[1].textContent = "Сказать ответ";
                        buttons[0].onclick = function () {
                            i = 0;
                            start();
                        };
                        buttons[1].onclick = function () {
                            i = 0;
                            AddNewAnimal();
                        };
                    } else {
                        i++;
                        question();
                    }


                };
                buttons[1].onclick = function () {
                    arrayQuestionAsked[question.toLowerCase()] = false;
                    let mayBeAnswer = false;
                    console.log("Ответ неверный");
                    if (checkAnswer(mayBeAnswer, answer)) {
                        // /* Вывод ответа */
                        // printLine(`Это ${arrayAnimals[i].name} ?`, text);
                        // buttons[0].textContent = "Верно";
                        // buttons[1].textContent = "Не верно";

                        // buttons[0].onclick = function () {
                        //     i = 0;
                        //     start();
                        // };
                        // buttons[1].onclick = function () {
                        //     i = 0;
                        //     AddNewAnimal();
                        // };
                    } else if (i === arrayAnimals.length - 1) {
                        printLine("Я сдаюсь", text);
                        buttons[0].textContent = "На старт";
                        buttons[1].textContent = "Сказать ответ";
                        buttons[0].onclick = function () {
                            i = 0;
                            start();
                        };
                        buttons[1].onclick = function () {
                            i = 0;
                            AddNewAnimal();
                        };
                    } else {
                        i++;
                        question();
                    }

                };
            } else {
                console.log("Проверка не прошла");
               
                /* Что делать если такой вопрос уже был? */
            }
        }


    }

}

start();