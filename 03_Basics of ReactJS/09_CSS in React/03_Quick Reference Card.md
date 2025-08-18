# CSS in React - Quick Reference Guide

## Syntax Cheat Sheet

### 1. Inline Styles

```jsx
// Basic inline style
<div style={{ backgroundColor: 'blue', color: 'white' }}>Content</div>

// Style object
const cardStyle = {
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

// Dynamic styles with props
const buttonStyle = {
  backgroundColor: isActive ? '#007bff' : '#6c757d',
  transform: isHovered ? 'scale(1.05)' : 'scale(1)'
};

// Conditional styles with ternary
<button style={{
  backgroundColor: isPrimary ? '#007bff' : 'transparent',
  border: isPrimary ? 'none' : '1px solid #007bff'
}}>
```

### 2. External CSS Files

```css
/* Component.css */
.card {
  padding: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card.highlighted {
  border-color: #007bff;
}
```

```jsx
// Component.jsx
import './Component.css';

function Card({ isHighlighted }) {
  return (
    <div className={`card ${isHighlighted ? 'highlighted' : ''}`}>
      Content
    </div>
  );
}
```

### 3. CSS Modules

```css
/* Component.module.css */
.card {
  padding: 20px;
  border-radius: 8px;
}

.primary {
  background-color: #007bff;
  color: white;
}

.large {
  padding: 30px;
  font-size: 18px;
}
```

```jsx
// Component.jsx
import styles from './Component.module.css';

function Card({ variant, size }) {
  const classes = [
    styles.card,
    styles[variant],
    size && styles[size]
  ].filter(Boolean).join(' ');
  
  return <div className={classes}>Content</div>;
}
```

### 4. Styled Components

```jsx
import styled from 'styled-components';

// Basic styled component
const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// With props
const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  padding: ${props => props.size === 'large' ? '15px 25px' : '10px 20px'};
  
  &:hover {
    opacity: 0.9;
  }
`;

// Usage
<Button primary size="large">Click me</Button>
```

## Common Patterns

### Conditional Classes

```jsx
// Method 1: Template literals
const classes = `card ${isActive ? 'active' : ''} ${size}`;

// Method 2: Array filter
const classes = [
  'card',
  isActive && 'active',
  size && `size-${size}`
].filter(Boolean).join(' ');

// Method 3: Ternary operator
const classes = `card ${isActive ? 'card-active' : 'card-inactive'}`;
```

### Dynamic Inline Styles

```jsx
// Based on state
const [isHovered, setIsHovered] = useState(false);

const cardStyle = {
  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
  transition: 'transform 0.3s ease'
};

// Based on props
const alertStyle = {
  backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
  color: type === 'error' ? '#721c24' : '#155724',
  border: `1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'}`
};
```

### Theme Context Pattern

```jsx
// ThemeContext.js
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Component using theme
function Button() {
  const { theme } = useTheme();
  
  return (
    <button style={{
      backgroundColor: theme.primary,
      color: theme.onPrimary
    }}>
      Button
    </button>
  );
}
```

## Performance Tips

### Inline Styles
- ✅ Extract style objects outside render for static styles
- ✅ Use useMemo for complex dynamic styles
- ❌ Avoid creating new objects in render

```jsx
// ✅ Good
const staticStyles = { padding: '10px', margin: '5px' };

// ✅ Better for dynamic styles
const dynamicStyles = useMemo(() => ({
  backgroundColor: isActive ? 'blue' : 'gray'
}), [isActive]);

// ❌ Bad - creates new object every render
<div style={{ padding: '10px' }}>
```

### CSS Classes
- ✅ Use CSS for animations and transitions
- ✅ Leverage browser caching
- ✅ Use CSS variables for theme values

```css
/* ✅ Good - CSS variables */
:root {
  --primary-color: #007bff;
  --border-radius: 8px;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
```

## Common CSS Properties in React

### Layout
```jsx
const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  padding: '20px',
  margin: '10px auto',
  maxWidth: '1200px'
};
```

### Typography
```jsx
const textStyles = {
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '1.5',
  textAlign: 'center',
  color: '#333',
  fontFamily: 'Arial, sans-serif'
};
```

### Visual Effects
```jsx
const effectStyles = {
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: '1px solid #ddd',
  backgroundColor: '#ffffff',
  opacity: 0.9,
  transform: 'scale(1.05)',
  transition: 'all 0.3s ease'
};
```

## Responsive Design Patterns

### CSS Media Queries (External CSS)
```css
.card {
  padding: 20px;
}

@media (max-width: 768px) {
  .card {
    padding: 16px;
  }
}
```

### JavaScript Responsive (Inline Styles)
```jsx
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  const cardStyle = {
    padding: width < 768 ? '16px' : '24px',
    fontSize: width < 768 ? '14px' : '16px'
  };
  
  return <div style={cardStyle}>Content</div>;
}
```

## Debugging Tips

### CSS Modules
```jsx
// Add console.log to see generated class names
console.log(styles); // { button: "Button_button__2X3Kj" }

// Use browser dev tools to inspect actual class names
```

### Inline Styles
```jsx
// Use React Developer Tools to inspect style objects
// Add temporary console.log for style debugging
console.log('Button styles:', buttonStyles);
```

### General CSS Debugging
- Use browser developer tools
- Add temporary background colors to see layout
- Use `* { border: 1px solid red; }` for layout debugging
- Check for typos in camelCase properties (backgroundColor, not background-color)

## Common Gotchas

1. **CSS Property Names**: Use camelCase for inline styles
   ```jsx
   // ❌ Wrong
   { background-color: 'blue' }
   
   // ✅ Correct
   { backgroundColor: 'blue' }
   ```

2. **CSS Modules Import**: Use curly braces for named imports
   ```jsx
   // ❌ Wrong
   import styles from './Component.css';
   
   // ✅ Correct
   import styles from './Component.module.css';
   ```

3. **Global CSS Conflicts**: Be careful with class naming
   ```css
   /* ❌ Too generic */
   .button { }
   
   /* ✅ More specific */
   .product-card-button { }
   ```

4. **Inline Style Values**: Numbers become pixels, strings stay as-is
   ```jsx
   {
     width: 100,        // becomes '100px'
     height: '50vh',    // stays '50vh'
     margin: '10px 5px' // stays '10px 5px'
   }
   ```