# Day 04 - Lecture Notes: Modern JavaScript ES6+ Part 2

## Objectives
- Understand ternary operators for simple conditionals
- Explore arrays and objects in JavaScript
- Apply `map()`, `filter()`, and `reduce()` to process data
- Use object shorthand properties for cleaner code

---

## 1. Ternary Operators
The ternary operator is a concise way to write `if-else` expressions.

### Syntax
```js
condition ? expressionIfTrue : expressionIfFalse;
```

### Example
```js
const age = 17;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // Output: Minor
```

### Use Case
- Replaces simple if/else blocks
- Useful inside JSX (React)

---

## 2. Arrays & Objects
Arrays store lists of data. Objects store key-value pairs.

### Example: Array of Objects
```js
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];
```

### Accessing Data
```js
console.log(users[0].name); // Output: Alice
```

---

## 3. Array Methods: `map()`, `filter()`, `reduce()`

### `map()`
Transforms each element in the array.
```js
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']
```

### `filter()`
Returns elements that meet a condition.
```js
const adults = users.filter(user => user.age >= 30);
console.log(adults); // [{ name: 'Alice', ... }, { name: 'Charlie', ... }]
```

### `reduce()`
Combines all elements into a single value.
```js
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 90
```

### Use Case Exercise
```js
const scores = [85, 90, 78];
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
console.log(average); // 84.333...
```

---

## 4. Shorthand Object Properties
If the property name is the same as the variable name, you can omit the value.

### Full Syntax
```js
const name = 'Diana';
const age = 22;
const person = { name: name, age: age };
```

### Shorthand
```js
const person = { name, age };
```

### Example Use
```js
function createStudent(name, grade) {
  return { name, grade };
}

console.log(createStudent('Eli', 91));
// Output: { name: 'Eli', grade: 91 }
```

---

## Practice Prompts
1. Use `map()` to extract all student names from an array.
2. Use `filter()` to get all students who scored above 80.
3. Use `reduce()` to find total and average scores.
4. Use a ternary operator to label students as Pass/Fail.
5. Use shorthand object properties to return new student records.

---

## Suggested Dataset for Class Examples
```js
const students = [
  { name: 'Aria', grade: 92 },
  { name: 'Ben', grade: 67 },
  { name: 'Cara', grade: 79 },
  { name: 'Dan', grade: 85 },
];
```

### Sample Task: Generate Dashboard Stats
```js
const total = students.length;
const average = students.reduce((sum, s) => sum + s.grade, 0) / total;
const passing = students.filter(s => s.grade >= 70);
const labels = students.map(s => `${s.name}: ${s.grade >= 70 ? 'Pass' : 'Fail'}`);

console.log({ total, average, passing, labels });
```

---

## Console Tips
- `console.table()` for structured output
```js
console.table(students);
```

- `console.log(JSON.stringify(obj, null, 2))` for pretty objects

---

## Summary
| Feature            | Key Use                                      |
|--------------------|-----------------------------------------------|
| Ternary Operator   | Conditionally assign values                   |
| Arrays & Objects   | Represent structured data                     |
| `map()`            | Transform each element                        |
| `filter()`         | Select elements matching condition            |
| `reduce()`         | Aggregate elements to single value            |
| Shorthand Props    | Cleaner object creation                       |

---

## Exit Reflection Prompt
> How might you use these tools (`map`, `filter`, `reduce`, ternary) to power a simple dashboard or report in a real-world web application?