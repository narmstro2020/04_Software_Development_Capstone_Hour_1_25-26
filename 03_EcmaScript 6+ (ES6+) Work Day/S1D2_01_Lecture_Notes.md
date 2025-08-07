# 🧠 ES6+ JavaScript Full Lecture Notes (86 Minutes)

## 🎯 Topics Covered
1. `let` and `const`
2. Arrow Functions
3. Template Literals
4. Destructuring
5. Spread and Rest Operators
6. Default Parameters
7. Enhanced Object Literals
8. For...of Loop
9. Promises (Intro Only)
10. Optional Chaining (`?.`)
11. Nullish Coalescing (`??`)
12. Short-circuiting with `||` and `&&`

---

## 🕘 86-Minute Class Outline

| Time | Topic                           | Activity                                |
|------|----------------------------------|-----------------------------------------|
| 0-5  | Welcome & Goals                 | Introduce ES6+, syntax evolution        |
| 5-15 | `let` and `const`               | Comparison with `var`, code demo        |
| 15-25| Arrow Functions                 | Syntax, `this`, use cases               |
| 25-35| Template Literals              | Multi-line strings, expressions         |
| 35-45| Destructuring                  | Arrays, objects                         |
| 45-50| Break                          | 5-minute break                          |
| 50-60| Spread & Rest                  | Arrays, functions, objects              |
| 60-65| Default Parameters             | Function parameter defaults             |
| 65-70| Enhanced Object Literals       | Shorthand, computed property names      |
| 70-75| For...of Loop                  | Clean iteration over iterables          |
| 75-80| Optional Chaining & Nullish    | Robust access and fallback values       |
| 80-86| Summary + Exit Ticket          | Q&A, recap, hands-on mini challenge     |

---

## 🧠 1. `let` and `const`

```js
// var is function scoped
var x = 10;
if (true) {
  var x = 20;
  console.log(x); // 20
}
console.log(x); // 20

// let is block scoped
let y = 10;
if (true) {
  let y = 20;
  console.log(y); // 20
}
console.log(y); // 10_React Conditionals and Events

// const is also block scoped and immutable
const z = 30;
// z = 40; // ❌ Error: Assignment to constant variable
```

✅ **Best Practice**:  
- Use `const` by default  
- Use `let` if the value will change  
- Avoid `var` entirely

---

## 🧠 2. Arrow Functions

```js
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function (explicit return)
const add1 = (a, b) => {
  return a + b;
};

// Arrow function (implicit return)
const add2 = (a, b) => a + b;

// Single parameter
const square = x => x * x;

// No parameter
const greet = () => console.log("Hello!");
```

🧠 Arrow functions don’t bind their own `this`:

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(`Hi, I'm ${this.name}`);
    }, 1000);
  }
};
person.greet(); // "Hi, I'm Alice"
```

---

## 🧠 3. Template Literals

```js
const name = "Nick";
const age = 20;

console.log(`Hello, my name is ${name} and I am ${age} years old.`);

// Multi-line string
const poem = \`
Roses are red,
Violets are blue,
ES6 is sweet,
And so are you.
\`;

console.log(poem);
```

---

## 🧠 4. Destructuring

### Object Destructuring

```js
const user = { name: "Jane", age: 22 };
const { name, age } = user;
console.log(name, age); // Jane 22
```

### Array Destructuring

```js
const rgb = [255, 100, 80];
const [red, green, blue] = rgb;
console.log(red, green, blue); // 255 100 80
```

---

## 🧠 5. Spread and Rest Operators

### Spread: Expands items

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr); // [1, 2, 3, 4, 5]

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2 }
```

### Rest: Collects remaining items

```js
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10_React Conditionals and Events

const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10_React Conditionals and Events
console.log(rest);  // [20, 30, 40]
```

---

## 🧠 6. Default Parameters

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet();        // Hello, Guest!
greet("Nick");  // Hello, Nick!
```

---

## 🧠 7. Enhanced Object Literals

```js
const name = "Bob";
const age = 30;

const person = {
  name,
  age,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
  ["favorite" + "Color"]: "blue"
};

console.log(person);
```

---

## 🧠 8. `for...of` Loop

```js
const fruits = ["🍎", "🍌", "🍇"];
for (const fruit of fruits) {
  console.log(fruit);
}

for (const char of "hello") {
  console.log(char);
}
```

---

## 🧠 9. Promises (Intro Only)

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
  });
};

fetchData().then(data => console.log(data)); // Data loaded!
```

---

## 🧠 10. Optional Chaining `?.`

```js
const user = {
  name: "Tom",
  address: {
    city: "New York"
  }
};

console.log(user.address?.city);
console.log(user.contact?.email);
```

---

## 🧠 11. Nullish Coalescing `??`

```js
const input = 0;

const result = input ?? 10;
console.log(result); // 0

const fallback = null ?? "default";
console.log(fallback); // "default"
```

---

## 🧠 12. Logical Assignment Operators (Bonus)

```js
let count;
count ||= 5;
console.log(count); // 5

let userScore = 0;
userScore ??= 10;
console.log(userScore); // 0
```

---

## 📝 Exit Ticket: Quick Quiz

1. What is the difference between `let` and `const`?
2. Write an arrow function that multiplies two numbers.
3. Use a template literal to say: “My name is Alex and I love JS.”
4. Destructure the object: `{ a: 1, b: 2 }`
5. What does `?.` do?
