# React Performance Hooks: useCallback and useMemo
## CAP Unit 03 - Lesson 12

---

## Table of Contents

| Topic | Description |
|-------|-------------|
| [Introduction](#introduction) | Overview of React performance optimization |
| [useCallback Hook](#usecallback-hook) | Memoizing functions to prevent unnecessary re-renders |
| [useMemo Hook](#usememo-hook) | Memoizing expensive calculations |
| [When to Use These Hooks](#when-to-use-these-hooks) | Best practices and guidelines |
| [Common Pitfalls](#common-pitfalls) | What to avoid when using these hooks |
| [Summary](#summary) | Key takeaways and review |
| [Additional Resources](#additional-resources) | Documentation and further reading |

---

## Introduction
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

React applications can sometimes experience performance issues when components re-render unnecessarily. In this lesson, we'll learn about two powerful React hooks that help optimize performance:

- **useCallback**: Memoizes functions to prevent unnecessary re-creation
- **useMemo**: Memoizes the result of expensive calculations

### Prerequisites Review
Before we dive in, let's quickly review what you already know:
- React functional components and JSX
- useState and useEffect hooks
- Props and state management
- useContext for sharing data
- Event handling and conditional rendering

### Why Performance Matters
When a React component re-renders, all functions inside that component are recreated, and all calculations are re-executed. This can lead to:
- Unnecessary child component re-renders
- Expensive calculations running repeatedly
- Poor user experience with laggy interfaces

---

## useCallback Hook
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### What is useCallback?

`useCallback` is a React hook that returns a memoized version of a callback function. It only changes if one of its dependencies has changed.

### Syntax

```javascript
const memoizedCallback = useCallback(
  () => {
    // Your function logic here
  },
  [dependency1, dependency2] // Dependencies array
);
```

### Import Statement

```javascript
import { useCallback } from 'react';
```

### Basic Example

Let's start with a simple example to understand the problem useCallback solves:

#### Without useCallback (Problematic)

```javascript
import { useState } from 'react';

// Child component that receives a function as prop
const Button = ({ onClick, children }) => {
  console.log('Button component re-rendered');
  return <button onClick={onClick}>{children}</button>;
};

// Parent component
const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // This function is recreated on every render
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type your name"
      />
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
};
```

**Problem**: Every time we type in the input (changing `name`), the `Button` component re-renders because `handleClick` is recreated, making React think it's a new prop.

#### With useCallback (Solution)

```javascript
import { useState, useCallback } from 'react';

const Button = ({ onClick, children }) => {
  console.log('Button component re-rendered');
  return <button onClick={onClick}>{children}</button>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Memoized function - only recreated when count changes
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Dependencies array

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type your name"
      />
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
};
```

### Better Approach with Functional Updates

```javascript
import { useState, useCallback } from 'react';

const Button = ({ onClick, children }) => {
  console.log('Button component re-rendered');
  return <button onClick={onClick}>{children}</button>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // No dependencies needed with functional update
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependencies array

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type your name"
      />
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
};
```

### Real-World Example: Shopping Cart

```javascript
import { useState, useCallback } from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  console.log(`CartItem ${item.id} rendered`);
  
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
        +
      </button>
      <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
        -
      </button>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 75, quantity: 1 }
  ]);
  const [customerName, setCustomerName] = useState('');

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <input 
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      
      {cart.map(item => (
        <CartItem 
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
      ))}
      
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};

export default ShoppingCart;
```

---

## useMemo Hook
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### What is useMemo?

`useMemo` is a React hook that returns a memoized value. It only recomputes the value when one of its dependencies has changed, preventing expensive calculations from running on every render.

### Syntax

```javascript
const memoizedValue = useMemo(
  () => {
    // Expensive calculation here
    return computedValue;
  },
  [dependency1, dependency2] // Dependencies array
);
```

### Import Statement

```javascript
import { useMemo } from 'react';
```

### Basic Example

#### Without useMemo (Problematic)

```javascript
import { useState } from 'react';

const expensiveCalculation = (num) => {
  console.log('Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

const App = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  // This expensive calculation runs on every render
  const expensiveValue = expensiveCalculation(count);

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};
```

**Problem**: The expensive calculation runs every time we type in the input, even though `count` hasn't changed.

#### With useMemo (Solution)

```javascript
import { useState, useMemo } from 'react';

const expensiveCalculation = (num) => {
  console.log('Expensive calculation running...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

const App = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  // Memoized expensive calculation - only runs when count changes
  const expensiveValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
      />
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};
```

### Real-World Example: Data Processing

```javascript
import { useState, useMemo } from 'react';

const ProductList = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', rating: 4.5 },
    { id: 2, name: 'Desk Chair', price: 299, category: 'Furniture', rating: 4.2 },
    { id: 3, name: 'Monitor', price: 399, category: 'Electronics', rating: 4.7 },
    { id: 4, name: 'Coffee Table', price: 199, category: 'Furniture', rating: 4.0 },
    { id: 5, name: 'Smartphone', price: 699, category: 'Electronics', rating: 4.6 },
    { id: 6, name: 'Bookshelf', price: 149, category: 'Furniture', rating: 4.1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);

  // Memoized filtered products - only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesRating = product.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [products, searchTerm, selectedCategory, minRating]);

  // Memoized statistics
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    const totalProducts = filteredProducts.length;
    const averagePrice = totalProducts > 0 
      ? filteredProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts 
      : 0;
    const highestRated = filteredProducts.reduce((highest, product) => 
      product.rating > highest.rating ? product : highest, 
      { rating: 0 }
    );

    return {
      totalProducts,
      averagePrice: Math.round(averagePrice * 100) / 100,
      highestRated: highestRated.rating > 0 ? highestRated : null
    };
  }, [filteredProducts]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Catalog</h2>
      
      {/* Search Controls */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          style={{ marginRight: '10px', padding: '5px' }}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
        
        <input
          type="number"
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value) || 0)}
          placeholder="Min Rating"
          min="0"
          max="5"
          step="0.1"
          style={{ padding: '5px' }}
        />
      </div>

      {/* Statistics */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        marginBottom: '20px',
        borderRadius: '5px'
      }}>
        <h3>Statistics</h3>
        <p>Total Products: {statistics.totalProducts}</p>
        <p>Average Price: ${statistics.averagePrice}</p>
        {statistics.highestRated && (
          <p>Highest Rated: {statistics.highestRated.name} ({statistics.highestRated.rating}⭐)</p>
        )}
      </div>

      {/* Product List */}
      <div>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating}⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

### Memoizing Objects and Arrays

```javascript
import { useState, useMemo } from 'react';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [age, setAge] = useState(25);
  const [email, setEmail] = useState('john.doe@email.com');

  // Memoized user object - only recreated when dependencies change
  const userInfo = useMemo(() => ({
    fullName: `${firstName} ${lastName}`,
    email: email,
    age: age,
    isAdult: age >= 18,
    initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }), [firstName, lastName, age, email]);

  // Memoized array of user preferences
  const userPreferences = useMemo(() => [
    'Dark Mode',
    'Email Notifications',
    age >= 21 ? 'Adult Content' : 'Family Friendly',
    'Auto-save'
  ], [age]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          placeholder="Age"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ padding: '5px' }}
        />
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
        <h3>User Information</h3>
        <p><strong>Full Name:</strong> {userInfo.fullName}</p>
        <p><strong>Initials:</strong> {userInfo.initials}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Age:</strong> {userInfo.age}</p>
        <p><strong>Status:</strong> {userInfo.isAdult ? 'Adult' : 'Minor'}</p>
        
        <h4>Preferences:</h4>
        <ul>
          {userPreferences.map((pref, index) => (
            <li key={index}>{pref}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
```

---

## When to Use These Hooks
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### useCallback - Use When:
1. **Passing callbacks to child components** that are wrapped in `React.memo`
2. **Functions are dependencies** of other hooks (useEffect, useMemo, etc.)
3. **Creating event handlers** that are passed as props
4. **Working with context** where callbacks are provided to consumers

### useMemo - Use When:
1. **Expensive calculations** that don't need to run on every render
2. **Creating objects or arrays** that are passed as props
3. **Filtering or transforming large datasets**
4. **Complex computations** based on props or state

### When NOT to Use These Hooks

**Don't use them for:**
- Simple calculations (addition, string concatenation)
- Functions that aren't passed as props
- Values that change on every render anyway
- Premature optimization - measure first!

### Performance Testing Example

```javascript
import { useState, useMemo, useCallback } from 'react';

const PerformanceTest = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // Expensive calculation for demonstration
  const expensiveCalculation = (num) => {
    console.time('Expensive Calculation');
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += num;
    }
    console.timeEnd('Expensive Calculation');
    return result;
  };

  // With useMemo - only runs when count changes
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  // Without useMemo - runs on every render
  // const normalValue = expensiveCalculation(count);

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Performance Test</h2>
      <p>Open browser console to see timing logs</p>
      
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here to trigger re-renders"
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      
      <div>
        <p>Count: {count}</p>
        <p>Memoized Result: {memoizedValue}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </div>
  );
};

export default PerformanceTest;
```

---

## Common Pitfalls
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### 1. Incorrect Dependencies

```javascript
// ❌ Wrong - missing dependencies
const badCallback = useCallback(() => {
  console.log(count); // count is used but not in dependencies
}, []); // Missing count dependency

// ✅ Correct
const goodCallback = useCallback(() => {
  console.log(count);
}, [count]); // count is included
```

### 2. Overusing Memoization

```javascript
// ❌ Unnecessary for simple calculations
const simpleValue = useMemo(() => a + b, [a, b]);

// ✅ Better - just calculate directly
const simpleValue = a + b;
```

### 3. Memoizing with Object Dependencies

```javascript
// ❌ Object dependency will always be different
const badMemo = useMemo(() => {
  return someCalculation(config);
}, [config]); // config is an object that changes every render

// ✅ Better - use specific properties
const goodMemo = useMemo(() => {
  return someCalculation(config);
}, [config.prop1, config.prop2]); // Specific properties
```

### 4. Creating New Objects in Dependencies

```javascript
// ❌ Creates new array every time
const badCallback = useCallback(() => {
  // do something
}, [items.map(item => item.id)]); // New array created each render

// ✅ Better - memoize the dependency first
const itemIds = useMemo(() => items.map(item => item.id), [items]);
const goodCallback = useCallback(() => {
  // do something
}, [itemIds]);
```

---

## Summary
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### Key Takeaways

**useCallback:**
- Memoizes functions to prevent unnecessary recreations
- Essential when passing callbacks to child components
- Use with functional state updates to minimize dependencies
- Helps prevent unnecessary child re-renders

**useMemo:**
- Memoizes the result of expensive calculations
- Only recalculates when dependencies change
- Great for filtering, sorting, and complex computations
- Can memoize objects and arrays to maintain referential equality

**Best Practices:**
1. **Measure before optimizing** - don't prematurely optimize
2. **Include all dependencies** in the dependency array
3. **Use functional updates** with useState to reduce dependencies
4. **Don't overuse** - simple calculations don't need memoization
5. **Consider React.memo** for child components receiving memoized props

**Common Patterns:**
- Filter/search functionality with useMemo
- Event handlers passed to children with useCallback
- Complex object creation with useMemo
- API response processing with useMemo

### Performance Impact
These hooks help with:
- Reducing unnecessary re-renders
- Preventing expensive calculations from running repeatedly
- Maintaining referential equality for objects and functions
- Improving overall application responsiveness

Remember: These are optimization tools. Use them when you have identified actual performance problems, not as a default practice for every function or calculation.

---

## Additional Resources
[⬆️ Back to Top](#react-performance-hooks-usecallback-and-usememo)

### Documentation
- [React useCallback Documentation](https://react.dev/reference/react/useCallback)
- [React useMemo Documentation](https://react.dev/reference/react/useMemo)
- [React.memo Documentation](https://react.dev/reference/react/memo)

### W3Schools Resources
- [W3Schools React Hooks](https://www.w3schools.com/react/react_hooks.asp)
- [W3Schools React Performance](https://www.w3schools.com/react/react_memo.asp)

### Tools for Development
- **React Developer Tools**: Browser extension for debugging React applications
- **IntelliJ IDEA**: Your IDE for development
- **Git & GitHub**: Version control for your projects

### Further Reading
- [React Performance Optimization Guide](https://react.dev/learn/render-and-commit)
- [When to use useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)

---

*End of Lecture Notes - CAP Unit 03 Lesson 12*