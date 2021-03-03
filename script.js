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
    arrayAnimals = [],
    arrayQuestionAsked = {};

/* Класс Животное */
class Animal {
    constructor(name) {
        this.name = name;
        this.questions = {};
    }
    addQuestion(questionAnimals, answer) {
        this.questions[questionAnimals] = answer;
    }
    getQuestions() {
        if (arrayAnimals.length === 0){
            return {};
        }else return this.questions;
    }
    toString() {
        console.log(`Name : ${this.name}; Question : ${this.questionAnimals};  Answer : ${this.answer};`);
    }
}

function checkAnswer(mayBeAnswer, answer) {
    if (mayBeAnswer === answer) {
        return true;
    } else return false;
}


/*Функция для проверки не был ли уже задан такой вопрос
Если такой вопрос ещё не задавали, то функция возвращала true, если задавали, то false */
const checkAskedQuestion = (questionAnimals) => {
    let count = 0,
        result;
    if (arrayQuestionAsked.length !== 0) {
        array = Object.keys(arrayQuestionAsked);
        for (let i = 0; i < array.length; i++) {
            if (array[i] === questionAnimals.toLowerCase()) {
                count++;
            }
        }
        if (count === 0) {
            result = true;
        } else result = false;
    } else result = true;
    return result;
}
/*Функция создание объекта и добавление его в массив
Если животное с таким именем уже созданно, то он просто добавляет ему вопрос*/
const objectFactory = (name, questionAnimals, answer) => {
    let count = 0;
    for (let i = 0; i < arrayAnimals.length; i++) {
        if (arrayAnimals[i].name.toLowerCase() == name.toLowerCase()) {
            arrayAnimals[i].addQuestion(questionAnimals, answer);
            count++;
        }
    }
    if (count === 0) {
        arrayAnimals.push(new Animal(name));
        arrayAnimals[arrayAnimals.length - 1].addQuestion(questionAnimals, answer);
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
            arrayQuestionAsked = {};
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
        arrayQuestionAsked = {};
        start();
    };

}
/*Станица с перечислением вопросов*/
let i = 0,
    j = 0,
    count = 0;
const question = () => {
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
    }else{
        let arrayQuestins = Object.keys(arrayAnimals[i].getQuestions()),
            arrayAnswer = Object.values(arrayAnimals[i].getQuestions()),
            answer = arrayAnswer[j],
            questionAnimals = arrayQuestins[j];
        /* 
        arrayQuestins -- массив вопросов определённого животного
        arrayAnswer -- массив ответов на вопросы
        j -- индекс вопроса
        count -- счетчик правильных ответов */
        /*Функция вывода правильного ответа */
        function iGiveUp() {
            printLine("Я сдаюсь", text);
            buttons[0].textContent = "На старт";
            buttons[1].textContent = "Сказать ответ";
            buttons[0].onclick = function () {
                i = 0;
                j = 0;
                count = 0;
                start();
            };
            buttons[1].onclick = function () {
                i = 0;
                j = 0;
                count = 0;
                AddNewAnimal();
            };
        }

        function printCorrectAnswer() {
            printLine(`Это ${arrayAnimals[i].name} ?`, text);
            buttons[0].textContent = "Верно";
            buttons[1].textContent = "Не верно";

            buttons[0].onclick = function () {
                i = 0;
                j = 0;
                count = 0;
                arrayQuestionAsked = {};
                start();
            };
            buttons[1].onclick = function () {
                i = 0;
                j = 0;
                count = 0;
                arrayQuestionAsked = {};
                AddNewAnimal();
            };
        }

        function buttonHandling(bool) {
            arrayQuestionAsked[questionAnimals.toLowerCase()] = bool;
            let mayBeAnswer = bool;
            if (checkAnswer(mayBeAnswer, answer)) {
                count++;
                if (count === 3) {
                    printCorrectAnswer();
                }
                if (j === arrayQuestins.length - 1) {
                    if (count === arrayQuestins.length) {
                        printCorrectAnswer();
                    } else {
                        i++;
                        j = 0;
                        count = 0;
                    }
                } else {
                    j++;
                    question();
                }

            } else if (i === arrayAnimals.length - 1) {
                iGiveUp();
            } else {
                i++;
                j = 0;
                count = 0;
                question();
            }
        }
        /*Проверка массива */
        if (arrayAnimals.length === 1) {
            printCorrectAnswer();

        } else {
            if (checkAskedQuestion(questionAnimals)) {
                printLine(questionAnimals, text);
                buttons[0].textContent = "Да";
                buttons[1].textContent = "Нет";

                buttons[0].onclick = function () {
                    buttonHandling(true);
                };
                buttons[1].onclick = function () {
                    buttonHandling(false);
                };
            } else {
                arrayAskedQuestions = Object.keys(arrayQuestionAsked);
                arrayAnswerToQuestions = Object.values(arrayQuestionAsked);
                for (let i = 0; i < arrayAskedQuestions.length; i++) {
                    if (arrayAskedQuestions[i] === questionAnimals.toLowerCase()) {
                        if (arrayAnswerToQuestions[i]) {
                            count++;
                            if (count === 3) {
                                printCorrectAnswer();
                            }
                            if (j === arrayQuestins.length - 1) {
                                if (count === arrayQuestins.length) {
                                    printCorrectAnswer();
                                } else {
                                    i++;
                                    j = 0;
                                    count = 0;
                                }
                            } else {
                                j++;
                                question();
                            }
                        } else if (i === arrayAnimals.length - 1) {
                            iGiveUp();
                        } else {
                            if (j === arrayQuestins.length - 1) {
                                i++;
                                j = 0;
                            } else j++;
                            question();
                        }
                    }
                }
            }
        }
    }
}


start();