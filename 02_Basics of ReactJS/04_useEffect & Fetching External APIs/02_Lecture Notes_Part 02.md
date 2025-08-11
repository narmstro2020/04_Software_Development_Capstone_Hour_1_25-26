# 📘 Lecture Notes – Day 12: useEffect & Fetching External APIs

## 🧠 Objectives
By the end of this lesson, students will:
- Understand what `useEffect` is and when to use it
- Use `useEffect` to run side effects in React
- Fetch data from an external API
- Manage loading and error states

---

## 🔍 What is `useEffect`?

`useEffect` is a React Hook that lets you perform side effects in function components.

**Examples of side effects:**
- Fetching data from an API
- Setting up subscriptions
- Updating the DOM manually
- Starting/stopping timers

---

## 🛠 Basic Syntax

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Side effect logic here
});
```

**Dependencies array:**
- `[]` → Runs once after initial render (componentDidMount)
- `[someValue]` → Runs when `someValue` changes
- No array → Runs after every render

---

## 🌐 Fetching Data with `useEffect`

Example: Fetching a random joke
```jsx
import { useState, useEffect } from 'react';

function JokeFetcher() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => {
        setJoke(`${data.setup} - ${data.punchline}`);
        setLoading(false);
      })
      .catch(() => {
        setJoke("Failed to fetch joke.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <p>{joke}</p>;
}
```

---

## ⚠ Handling Errors
Always handle errors to avoid crashes when the API is down.

```jsx
.catch((error) => {
  console.error("Error fetching data:", error);
});
```

---

## 🔄 Fetching on Button Click

Sometimes you want to fetch new data on demand:
```jsx
function DogImage() {
  const [imageUrl, setImageUrl] = useState("");

  const fetchDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(data => setImageUrl(data.message));
  };

  useEffect(fetchDog, []); // Fetch on initial render

  return (
    <div>
      <img src={imageUrl} alt="Random Dog" width="300" />
      <button onClick={fetchDog}>Fetch New Dog</button>
    </div>
  );
}
```

---

## 🧠 Student Challenge

1. Create a new Vite React app
2. Make a component that:
   - Fetches from the Joke API on mount
   - Shows "Loading..." while fetching
   - Displays the joke once loaded
3. Add a button to fetch a new joke

---

## 📝 Summary

| Concept         | Description                                             |
|-----------------|---------------------------------------------------------|
| `useEffect`     | Runs side effects in React                               |
| API Fetching    | Getting data from an external server                     |
| Loading State   | Tells the user something is happening                    |
| Error Handling  | Prevents the app from crashing on failed requests        |

---

### Next Steps
Tomorrow you'll build an **API-powered UI** for jokes or dog images.
