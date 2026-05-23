// 2
function protectPage() {
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

}
protectPage();

// 3 и 4
function createClicker() {
    const container = document.getElementById('dynamic-content');
    const clickerCard = document.createElement('div');
    clickerCard.className = 'task-card';
    clickerCard.id = 'clicker-card';
    clickerCard.innerHTML = `
        <div class="task-title">Задания 3 и 4: Кликер</div>
        <div class="clicker-area">
            <div class="clicker-counter" id="clicker-counter">0</div>
            <button class="clicker-button" id="clicker-button">Кликни</button>
            <div class="clicker-stats">
                <div>Среднее количество кликов в секунду: <span id="cps-display">0.00</span></div>
                <div>Время с момента запуска: <span id="time-display">0</span> сек</div>
                <div>Всего кликов: <span id="total-clicks">0</span></div>
            </div>
        </div>
    `;

    container.appendChild(clickerCard);
    let totalClicks = 0;
    let startTime = Date.now();
    let clickTimes = [];
    let animationId = null;

    const savedClicks = localStorage.getItem('clickerCounter');
    if (savedClicks !== null) {
        totalClicks = parseInt(savedClicks);
    }

    const counterElement = document.getElementById('clicker-counter');
    const totalClicksElement = document.getElementById('total-clicks');
    counterElement.textContent = totalClicks;
    totalClicksElement.textContent = totalClicks;

    function updateCPS() {
        const now = Date.now();
        const elapsedSeconds = (now - startTime) / 1000;

        document.getElementById('time-display').textContent = elapsedSeconds.toFixed(1);

        const fiveSecondsAgo = now - 5000;
        const recentClicks = clickTimes.filter(time => time >= fiveSecondsAgo);
        const cps = recentClicks.length / 5;

        document.getElementById('cps-display').textContent = cps.toFixed(2);
    }

    function animateCPS() {
        updateCPS();
        animationId = requestAnimationFrame(animateCPS);
    }

    animateCPS();
    const clickButton = document.getElementById('clicker-button');
    clickButton.addEventListener('click', function() {
        totalClicks++;
        clickTimes.push(Date.now());
        const tenSecondsAgo = Date.now() - 10000;
        clickTimes = clickTimes.filter(time => time >= tenSecondsAgo);

        counterElement.textContent = totalClicks;
        totalClicksElement.textContent = totalClicks;

        localStorage.setItem('clickerCounter', totalClicks);

        clickButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickButton.style.transform = 'scale(1)';
        }, 100);
    });
}

// 5 и 6

function infixToRPN(expression) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const output = [];
    const operators = [];
    const tokens = expression.match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);

    if (!tokens) return [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isNaN(token)) {
            output.push(token);
        }
        else if (token === '(') {
            operators.push(token);
        }
        else if (token === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop();
        }
        else if ('+-*/'.includes(token)) {
            if (token === '-' && (i === 0 || '+-*/('.includes(tokens[i - 1]))) {
                output.push('0');
            }

            while (operators.length > 0 &&
            operators[operators.length - 1] !== '(' &&
            precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }
    while (operators.length > 0) {
        output.push(operators.pop());
    }
    return output;
}

function evaluateRPN(rpn) {
    const stack = [];

    for (const token of rpn) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/':
                    if (b === 0) {
                        throw new Error('Деление на ноль');
                    }
                    stack.push(a / b);
                    break;
                default: throw new Error('Неизвестный оператор');
            }
        }
    }

    return stack[0];
}

function createCalculator() {
    const container = document.getElementById('dynamic-content');
    const calculatorCard = document.createElement('div');
    calculatorCard.className = 'task-card';
    calculatorCard.id = 'calculator-card';
    calculatorCard.innerHTML = `
        <div class="task-title">Задания 5 и 6: Калькулятор</div>
        <div class="calculator">
            <input type="text" class="calculator-screen" id="calc-screen" readonly value="0">
            <div class="calculator-buttons">
                <button class="calc-btn bracket" data-value="(">(</button>
                <button class="calc-btn bracket" data-value=")">)</button>
                <button class="calc-btn clear" data-value="C">C</button>
                <button class="calc-btn operator" data-value="/">/</button>
                
                <button class="calc-btn number" data-value="7">7</button>
                <button class="calc-btn number" data-value="8">8</button>
                <button class="calc-btn number" data-value="9">9</button>
                <button class="calc-btn operator" data-value="*">*</button>
                
                <button class="calc-btn number" data-value="4">4</button>
                <button class="calc-btn number" data-value="5">5</button>
                <button class="calc-btn number" data-value="6">6</button>
                <button class="calc-btn operator" data-value="-">-</button>
                
                <button class="calc-btn number" data-value="1">1</button>
                <button class="calc-btn number" data-value="2">2</button>
                <button class="calc-btn number" data-value="3">3</button>
                <button class="calc-btn operator" data-value="+">+</button>
                
                <button class="calc-btn number" data-value="0">0</button>
                <button class="calc-btn number" data-value=".">.</button>
                <button class="calc-btn equals" data-value="=">=</button>
            </div>
        </div>
        <p style="margin-top: 15px; font-size: 12px; color: #666; text-align: center;">
            Поддерживаются: +, -, *, /, (, ). Используйте кнопки для ввода.
        </p>
    `;

    container.appendChild(calculatorCard);

    const screen = document.getElementById('calc-screen');
    let currentExpression = '';

    function updateScreen() {
        if (currentExpression === '') {
            screen.value = '0';
        } else {
            screen.value = currentExpression;
        }
    }

    function handleButtonClick(value) {
        if (value === 'C') {
            currentExpression = '';
            updateScreen();
        }
        else if (value === '=') {
            try {
                if (currentExpression === '') {
                    return;
                }
                const rpn = infixToRPN(currentExpression);
                if (rpn.length === 0) {
                    screen.value = 'Ошибка';
                    return;
                }

                const result = evaluateRPN(rpn);
                const roundedResult = Math.round(result * 10000000000) / 10000000000;
                currentExpression = String(roundedResult);
                updateScreen();
            } catch (error) {
                screen.value = 'Ошибка';
                console.error(error);
                setTimeout(() => {
                    currentExpression = '';
                    updateScreen();
                }, 1000);
            }
        }
        else {
            const lastChar = currentExpression[currentExpression.length - 1];
            const operators = ['+', '-', '*', '/'];

            if (operators.includes(value) && operators.includes(lastChar)) {
                currentExpression = currentExpression.slice(0, -1) + value;
            } else {
                currentExpression += value;
            }
            updateScreen();
        }
    }

    const buttons = calculatorCard.querySelectorAll('.calc-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', '.', 'Enter', 'Escape', 'Backspace'];

        if (validKeys.includes(key)) {
            e.preventDefault();
            if (key === 'Enter') {
                handleButtonClick('=');
            } else if (key === 'Escape' || key === 'Backspace' && currentExpression.length === 0) {
                handleButtonClick('C');
            } else if (key === 'Backspace') {
                currentExpression = currentExpression.slice(0, -1);
                updateScreen();
            } else {
                handleButtonClick(key);
            }
        }
    });
}

window.addEventListener('load', function() {
    createClicker();
    createCalculator();

    let pageLoadCounter = localStorage.getItem('pageLoadCounter');
    if (pageLoadCounter === null) {
        localStorage.setItem('pageLoadCounter', '1');
    } else {
        localStorage.setItem('pageLoadCounter', parseInt(pageLoadCounter) + 1);
    }
});