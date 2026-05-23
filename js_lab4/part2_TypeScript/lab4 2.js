"use strict";
// Класс User, реализующий интерфейс IUser
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        const message = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        console.log(message);
        return message;
    }
}
// Класс User2, соответствующий псевдониму типа
class User2 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        const message = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        console.log(message);
        return message;
    }
}
// Сигнатуры перегрузки функции distance
function isPoint(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (!("x" in value) || !("y" in value)) {
        return false;
    }
    return typeof value.x === "number" && typeof value.y === "number";
}
// Реализация функции distance
function distance(a, b, c, d) {
    if (typeof a === "number" && typeof b === "number" &&
        typeof c === "number" && typeof d === "number") {
        const dx = c - a;
        const dy = d - b;
        return Math.sqrt(dx * dx + dy * dy);
    }
    if (isPoint(a) && isPoint(b)) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    throw new Error("Неверные аргументы для функции distance");
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = { value, left: null, right: null };
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            }
            else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
            else {
                break;
            }
        }
    }
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value)
                return true;
            if (value < current.value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    }
    findMin(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    delete(value) {
        if (!this.search(value)) {
            return false;
        }
        this.root = this.deleteNode(this.root, value);
        return true;
    }
    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        }
        if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        const successor = this.findMin(node.right);
        node.value = successor.value;
        node.right = this.deleteNode(node.right, successor.value);
        return node;
    }
    update(oldValue, newValue) {
        if (this.search(oldValue)) {
            this.delete(oldValue);
            this.insert(newValue);
            return true;
        }
        return false;
    }
    getHeight() {
        return this.calculateHeight(this.root);
    }
    calculateHeight(node) {
        if (node === null)
            return 0;
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    toArray() {
        const result = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }
    inOrderTraversal(node, result) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }
    clear() {
        this.root = null;
    }
}
class NewRectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
}
class OldRectangleCalculator {
    getArea(length, width) {
        return length * width;
    }
}
class RectangleAdapter {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.oldCalculator = new OldRectangleCalculator();
    }
    calculateArea() {
        return this.oldCalculator.getArea(this.width, this.height);
    }
}
class BubbleSortStrategy {
    sort(data) {
        const result = [...data];
        for (let i = 0; i < result.length - 1; i++) {
            for (let j = 0; j < result.length - 1 - i; j++) {
                if (result[j] > result[j + 1]) {
                    [result[j], result[j + 1]] = [result[j + 1], result[j]];
                }
            }
        }
        return result;
    }
}
class QuickSortStrategy {
    sort(data) {
        return this.quickSortRecursive([...data]);
    }
    quickSortRecursive(arr) {
        if (arr.length <= 1)
            return arr;
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];
        const middle = [];
        for (const item of arr) {
            if (item < pivot)
                left.push(item);
            else if (item > pivot)
                right.push(item);
            else
                middle.push(item);
        }
        return [...this.quickSortRecursive(left), ...middle, ...this.quickSortRecursive(right)];
    }
}
class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(data) {
        return this.strategy.sort(data);
    }
}
class NewsPublisher {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
    publishNews(news) {
        this.notify(news);
    }
}
class Subscriber {
    constructor(name) {
        this.receivedMessages = [];
        this.name = name;
    }
    update(message) {
        this.receivedMessages.push(message);
        console.log(`[${this.name}] Получено: ${message}`);
    }
    getMessages() {
        return [...this.receivedMessages];
    }
    getName() {
        return this.name;
    }
}
// Задание 2
function demonstrateTask2() {
    const user = new User("Алексей", 25);
    const output = user.hello();
    console.log("=== ЗАДАНИЕ 2 (Интерфейс) ===");
    console.log(output);
    const outputDiv = document.getElementById("task2Output");
    if (outputDiv) {
        outputDiv.innerHTML = `
            <strong>Создан объект:</strong><br>
            name: ${user.name}<br>
            age: ${user.age}<br>
            <strong>Вызов hello():</strong><br>
            "${output}"
        `;
    }
}
// Задание 3
function demonstrateTask3() {
    const user = new User2("Мария", 22);
    const output = user.hello();
    console.log("=== ЗАДАНИЕ 3 (Псевдоним типа) ===");
    console.log(output);
    const outputDiv = document.getElementById("task3Output");
    if (outputDiv) {
        outputDiv.innerHTML = `
            <strong>Создан объект:</strong><br>
            name: ${user.name}<br>
            age: ${user.age}<br>
            <strong>Вызов hello():</strong><br>
            "${output}"
        `;
    }
}
// Задание 4
function demonstrateTask4() {
    const dist1 = distance(0, 0, 3, 4);
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 3, y: 4 };
    const dist2 = distance(point1, point2);
    console.log("=== ЗАДАНИЕ 4 (Перегрузка) ===");
    console.log(`distance(0, 0, 3, 4) = ${dist1}`);
    console.log(`distance(p1, p2) = ${dist2}`);
    const outputDiv = document.getElementById("task4Output");
    if (outputDiv) {
        outputDiv.innerHTML = `
            <strong>Способ 1 (координаты):</strong><br>
            distance(0, 0, 3, 4) = ${dist1}<br><br>
            <strong>Способ 2 (объекты точек):</strong><br>
            p1 = { x: 0, y: 0 }, p2 = { x: 3, y: 4 }<br>
            distance(p1, p2) = ${dist2}<br><br>
            <strong>Расстояние:</strong> ${dist1}
        `;
    }
}
// Задание 5
function demonstrateTask5() {
    const tree = new BinaryTree();
    const valuesToInsert = [50, 30, 70, 20, 40, 60, 80, 10, 25, 45, 55, 65, 75, 85];
    for (const val of valuesToInsert)
        tree.insert(val);
    console.log("=== ЗАДАНИЕ 5 (Бинарное дерево) ===");
    console.log("Дерево:", tree.toArray());
    tree.delete(70);
    const height = tree.getHeight();
    const outputDiv = document.getElementById("task5Output");
    if (outputDiv) {
        outputDiv.innerHTML = `
            <strong>Вставлены элементы:</strong> [50, 30, 70, 20, 40, 60, 80, 10, 25, 45, 55, 65, 75, 85]<br><br>
            <strong>Дерево (отсортированное):</strong> [${tree.toArray().join(", ")}]<br><br>
            <strong>Поиск 25:</strong> ${tree.search(25) ? "найден" : "не найден"}<br>
            <strong>Поиск 100:</strong> ${tree.search(100) ? "найден" : "не найден"}<br><br>
            <strong>Высота дерева:</strong> ${height}<br>
            <strong>Изменение 20 → 22:</strong> ${tree.update(20, 22) ? "успешно" : "не удалось"}<br>
            <strong>Удаление 70:</strong> успешно<br>
            <strong>Финальное дерево:</strong> [${tree.toArray().join(", ")}]
        `;
    }
}
// Задание 6
function demonstrateTask6() {
    const output = [];
    console.log("=== ЗАДАНИЕ 6 (Паттерны) ===");
    // Adapter
    console.log("\n--- Adapter ---");
    output.push("<strong>--- Adapter (Адаптер) ---</strong>");
    const newRect = new NewRectangle(5, 10);
    const adaptedRect = new RectangleAdapter(5, 10);
    console.log(`Новый прямоугольник: площадь = ${newRect.calculateArea()}`);
    console.log(`Адаптированный: площадь = ${adaptedRect.calculateArea()}`);
    output.push(`Новый прямоугольник: площадь = ${newRect.calculateArea()}`);
    output.push(`Адаптированный прямоугольник: площадь = ${adaptedRect.calculateArea()}`);
    // Strategy
    console.log("\n--- Strategy ---");
    output.push("<br><strong>--- Strategy (Стратегия) ---</strong>");
    const data = [64, 25, 12, 22, 11, 90, 33, 45, 78, 5];
    output.push(`Исходный массив: [${data.join(", ")}]`);
    const bubbleSorter = new Sorter(new BubbleSortStrategy());
    const bubbleResult = bubbleSorter.sort(data);
    console.log(`Сортировка пузырьком: [${bubbleResult.join(", ")}]`);
    output.push(`Сортировка пузырьком: [${bubbleResult.join(", ")}]`);
    const quickSorter = new Sorter(new QuickSortStrategy());
    const quickResult = quickSorter.sort(data);
    console.log(`Быстрая сортировка: [${quickResult.join(", ")}]`);
    output.push(`Быстрая сортировка: [${quickResult.join(", ")}]`);
    // Observer
    console.log("\n--- Observer ---");
    output.push("<br><strong>--- Observer (Наблюдатель) ---</strong>");
    const publisher = new NewsPublisher();
    const sub1 = new Subscriber("Алексей");
    const sub2 = new Subscriber("Мария");
    const sub3 = new Subscriber("Иван");
    publisher.attach(sub1);
    publisher.attach(sub2);
    publisher.publishNews("Новая версия выпущена!");
    publisher.attach(sub3);
    publisher.publishNews("Техобслуживание в пятницу");
    publisher.detach(sub2);
    publisher.publishNews("Исправлена критическая ошибка");
    output.push(`Подписчик ${sub1.getName()} получил ${sub1.getMessages().length} сообщений`);
    output.push(`Подписчик ${sub2.getName()} получил ${sub2.getMessages().length} сообщений`);
    output.push(`Подписчик ${sub3.getName()} получил ${sub3.getMessages().length} сообщений`);
    const outputDiv = document.getElementById("task6Output");
    if (outputDiv) {
        outputDiv.innerHTML = output.join("<br>");
    }
}
// НАВЕШИВАНИЕ ОБРАБОТЧИКОВ И ЗАПУСК
function init() {
    // Задание 2
    const btn2 = document.getElementById("task2Btn");
    if (btn2)
        btn2.addEventListener("click", demonstrateTask2);
    // Задание 3
    const btn3 = document.getElementById("task3Btn");
    if (btn3)
        btn3.addEventListener("click", demonstrateTask3);
    // Задание 4
    const btn4_1 = document.getElementById("task4Btn1");
    const btn4_2 = document.getElementById("task4Btn2");
    if (btn4_1)
        btn4_1.addEventListener("click", demonstrateTask4);
    if (btn4_2)
        btn4_2.addEventListener("click", demonstrateTask4);
    // Задание 5
    const btn5 = document.getElementById("task5Btn");
    if (btn5)
        btn5.addEventListener("click", demonstrateTask5);
    // Задание 6
    const btn6 = document.getElementById("task6Btn");
    if (btn6)
        btn6.addEventListener("click", demonstrateTask6);
    // Автоматический запуск при загрузке
    demonstrateTask2();
    demonstrateTask3();
    demonstrateTask4();
    demonstrateTask5();
    demonstrateTask6();
}
// Запускаем после загрузки DOM
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
