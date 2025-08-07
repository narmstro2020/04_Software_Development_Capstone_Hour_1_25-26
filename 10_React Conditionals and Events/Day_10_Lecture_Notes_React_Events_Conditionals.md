# 📘 Lecture Notes – Day 10: React Events & Conditional Rendering

## 🧠 Objectives
By the end of this lesson, students should be able to:
- Handle user events in React using event listeners like `onClick`
- Use `useState` to store and update values triggered by events
- Render JSX conditionally using `if`, `&&`, and `?`

---

## 🖱️ React Event Handling

React handles events similarly to vanilla JavaScript but uses camelCase.

### 🔹 Example 1: Basic Event Handler
```jsx
function handleClick() {
  alert("Button clicked!");
}

<button onClick={handleClick}>Click me</button>
```

### 🔹 Example 2: Inline Function
```jsx
<button onClick={() => console.log("Inline clicked!")}>
  Inline Click
</button>
```

---

## 📥 Event + useState Example

```jsx
import { useState } from 'react';

function ClickTracker() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <p>You clicked {clicks} times</p>
      <button onClick={() => setClicks(clicks + 1)}>Click</button>
    </div>
  );
}
```

---

## 🔁 Conditional Rendering Methods

React allows conditional rendering inside JSX in three main ways:

---

### ✅ Method 1: if/else (outside JSX)
```jsx
function Display({ loggedIn }) {
  if (loggedIn) {
    return <h2>Welcome Back!</h2>;
  } else {
    return <h2>Please Log In</h2>;
  }
}
```

---

### ✅ Method 2: `&&` (logical AND)
Only renders if the condition is `true`.

```jsx
{isVisible && <p>This will show if isVisible is true.</p>}
```

---

### ✅ Method 3: Ternary `? :`
Short and powerful for inline rendering:

```jsx
{isLoggedIn ? <LogoutButton /> : <LoginButton />}
```

---

## 🧪 Live Demo – Toggle Message

```jsx
import { useState } from 'react';

function ToggleMessage() {
  const [isShown, setIsShown] = useState(true);

  return (
    <div>
      <button onClick={() => setIsShown(!isShown)}>
        {isShown ? "Hide" : "Show"} Message
      </button>
      {isShown && <p>Hello, this is a conditional message!</p>}
    </div>
  );
}
```

---

## 🧠 Student Practice Prompt

**Task:**  
Create a new component that:
- Uses a `useState` boolean
- Renders one of two images or messages
- Uses both `&&` and ternary `? :` in the JSX
- Includes a button to toggle the state

---

## 📝 Summary

| Concept              | Use Case Example                           |
|----------------------|--------------------------------------------|
| `onClick`            | Handling button clicks                     |
| `useState`           | Storing data that changes                  |
| `if`                 | Conditional logic outside JSX              |
| `&&`                 | Short-circuit rendering if true            |
| `? :`                | Render one of two values based on a test   |

---

### Next Steps
Tomorrow you will build a **Toggle Viewer App** using these skills!

