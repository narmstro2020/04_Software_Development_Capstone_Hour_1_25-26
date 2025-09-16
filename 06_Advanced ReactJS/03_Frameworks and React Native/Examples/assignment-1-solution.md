# Assignment 1 Solution: Framework vs Library Comparison

## Part A: Library Approach (React) - Complete Solution

```javascript
import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Page Components
  const HomePage = () => {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome to our website! This is the home page.</p>
        <p>We're using React as a library to manage routing manually.</p>
      </div>
    );
  };
  
  const AboutPage = () => {
    return (
      <div>
        <h1>About Page</h1>
        <p>Learn more about us on this page.</p>
        <p>We're a company that builds great things!</p>
      </div>
    );
  };
  
  const ContactPage = () => {
    return (
      <div>
        <h1>Contact Page</h1>
        <p>Get in touch with us!</p>
        <p>Email: contact@example.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
    );
  };
  
  // Navigation Component
  const Navigation = () => {
    return (
      <nav style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{ marginRight: '10px' }}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('about')}
          style={{ marginRight: '10px' }}
        >
          About
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
        >
          Contact
        </button>
      </nav>
    );
  };
  
  // Conditional Rendering Logic
  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage />;
    } else if (currentPage === 'about') {
      return <AboutPage />;
    } else if (currentPage === 'contact') {
      return <ContactPage />;
    }
  };
  
  return (
    <div>
      <Navigation />
      <div style={{ padding: '20px' }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
```

## Part B: Framework Approach (Simulating Next.js) - Complete Solution

### File 1: HomePage.js
```javascript
// HomePage.js
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our website! This is the home page.</p>
      <p>This structure simulates how Next.js organizes pages.</p>
    </div>
  );
};

export default HomePage;
```

### File 2: AboutPage.js
```javascript
// AboutPage.js
const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>Learn more about us on this page.</p>
      <p>In Next.js, this would be in pages/about.js</p>
    </div>
  );
};

export default AboutPage;
```

### File 3: ContactPage.js
```javascript
// ContactPage.js
const ContactPage = () => {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Get in touch with us!</p>
      <p>Email: contact@example.com</p>
      <p>Phone: (555) 123-4567</p>
    </div>
  );
};

export default ContactPage;
```

### File 4: routes.js
```javascript
// routes.js
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/contact': ContactPage
};

export default routes;
```

### File 5: App.js
```javascript
// App.js
import React, { useState } from 'react';
import routes from './routes';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  
  // Get the component for the current route
  const PageComponent = routes[currentRoute];
  
  // Navigation Component
  const Navigation = () => {
    return (
      <nav style={{ padding: '10px', borderBottom: '2px solid #ccc' }}>
        {Object.keys(routes).map(route => (
          <button 
            key={route}
            onClick={() => setCurrentRoute(route)}
            style={{ marginRight: '10px' }}
          >
            {route === '/' ? 'Home' : route.slice(1).charAt(0).toUpperCase() + route.slice(2)}
          </button>
        ))}
      </nav>
    );
  };
  
  return (
    <div>
      <Navigation />
      <div style={{ padding: '20px' }}>
        {PageComponent && <PageComponent />}
      </div>
    </div>
  );
};

export default App;
```

## Part C: Comparison Questions - Sample Answers

### 1. Which approach required more setup code?

**Answer:** The framework approach required more setup code initially. We had to create separate files for each page component, a routes configuration file, and then wire them together in the main App component. The library approach kept everything in one file with less initial setup.

### 2. Which approach would be easier to add a new page to?

**Answer:** The framework approach would be easier to scale. To add a new page:
- Framework approach: Create a new page component file, add one line to the routes configuration
- Library approach: Add a new component function, add a new button, add a new condition in renderPage()

The framework approach separates concerns better, making it clearer where to add new features.

### 3. What are the benefits of each approach?

**Answer:**

**Library Approach Benefits:**
- Everything in one place (good for small apps)
- Full control over the routing logic
- Less initial setup
- Easier to understand for beginners

**Framework Approach Benefits:**
- Better organization and separation of concerns
- Easier to maintain as the app grows
- Clear structure that teams can follow
- Each page is isolated (easier testing)
- Configuration-based routing is more scalable

### 4. How does the framework approach guide your code structure?

**Answer:** The framework approach enforces:
- **Separation**: Each page is its own file/module
- **Convention**: Following a specific pattern (routes configuration)
- **Scalability**: Clear place to add new features
- **Predictability**: Other developers know where to find things
- **Reusability**: Pages can be easily imported and reused

The structure makes decisions for you (where files go, how routing works), which reduces decision fatigue and creates consistency across the project. This is exactly what Next.js does with its file-based routing - the framework decides that files in the `pages` folder become routes automatically.