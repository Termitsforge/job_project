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
    i = 0;
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
            setTimeout(()=> printLine("Расскажи о животном", addText), 6000);
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
        printLine(arrayAnimals[i].question, text);
        buttons[0].textContent = "Да";
        buttons[1].textContent = "Нет";

        buttons[0].onclick = function () {
            let answer = true;
            if (arrayAnimals[i].checkAnswer(answer)) {
                printLine(`Это ${arrayAnimals[i].name} ?`, text);
                buttons[0].textContent = "Верно";
                buttons[1].textContent = "Не верно";

                buttons[0].onclick = function () {
                    i = 0;
                    start();
                };
                buttons[1].onclick = function () {
                    i++;
                    question();
                };
            } else if (i === arrayAnimals.length - 1) {
                console.log("Я сдаюсь");
            } else {
                i++;
                question();
            }

        };
        buttons[1].onclick = function () {
            let answer = false;
            if (arrayAnimals[i].checkAnswer(answer)) {
                printLine(`Это ${arrayAnimals[i].name} ?`, text);
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
    }

}

start();