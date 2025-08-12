# 📘 Lecture Notes – Day 06: Intro to Node.js and npm

## 🧠 Learning Objectives
By the end of this lesson, students will be able to:
- Explain what Node.js is and how it differs from browser JavaScript
- Initialize a Node.js project with `package.json`
- Install and use packages with `npm`
- Create and import/export modules in Node.js
- Use simple packages like `chalk` for CLI enhancements

---

## 📦 What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome’s V8 engine that lets you run JavaScript outside the browser.

### ✅ Features
- Asynchronous & event-driven
- Ideal for server-side and command-line apps
- Uses CommonJS or ESModules for modular code

```bash
# Test Node installation
node -v
```

```js
// hello.js
console.log("Hello from Node.js!");
```

Run using:
```bash
node hello.js
```

---

## 📁 Initializing a Node Project

```bash
mkdir my-cli-app
cd my-cli-app
npm init -y
```

This creates a `package.json` with metadata:
```json
{
  "name": "my-cli-app",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "license": "ISC"
}
```

---

## 📚 Installing Packages with npm

To install a package:
```bash
npm install chalk
```

Your `package.json` will now have:
```json
"dependencies": {
  "chalk": "^5.3.0"
}
```

---

## 🌈 Using a Package (chalk)

```js
// index.js
import chalk from "chalk";

console.log(chalk.blue("This is a blue message!"));
console.log(chalk.green.bold("Success!"));
```

Run with:
```bash
node index.js
```

---

## 🔄 Creating and Using Modules

### math.js
```js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

### main.js
```js
import { add, multiply } from './math.js';

console.log("2 + 3 =", add(2, 3));
console.log("4 x 5 =", multiply(4, 5));
```

> Note: You must set `"type": "module"` in `package.json` to use `import/export` syntax.

---

## 💡 Challenge: Print Styled Message
1. Create a new folder
2. Run `npm init -y`
3. Install `chalk`
4. Create a script that prints a colorful welcome message using `chalk`

### Example:
```js
import chalk from "chalk";

console.log(chalk.bgMagenta.white.bold(" Welcome to Node CLI Dev! "));
```

---

## 📝 Summary
- Node.js runs JS outside the browser
- `package.json` helps manage your project
- `npm` is a package manager for JS
- You can build CLI tools using Node and modules

Next time: We’ll build our own Node CLI app!
