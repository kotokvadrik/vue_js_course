

// Интерфейс для типизации экземпляров класса User
interface IUser {
    name: string;
    age: number;
    hello(): string;
}

// Класс User, реализующий интерфейс IUser
class User implements IUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): string {
        const message: string = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        console.log(message);
        return message;
    }
}

// ===== ЗАДАНИЕ 3: Класс User с псевдонимом типа =====

// Псевдоним типа для экземпляров класса User
type TUser = {
    name: string;
    age: number;
    hello(): string;
};

// Класс User2, соответствующий псевдониму типа
class User2 implements TUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): string {
        const message: string = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
        console.log(message);
        return message;
    }
}

// ===== ЗАДАНИЕ 4: Перегруженная функция distance =====

// Тип для точки (объект с координатами x и y)
type TPoint = {
    x: number;
    y: number;
};

// Сигнатуры перегрузки функции distance
function isPoint(value: unknown): value is TPoint {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    if (!("x" in value) || !("y" in value)) {
        return false;
    }

    return typeof value.x === "number" && typeof value.y === "number";
}

// Сигнатуры перегрузки функции distance
function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: TPoint, p2: TPoint): number;

// Реализация функции distance
function distance(a: unknown, b: unknown, c?: unknown, d?: unknown): number {
    if (typeof a === "number" && typeof b === "number" &&
        typeof c === "number" && typeof d === "number") {
        const dx: number = c - a;
        const dy: number = d - b;
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (isPoint(a) && isPoint(b)) {
        const dx: number = b.x - a.x;
        const dy: number = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    throw new Error("Неверные аргументы для функции distance");
}

// ===== ЗАДАНИЕ 5: Бинарное дерево =====

// Тип для узла дерева
type TTreeNode = {
    value: number;
    left: TTreeNode | null;
    right: TTreeNode | null;
};

class BinaryTree {
    private root: TTreeNode | null = null;

    insert(value: number): void {
        const newNode: TTreeNode = { value, left: null, right: null };

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current: TTreeNode = this.root;

        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else {
                break;
            }
        }
    }

    search(value: number): boolean {
        let current: TTreeNode | null = this.root;

        while (current !== null) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    private findMin(node: TTreeNode): TTreeNode {
        let current: TTreeNode = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    delete(value: number): boolean {
        if (!this.search(value)) {
            return false;
        }

        this.root = this.deleteNode(this.root, value);
        return true;
    }

    private deleteNode(node: TTreeNode | null, value: number): TTreeNode | null {
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

        const successor: TTreeNode = this.findMin(node.right);
        node.value = successor.value;
        node.right = this.deleteNode(node.right, successor.value);
        return node;
    }

    update(oldValue: number, newValue: number): boolean {
        if (this.search(oldValue)) {
            this.delete(oldValue);
            this.insert(newValue);
            return true;
        }
        return false;
    }

    getHeight(): number {
        return this.calculateHeight(this.root);
    }

    private calculateHeight(node: TTreeNode | null): number {
        if (node === null) return 0;
        const leftHeight: number = this.calculateHeight(node.left);
        const rightHeight: number = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    toArray(): number[] {
        const result: number[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: TTreeNode | null, result: number[]): void {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }

    clear(): void {
        this.root = null;
    }
}

// ===== ЗАДАНИЕ 6: Паттерны =====

// ---------- Adapter ----------
interface IRectangle {
    width: number;
    height: number;
    calculateArea(): number;
}

class NewRectangle implements IRectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

class OldRectangleCalculator {
    getArea(length: number, width: number): number {
        return length * width;
    }
}

class RectangleAdapter implements IRectangle {
    width: number;
    height: number;
    private oldCalculator: OldRectangleCalculator;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.oldCalculator = new OldRectangleCalculator();
    }

    calculateArea(): number {
        return this.oldCalculator.getArea(this.width, this.height);
    }
}

// ---------- Strategy ----------
interface ISortStrategy {
    sort(data: number[]): number[];
}

class BubbleSortStrategy implements ISortStrategy {
    sort(data: number[]): number[] {
        const result: number[] = [...data];
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

class QuickSortStrategy implements ISortStrategy {
    sort(data: number[]): number[] {
        return this.quickSortRecursive([...data]);
    }

    private quickSortRecursive(arr: number[]): number[] {
        if (arr.length <= 1) return arr;

        const pivot: number = arr[Math.floor(arr.length / 2)];
        const left: number[] = [];
        const right: number[] = [];
        const middle: number[] = [];

        for (const item of arr) {
            if (item < pivot) left.push(item);
            else if (item > pivot) right.push(item);
            else middle.push(item);
        }

        return [...this.quickSortRecursive(left), ...middle, ...this.quickSortRecursive(right)];
    }
}

class Sorter {
    private strategy: ISortStrategy;

    constructor(strategy: ISortStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ISortStrategy): void {
        this.strategy = strategy;
    }

    sort(data: number[]): number[] {
        return this.strategy.sort(data);
    }
}

// ---------- Observer ----------
interface IObserver {
    update(message: string): void;
}

interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(message: string): void;
}

class NewsPublisher implements ISubject {
    private observers: IObserver[] = [];

    attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const index: number = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(message: string): void {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }

    publishNews(news: string): void {
        this.notify(news);
    }
}

class Subscriber implements IObserver {
    private name: string;
    private receivedMessages: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    update(message: string): void {
        this.receivedMessages.push(message);
        console.log(`[${this.name}] Получено: ${message}`);
    }

    getMessages(): string[] {
        return [...this.receivedMessages];
    }

    getName(): string {
        return this.name;
    }
}

// ============================================
// ДЕМОНСТРАЦИЯ ВСЕХ ЗАДАНИЙ
// ============================================

// Задание 2
function demonstrateTask2() {
    const user: IUser = new User("Алексей", 25);
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
    const user: TUser = new User2("Мария", 22);
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
    const point1: TPoint = { x: 0, y: 0 };
    const point2: TPoint = { x: 3, y: 4 };
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
    for (const val of valuesToInsert) tree.insert(val);

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
    const output: string[] = [];

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

// ============================================
// НАВЕШИВАНИЕ ОБРАБОТЧИКОВ И ЗАПУСК
// ============================================

function init() {
    // Задание 2
    const btn2 = document.getElementById("task2Btn");
    if (btn2) btn2.addEventListener("click", demonstrateTask2);

    // Задание 3
    const btn3 = document.getElementById("task3Btn");
    if (btn3) btn3.addEventListener("click", demonstrateTask3);

    // Задание 4
    const btn4_1 = document.getElementById("task4Btn1");
    const btn4_2 = document.getElementById("task4Btn2");
    if (btn4_1) btn4_1.addEventListener("click", demonstrateTask4);
    if (btn4_2) btn4_2.addEventListener("click", demonstrateTask4);

    // Задание 5
    const btn5 = document.getElementById("task5Btn");
    if (btn5) btn5.addEventListener("click", demonstrateTask5);

    // Задание 6
    const btn6 = document.getElementById("task6Btn");
    if (btn6) btn6.addEventListener("click", demonstrateTask6);

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
} else {
    init();
}

