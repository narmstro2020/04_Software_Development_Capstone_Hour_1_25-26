# 📘 Notes: How Fetch, then, and catch Work (Fetch API)

## 🌐 What is the Fetch API?
The **Fetch API** is a modern JavaScript interface for making HTTP requests (e.g., GET, POST) from the browser or Node.js.

- Returns a **Promise**
- Allows asynchronous network requests without blocking the main thread
- Syntax is cleaner than older `XMLHttpRequest`

---

## 🛠 Basic Syntax
```javascript
fetch(url, options)
  .then(response => { /* handle response */ })
  .catch(error => { /* handle error */ });
```

- **`url`**: The endpoint you want to fetch
- **`options`**: (Optional) An object for settings like HTTP method, headers, body

Example:
```javascript
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

---

## 📥 Step-by-Step

### 1. `fetch()`
- Initiates the network request
- Returns a **Promise** that resolves to a **Response object**
- Doesn’t immediately give the data, only the response metadata

Example:
```javascript
fetch("https://api.example.com/data")
  .then(response => console.log(response));
```

---

### 2. `.then()`
- Used to process the fulfilled Promise from `fetch()`
- **First `.then()`**: Converts the raw `Response` into usable data (e.g., `.json()`, `.text()`, `.blob()`)
- **Second `.then()`**: Handles the actual data

Example:
```javascript
fetch("https://api.example.com/data")
  .then(response => response.json()) // parse JSON
  .then(data => console.log(data));   // work with parsed data
```

---

### 3. `.catch()`
- Handles **rejected Promises** (network errors, invalid URLs, server unreachable)
- Does **not** handle HTTP error codes (like 404 or 500) automatically — you must check `response.ok`

Example:
```javascript
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Fetch error:", error));
```

---

## ⚠ Common Mistakes
1. **Forgetting `return` in `.then()`**:
   ```javascript
   // ❌ Missing return
   fetch(url).then(response => response.json()).then(...);
   // ✅ Include return
   fetch(url).then(response => { return response.json(); }).then(...);
   ```

2. **Not handling non-200 status codes**:
   - `fetch` only rejects on network failure, not on HTTP error status

---

## 🧠 Summary Table

| Method      | Purpose                                             |
|-------------|-----------------------------------------------------|
| `fetch()`   | Starts a network request, returns a Promise         |
| `.then()`   | Handles a fulfilled Promise, processes the response |
| `.catch()`  | Handles a rejected Promise or thrown error          |

---

## ✅ Quick Example
```javascript
fetch("https://official-joke-api.appspot.com/random_joke")
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(data => console.log(`${data.setup} - ${data.punchline}`))
  .catch(err => console.error("Fetch failed:", err));
```
