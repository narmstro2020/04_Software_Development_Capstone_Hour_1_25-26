# useReducer and useRef - Lecture Notes

## Table of Contents

1. [Introduction](#introduction)
2. [useReducer Hook](#usereducer-hook)
   - [What is useReducer?](#what-is-usereducer)
   - [Vocabulary](#usereducer-vocabulary)
   - [Basic Syntax](#usereducer-basic-syntax)
   - [When to Use useReducer](#when-to-use-usereducer)
   - [Code Examples](#usereducer-code-examples)
3. [useRef Hook](#useref-hook)
   - [What is useRef?](#what-is-useref)
   - [Vocabulary](#useref-vocabulary)
   - [Basic Syntax](#useref-basic-syntax)
   - [Common Use Cases](#useref-common-use-cases)
   - [Code Examples](#useref-code-examples)
4. [Summary](#summary)
5. [Additional Resources](#additional-resources)

---

## Introduction

[Back to Top](#usereducer-and-useref---lecture-notes)

In this lesson, we'll explore two important React hooks: `useReducer` and `useRef`. These hooks extend React's capabilities beyond basic state management with `useState` and side effects with `useEffect`.

- **useReducer**: Provides an alternative to `useState` for managing complex state logic
- **useRef**: Allows direct access to DOM elements and persists values across renders

Both hooks are built into React and require no additional installations beyond what you already have with your React + Vite setup.

---

## useReducer Hook

[Back to Top](#usereducer-and-useref---lecture-notes)

### What is useReducer?

`useReducer` is a React hook that provides an alternative way to manage state in functional components. It's particularly useful when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

Think of `useReducer` as a more powerful version of `useState` that follows the same pattern as the `reduce()` array method you've already learned.

### useReducer Vocabulary

- **Reducer Function**: A pure function that takes the current state and an action, then returns a new state
- **Action**: An object that describes what happened (usually has a `type` property)
- **Dispatch**: A function that sends actions to the reducer
- **Initial State**: The starting value for your state
- **State**: The current value managed by the reducer

### useReducer Basic Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

**Parameters:**
- `reducer`: A function that takes `(state, action)` and returns new state
- `initialState`: The initial state value

**Returns:**
- `state`: The current state value
- `dispatch`: A function to send actions to the reducer

### When to Use useReducer

Use `useReducer` instead of `useState` when:
- You have complex state logic with multiple sub-values
- The next state depends on the previous state
- You want to optimize performance by avoiding inline callbacks
- You have state transitions that are complex

### useReducer Code Examples

#### Example 1: Simple Counter

```javascript
import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  // Initial state
  const initialState = { count: 0 };
  
  // useReducer hook
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default Counter;
```

#### Example 2: Todo List with useReducer

```javascript
import React, { useReducer, useState } from 'react';

// Reducer function for todos
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'delete':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      dispatch({ type: 'add', payload: inputText });
      setInputText('');
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

---

## useRef Hook

[Back to Top](#usereducer-and-useref---lecture-notes)

### What is useRef?

`useRef` is a React hook that returns a mutable ref object whose `.current` property is initialized with the passed argument. The returned object will persist for the full lifetime of the component.

Unlike state variables, changing a ref does NOT trigger a re-render of the component.

### useRef Vocabulary

- **Ref**: A reference to a DOM element or a value that persists across renders
- **Current Property**: The `.current` property holds the actual value/reference
- **Mutable**: Can be changed without causing re-renders
- **Persistent**: Values survive component re-renders

### useRef Basic Syntax

```javascript
const refContainer = useRef(initialValue);
```

**Parameters:**
- `initialValue`: The initial value for the ref (optional)

**Returns:**
- A ref object with a `.current` property

### useRef Common Use Cases

1. **Accessing DOM elements directly**
2. **Storing mutable values that don't trigger re-renders**
3. **Keeping track of previous values**
4. **Storing timeouts/intervals**

### useRef Code Examples

#### Example 1: Focus Input on Mount

```javascript
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    // Focus the input when button is clicked
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="This input will be focused"
      />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default FocusInput;
```

#### Example 2: Storing Previous Value

```javascript
import React, { useState, useRef, useEffect } from 'react';

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    // Update the ref to store the previous value
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <div>
      <h3>Current count: {count}</h3>
      <h3>Previous count: {prevCount}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default PreviousValue;
```

#### Example 3: Timer with useRef

```javascript
import React, { useState, useRef } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  return (
    <div>
      <h2>Timer: {seconds} seconds</h2>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
```

---

## Summary

[Back to Top](#usereducer-and-useref---lecture-notes)

### useReducer Summary
- **Purpose**: Manage complex state logic in React components
- **When to use**: Complex state with multiple sub-values, state transitions, or performance optimization
- **Key concepts**: Reducer function, actions, dispatch, and state
- **Syntax**: `const [state, dispatch] = useReducer(reducer, initialState)`

### useRef Summary
- **Purpose**: Access DOM elements directly and store mutable values
- **When to use**: DOM manipulation, storing values that don't trigger re-renders, or keeping references
- **Key concepts**: Mutable ref object, `.current` property, persistence across renders
- **Syntax**: `const refContainer = useRef(initialValue)`

### Key Differences
- `useReducer` manages state and triggers re-renders
- `useRef` stores values/references without triggering re-renders
- Both are essential tools for different scenarios in React development

---

## Additional Resources

[Back to Top](#usereducer-and-useref---lecture-notes)

### Official Documentation
- [React useReducer Hook](https://react.dev/reference/react/useReducer)
- [React useRef Hook](https://react.dev/reference/react/useRef)

### W3Schools References
- [React useReducer](https://www.w3schools.com/react/react_usereducer.asp)
- [React useRef](https://www.w3schools.com/react/react_useref.asp)
- [JavaScript Array reduce()](https://www.w3schools.com/jsref/jsref_reduce.asp)

### Additional Learning
- [React Hooks Reference](https://react.dev/reference/react)
- [JavaScript ES6+ Features](https://www.w3schools.com/js/js_es6.asp)