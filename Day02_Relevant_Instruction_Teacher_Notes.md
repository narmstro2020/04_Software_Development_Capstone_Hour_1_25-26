
# 📝 Teacher Notes – Relevant Instruction (Day 02)

**Topic:** Template Literals & Arrow Functions  
**Time:** 35 minutes  
**Section:** R – Relevant Instruction  
**Objective:** Students will be able to use template literals and arrow functions to generate formatted strings in JavaScript.

---

## 🔹 Learning Targets
- Understand and write arrow function expressions  
- Use template literals to embed variables inside strings  
- Compare ES5 syntax with ES6+ equivalents  

---

## 🔹 Instructional Strategy
✅ **Mini-lesson** → ✅ **Live modeling** → ✅ **Think-Pair-Share** → ✅ **Error correction task**

---

## 🖥️ Script & Activity Breakdown

### 1. Intro (3 mins)
Prompt students with:
> “How did we combine strings before template literals?”

Write on board:
```js
var message = "Hello, " + name + "!";
```

Then write:
```js
const message = `Hello, ${name}!`;
```

Explain how backticks `` ` `` allow embedded variables using `${}` syntax.

---

### 2. Template Literals Demo (7 mins)
**Live Code Example:**
```js
const createGreeting = (name, place) => {
  return `${name} arrived at ${place} feeling excited.`;
};
```

- Type this in real time
- Log sample outputs in console
- Ask students to change inputs and re-run

📌 *Highlight how readable and natural the syntax becomes.*

---

### 3. Arrow Function Syntax Explanation (8 mins)
Show this transformation:
```js
function greet(name) {
  return "Hello, " + name;
}
```
Becomes:
```js
const greet = name => `Hello, ${name}`;
```

🧠 Ask:
- "What changed?"
- "When do you need parentheses?"
- "When do you need curly braces?"

📝 Chart on board:

| Format         | Example                |
|----------------|------------------------|
| One parameter  | `name => ...`          |
| Multiple       | `(a, b) => ...`        |
| Block body     | `() => { ... }`        |

---

### 4. Think-Pair-Share (5 mins)
Prompt:
> “Write a one-line arrow function that takes a fruit and a color and returns a sentence using both.”

Students pair and share. Volunteers show answers.

Example:
```js
const describeFruit = (fruit, color) => `${fruit} is usually ${color}.`;
```

---

### 5. Syntax Challenge: Fix My Code (10 mins)
**Activity:** Show students 3 broken arrow functions. Fix in teams.

Example:
```js
const greet = name => {
  return "Hi ${name}";
}
```

✅ Correct version:
```js
const greet = name => `Hi ${name}`;
```

---

## 🧩 Differentiation

| Learner Level | Strategy                                                        |
|---------------|-----------------------------------------------------------------|
| Struggling    | Provide side-by-side ES5 to ES6 comparisons, sentence starters  |
| ELL           | Use anchor chart with keywords: function, return, string        |
| Advanced      | Prompt to add random selection or nested expressions in `${}`   |

---

## 📌 Key Reminders for Teachers
- Speak the code out loud (“Backtick… dollar curly brace… close it…”)
- Model mistakes and debug live to normalize failure
- Constantly reference the **syntax pattern anchor chart**
- Give time to **think**, **pair**, then **write** to ensure all voices engage
