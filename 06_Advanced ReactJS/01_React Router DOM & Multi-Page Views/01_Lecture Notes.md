# React Router DOM & Multi-Page Views
## Lecture Notes

---

## Table of Contents

| Section | Topic | Description |
|---------|--------|-------------|
| [1. Introduction](#1-introduction) | Course Overview | What we'll learn about routing |
| [2. React Router DOM](#2-react-router-dom) | Core Concepts | Understanding client-side routing |
| [3. Multi-Page Views](#3-multi-page-views) | Navigation Systems | Creating multiple views in React |
| [Vocabulary](#vocabulary) | Key Terms | Important terminology |
| [Summary](#summary) | Key Takeaways | What you've learned |
| [Resources](#resources) | Additional Learning | Documentation and tutorials |

---

## 1. Introduction

[Back to Top](#react-router-dom--multi-page-views)

### What is Client-Side Routing?

In traditional web applications, when a user clicks a link, the browser makes a new request to the server for a different page. This causes the entire page to reload. 

**Client-side routing** allows us to create the illusion of multiple pages in a single-page application (SPA) without full page reloads. The URL changes, but JavaScript handles showing different content.

### Why Use React Router?

- **Faster Navigation**: No full page reloads
- **Better User Experience**: Smooth transitions between views
- **Bookmarkable URLs**: Users can bookmark specific pages
- **Browser History**: Back/forward buttons work correctly
- **SEO Friendly**: Search engines can index different routes

---

## 2. React Router DOM

[Back to Top](#react-router-dom--multi-page-views)

### What is React Router DOM?

React Router DOM is the most popular library for handling routing in React applications. It allows you to create different "pages" or views in your React app while maintaining the single-page application benefits.

### Installation

First, you need to install React Router DOM in your Vite React project:

```bash
npm install react-router-dom
```

### Core Components

#### 1. BrowserRouter

The `BrowserRouter` component wraps your entire application and enables routing functionality. It uses the HTML5 history API to keep your UI in sync with the URL.

```javascript
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app components go here */}
    </BrowserRouter>
  );
}
```

#### 2. Routes and Route

- `Routes`: Container for all your Route components
- `Route`: Defines a single route (path and component to render)

```javascript
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### 3. Link Component

The `Link` component creates navigation links that don't cause page reloads:

```javascript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### Basic Routing Example

Let's create a simple multi-page application:

**App.jsx**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

**components/Navigation.jsx**
```javascript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <h1>My Website</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

**components/Home.jsx**
```javascript
function Home() {
  return (
    <div>
      <h2>Welcome to Our Homepage</h2>
      <p>This is the main page of our website.</p>
    </div>
  );
}

export default Home;
```

### URL Parameters

You can capture dynamic values from the URL using parameters:

```javascript
import { Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
    </Routes>
  );
}
```

**components/UserProfile.jsx**
```javascript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  
  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}

export default UserProfile;
```

### Programmatic Navigation

Sometimes you need to navigate programmatically (not from a link click):

```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    
    // Navigate to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### NavLink Component

`NavLink` is like `Link` but provides styling capabilities for active links:

```javascript
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Home
      </NavLink>
      <NavLink 
        to="/about"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        About
      </NavLink>
    </nav>
  );
}
```

---

## 3. Multi-Page Views

[Back to Top](#react-router-dom--multi-page-views)

### Creating Multiple Views

Multi-page views in React Router involve creating different components for different pages and setting up routes for them.

### Layout Components

Often, you want consistent elements (like navigation, footer) across all pages:

**components/Layout.jsx**
```javascript
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout() {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        <Outlet /> {/* This renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
```

**App.jsx with Layout**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Nested Routes

You can create nested routes for complex page structures:

```javascript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductLayout />}>
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Error Handling (404 Pages)

Handle routes that don't exist:

```javascript
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**components/NotFound.jsx**
```javascript
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
```

### Query Parameters

Access query parameters from the URL:

```javascript
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  return (
    <div>
      <h2>Search Results</h2>
      <p>Searching for: {query}</p>
      {category && <p>Category: {category}</p>}
    </div>
  );
}

// URL: /search?q=react&category=tutorials
```

### Conditional Navigation

Show different navigation based on user state:

```javascript
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // You learned this already

function Navigation() {
  // Assuming you have a user context (similar to ThemeContext)
  const { user } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
```

---

## Vocabulary

[Back to Top](#react-router-dom--multi-page-views)

| Term | Definition |
|------|------------|
| **Client-Side Routing** | Navigation between different views in a web application without full page reloads |
| **SPA (Single Page Application)** | A web application that loads a single HTML page and updates content dynamically |
| **BrowserRouter** | React Router component that uses HTML5 history API for routing |
| **Route** | A component that renders content when the URL matches its path |
| **Routes** | Container component that holds all Route components |
| **Link** | Component for creating navigational links without page reloads |
| **NavLink** | Similar to Link but provides active state styling |
| **URL Parameters** | Dynamic parts of a URL that can be captured (e.g., `/user/:id`) |
| **useParams** | Hook to access URL parameters in a component |
| **useNavigate** | Hook for programmatic navigation |
| **useSearchParams** | Hook to read and modify query parameters |
| **Outlet** | Component that renders matched child routes in nested routing |
| **Nested Routes** | Routes that are children of other routes |
| **Protected Routes** | Routes that require authentication or authorization |
| **Query Parameters** | URL parameters after the `?` (e.g., `?search=react&page=1`) |

---

## Summary

[Back to Top](#react-router-dom--multi-page-views)

### Key Concepts Learned

1. **React Router DOM Basics**
   - Installing and setting up React Router DOM
   - Understanding client-side routing vs. server-side routing
   - Creating basic routes with BrowserRouter, Routes, and Route

2. **Navigation Components**
   - Using Link for navigation without page reloads
   - NavLink for active state styling
   - Programmatic navigation with useNavigate

3. **Dynamic Routing**
   - URL parameters with useParams
   - Query parameters with useSearchParams
   - Creating dynamic and flexible routes

4. **Advanced Routing Patterns**
   - Nested routes with Outlet
   - Layout components for consistent UI
   - 404 error handling
   - Conditional navigation based on application state

5. **Multi-Page Views**
   - Creating the illusion of multiple pages in a SPA
   - Managing different views and layouts
   - Integrating routing with existing React knowledge (useState, useEffect, useContext)

### Best Practices

- Always wrap your app in BrowserRouter
- Use Link or NavLink instead of anchor tags
- Create layout components for consistent UI
- Handle 404 errors with a catch-all route
- Use meaningful URLs that reflect your app structure
- Combine routing with your existing React knowledge (context, custom hooks, etc.)

---

## Resources

[Back to Top](#react-router-dom--multi-page-views)

### Documentation

- **React Router Official Documentation**: [https://reactrouter.com/](https://reactrouter.com/)
- **React Router DOM API Reference**: [https://reactrouter.com/en/main/routers/browser-router](https://reactrouter.com/en/main/routers/browser-router)

### W3Schools Tutorials

- **HTML5 History API**: [https://www.w3schools.com/html/html5_webstorage.asp](https://www.w3schools.com/html/html5_webstorage.asp)
- **JavaScript URL Object**: [https://www.w3schools.com/jsref/obj_url.asp](https://www.w3schools.com/jsref/obj_url.asp)

### Additional Learning

- **MDN Web Docs - History API**: [https://developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- **React Router Tutorial**: [https://reactrouter.com/en/main/start/tutorial](https://reactrouter.com/en/main/start/tutorial)

### Tools

- **IntelliJ IDEA**: Continue using your familiar IDE
- **Git & GitHub**: Version control for your routing projects
- **React Developer Tools**: Browser extension for debugging React apps with routing

---

*Remember: React Router DOM builds on all the React concepts you've already learned. Use your knowledge of useState, useEffect, useContext, and custom hooks to create dynamic, interactive multi-page applications!*