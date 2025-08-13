# Capstone Hour 01 – Semester 02
## Day 14 – WARR
**Topic:** useContext React Hook  
**Duration:** 86 minutes  
**Protocol:** WARRI (Welcome, Aim, Review, Relevant Instruction, Interactive)

---

### 🟩 Welcome (5 min)
- Greet students and take attendance.
- Ask: “How can we share data between components without passing props through many layers?”

---

### 🎯 Aim (3 min)
> **"How can the useContext hook simplify state sharing in React apps?"**

---

### 🔁 Review (10 min)
- Recap:
  - useEffect for fetching APIs
  - Passing props between components
  - Limitations of "prop drilling"

---

### 📚 Relevant Instruction (45 min)

#### 1. What is Context in React?
- A way to share data across the component tree without manually passing props
- Great for themes, authentication, settings

#### 2. Creating a Context
```jsx
import { createContext } from 'react';

export const ThemeContext = createContext();
```

#### 3. Providing Context
```jsx
import { ThemeContext } from './ThemeContext';

function App() {
  const theme = 'dark';

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

#### 4. Consuming Context with useContext
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}
```

#### 5. Advantages
- Avoids prop drilling
- Centralizes shared state

---

### 🧠 Interactive (20 min)
**Mini Task:**
- Create a context to store a username
- Display it in a nested component without passing props directly

---

### 📝 Optional Homework
- Research when NOT to use Context (e.g., frequent updates causing re-renders)
