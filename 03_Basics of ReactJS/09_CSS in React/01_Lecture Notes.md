# CSS in React.js - Lecture Notes

## Table of Contents
- [Introduction](#introduction)
- [Vocabulary](#vocabulary)
- [1. Inline Styles](#1-inline-styles)
- [2. CSS Files (External Stylesheets)](#2-css-files-external-stylesheets)
- [3. CSS Modules](#3-css-modules)
- [4. Styled Components (CSS-in-JS)](#4-styled-components-css-in-js)
- [5. Conditional Styling](#5-conditional-styling)
- [Summary](#summary)
- [Additional Resources](#additional-resources)

---

## Introduction

In this lesson, we'll explore the different ways to apply CSS styling to React components. React offers several approaches to styling, each with its own advantages and use cases. We'll cover inline styles, external CSS files, CSS modules, and CSS-in-JS libraries, building on your existing knowledge of React components, props, state, and conditional rendering.

**Prerequisites Covered:**
- React components and JSX
- Props and state management
- Conditional rendering
- ES6+ JavaScript features
- Node.js and npm

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## Vocabulary

**CSS (Cascading Style Sheets)**: A styling language used to describe how HTML elements should be displayed.

**Inline Styles**: CSS styles written directly in JSX using the `style` attribute as a JavaScript object.

**External Stylesheet**: A separate `.css` file that contains styling rules, imported into React components.

**CSS Modules**: A CSS file where class names are locally scoped by default, preventing naming conflicts.

**CSS-in-JS**: A styling technique where CSS is written inside JavaScript files, often using libraries like styled-components.

**Class Name**: A CSS selector that targets elements with a specific class attribute (`.className` in CSS).

**Style Object**: A JavaScript object containing CSS properties as key-value pairs.

**Scoped Styles**: CSS styles that only apply to specific components, preventing global conflicts.

**Dynamic Styling**: Styles that change based on component state, props, or conditions.

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## 1. Inline Styles

Inline styles in React are written as JavaScript objects and passed to the `style` attribute. This approach is useful for dynamic styling based on state or props.

### Syntax and Structure

```jsx
// Basic inline style object
const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px'
};

// Component using inline styles
function Button({ text, isActive }) {
  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
}
```

### Key Points About Inline Styles

1. **camelCase Properties**: CSS properties use camelCase instead of kebab-case
   - `background-color` becomes `backgroundColor`
   - `font-size` becomes `fontSize`

2. **String or Number Values**: Most properties accept strings, but numbers are automatically converted to pixels
   ```jsx
   const styles = {
     width: 200,        // becomes '200px'
     height: '100px',   // stays as string
     margin: '10px 5px' // string with multiple values
   };
   ```

### Dynamic Inline Styles

```jsx
function StatusCard({ status, message }) {
  // Dynamic styles based on props
  const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: status === 'success' ? '#d4edda' : '#f8d7da',
    color: status === 'success' ? '#155724' : '#721c24',
    border: `1px solid ${status === 'success' ? '#c3e6cb' : '#f5c6cb'}`
  };

  return (
    <div style={cardStyle}>
      <p>{message}</p>
    </div>
  );
}
```

### Conditional Styling with Ternary Operator

```jsx
function ToggleButton({ isToggled, onToggle }) {
  return (
    <button
      style={{
        backgroundColor: isToggled ? '#007bff' : '#6c757d',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      onClick={onToggle}
    >
      {isToggled ? 'ON' : 'OFF'}
    </button>
  );
}
```

### Advantages and Disadvantages

**Advantages:**
- Dynamic styling based on props/state
- No CSS file management
- Styles are scoped to the component

**Disadvantages:**
- Can make JSX cluttered
- No CSS features like hover, media queries
- Performance impact with complex styles

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## 2. CSS Files (External Stylesheets)

External CSS files are the traditional approach to styling. In React, you import CSS files into your components.

### Basic Setup

Create a CSS file alongside your component:

**Button.css**
```css
.primary-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.primary-button:hover {
  background-color: #0056b3;
}

.primary-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
```

**Button.jsx**
```jsx
import './Button.css';

function Button({ text, disabled, onClick }) {
  return (
    <button 
      className="primary-button" 
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
```

### Using Multiple Classes

```jsx
function Card({ title, content, isHighlighted, size }) {
  // Building className string with conditional classes
  const cardClasses = `card ${isHighlighted ? 'highlighted' : ''} ${size}`;
  
  return (
    <div className={cardClasses}>
      <h3 className="card-title">{title}</h3>
      <p className="card-content">{content}</p>
    </div>
  );
}
```

**Card.css**
```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  background-color: white;
}

.card.highlighted {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
}

.card.small {
  padding: 8px;
  font-size: 14px;
}

.card.large {
  padding: 24px;
  font-size: 18px;
}

.card-title {
  margin: 0 0 12px 0;
  color: #333;
}

.card-content {
  margin: 0;
  color: #666;
  line-height: 1.5;
}
```

### Dynamic Class Names with Template Literals

```jsx
function StatusBadge({ status, text }) {
  return (
    <span className={`badge badge-${status}`}>
      {text}
    </span>
  );
}
```

**StatusBadge.css**
```css
.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.badge-success {
  background-color: #28a745;
  color: white;
}

.badge-warning {
  background-color: #ffc107;
  color: #212529;
}

.badge-error {
  background-color: #dc3545;
  color: white;
}
```

### Global vs Component Styles

**Global styles** (usually in `src/index.css` or `src/App.css`):
```css
/* Global styles affect the entire application */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

**Component styles** are imported into specific components and can still affect global scope if class names conflict.

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## 3. CSS Modules

CSS Modules solve the problem of global CSS by making class names locally scoped. Each CSS class is given a unique name automatically.

### Setup and Basic Usage

Create a CSS Module file with `.module.css` extension:

**Button.module.css**
```css
.primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary:hover {
  background-color: #0056b3;
}

.secondary {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.large {
  padding: 15px 25px;
  font-size: 18px;
}
```

**Button.jsx**
```jsx
import styles from './Button.module.css';

function Button({ variant, size, children, onClick }) {
  // Access classes through the styles object
  const buttonClass = `${styles[variant]} ${size ? styles[size] : ''}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
```

### Multiple Classes with CSS Modules

```jsx
import styles from './ProductCard.module.css';

function ProductCard({ product, isOnSale, isFeatured }) {
  // Combining multiple module classes
  const cardClasses = [
    styles.card,
    isOnSale && styles.onSale,
    isFeatured && styles.featured
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.price}>${product.price}</p>
        {isOnSale && <span className={styles.saleTag}>SALE</span>}
      </div>
    </div>
  );
}
```

**ProductCard.module.css**
```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.featured {
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.onSale {
  position: relative;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 16px;
}

.title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.price {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
}

.saleTag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
```

### Advantages of CSS Modules

1. **Scoped Styles**: No global namespace pollution
2. **Class Name Conflicts Avoided**: Automatic unique naming
3. **Explicit Dependencies**: Import exactly what you need
4. **Better Maintainability**: Easier to track which styles belong to which components

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## 4. Styled Components (CSS-in-JS)

Styled Components is a popular library that allows you to write CSS directly in your JavaScript files using template literals.

### Installation and Setup

First, install styled-components:
```bash
npm install styled-components
```

### Basic Styled Components

```jsx
import styled from 'styled-components';

// Creating a styled button component
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// Using the styled component
function App() {
  return (
    <div>
      <StyledButton>Click me</StyledButton>
      <StyledButton disabled>Disabled</StyledButton>
    </div>
  );
}
```

### Props-Based Styling

```jsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  // Dynamic styling based on props
  background-color: ${props => {
    switch(props.variant) {
      case 'primary': return '#007bff';
      case 'secondary': return '#6c757d';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      default: return '#007bff';
    }
  }};
  
  color: ${props => props.variant === 'secondary' ? '#333' : 'white'};
  
  // Size variations
  ${props => props.size === 'large' && `
    padding: 15px 25px;
    font-size: 18px;
  `}
  
  ${props => props.size === 'small' && `
    padding: 5px 10px;
    font-size: 14px;
  `}
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// Usage with props
function ButtonExample() {
  return (
    <div>
      <Button variant="primary" size="large">Primary Large</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger" size="small">Danger Small</Button>
    </div>
  );
}
```

### Styled Components with Theme Context

```jsx
import styled, { ThemeProvider } from 'styled-components';
import { useContext } from 'react';

// Theme object
const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
};

const darkTheme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    background: '#1a1a1a',
    text: '#ffffff'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
};

// Styled component using theme
const ThemedCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.large};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.secondary};
  margin: ${props => props.theme.spacing.medium};
`;

const ThemedButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: 4px;
  cursor: pointer;
`;

// Component using themed styled components
function ThemedComponent({ isDark }) {
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <ThemedCard>
        <h3>Themed Card</h3>
        <p>This card adapts to the current theme.</p>
        <ThemedButton>Themed Button</ThemedButton>
      </ThemedCard>
    </ThemeProvider>
  );
}
```

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## 5. Conditional Styling

Building on your knowledge of conditional rendering, we can apply the same concepts to styling.

### Conditional Classes with Logical Operators

```jsx
function NotificationBanner({ message, type, isVisible, onClose }) {
  // Using logical AND operator for conditional classes
  const bannerClasses = `notification ${type && `notification-${type}`} ${isVisible && 'visible'}`;
  
  if (!isVisible) return null;
  
  return (
    <div className={bannerClasses}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}
```

### Array-Based Class Building

```jsx
function UserAvatar({ user, size, isOnline, isActive }) {
  const avatarClasses = [
    'avatar',
    `avatar-${size}`,
    isOnline && 'online',
    isActive && 'active'
  ].filter(Boolean).join(' ');
  
  return (
    <div className={avatarClasses}>
      <img src={user.profilePicture} alt={user.name} />
      {isOnline && <div className="online-indicator"></div>}
    </div>
  );
}
```

### State-Based Styling

```jsx
import { useState } from 'react';

function InteractiveCard({ title, content }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: isClicked ? '#f0f8ff' : 'white'
  };
  
  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      <h3>{title}</h3>
      <p>{content}</p>
      {isClicked && <p>Card is selected!</p>}
    </div>
  );
}
```

### Using useContext for Theme-Based Styling

```jsx
import { createContext, useContext, useState } from 'react';

// Create Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component using theme context for styling
function ThemedComponent() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  const containerStyle = {
    backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
    color: isDark ? '#ffffff' : '#333333',
    padding: '20px',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };
  
  const buttonStyle = {
    backgroundColor: isDark ? '#007bff' : '#0056b3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  return (
    <div style={containerStyle}>
      <h1>Theme Example</h1>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button style={buttonStyle} onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}
```

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## Summary

In this lesson, we covered four main approaches to styling React components:

### Key Takeaways

1. **Inline Styles**: Best for dynamic styling based on props/state, written as JavaScript objects with camelCase properties.

2. **External CSS Files**: Traditional approach using separate `.css` files, good for complex styling with pseudo-classes and media queries.

3. **CSS Modules**: Locally scoped CSS classes that prevent naming conflicts, imported as objects with unique class names.

4. **Styled Components**: CSS-in-JS approach allowing dynamic styling with props and theme support.

5. **Conditional Styling**: Using ternary operators, logical AND, and state to dynamically apply styles based on component conditions.

### When to Use Each Approach

- **Inline Styles**: Simple dynamic styles, quick prototyping
- **CSS Files**: Complex layouts, global styles, team familiarity with CSS
- **CSS Modules**: Medium to large projects needing style isolation
- **Styled Components**: Component libraries, heavy prop-based styling

### Best Practices

- Keep styling consistent across your application
- Use semantic class names and component names
- Consider performance implications of your chosen approach
- Combine approaches when it makes sense (e.g., CSS Modules for layout, inline styles for dynamic colors)

[↑ Back to Top](#css-in-reactjs---lecture-notes)

---

## Additional Resources

### Documentation Links
- [React Styling Documentation](https://react.dev/learn/styling)
- [CSS Modules GitHub](https://github.com/css-modules/css-modules)
- [Styled Components Documentation](https://styled-components.com/)

### W3Schools References
- [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)
- [CSS Grid](https://www.w3schools.com/css/css_grid.asp)
- [CSS Transitions](https://www.w3schools.com/css/css3_transitions.asp)

### Practice Resources
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

[↑ Back to Top](#css-in-reactjs---lecture-notes)