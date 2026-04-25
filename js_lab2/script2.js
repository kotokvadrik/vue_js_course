"use strict";

function clearResult() {
    document.getElementById("result").textContent = "";
}

function write(text) {
    document.getElementById("result").textContent += text + "\n";
}

// Задание 1, 3, 4
class User {
    #age;
    constructor(name, age, tel) {
        this.name = name;
        this._tel = "";
        this.#age = 1;
        this.age = age;
        this.tel = tel;
    }
    hello() {
        const message = "Hi! My name is " + this.name + ". And I am " + this.age + " years old.";
        console.log(message);
        return message;
    }
    get tel() {
        return this._tel;
    }
    set tel(value) {
        if (/^\+7\d{10}$/.test(value)) {
            this._tel = value;
        } else {
            write("Incorrect phone. Correct format: +7xxxxxxxxxx");
        }
    }
    get age() {
        return this.#age;
    }
    set age(value) {
        value = Number(value);
        if (Number.isInteger(value) && value >= 1 && value <= 100) {
            this.#age = value;
        } else {
            write("Incorrect age. Age must be an integer from 1 to 100.");
        }
    }
}
// Задание 2, User через функцию-конструктор
function UserFunction(name, age) {
    this.name = name;
    this.age = age;
}

UserFunction.prototype.hello = function () {
    const message = "Hi! My name is " + this.name + ". And I am " + this.age + " years old.";
    console.log(message);
    return message;
};

// Задание 5
class Student extends User {
    #knowledge = 0;
    get knowledge() {
        return this.#knowledge;
    }
    hello() {
        const message = "Hi! My name is " + this.name + ". I am " + this.age + " years old. And I am a student!";
        console.log(message);
        return message;
    }
    learn() {
        this.#knowledge = this.#knowledge + 1;
    }
}

function task1() {
    clearResult();
    const user = new User("Ivan", 25, "+79991234567");
    const message = user.hello();
    write("Задание 1. Класс User:");
    write(message);
    write("Сообщение также выведено в консоль.");
}

function task2() {
    clearResult();
    const user = new UserFunction("Anna", 19);
    const message = user.hello();
    write("Задание 2. User через функцию-конструктор:");
    write(message);
    write("Сообщение также выведено в консоль.");
}

function task3() {
    clearResult();
    const user = new User("Ivan", 25, "+79991234567");
    write("Задание 3. Поле tel через getter/setter:");
    write("Начальный телефон: " + user.tel);
    user.tel = "+71234567890";
    write("После допустимой записи: " + user.tel);
    user.tel = "12345";
    write("После недопустимой записи телефон не изменился: " + user.tel);
}

function task4() {
    clearResult();
    const user = new User("Ivan", 25, "+79991234567");
    write("Задание 4. Поле age через getter/setter и private field:");
    write("Начальный возраст: " + user.age);
    user.age = 40;
    write("После допустимой записи: " + user.age);
    user.age = 101;
    write("После недопустимой записи возраст не изменился: " + user.age);
    write("Поле #age является приватным. Напрямую обратиться к нему нельзя.");
}

function task5() {
    clearResult();
    const student = new Student("Petr", 20, "+79990000000");
    const message = student.hello();
    write("Задание 5. Класс Student наследуется от User:");
    write(message);
    write("knowledge до learn(): " + student.knowledge);
    student.learn();
    student.learn();
    write("knowledge после двух вызовов learn(): " + student.knowledge);
    try {
        student.knowledge = 100;
    } catch (error) {
        write("Изменить knowledge напрямую нельзя.");
    }
    write("knowledge после попытки изменить напрямую: " + student.knowledge);
}

function task6() {
    clearResult();
    Array.prototype.reverse = function () {
        const copy = this.slice();
        for (let i = 0; i < copy.length; i++) {
            this.push(copy[i]);
        }
        return this;
    };
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    write("Задание 6. Измененный reverse():");
    write("[1, 2, 3, 4, 5].reverse() возвращает:");
    write("[" + result.join(", ") + "]");
}