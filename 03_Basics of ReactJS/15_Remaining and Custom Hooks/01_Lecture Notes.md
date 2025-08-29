# React.js Remaining and Custom Hooks - Lecture Notes

## Table of Contents
- [Introduction](#introduction)
- [Vocabulary](#vocabulary)
- [1. Remaining React Hooks](#1-remaining-react-hooks)
  - [1.1 useImperativeHandle](#11-useimperativehandle)
  - [1.2 useLayoutEffect](#12-uselayouteffect)
  - [1.3 useInsertionEffect](#13-useinsertioneffect)
  - [1.4 useTransition](#14-usetransition)
  - [1.5 useDeferredValue](#15-usedeferredvalue)
  - [1.6 useDebugValue](#16-usedebugvalue)
  - [1.7 useId](#17-useid)
  - [1.8 useSyncExternalStore](#18-usesyncexternalstore)
  - [1.9 use](#19-use)
  - [1.10 useFormState](#110-useformstate)
  - [1.11 useFormStatus](#111-useformstatus)
  - [1.12 useOptimistic](#112-useoptimistic)
- [2. Custom Hooks](#2-custom-hooks)
  - [2.1 What are Custom Hooks?](#21-what-are-custom-hooks)
  - [2.2 Creating Custom Hooks](#22-creating-custom-hooks)
  - [2.3 Custom Hook Examples](#23-custom-hook-examples)
  - [2.4 Best Practices](#24-best-practices)
- [3. Coding Assignments](#3-coding-assignments)
- [4. Summary](#4-summary)
- [5. Additional Resources](#5-additional-resources)

---

## Introduction

Welcome to the lesson on Remaining and Custom React.js Hooks! You've already learned about the core hooks like `useState`, `useEffect`, and `useContext`. In this lesson, we'll explore the remaining built-in React hooks and learn how to create your own custom hooks.

**Prerequisites Review:**
- JavaScript ES6+ fundamentals
- React basics (components, props, state)
- `useState`, `useEffect`, and `useContext`
- JSX and conditional rendering
- Event handling in React

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## Vocabulary

| Term | Definition |
|------|------------|
| **Hook** | A special function in React that starts with "use" and allows you to "hook into" React features |
| **Custom Hook** | A JavaScript function whose name starts with "use" and that may call other hooks |
| **Imperative Handle** | A way to customize the instance value that is exposed to parent components when using ref |
| **Layout Effect** | An effect that fires synchronously after all DOM mutations |
| **Transition** | A way to mark state updates as non-urgent to keep the UI responsive |
| **Deferred Value** | A way to defer updating a value until more urgent updates have finished |
| **External Store** | A data source that exists outside of React's state management |
| **Optimistic Update** | Updating the UI immediately while waiting for a server response |

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## 1. Remaining React Hooks

### 1.1 useImperativeHandle

**Purpose:** Customizes the instance value that is exposed to parent components when using `ref`.

**When to use:** Rarely needed - only when you need to expose specific methods from a child component to its parent.

**Syntax:**
```javascript
useImperativeHandle(ref, createHandle, [deps])
```

**Example:**
```javascript
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Parent component usage
function App() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleClear = () => {
    inputRef.current.clear();
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear Input</button>
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.2 useLayoutEffect

**Purpose:** Similar to `useEffect`, but fires synchronously after all DOM mutations.

**When to use:** When you need to measure DOM elements or make DOM changes before the browser paints.

**Syntax:**
```javascript
useLayoutEffect(() => {
  // effect code
}, [dependencies])
```

**Example:**
```javascript
import React, { useState, useLayoutEffect, useRef } from 'react';

function TooltipComponent() {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.scrollHeight);
    }
  });

  return (
    <div>
      <div 
        ref={tooltipRef}
        style={{
          padding: '10px',
          backgroundColor: 'yellow',
          border: '1px solid black'
        }}
      >
        This tooltip height is: {tooltipHeight}px
      </div>
    </div>
  );
}
```

**Difference from useEffect:**
- `useLayoutEffect` runs synchronously before browser paint
- `useEffect` runs asynchronously after browser paint
- Use `useLayoutEffect` to prevent visual flickering

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.3 useInsertionEffect

**Purpose:** Fires before any DOM mutations, primarily for CSS-in-JS libraries.

**When to use:** Very rarely - mainly for library authors who need to inject styles.

**Example:**
```javascript
import { useInsertionEffect } from 'react';

function MyComponent() {
  useInsertionEffect(() => {
    // Insert CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .my-component {
        color: blue;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="my-component">Styled component</div>;
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.4 useTransition

**Purpose:** Marks state updates as non-urgent to keep the UI responsive.

**When to use:** When you have expensive operations that might block the UI.

**Syntax:**
```javascript
const [isPending, startTransition] = useTransition();
```

**Example:**
```javascript
import React, { useState, useTransition } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value) => {
    setQuery(value); // Urgent update

    startTransition(() => {
      // Non-urgent update
      const filteredResults = performExpensiveSearch(value);
      setResults(filteredResults);
    });
  };

  const performExpensiveSearch = (searchTerm) => {
    // Simulate expensive operation
    const allItems = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
    return allItems.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <p>Searching...</p>}
      <ul>
        {results.slice(0, 10).map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.5 useDeferredValue

**Purpose:** Defers updating a value until more urgent updates have finished.

**When to use:** When you want to show stale content while new content is loading.

**Example:**
```javascript
import React, { useState, useDeferredValue, useMemo } from 'react';

function DeferredSearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(() => {
    // Expensive computation using deferred value
    if (!deferredQuery) return [];
    
    const allItems = Array.from({ length: 5000 }, (_, i) => `Result ${i}`);
    return allItems.filter(item => 
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);

  return (
    <div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
      <h3>Search Results for: {deferredQuery}</h3>
      <ul>
        {results.slice(0, 20).map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <DeferredSearchResults query={query} />
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.6 useDebugValue

**Purpose:** Displays a label for custom hooks in React DevTools.

**When to use:** Only in custom hooks for debugging purposes.

**Example:**
```javascript
import { useState, useDebugValue } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  // This will show in React DevTools
  useDebugValue(count > 5 ? 'High' : 'Low');

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

function CounterComponent() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.7 useId

**Purpose:** Generates unique IDs for accessibility attributes.

**When to use:** When you need unique IDs for form elements and their labels.

**Example:**
```javascript
import React, { useId } from 'react';

function FormField({ label, type = 'text' }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

function RegistrationForm() {
  return (
    <form>
      <FormField label="First Name" />
      <FormField label="Last Name" />
      <FormField label="Email" type="email" />
      <FormField label="Password" type="password" />
    </form>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.8 useSyncExternalStore

**Purpose:** Subscribes to external data stores.

**When to use:** When integrating with external state management libraries or browser APIs.

**Example:**
```javascript
import React, { useSyncExternalStore } from 'react';

// External store (could be a global state manager)
const store = {
  state: { count: 0 },
  listeners: new Set(),
  
  getState() {
    return this.state;
  },
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener());
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

function useStore() {
  return useSyncExternalStore(
    store.subscribe.bind(store),
    store.getState.bind(store)
  );
}

function Counter() {
  const state = useStore();

  const increment = () => {
    store.setState({ count: state.count + 1 });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.9 use

**Purpose:** Reads the value of a resource like a Promise or context.

**When to use:** With React's concurrent features (experimental).

**Note:** This is a newer experimental hook. Here's a conceptual example:

```javascript
import React, { Suspense } from 'react';

// Simulated async data fetching
const fetchUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id, name: `User ${id}`, email: `user${id}@example.com` };
};

function UserProfile({ userPromise }) {
  // Note: 'use' is experimental and syntax may change
  // This is for educational purposes only
  const user = use(userPromise);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

function App() {
  const userPromise = fetchUser(1);

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.10 useFormState

**Purpose:** Manages form state with server actions (React Server Components).

**When to use:** With React Server Components and form submissions.

**Note:** This is for server components. Here's a conceptual client-side example:

```javascript
import React, { useState } from 'react';

// Simulated form action
const submitForm = async (prevState, formData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Simulate validation
  if (!name || !email) {
    return { error: 'All fields are required' };
  }
  
  // Simulate server processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: `Form submitted for ${name}` };
};

function ContactForm() {
  const [state, setState] = useState(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    
    const formData = new FormData(e.target);
    const result = await submitForm(state, formData);
    
    setState(result);
    setPending(false);
    
    if (result.success) {
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
      
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>{state.success}</p>}
    </form>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.11 useFormStatus

**Purpose:** Provides status information about form submissions.

**When to use:** To show loading states during form submissions.

**Example (conceptual):**
```javascript
import React, { useState } from 'react';

function SubmitButton() {
  // In real useFormStatus, this would be automatic
  const [pending, setPending] = useState(false);

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Form'}
    </button>
  );
}

function MyForm() {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPending(false);
    alert('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <SubmitButton />
    </form>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 1.12 useOptimistic

**Purpose:** Shows optimistic UI updates while waiting for server responses.

**When to use:** To improve perceived performance by showing immediate feedback.

**Example (conceptual):**
```javascript
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false }
  ]);
  const [optimisticTodos, setOptimisticTodos] = useState(todos);

  const addTodo = async (text) => {
    const tempTodo = { 
      id: Date.now(), 
      text, 
      completed: false, 
      pending: true 
    };
    
    // Optimistic update
    setOptimisticTodos([...optimisticTodos, tempTodo]);
    
    try {
      // Simulate server request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Server success - update real state
      const newTodo = { ...tempTodo, pending: false };
      setTodos([...todos, newTodo]);
      setOptimisticTodos([...todos, newTodo]);
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticTodos(todos);
      alert('Failed to add todo');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.todo.value;
    if (text.trim()) {
      addTodo(text.trim());
      e.target.reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="todo" placeholder="Add a todo..." />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {optimisticTodos.map(todo => (
          <li 
            key={todo.id} 
            style={{ 
              opacity: todo.pending ? 0.5 : 1,
              fontStyle: todo.pending ? 'italic' : 'normal'
            }}
          >
            {todo.text} {todo.pending && '(saving...)'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## 2. Custom Hooks

### 2.1 What are Custom Hooks?

Custom hooks are JavaScript functions that:
- Start with the word "use"
- Can call other React hooks
- Allow you to reuse stateful logic between components
- Help organize and share common functionality

**Benefits:**
- Code reusability
- Separation of concerns
- Easier testing
- Cleaner components

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 2.2 Creating Custom Hooks

**Rules for Custom Hooks:**
1. Name must start with "use"
2. Can call other hooks
3. Should return values or functions that components need
4. Follow the same rules as regular hooks

**Basic Pattern:**
```javascript
function useCustomHook(initialValue) {
  // Hook logic here
  const [state, setState] = useState(initialValue);
  
  // Custom logic
  const customFunction = () => {
    // Do something
  };
  
  // Return what components need
  return { state, setState, customFunction };
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 2.3 Custom Hook Examples

#### Example 1: useCounter Hook
```javascript
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage in component
function CounterApp() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### Example 2: useLocalStorage Hook
```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Function to update localStorage
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Usage in component
function SettingsApp() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label>
          Name: 
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Theme: 
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <p>Hello {name}! Current theme: {theme}</p>
    </div>
  );
}
```

#### Example 3: useFetch Hook
```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}

// Usage in component
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}
```

#### Example 4: useToggle Hook
```javascript
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// Usage in component
function ToggleDemo() {
  const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Show</button>
      <button onClick={setFalse}>Hide</button>
      
      {isVisible && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'lightblue', 
          marginTop: '10px' 
        }}>
          This content is toggleable!
        </div>
      )}
    </div>
  );
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

### 2.4 Best Practices

1. **Naming:** Always start with "use"
2. **Single Responsibility:** Each hook should have one clear purpose
3. **Return Objects:** For multiple values, return an object with descriptive names
4. **Error Handling:** Include proper error handling in your hooks
5. **Dependencies:** Be careful with useEffect dependencies in custom hooks
6. **Documentation:** Comment your custom hooks well

**Example of Good Custom Hook Structure:**
```javascript
/**
 * Custom hook for managing form input state
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setError = (field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setError
  };
}
```

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## 3. Coding Assignments

### Assignment Links
- [Assignment 1: Custom useCounter Hook](./assignment1-custom-counter.md)
- [Assignment 2: useLocalStorage Implementation](./assignment2-local-storage.md)
- [Assignment 3: Advanced Custom Hook - useAPI](./assignment3-api-hook.md)

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## 4. Summary

In this lesson, you learned about:

### Remaining React Hooks
- **useImperativeHandle**: Customize ref exposure to parent components
- **useLayoutEffect**: Synchronous effects that run before browser paint
- **useInsertionEffect**: For CSS-in-JS library authors
- **useTransition**: Mark updates as non-urgent for better UX
- **useDeferredValue**: Defer updates until more urgent ones complete
- **useDebugValue**: Add labels to custom hooks in DevTools
- **useId**: Generate unique IDs for accessibility
- **useSyncExternalStore**: Subscribe to external data sources
- **use**: Read resources like Promises (experimental)
- **useFormState**: Manage form state with server actions
- **useFormStatus**: Get form submission status
- **useOptimistic**: Show optimistic updates

### Custom Hooks
- Functions that start with "use" and can call other hooks
- Enable code reuse and better organization
- Follow the same rules as built-in hooks
- Should have single responsibility and clear return values

### Key Takeaways
1. Most of these hooks are for specific use cases - start with the basics
2. Custom hooks are powerful for sharing logic between components
3. Always follow hook rules and naming conventions
4. Focus on creating reusable, well-documented custom hooks

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)

---

## 5. Additional Resources

### Official Documentation
- [React Hooks Reference](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

### W3Schools References
- [React Hooks](https://www.w3schools.com/react/react_hooks.asp)
- [JavaScript ES6](https://www.w3schools.com/js/js_es6.asp)

### Practice Resources
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [CodeSandbox React Templates](https://codesandbox.io/s/react-new)

[↑ Back to Top](#reactjs-remaining-and-custom-hooks---lecture-notes)