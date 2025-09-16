# JavaScript Frameworks, Next.js, and React Native
## Lecture Notes

<a id="top"></a>

## Table of Contents

| Topic | Description |
|-------|-------------|
| [📚 Vocabulary](#vocabulary) | Key terms and definitions |
| [1️⃣ JavaScript Frameworks vs. Libraries](#frameworks-vs-libraries) | Understanding the difference |
| [2️⃣ Introduction to Next.js](#intro-nextjs) | React framework for production |
| [3️⃣ Introduction to React Native](#intro-react-native) | Build mobile apps with React |
| [📝 Summary](#summary) | Key takeaways |
| [🔗 Resources](#resources) | Documentation and learning materials |
| [💻 Assignments](#assignments) | Practice exercises |

---

<a id="vocabulary"></a>
## 📚 Vocabulary

| Term | Definition |
|------|------------|
| **Framework** | A complete structure that provides guidelines and conventions for building applications |
| **Library** | A collection of pre-written code that you can use to perform specific tasks |
| **SSR (Server-Side Rendering)** | HTML is generated on the server for each request |
| **SSG (Static Site Generation)** | HTML pages are generated at build time |
| **CSR (Client-Side Rendering)** | JavaScript runs in the browser to generate HTML |
| **Routing** | The process of determining which component to display based on the URL |
| **File-based Routing** | Routes are created based on the file structure in your project |
| **Native Components** | Platform-specific UI elements (iOS/Android) |
| **Cross-platform** | Code that can run on multiple operating systems |
| **Metro Bundler** | JavaScript bundler for React Native |

[↑ Back to top](#top)

---

<a id="frameworks-vs-libraries"></a>
## 1️⃣ JavaScript Frameworks vs. Libraries

### What is a Library?

A **library** is like a toolbox - you pick the tools you need when you need them. React (which you've been using) is a library!

**Characteristics of Libraries:**
- You're in control of the application flow
- You call the library code when needed
- More flexibility in how you structure your app
- Examples: React, jQuery, Lodash

### What is a Framework?

A **framework** is like a blueprint for a house - it provides the structure, and you fill in the details.

**Characteristics of Frameworks:**
- The framework is in control (inversion of control)
- It provides a complete structure for your application
- More opinionated about how to do things
- Examples: Next.js, Angular, Vue (can act as both)

### Visual Comparison

```
LIBRARY (React):
┌─────────────────────────┐
│    Your Application     │
│  ┌─────┐ ┌─────┐       │
│  │ You │→│React│       │
│  └─────┘ └─────┘       │
│  "I'll use React here"  │
└─────────────────────────┘

FRAMEWORK (Next.js):
┌─────────────────────────┐
│      Next.js            │
│  ┌─────────────────┐   │
│  │ Your Code Fits  │   │
│  │   Into Here     │   │
│  └─────────────────┘   │
│  "Next.js decides how"  │
└─────────────────────────┘
```

### Practical Example

**Using React (Library):**
```javascript
// You decide everything about routing
import React from 'react';
import { useState } from 'react';

// You set up your own routing solution
const App = () => {
  const [page, setPage] = useState('home');
  
  // You control the flow
  if (page === 'home') {
    return <HomePage />;
  } else if (page === 'about') {
    return <AboutPage />;
  }
};
```

**Using a Framework (conceptual - we'll see Next.js specifics later):**
```javascript
// Framework handles routing for you
// pages/index.js - automatically becomes the home route
const HomePage = () => {
  return <h1>Home</h1>;
};

// pages/about.js - automatically becomes the /about route
const AboutPage = () => {
  return <h1>About</h1>;
};
```

[↑ Back to top](#top)

---

<a id="intro-nextjs"></a>
## 2️⃣ Introduction to Next.js

### What is Next.js?

Next.js is a **React framework** that adds powerful features on top of React to make building production-ready applications easier.

### Why Next.js?

Remember how with React + Vite, you had to:
- Set up routing manually
- Configure build tools
- Handle SEO challenges with client-side rendering
- Optimize performance yourself

Next.js handles all of this for you!

### Key Features

#### 1. File-based Routing

Instead of setting up routes manually, Next.js creates routes based on your file structure:

```
pages/
  index.js        → /
  about.js        → /about
  products/
    index.js      → /products
    [id].js       → /products/:id (dynamic route)
```

#### 2. Server-Side Rendering (SSR) & Static Site Generation (SSG)

**Client-Side Rendering (React with Vite):**
```javascript
// What you've been doing - runs in browser
const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

**Server-Side Rendering (Next.js):**
```javascript
// This runs on the server before sending to browser
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  return {
    props: { products }
  };
}

const ProductList = ({ products }) => {
  // Products are already loaded!
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

#### 3. Built-in CSS Support

```javascript
// You can import CSS directly
import styles from './Button.module.css';

const Button = () => {
  return <button className={styles.primary}>Click me</button>;
};
```

### Creating a Next.js App

```bash
# Similar to how you used Vite
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Basic Next.js Page Example

```javascript
// pages/index.js
import { useState } from 'react';

const HomePage = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default HomePage;
```

### Next.js vs React with Vite Comparison

| Feature | React with Vite | Next.js |
|---------|----------------|---------|
| Routing | Manual setup needed | Automatic file-based |
| SEO | Challenging | Built-in support |
| Performance | Manual optimization | Automatic optimization |
| Image Optimization | Manual | Built-in Image component |
| API Routes | Separate backend needed | Built-in API routes |

[↑ Back to top](#top)

---

<a id="intro-react-native"></a>
## 3️⃣ Introduction to React Native

### What is React Native?

React Native lets you build **mobile apps** for iOS and Android using the React knowledge you already have!

### How is it Different from React?

**React (Web):**
```javascript
// Uses HTML elements
const Button = () => {
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
};
```

**React Native (Mobile):**
```javascript
// Uses Native components
import { TouchableOpacity, Text } from 'react-native';

const Button = () => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Click me</Text>
    </TouchableOpacity>
  );
};
```

### Core Components Mapping

| Web (React) | Mobile (React Native) | Purpose |
|-------------|----------------------|---------|
| `<div>` | `<View>` | Container |
| `<p>`, `<span>` | `<Text>` | Display text |
| `<img>` | `<Image>` | Display images |
| `<button>` | `<TouchableOpacity>` or `<Button>` | Clickable elements |
| `<input>` | `<TextInput>` | Text input |
| `<ul>`, `<li>` | `<FlatList>` | Lists |

### Basic React Native Example

```javascript
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My First App!</Text>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
};

// Styles use JavaScript objects, not CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
```

### Styling Differences

**React (CSS):**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**React Native (StyleSheet):**
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // camelCase
    alignItems: 'center',
  },
});
```

### Creating a React Native App

```bash
# Using Expo (easier for beginners)
npx create-expo-app MyApp
cd MyApp
npm start
```

### Key Differences Summary

| Aspect | React (Web) | React Native (Mobile) |
|--------|-------------|---------------------|
| Output | HTML/CSS/JS | Native iOS/Android code |
| Components | HTML elements | Native components |
| Styling | CSS files | StyleSheet objects |
| Events | onClick, onChange | onPress, onChangeText |
| Development | Browser | Phone/Simulator |

### When to Use What?

- **React with Vite**: Building websites and web applications
- **Next.js**: Building production-ready web applications with SEO needs
- **React Native**: Building mobile apps for iOS and Android

[↑ Back to top](#top)

---

<a id="summary"></a>
## 📝 Summary

### Key Takeaways

1. **Libraries vs Frameworks**
   - Libraries (React) give you tools to use as needed
   - Frameworks (Next.js) provide a complete structure
   - You call libraries; frameworks call your code

2. **Next.js**
   - A React framework for production web apps
   - Provides file-based routing automatically
   - Offers SSR and SSG for better performance and SEO
   - Includes many optimizations out of the box

3. **React Native**
   - Uses React to build native mobile apps
   - Same concepts (components, props, state) but different components
   - Styles use JavaScript objects instead of CSS
   - One codebase for both iOS and Android

### Your React Journey So Far

```
1. Started with: React + Vite (Library)
   ↓
2. Now learning: Next.js (Framework)
   ↓
3. Also learning: React Native (Mobile)
   
All use the same React concepts you already know!
```

[↑ Back to top](#top)

---

<a id="resources"></a>
## 🔗 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

### W3Schools References
- [React Tutorial](https://www.w3schools.com/react/)
- [JavaScript ES6](https://www.w3schools.com/js/js_es6.asp)

### Additional Learning
- [Next.js Learn Course](https://nextjs.org/learn)
- [React Native Express](http://www.reactnativeexpress.com/)
- [Expo Documentation](https://docs.expo.dev/)

[↑ Back to top](#top)

---

<a id="assignments"></a>
## 💻 Assignments

Three coding assignments have been created to practice these concepts:

1. **Assignment 1**: Framework vs Library Comparison
2. **Assignment 2**: Next.js Page Creation
3. **Assignment 3**: React Native Component Conversion

See the separate assignment files for detailed instructions and solutions.

[↑ Back to top](#top)