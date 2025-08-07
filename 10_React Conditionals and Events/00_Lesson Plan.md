# Capstone Hour 01 – Semester 02
## Day 10 – WARR
**Topic:** React Events & Conditional Rendering (`if`, `&&`, `?`)  
**Duration:** 86 minutes  
**Protocol:** WARRI (Welcome, Aim, Review, Relevant Instruction, Interactive)

---

### 🟩 Welcome (5 min)
- Greet students and take attendance.
- Ask: "What are some examples of user events we might want to respond to in a UI?"

---

### 🎯 Aim (3 min)
> **"How can we use event handlers and conditional rendering to respond to user interactions in React?"**

---

### 🔁 Review (10 min)
- Review:
  - `props`
  - `useState`
  - Reusing components
  - Counter app from Day 09

---

### 📚 Relevant Instruction (45 min)

#### 1. Event Handlers in React
- Use `onClick`, `onChange`, etc.
```jsx
function handleClick() {
  alert('Button clicked!');
}
<button onClick={handleClick}>Click</button>
```

#### 2. Inline Event Handlers
```jsx
<button onClick={() => console.log("Clicked!")}>Click</button>
```

#### 3. Conditional Rendering Options

**if-else logic (outside JSX):**
```jsx
if (isLoggedIn) {
  return <Dashboard />;
} else {
  return <Login />;
}
```

**Using `&&`:**
```jsx
{isVisible && <p>This only shows if true</p>}
```

**Using ternary `? :`:**
```jsx
{loggedIn ? <LogoutButton /> : <LoginButton />}
```

---

### 🧠 Interactive (20 min)

**Mini Challenge:**
- Create a component with:
  - A toggle button
  - A `useState` boolean
  - Conditional rendering using `&&` and `?`
  - Bonus: toggle between two messages

---

### 📝 Optional Homework
- Refactor the toggle into a reusable component with props
