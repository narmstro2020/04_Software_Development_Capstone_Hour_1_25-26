---
## Capstone Hour 01 Semester 02 - Day 04 & 05 Lesson Plan

### Unit: Modern JavaScript - ES6+ Features
**Topic:** ES6+ Part 02: Ternary, Arrays & Objects, `map`, `filter`, `reduce`, Shorthand Properties  
**Lesson Block:** Day 04 (WARRI) + Day 05 (OR)  
**Project:** Mini Analytics Dashboard (map/reduce on static array data)  
**Duration:** 86 minutes per day

---

## 🧠 Day 04 — WARRI

### W - Welcome (10 minutes)
- Greet students and take attendance.
- Quick review of class norms.
- Display daily agenda and objectives.

### A - Ask & Aim (10 minutes)
**Essential Question:**
- How can we use JavaScript ES6+ features like ternary, object shorthand, and array methods (`map`, `filter`, `reduce`) to process and display data?

**Objectives:**
- Use ternary operators to simplify conditional expressions.
- Create and manipulate arrays and objects.
- Apply `map()`, `filter()`, and `reduce()`.
- Use shorthand syntax in objects.

### R - Review (10 minutes)
- Brief recall:
  - Template literals
  - Arrow functions
- Mini whiteboard quiz:
  - 3 quick questions on arrow functions & template literals

### R - Relevant Instruction (40 minutes)
**Lecture & Demos**

#### 1. Ternary Operators
```js
const age = 18;
const canVote = age >= 18 ? 'Yes' : 'No';
```

#### 2. Arrays and Objects
```js
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];
```

#### 3. `map()`, `filter()`, `reduce()`
```js
const names = users.map(user => user.name); // ['Alice', 'Bob']
const adults = users.filter(user => user.age >= 18);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
```

#### 4. Shorthand Object Properties
```js
const name = 'Charlie';
const age = 28;
const person = { name, age }; // No need to write name: name
```

**Teacher Models:** Console output + browser rendering.  
**Students Follow Along:** Paired programming (teacher-led snippets).

### I - Interactive (6 minutes)
- Students pair up to write a function that returns total scores of students using `reduce()`.
- Example data: 
```js
const scores = [78, 92, 88, 66];
```

---

## 🚀 Day 05 — OR

### O - Ownership (65 minutes)
**Project:** Mini Analytics Dashboard  
- **Objective:** Build a dashboard from a static dataset (students, products, sales, etc.)
- **Must Include:**
  - A dataset array of objects
  - `map()` for extracting labels
  - `filter()` for some conditional display
  - `reduce()` to calculate totals or averages
  - Ternary for visual formatting (e.g., highlight passing/failing)
  - Shorthand object properties when creating new data entries

**Sample Dataset:**
```js
const students = [
  { name: 'Alice', grade: 85 },
  { name: 'Bob', grade: 58 },
  { name: 'Charlie', grade: 95 },
];
```

**Example Goals:**
- Show total number of students
- List names of students with grades above 60
- Calculate class average
- Label students as Pass/Fail using ternary

**Students Work:** Independently or in pairs  
**Deliverable:** HTML + JS browser-based dashboard (no backend)

### R - Resonate (15 minutes)
- Gallery walk (share screens or present dashboards)
- Reflect: What tool (map/filter/reduce) was easiest/hardest?
- Write: One way these tools could be used in real-world development (e.g., dashboards, reports, ecommerce).

---

## 📦 Supplies/Tools
- Computers with browser + IDE (WebStorm or VS Code)
- Console for logging/debugging
- Projector (for walkthrough)

---

## 📘 Instructor Notes
- Encourage creativity with datasets: allow students to choose themes (sports, movies, etc.)
- Scaffold reduce(): have working examples ready for copy-edit-debug cycles
- Remind: All tools are client-side; no fetch/API yet

## ✅ Assessment
- Completion of dashboard (meets data-processing criteria)
- Use of ternary, `map`, `reduce`, object shorthand
- Exit reflection