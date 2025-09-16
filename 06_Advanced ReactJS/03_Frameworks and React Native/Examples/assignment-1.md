# Assignment 1: Framework vs Library Comparison

## Objective
Understand the practical differences between using React as a library versus using a framework approach by building the same simple application two ways.

## Requirements
Build a simple multi-page application with Home, About, and Contact pages using:
1. React (library approach) - using the patterns you already know
2. A framework-like structure (simulating Next.js patterns)

## Part A: Library Approach (React)

Create a React component that manages routing manually using state and conditional rendering.

### Instructions:
1. Create a single `App` component
2. Use `useState` to track the current page
3. Use conditional rendering to show different content
4. Create navigation buttons to switch between pages

### Starter Template:
```javascript
import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // TODO: Create three component functions:
  // - HomePage
  // - AboutPage  
  // - ContactPage
  // Each should return JSX with an h1 and some content
  
  const HomePage = () => {
    // Your code here
  };
  
  // TODO: Create navigation component
  const Navigation = () => {
    return (
      <nav>
        {/* Add buttons to change currentPage */}
      </nav>
    );
  };
  
  // TODO: Add conditional rendering logic
  const renderPage = () => {
    // Use if/else or switch to return the right component
  };
  
  return (
    <div>
      <Navigation />
      {renderPage()}
    </div>
  );
};

export default App;
```

## Part B: Framework Approach (Simulating Next.js)

Create separate components that simulate how Next.js would structure the same app.

### Instructions:
1. Create separate component files for each page
2. Create a routing configuration object
3. Create a main component that uses the configuration

### Starter Template:

**Step 1: Create page components**
```javascript
// HomePage.js
const HomePage = () => {
  return (
    <div>
      {/* Your home page content */}
    </div>
  );
};

// AboutPage.js
const AboutPage = () => {
  return (
    <div>
      {/* Your about page content */}
    </div>
  );
};

// ContactPage.js
const ContactPage = () => {
  return (
    <div>
      {/* Your contact page content */}
    </div>
  );
};
```

**Step 2: Create routing configuration**
```javascript
// routes.js
const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/contact': ContactPage
};
```

**Step 3: Create main app**
```javascript
// App.js
const App = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  
  // TODO: Use the routes object to render the correct component
  
  return (
    <div>
      {/* Navigation and page rendering */}
    </div>
  );
};
```

## Part C: Comparison Questions

After completing both approaches, answer these questions:

1. Which approach required more setup code?
2. Which approach would be easier to add a new page to?
3. What are the benefits of each approach?
4. How does the framework approach guide your code structure?

## Deliverables

1. Complete working code for Part A (library approach)
2. Complete working code for Part B (framework approach)
3. Written answers to the comparison questions

## Hints
- Remember to use the React concepts you already know: useState, arrow functions, JSX
- For navigation, you can use buttons with onClick handlers
- Think about how the framework approach separates concerns

## Grading Criteria
- Part A works correctly: 35%
- Part B works correctly: 35%
- Comparison questions answered thoughtfully: 20%
- Code is clean and well-organized: 10%