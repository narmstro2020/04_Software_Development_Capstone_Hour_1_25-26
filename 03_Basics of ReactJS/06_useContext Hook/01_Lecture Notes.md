# 📘 Lecture Notes – Day 14: useContext React Hook

## 🧠 Objectives
By the end of this lesson, students will:
- Understand what the React Context API is and when to use it
- Create and provide a context in a React app
- Consume context values using the `useContext` hook
- Understand the advantages and limitations of context

---

## 🔍 What is Context in React?
- **Problem:** "Prop drilling" – passing props down multiple layers to get to the child component that needs it
- **Solution:** Context allows sharing of values between components without passing props manually at every level

---

## 🛠 Creating and Using Context

### Step 1: Create a Context
```jsx
import { createContext } from 'react';

export const ThemeContext = createContext();
```

---

### Step 2: Provide Context
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

- The `value` prop is what gets shared to any consumers of this context

---

### Step 3: Consume Context with `useContext`
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}
```

- `useContext(ContextName)` returns the current value of the context

---

## 📚 Example: Theme Switcher App

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div style={{ padding: '1rem', backgroundColor: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  );
}
```

---

## ✅ When to Use Context
- Theme management
- User authentication data
- Application settings
- Language preferences

---

## ⚠ Limitations
- Not ideal for frequently changing values (can cause many re-renders)
- Sometimes better to use state management libraries for complex apps

---

## 🧠 Student Practice
**Task:**  
1. Create a `UserContext` that stores a `username` and a function to update it.  
2. Display the username in a nested component without prop drilling.  
3. Add a button to change the username.

---

## 📝 Summary

| Concept       | Description |
|---------------|-------------|
| Context API   | Mechanism to share values without prop drilling |
| `createContext` | Creates a new context object |
| Provider      | Component that supplies the context value |
| `useContext`  | Hook to consume the context value |

---

### Next Steps
Tomorrow, you’ll build a **fully functional app** using `useContext` to manage and share state.
