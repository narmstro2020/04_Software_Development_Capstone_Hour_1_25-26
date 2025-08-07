# 📘 Lecture Notes – Day 08: React with Vite – JSX, Components, Props, and State (Part 1)

## 🧠 Objectives
Students will:
- Understand how React uses JSX to describe UI
- Create and use functional components
- Pass props to components
- Manage internal state with `useState`

---

## 🔍 What is React?

React is a **JavaScript library** for building **user interfaces**. It:
- Is **declarative**: you describe what the UI should look like.
- Is **component-based**: UIs are built using reusable pieces.
- Uses **JSX** (JavaScript + XML) to write UI in JavaScript.

---

## ⚙️ Setting Up React with Vite

### Step 1: Create App
```bash
npm create vite@latest counter-app --template react
cd counter-app
npm install
npm run dev
```

### Step 2: Open in browser
- Vite runs on `http://localhost:5173`

---

## ✍️ JSX: JavaScript + XML

### Example:
```jsx
const element = <h1>Hello, world!</h1>;
```

### Key Rules:
- JSX must return **one root element**
- You can use expressions inside `{ }`:
```jsx
const name = "Alice";
return <p>Hello, {name}</p>;
```

---

## 🧩 Components

React components are JavaScript functions that return JSX.

### Example:
```jsx
function Greeting() {
  return <h2>Welcome to React!</h2>;
}
```

### Reusability:
```jsx
function Welcome(props) {
  return <h3>Hello, {props.name}</h3>;
}
```
Usage:
```jsx
<Welcome name="Alice" />
<Welcome name="Bob" />
```

---

## 🎁 Props (Properties)

- Props are **read-only inputs** to components
- Passed as attributes in JSX
- Received in the component as `props`

Example:
```jsx
function Message(props) {
  return <p>{props.text}</p>;
}

<Message text="This is a prop!" />
```

---

## 🔄 useState Hook

State is data that changes over time. The `useState` hook lets you manage it.

### Example:
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

---

## 🧪 Build Activity

Replace the default `02_Example_App.jsx` with the following:

```jsx
import { useState } from 'react';

function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Student" />
      <Counter />
    </div>
  );
}

export default App;
```

---

## 📝 Summary

- **JSX** blends JavaScript and HTML-like syntax
- **Components** are reusable UI units
- **Props** allow parent-to-child data flow
- **useState** allows components to manage internal data

Next time: we'll continue React with events, conditional rendering, and lifting state.
