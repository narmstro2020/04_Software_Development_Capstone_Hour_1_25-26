# React Component Patterns - Lecture Notes

[⬆ Back to Top](#react-component-patterns---lecture-notes)

## Table of Contents

| Topic | Description |
|-------|-------------|
| [Introduction](#introduction) | Overview of component patterns |
| [Vocabulary](#vocabulary) | Key terms and definitions |
| [1. Container Components](#1-container-components) | Smart components that handle logic |
| [2. Presentational Components](#2-presentational-components) | UI-focused components |
| [3. List-Item Pattern](#3-list-item-pattern) | Rendering lists efficiently |
| [Visual Guide](#visual-guide) | Diagrams and visual representations |
| [Summary](#summary) | Key takeaways |
| [Resources](#resources) | Additional learning materials |

---

## Introduction

[⬆ Back to Top](#react-component-patterns---lecture-notes)

React Component Patterns are reusable solutions to common problems in React development. They help us organize our code better, making it more maintainable and easier to understand. In this lesson, we'll explore three fundamental patterns you'll use in almost every React application.

### Why Component Patterns Matter

- **Separation of Concerns**: Different components handle different responsibilities
- **Reusability**: Write once, use many times
- **Maintainability**: Easier to update and debug
- **Team Collaboration**: Standard patterns everyone understands

---

## Vocabulary

[⬆ Back to Top](#react-component-patterns---lecture-notes)

| Term | Definition |
|------|------------|
| **Container Component** | A component that handles data fetching, state management, and business logic |
| **Presentational Component** | A component focused on how things look, receiving data via props |
| **Smart Component** | Another name for Container Component |
| **Dumb Component** | Another name for Presentational Component (receives props, renders UI) |
| **List-Item Pattern** | A pattern for efficiently rendering collections of similar items |
| **Props Drilling** | Passing props through multiple component levels |
| **Component Composition** | Building complex UIs by combining simpler components |
| **Separation of Concerns** | Organizing code so each part handles one specific task |

---

## 1. Container Components

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### What are Container Components?

Container components are the "smart" components in your application. They:
- Manage state using `useState`
- Handle side effects with `useEffect`
- Fetch data from APIs
- Process and transform data
- Pass data down to presentational components

### Key Characteristics

1. **Stateful**: They use `useState` to manage data
2. **Logic-Heavy**: They contain business logic
3. **Data Fetching**: They handle API calls
4. **Minimal UI**: They focus on logic, not appearance

### Code Example: Basic Container Component

```jsx
// UserContainer.jsx - A Container Component
import { useState, useEffect } from 'react';
import UserList from './UserList';

const UserContainer = () => {
    // State management
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data fetching logic
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array - runs once on mount

    // Business logic - filter active users
    const activeUsers = users.filter(user => user.id <= 5);

    // Conditional rendering based on state
    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;

    // Pass data to presentational component
    return (
        <div>
            <h1>Active Users</h1>
            <UserList users={activeUsers} />
        </div>
    );
};

export default UserContainer;
```

### Advanced Container Example with Context

```jsx
// ThemeContainer.jsx - Using Context API
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import ProductDisplay from './ProductDisplay';

const ProductContainer = () => {
    const theme = useContext(ThemeContext);
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        // Fetch products
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // Business logic for sorting
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        }
        return b.price - a.price;
    });

    const handleSortToggle = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div style={{ background: theme.background, color: theme.color }}>
            <button onClick={handleSortToggle}>
                Sort by Price ({sortOrder === 'asc' ? '↑' : '↓'})
            </button>
            <ProductDisplay products={sortedProducts} />
        </div>
    );
};

export default ProductContainer;
```

---

## 2. Presentational Components

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### What are Presentational Components?

Presentational components are the "dumb" components that focus purely on the UI. They:
- Receive data through props
- Focus on how things look
- Are usually stateless (though can have UI-only state)
- Are highly reusable

### Key Characteristics

1. **Props-Driven**: All data comes from props
2. **UI-Focused**: They define the visual appearance
3. **Reusable**: Can be used in multiple places
4. **Simple**: No complex logic or data fetching

### Code Example: Basic Presentational Component

```jsx
// UserCard.jsx - A Presentational Component
const UserCard = ({ name, email, phone, website }) => {
    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>📧 {email}</p>
            <p>📱 {phone}</p>
            <p>🌐 {website}</p>
        </div>
    );
};

export default UserCard;
```

### More Complex Presentational Component

```jsx
// ProductDisplay.jsx - Presentational Component with conditional rendering
const ProductDisplay = ({ products }) => {
    // Only UI logic, no business logic
    return (
        <div className="product-grid">
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map(product => (
                    <div key={product.id} className="product-card">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <h4>{product.title.substring(0, 20)}...</h4>
                        <p className="price">${product.price.toFixed(2)}</p>
                        <p className="category">{product.category}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductDisplay;
```

### Presentational Component with Event Handlers

```jsx
// Button.jsx - Reusable presentational component
const Button = ({ text, onClick, variant = 'primary', disabled = false }) => {
    const buttonClass = `btn btn-${variant}`;
    
    return (
        <button 
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
```

---

## 3. List-Item Pattern

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### What is the List-Item Pattern?

The List-Item pattern separates the rendering of a list from the rendering of individual items. This pattern:
- Makes components more maintainable
- Improves reusability
- Simplifies testing
- Follows the single responsibility principle

### Key Components

1. **List Component**: Handles the collection and iteration
2. **Item Component**: Renders individual items
3. **Container** (optional): Manages data and passes to List

### Code Example: Basic List-Item Pattern

```jsx
// TodoItem.jsx - The Item Component
const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="todo-item">
            <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span 
                style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none' 
                }}
            >
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
};

// TodoList.jsx - The List Component
const TodoList = ({ todos, onToggle, onDelete }) => {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

// TodoContainer.jsx - The Container Component
const TodoContainer = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build an app', completed: false },
        { id: 3, text: 'Deploy to production', completed: false }
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleToggle = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: newTodo,
                completed: false
            }]);
            setNewTodo('');
        }
    };

    return (
        <div>
            <h2>My Todo List</h2>
            <form onSubmit={handleAdd}>
                <input 
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo..."
                />
                <button type="submit">Add</button>
            </form>
            <TodoList 
                todos={todos}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default TodoContainer;
```

### Advanced List-Item Example with Filtering

```jsx
// PostItem.jsx
const PostItem = ({ post }) => {
    return (
        <article className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
        </article>
    );
};

// PostList.jsx
const PostList = ({ posts, filter }) => {
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.body.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="post-list">
            {filteredPosts.length === 0 ? (
                <p>No posts match your search.</p>
            ) : (
                filteredPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

// PostContainer.jsx
const PostContainer = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading posts...</div>;

    return (
        <div>
            <h2>Blog Posts</h2>
            <input 
                type="text"
                placeholder="Search posts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <PostList posts={posts} filter={filter} />
        </div>
    );
};

export default PostContainer;
```

---

## Visual Guide

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### Component Pattern Flow Diagram

```
┌─────────────────────────────────────────────┐
│            Container Component              │
│  • Manages State (useState)                 │
│  • Fetches Data (useEffect + fetch)         │
│  • Contains Business Logic                  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │         State & Logic                │   │
│  │  [data, setData] = useState([])     │   │
│  │  useEffect(() => fetchData(), [])   │   │
│  └─────────────────────────────────────┘   │
│                    ↓                        │
│              Passes Props                   │
│                    ↓                        │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│         Presentational Component            │
│  • Receives Props                           │
│  • Renders UI                               │
│  • No Business Logic                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │    const Component = ({ data }) =>  │   │
│  │      <div>{data.map(...)}</div>     │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### List-Item Pattern Structure

```
Container Component
    ↓ (manages data)
List Component
    ↓ (maps over data)
Item Component (repeated for each item)
```

### Data Flow Example

```
App.jsx
   │
   ├── ProductContainer.jsx (Container)
   │      │
   │      ├── State: products, loading, error
   │      ├── Logic: fetchProducts(), sortProducts()
   │      │
   │      └── ProductList.jsx (Presentational List)
   │             │
   │             └── ProductCard.jsx (Presentational Item)
   │                    │
   │                    ├── Props: title, price, image
   │                    └── Renders: Product UI
   │
   └── CartContainer.jsx (Container)
          │
          └── CartList.jsx (Presentational)
```

---

## Summary

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### Key Takeaways

1. **Container Components**
   - Handle all the "smart" work: state, effects, API calls
   - Focus on WHAT data to show
   - Pass data down via props

2. **Presentational Components**
   - Handle all the visual presentation
   - Focus on HOW to show data
   - Receive everything through props

3. **List-Item Pattern**
   - Separate list logic from item rendering
   - Makes components more reusable
   - Easier to maintain and test

### When to Use Each Pattern

| Pattern | Use When |
|---------|----------|
| Container | You need to manage state, fetch data, or handle complex logic |
| Presentational | You need reusable UI components that just display data |
| List-Item | You're rendering collections of similar items |

### Best Practices

1. **Keep containers thin**: Move complex logic to separate functions when possible
2. **Make presentational components pure**: Same props should always produce same output
3. **Use meaningful prop names**: Be explicit about what data is being passed
4. **Don't over-engineer**: Not every component needs to follow these patterns strictly
5. **Test separately**: Test containers for logic, presentational for UI

### Common Mistakes to Avoid

1. ❌ Putting API calls in presentational components
2. ❌ Making presentational components too specific (reduces reusability)
3. ❌ Forgetting to add keys when mapping lists
4. ❌ Mixing concerns (UI logic in containers, business logic in presentational)
5. ❌ Props drilling too deep (consider Context if passing through many levels)

---

## Resources

[⬆ Back to Top](#react-component-patterns---lecture-notes)

### Documentation
- [React Documentation - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [React Documentation - State](https://react.dev/learn/state-a-components-memory)
- [React Documentation - useEffect](https://react.dev/reference/react/useEffect)
- [React Documentation - Lists and Keys](https://react.dev/learn/rendering-lists)

### W3Schools References
- [React Components](https://www.w3schools.com/react/react_components.asp)
- [React Props](https://www.w3schools.com/react/react_props.asp)
- [React State](https://www.w3schools.com/react/react_state.asp)
- [React Lists](https://www.w3schools.com/react/react_lists.asp)

### Additional Learning
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- [ES6 Destructuring](https://www.w3schools.com/react/react_es6_destructuring.asp)

---

*End of Lecture Notes*

[⬆ Back to Top](#react-component-patterns---lecture-notes)