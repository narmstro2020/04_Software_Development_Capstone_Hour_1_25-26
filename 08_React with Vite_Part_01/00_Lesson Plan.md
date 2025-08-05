# Capstone Hour 01 – Semester 02
## Day 08 – WARR
**Topic:** React with Vite – JSX, Components, Props, and State (Part 1)  
**Duration:** 86 minutes  
**Protocol:** WARRI (Welcome, Aim, Review, Relevant Instruction, Interactive)

---

### 🟩 Welcome (5 min)
- Greet students and take attendance.
- Ask: “Who has used React before?” or “What do you know about how websites update without reloading?”

---

### 🎯 Aim (3 min)
> **"How does React use components, props, and state to create dynamic user interfaces?"**

---

### 🔁 Review (10 min)
- Brief recap:
  - JavaScript module system (ESModules)
  - Node.js CLI project
  - `import`, `export`, and `package.json`

---

### 📚 Relevant Instruction (45 min)

#### 1. What is React?
- A JavaScript library for building user interfaces
- Component-based and declarative

#### 2. Create a Vite React App
```bash
npm create vite@latest counter-app --template react
cd counter-app
npm install
npm run dev
```

#### 3. JSX (JavaScript + XML)
```jsx
const element = <h1>Hello, world!</h1>;
```
- JSX expressions must be wrapped
- Only one parent element returned

#### 4. Functional Components
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 5. Props (Read-Only Inputs)
```jsx
<Welcome name="Alice" />
```

#### 6. useState Hook (State Management)
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```

---

### 🧠 Interactive (20 min)
**Students Do:**
- Create a Vite React app
- Open it in their editor
- Replace contents of `App.jsx` with a basic custom component that accepts props
- Add a `Counter` component with state using `useState`

---

### 📝 Homework (Optional)
- Read up on `useEffect` (coming later)
