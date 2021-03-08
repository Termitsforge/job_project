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
    arrayQuestions = [];
let i = 0;

/* Класс Животное */
class Animal {
    constructor(name, numberVet, countGoVet) {
        this.name = name;
        this.numberVet = 0;
        this.countGoVet = 0;
        this.arrayQuestionsOfAnimal = [];
        this.i = arrayAnimals.length;
    }
    addQuestion(question) {
        this.arrayQuestionsOfAnimal.push(question);
    }
    /*Проверка не является ли животное свободной вершиной
    Если является, то возвращает true */
    checkNumVet() {
        if (this.numberVet === this.countGoVet) return true;
        else return false;
    }
    getQuestions() {
        return this.arrayQuestionsOfAnimal[this.countGoVet];
    }
}
class Question {
    constructor(question, animalTrue, animalFalse) {
        this.question = question;
        this.animalTrue = animalTrue;
        this.animalFalse = animalFalse;
    }
    getAnimal(bool) {
        if (bool) return this.animalTrue;
        else return this.animalFalse;
    }

}
/*Функция создание объекта и добавление его в массив
Если животное с таким именем уже созданно, то он просто добавляет ему вопрос*/
const objectFactoryAnimal = (name) => {
    arrayAnimals.push(new Animal(name));
}
const objectFactoryQuestion = (question, animalTrue, animalFalse) => {
    arrayQuestions.push(new Question(question, animalTrue, animalFalse));
    animalTrue.arrayQuestionsOfAnimal.push(arrayQuestions[arrayQuestions.length - 1]);
    animalTrue.numberVet++;
    animalFalse.arrayQuestionsOfAnimal.push(arrayQuestions[arrayQuestions.length - 1]);
    animalFalse.numberVet++;
}

objectFactoryAnimal("Кот");
objectFactoryAnimal("Собака");
objectFactoryQuestion("Он говорит мяу?", arrayAnimals[0], arrayAnimals[1]);
const defaultSittings = () => {
    for (let i = 0; i < arrayAnimals.length; i++) {
        arrayAnimals[i].countGoVet = 0;
    }
}
/* Стартовая страница */
const start = () => {
    defaultSittings();
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
            arrayQuestions = [];
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
    printLine("Расскажи о животном ", addText);
    buttons[2].onclick = function () {
        let animalTrue,
            animalFalse;
        if (!(inputsText[0].value === "") && !(inputsText[1].value === "")) {
            objectFactoryAnimal(inputsText[0].value);
            if (radioButtuns[0].checked) {
                animalTrue = arrayAnimals[arrayAnimals.length - 1];
                animalFalse = arrayAnimals[i];
                radioButtuns[0].checked = false;
            } else {
                animalFalse = arrayAnimals[arrayAnimals.length - 1];
                animalTrue = arrayAnimals[i];
                radioButtuns[1].checked = false;
            }
            objectFactoryQuestion(inputsText[1].value, animalTrue, animalFalse);
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
const addOnlyAnimal = () =>{
    let mainBox = document.querySelector(".main__box"),
        addAnimalBox = document.querySelector(".addNewAnimal"),
        addOnlyBox = document.querySelector(".add__only__animal"),
        inputsText = document.querySelectorAll("input"),
        addText = document.querySelector(".add__only__h1");

    mainBox.style.display = "none";
    addAnimalBox.style.display = "none";
    addOnlyBox.style.display = "block";
    buttons[4].onclick = function () {
        if (!(inputsText[4].value === "")) {
            objectFactoryAnimal(inputsText[4].value);
            inputsText[4].value = "";
            mainBox.style.display = "block";
            addAnimalBox.style.display = "none";
            addOnlyBox.style.display = "none";
            start();
        } else {
            printLine("Ошибка ввода", addText);
            setTimeout(() => printLine("Расскажи о животном", addText), 6000);
        }
    };
    buttons[5].onclick = function () {
        inputsText[4].value = "";
        mainBox.style.display = "block";
        addAnimalBox.style.display = "none";
        addOnlyBox.style.display = "none";
        start();
    };

    printLine("Расскажи о животном ", addText);
}
/*Станица с перечислением вопросов*/

const question = () => {
    function printCorrectAnswer(animal) {
        printLine(`Это ${animal.name} ?`, text);
        buttons[0].textContent = "Верно";
        buttons[1].textContent = "Не верно";

        buttons[0].onclick = function () {
            start();
        };
        buttons[1].onclick = function () {
            AddNewAnimal();
        };
    }
    


    
    /*Проверка на пустой массив */
    let animal = arrayAnimals[i];
    if (arrayAnimals.length === 0) {
        printLine("Я не знаю ни одного животного. Расскажи)", text);
        buttons[0].textContent = "Слушай";
        buttons[1].textContent = "Пока";
        buttons[0].onclick = function () {
            i = 0;
            addOnlyAnimal();
        };
        buttons[1].onclick = function () {
            i = 0;
            start();
        };
<<<<<<< HEAD
    } else if (arrayAnimals.length === 1) {
        printCorrectAnswer(animal);
    } else {
        if (animal.checkNumVet()) {
            printCorrectAnswer(animal);
        } else {
            let questionObject = animal.arrayQuestionsOfAnimal[animal.countGoVet];
            printLine(questionObject.question, text);
            buttons[0].textContent = "Да";
            buttons[1].textContent = "Нет";
            questionObject.getAnimal(true).countGoVet++;
            questionObject.getAnimal(false).countGoVet++;
=======
    } else {
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

>>>>>>> a99d2ab4289f9b93982a6cc97dd63f1efb7f3cce
            buttons[0].onclick = function () {
                i = questionObject.getAnimal(true).i;
                question();
            };
            buttons[1].onclick = function () {
                i = questionObject.getAnimal(false).i;
                question();
<<<<<<< HEAD
            };
=======
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
                for (let k = 0; k < arrayAskedQuestions.length; k++) {
                    if (arrayAskedQuestions[k] === questionAnimals.toLowerCase()) {
                        if (arrayAnswerToQuestions[k]) {
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
                            question();

                        }
                    }
                }
            }
>>>>>>> a99d2ab4289f9b93982a6cc97dd63f1efb7f3cce
        }
    }
}

start();
