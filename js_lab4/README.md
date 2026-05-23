# Лабораторная работа №4

## Структура проекта

- `part1_SCSS_SASS` — задания по SCSS/SASS/Less.
- `part2_TypeScript` — задания по TypeScript.

## Часть 1. SCSS/SASS/Less

Файлы:

- `lab4 1.html` — страница для просмотра результата;
- `lab4 1.scss` — исходный файл SCSS;
- `lab4 1.sass` — версия на синтаксисе SASS;
- `lab4 1.less` — версия на Less;
- `lab4 1.css` — скомпилированный CSS;
- `lab4 1.less.css` — CSS, скомпилированный из Less.

### Запуск

Открыть файл:

```text
part1_SCSS_SASS/lab4 1.html
```

### Компиляция

Из папки `part1_SCSS_SASS`:

```bash
sass.cmd --watch "lab4 1.scss:lab4 1.css"
sass.cmd --watch "lab4 1.sass:lab4 1.css"
lessc.cmd "lab4 1.less" "lab4 1.less.css"
```

## Часть 2. TypeScript

Файлы:

- `lab4 2.html` — страница для демонстрации работы программы;
- `lab4 2.ts` — исходный TypeScript-код;
- `lab4 2.js` — скомпилированный JavaScript-код;
- `tsconfig.json` — настройки компиляции TypeScript.

### Запуск

Открыть файл:

```text
part2_TypeScript/lab4 2.html
```

### Компиляция

Из папки `part2_TypeScript`:

```bash
tsc.cmd --watch -p "tsconfig.json"
```

