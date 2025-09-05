# Supabase Introduction and React.js Integration
## Lecture Notes

---

## Table of Contents

1. [Introduction to Supabase](#1-introduction-to-supabase)
2. [Creating a React.js Project with Supabase Integration](#2-creating-a-reactjs-project-with-supabase-integration)
3. [Vocabulary](#vocabulary)
4. [Code Examples](#code-examples)
5. [Summary](#summary)
6. [Additional Resources](#additional-resources)

---

## 1. Introduction to Supabase
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

### What is Supabase?

**Supabase** is an open-source Backend-as-a-Service (BaaS) platform that provides developers with a complete backend solution. Think of it as a "Firebase alternative" that gives you:

- **Database**: PostgreSQL database with real-time capabilities
- **Authentication**: User management and authentication
- **Storage**: File and media storage
- **API**: Automatically generated REST and GraphQL APIs
- **Real-time**: Live updates when data changes

### Why Use Supabase?

1. **Easy Setup**: No complex server configuration required
2. **SQL Database**: Uses PostgreSQL (more powerful than NoSQL for many use cases)
3. **Real-time Features**: Data updates automatically across all connected clients
4. **Built-in Authentication**: User signup, login, and session management
5. **Free Tier**: Generous free plan for learning and small projects

### Key Features

#### Database
- **PostgreSQL**: A robust, SQL-compliant database
- **Tables**: Organize data in rows and columns
- **Relationships**: Connect data between tables
- **Row Level Security**: Control who can access what data

#### Real-time Subscriptions
- **Live Updates**: Your React app gets notified when database data changes
- **Multiple Clients**: All connected users see updates immediately
- **Efficient**: Only sends the data that changed

#### Authentication
- **Email/Password**: Traditional signup and login
- **OAuth**: Login with Google, GitHub, etc.
- **Session Management**: Automatic token handling

### Supabase vs Traditional Backend

| Traditional Backend | Supabase |
|-------------------|----------|
| Set up servers | Use Supabase's infrastructure |
| Write API endpoints | Auto-generated APIs |
| Manage databases | Visual database editor |
| Handle authentication | Built-in auth system |
| Real-time updates | Built-in real-time features |

---

## 2. Creating a React.js Project with Supabase Integration
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

### Step 1: Setting Up Supabase

#### Creating a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Click "New Project"
5. Choose organization and enter project details
6. Wait for database setup (2-3 minutes)

#### Getting Your Project Credentials
After project creation, you'll need two important values:
- **Project URL**: Found in Settings > API
- **Public API Key (anon key)**: Also in Settings > API

### Step 2: Creating a React Project

```bash
# Create new React project with Vite
npm create vite@latest my-supabase-app -- --template react
cd my-supabase-app
npm install
```

### Step 3: Installing Supabase Client

```bash
# Install the Supabase JavaScript client
npm install @supabase/supabase-js
```

### Step 4: Configuring Supabase in React

#### Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Supabase Client Setup
Create `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Step 5: Creating Your First Table

In the Supabase dashboard:
1. Go to "Table Editor"
2. Click "Create a new table"
3. Name it `todos`
4. Add columns:
   - `id` (int8, primary key, auto-increment)
   - `text` (text)
   - `completed` (bool, default false)
   - `created_at` (timestamptz, default now())

### Step 6: Basic CRUD Operations

#### Reading Data
```javascript
// Get all todos
const { data, error } = await supabase
  .from('todos')
  .select('*')

// Get specific todo
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('id', 1)
  .single()
```

#### Creating Data
```javascript
const { data, error } = await supabase
  .from('todos')
  .insert([
    { text: 'Learn Supabase', completed: false }
  ])
```

#### Updating Data
```javascript
const { data, error } = await supabase
  .from('todos')
  .update({ completed: true })
  .eq('id', 1)
```

#### Deleting Data
```javascript
const { data, error } = await supabase
  .from('todos')
  .delete()
  .eq('id', 1)
```

### Step 7: React Integration Patterns

#### Using useState and useEffect
```javascript
import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span>{todo.text}</span>
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id, !todo.completed)}
          />
        </div>
      ))}
    </div>
  )
}
```

#### Real-time Subscriptions
```javascript
useEffect(() => {
  const subscription = supabase
    .channel('todos')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'todos' 
      }, 
      (payload) => {
        console.log('Change received!', payload)
        // Refresh todos when data changes
        fetchTodos()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(subscription)
  }
}, [])
```

---

## Vocabulary
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

| Term | Definition |
|------|------------|
| **BaaS** | Backend-as-a-Service - A service that provides backend functionality without managing servers |
| **PostgreSQL** | An advanced, open-source relational database system |
| **CRUD** | Create, Read, Update, Delete - Basic database operations |
| **API Key** | A unique identifier used to authenticate with Supabase |
| **Real-time** | Data updates that happen immediately across all connected clients |
| **Subscription** | A connection that listens for database changes |
| **Row Level Security (RLS)** | Database security that controls access at the row level |
| **Environment Variables** | Configuration values stored outside your code |
| **SQL** | Structured Query Language - Used to interact with databases |
| **Table** | A collection of related data organized in rows and columns |
| **Primary Key** | A unique identifier for each row in a table |
| **Foreign Key** | A field that links to the primary key of another table |
| **Schema** | The structure/blueprint of a database |
| **Client** | The JavaScript library used to interact with Supabase |
| **Async/Await** | JavaScript pattern for handling asynchronous operations |

---

## Code Examples
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

### Complete Todo App Example

```javascript
// App.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text: newTodo, completed: false }])
        .select()

      if (error) throw error
      setTodos([...data, ...todos])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id)

      if (error) throw error
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      ))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading todos...</div>
  }

  return (
    <div className="app">
      <h1>My Todo App</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                className="todo-checkbox"
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
```

### Custom Hook Example

```javascript
// hooks/useTodos.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (text) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text, completed: false }])
        .select()

      if (error) throw error
      setTodos([...data, ...todos])
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      ))
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTodos(todos.filter(todo => todo.id !== id))
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    }
  }

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  }
}
```

---

## Summary
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

In this lesson, you learned about **Supabase**, a powerful Backend-as-a-Service platform that simplifies backend development. Here are the key takeaways:

### What We Covered

1. **Supabase Fundamentals**
   - Understanding BaaS and its benefits
   - Key features: Database, Authentication, Real-time, Storage
   - How Supabase compares to traditional backend development

2. **Project Setup**
   - Creating a Supabase project and getting credentials
   - Setting up a React project with Vite
   - Installing and configuring the Supabase client
   - Using environment variables for security

3. **Database Operations (CRUD)**
   - **Create**: Adding new records with `insert()`
   - **Read**: Fetching data with `select()` and filters
   - **Update**: Modifying existing records with `update()`
   - **Delete**: Removing records with `delete()`

4. **React Integration Patterns**
   - Using `useState` and `useEffect` with Supabase
   - Error handling and loading states
   - Custom hooks for reusable logic
   - Real-time subscriptions for live updates

### Key Concepts Mastered

- **Asynchronous Operations**: Using async/await with database operations
- **State Management**: Managing data, loading, and error states in React
- **Environment Configuration**: Securely storing API keys
- **Real-time Features**: Setting up live data synchronization
- **Error Handling**: Properly handling and displaying errors
- **Code Organization**: Separating concerns with custom hooks and utility files

### Best Practices Learned

1. **Security**: Never expose API keys in client code
2. **Error Handling**: Always check for errors in database operations
3. **Loading States**: Provide feedback during data operations
4. **State Updates**: Keep local state in sync with database changes
5. **Code Reusability**: Use custom hooks for common operations

### Real-world Applications

The skills you've learned apply to many types of applications:
- **Todo/Task Management Apps**
- **Social Media Feeds**
- **E-commerce Product Catalogs**
- **Blog/Content Management Systems**
- **Collaborative Tools**
- **Real-time Chat Applications**

### Next Steps

To continue your Supabase journey, consider exploring:
- **Authentication**: User signup, login, and protected routes
- **File Storage**: Uploading and managing images/files
- **Advanced Queries**: Joins, aggregations, and complex filters
- **Row Level Security**: Controlling data access at the database level
- **Edge Functions**: Server-side logic and API endpoints

---

## Additional Resources
[↑ Back to Top](#supabase-introduction-and-reactjs-integration)

### Official Documentation
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [React Documentation](https://react.dev)

### Learning Resources
- [W3Schools JavaScript](https://www.w3schools.com/js/)
- [W3Schools React](https://www.w3schools.com/react/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Supabase Guides
- [Getting Started with React](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Database Design](https://supabase.com/docs/guides/database/overview)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

### Tools Used
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Vite Documentation](https://vitejs.dev/)

---

*End of Lecture Notes*