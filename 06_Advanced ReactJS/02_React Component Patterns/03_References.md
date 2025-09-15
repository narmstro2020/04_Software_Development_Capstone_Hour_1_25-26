# React Component Patterns - Quick Reference Sheet

## Pattern Identification Cheatsheet

### When to Use Container Components
✅ **Use when you need to:**
- Fetch data from an API
- Manage complex state
- Handle business logic
- Process or transform data
- Connect to Context or global state

```jsx
// Container Component Template
const SomethingContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Fetch data here
    }, []);
    
    return <SomethingDisplay data={data} />;
};
```

### When to Use Presentational Components
✅ **Use when you need to:**
- Display data only
- Create reusable UI elements
- Focus on styling and layout
- Build UI component libraries

```jsx
// Presentational Component Template
const SomethingDisplay = ({ data, onAction }) => {
    return (
        <div>
            {/* Only render props, no state or effects */}
        </div>
    );
};
```

### When to Use List-Item Pattern
✅ **Use when you have:**
- Arrays of similar data
- Collections to display
- Repeated UI elements
- Dynamic lists

```jsx
// List Component Template
const SomethingList = ({ items, onItemClick }) => {
    return items.map(item => (
        <SomethingItem 
            key={item.id}
            item={item}
            onClick={onItemClick}
        />
    ));
};

// Item Component Template
const SomethingItem = ({ item, onClick }) => {
    return <div onClick={() => onClick(item.id)}>{item.name}</div>;
};
```

## Common Code Patterns

### 1. Fetching Data (Container)
```jsx
useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('API_URL');
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    fetchData();
}, []); // Dependencies
```

### 2. Conditional Rendering
```jsx
// Using ternary operator
{condition ? <ComponentA /> : <ComponentB />}

// Using && operator
{condition && <Component />}

// Multiple conditions
{loading ? (
    <Loading />
) : error ? (
    <Error message={error} />
) : (
    <DataDisplay data={data} />
)}
```

### 3. Passing Event Handlers
```jsx
// In Container
const handleClick = (id) => {
    // Handle the event
};

// Pass to child
<ChildComponent onAction={handleClick} />

// In Child Component
<button onClick={() => onAction(item.id)}>Click</button>
```

### 4. Updating State Arrays
```jsx
// Add item
setItems([...items, newItem]);

// Update item
setItems(items.map(item => 
    item.id === targetId 
        ? { ...item, ...updates }
        : item
));

// Remove item
setItems(items.filter(item => item.id !== targetId));
```

### 5. Using Context
```jsx
// Create Context
const ThemeContext = createContext();

// Provide Context
<ThemeContext.Provider value={{ theme, toggleTheme }}>
    <App />
</ThemeContext.Provider>

// Consume Context
const { theme, toggleTheme } = useContext(ThemeContext);
```

## Props Pattern Reference

### Container → Presentational
```jsx
// Container passes:
<Display 
    data={data}           // Data to display
    loading={loading}     // Loading state
    error={error}        // Error state
    onAction={handler}   // Event handlers
/>
```

### List → Item
```jsx
// List passes to each Item:
<Item 
    key={item.id}        // React key (required)
    item={item}          // Item data
    onSelect={onSelect}  // Selection handler
    isSelected={bool}    // Selection state
/>
```

## State Management Patterns

### Loading States
```jsx
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

if (loading) return <Loading />;
if (error) return <Error />;
return <Display data={data} />;
```

### Form Inputs (Controlled)
```jsx
const [value, setValue] = useState('');

<input 
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```

### Toggle States
```jsx
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
```

## Common Mistakes to Avoid

### ❌ DON'T: Mix Concerns
```jsx
// Bad - Presentational component fetching data
const UserCard = ({ userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch(`/api/users/${userId}`)...
    }, []);
    // This should be in a container!
};
```

### ✅ DO: Separate Concerns
```jsx
// Good - Container fetches, presentational displays
const UserContainer = ({ userId }) => {
    const [user, setUser] = useState(null);
    // Fetch logic here
    return <UserCard user={user} />;
};

const UserCard = ({ user }) => {
    return <div>{user.name}</div>;
};
```

### ❌ DON'T: Forget Keys in Lists
```jsx
// Bad - Missing or wrong key
items.map(item => <Item item={item} />)
items.map((item, index) => <Item key={index} />) // Index as key
```

### ✅ DO: Use Stable, Unique Keys
```jsx
// Good - Unique, stable ID as key
items.map(item => <Item key={item.id} item={item} />)
```

### ❌ DON'T: Mutate State Directly
```jsx
// Bad - Direct mutation
state.items.push(newItem);
setState(state);
```

### ✅ DO: Create New State Objects
```jsx
// Good - Create new array
setState({
    ...state,
    items: [...state.items, newItem]
});
```

## File Structure Best Practice

```
src/
├── components/
│   ├── containers/
│   │   ├── UserContainer.jsx
│   │   └── PostContainer.jsx
│   ├── presentational/
│   │   ├── UserCard.jsx
│   │   └── PostDisplay.jsx
│   ├── lists/
│   │   ├── UserList.jsx
│   │   └── PostList.jsx
│   └── items/
│       ├── UserItem.jsx
│       └── PostItem.jsx
├── contexts/
│   └── ThemeContext.jsx
└── App.jsx
```

## Quick Decision Tree

```
Need to fetch data? → Container Component
Need to manage state? → Container Component
Just displaying props? → Presentational Component
Rendering a collection? → List-Item Pattern
Need global state? → Context + Container
```

## Remember
1. **Props down, events up** - Data flows down through props, events bubble up through callbacks
2. **One component, one job** - Each component should have a single, clear responsibility
3. **Make it reusable** - Presentational components should work with any data of the right shape
4. **Test in isolation** - Good patterns make components easy to test separately