# Capstone Hour 01 – Semester 02  
## Day 06 – WARR  
**Topic:** Intro to Node.js and npm: Modules, `package.json`, Installing Packages  
**Duration:** 86 minutes  
**Protocol:** WARRI (Welcome, Aim, Review, Relevant Instruction, Interactive)

---

### 🟩 Welcome (5 min)
- Greet students and take attendance
- Icebreaker: "Who’s heard of Node.js?"
- Set up today's GitHub repo

---

### 🎯 Aim (3 min)
> **"How can we use Node.js and npm to build backend and CLI tools in JavaScript?"**

---

### 🔁 Review (10 min)
- Quick review of:
  - `const`, `let`, arrow functions
  - Browser-based JavaScript modules (import/export)
- Recap: Previous project (Story Generator)

---

### 📚 Relevant Instruction (45 min)

#### What is Node.js?
- JavaScript runtime using Chrome’s V8 engine
- Allows JS to run outside the browser
- Use case: backend and CLI apps
```bash
node hello.js
```

#### Installing Node.js and npm
- Go to: [https://nodejs.org](https://nodejs.org)
- Run `node -v` and `npm -v` to verify installation

#### package.json
- Metadata file for your project
- Created using:
```bash
npm init -y
```

#### Installing Packages
- Example: Install `chalk`:
```bash
npm install chalk
```

#### Node Modules
- `math.js`
```js
export function add(a, b) {
  return a + b;
}
```
- `main.js`
```js
import { add } from './math.js';
console.log(add(2, 3));
```

#### Using chalk
```js
import chalk from 'chalk';
console.log(chalk.green('Success!'));
```

---

### 🧠 Interactive (20 min)
**Student Activity**
1. Install Node.js
2. Create a project folder and initialize with `npm init -y`
3. Install `chalk`
4. Write a script that prints a styled message
