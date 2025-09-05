# Assignment

## Instructions

Add to your supabase table a column for due date
Add this to your Todo App.  I've provided the starter code here.  
The due date should have an input for date.  Right after the input for text.  

### Todo App Starter Code

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