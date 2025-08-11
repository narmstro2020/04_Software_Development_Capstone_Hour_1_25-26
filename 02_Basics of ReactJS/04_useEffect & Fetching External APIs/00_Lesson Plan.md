# Capstone Hour 01 – Semester 02
## Day 12 – WARR
**Topic:** useEffect & Fetching External APIs  
**Duration:** 86 minutes  
**Protocol:** WARRI (Welcome, Aim, Review, Relevant Instruction, Interactive)

---

### 🟩 Welcome (5 min)
- Greet students and take attendance.
- Ask: “Have you ever used a website that automatically updates content from the internet?”

---

### 🎯 Aim (3 min)
> **"How can we use useEffect to fetch and display data from external APIs in React?"**

---

### 🔁 Review (10 min)
- Recap:
  - Event handling (`onClick`)
  - Conditional rendering (`if`, `&&`, `?`)
  - Toggle Viewer from Day 11

---

### 📚 Relevant Instruction (45 min)

#### 1. What is `useEffect`?
- A React hook for performing side effects (e.g., fetching data, updating DOM, timers)
- Runs after the component renders

#### 2. Basic Syntax
```jsx
import { useEffect } from 'react';

useEffect(() => {
  console.log("Component mounted!");
}, []);
```
- Empty array `[]` means it runs only once after the initial render.

#### 3. Fetching Data
```jsx
import { useState, useEffect } from 'react';

function JokeFetcher() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => setJoke(`${data.setup} - ${data.punchline}`));
  }, []);

  return <p>{joke}</p>;
}
```

#### 4. Handling Loading State
```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => {
      setData(data);
      setLoading(false);
    });
}, []);

return loading ? <p>Loading...</p> : <Display data={data} />;
```

---

### 🧠 Interactive (20 min)
**Mini Task:**
- Create a component that fetches a random joke from an API using `useEffect`
- Display loading text until the joke loads

---

### 📝 Optional Homework
- Try replacing the joke API with the Dog API: https://dog.ceo/api/breeds/image/random
