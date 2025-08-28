# Assignment 1: Task Manager with TODOs
**CAP Unit 03 - Lesson 12**

## Instructions
Complete all the TODO items in the following files to create a fully functional Task Manager with performance optimizations.

### TaskManager.jsx (Main Component)

```javascript
import { useState, useCallback } from 'react';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import TaskItem from './TaskItem';

const TaskManager = () => {
  // TODO: Initialize tasks state with the following initial data:
  // HINT: Use useState([...]) with an array of task objects
  // HINT: Each task needs: id (number), title (string), category (string), completed (boolean)
  // - { id: 1, title: 'Learn React hooks', category: 'Study', completed: false }
  // - { id: 2, title: 'Complete assignment', category: 'School', completed: false }
  // - { id: 3, title: 'Buy groceries', category: 'Personal', completed: true }
  const [tasks, setTasks] = useState([
    // TODO: Add initial tasks here
  ]);
  
  // TODO: Create state for searchTerm (initial value: empty string)
  // HINT: const [searchTerm, setSearchTerm] = useState('');
  
  // TODO: Create state for filterStatus (initial value: 'All')
  // HINT: const [filterStatus, setFilterStatus] = useState('All');

  // TODO: Create handleAddTask function using useCallback
  // HINT: useCallback((title, category) => { ... }, [])
  // HINT: Create newTask object with id: Date.now(), title, category, completed: false
  // HINT: Use setTasks(prevTasks => [...prevTasks, newTask]) for functional update
  // - Should accept title and category parameters
  // - Create new task with: id (use Date.now()), title, category, completed: false
  // - Use functional state update to add new task to existing tasks
  // - Use empty dependency array
  const handleAddTask = useCallback(() => {
    // TODO: Implement add task logic
    // HINT: const newTask = { id: Date.now(), title, category, completed: false };
    // HINT: setTasks(prevTasks => [...prevTasks, newTask]);
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create handleToggleTask function using useCallback
  // HINT: useCallback((taskId) => { ... }, [])
  // HINT: Use setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? {...task, completed: !task.completed} : task))
  // - Should accept taskId parameter
  // - Use functional state update to toggle the completed status of matching task
  // - Use empty dependency array
  const handleToggleTask = useCallback(() => {
    // TODO: Implement toggle task logic
    // HINT: Use map() to find the task and toggle its completed property
    // HINT: Return {...task, completed: !task.completed} for matching task
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create handleDeleteTask function using useCallback
  // HINT: useCallback((taskId) => { ... }, [])
  // HINT: Use setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  // - Should accept taskId parameter
  // - Use functional state update to remove task with matching id
  // - Use empty dependency array
  const handleDeleteTask = useCallback(() => {
    // TODO: Implement delete task logic
    // HINT: Use filter() to keep only tasks that don't match the taskId
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create handleSearchChange function using useCallback
  // HINT: useCallback((term) => { ... }, [])
  // HINT: Just call setSearchTerm(term)
  // - Should accept term parameter
  // - Update searchTerm state
  // - Use empty dependency array
  const handleSearchChange = useCallback(() => {
    // TODO: Implement search change logic
    // HINT: This is simple - just update the searchTerm state
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create handleFilterChange function using useCallback
  // HINT: useCallback((status) => { ... }, [])
  // HINT: Just call setFilterStatus(status)
  // - Should accept status parameter
  // - Update filterStatus state
  // - Use empty dependency array
  const handleFilterChange = useCallback(() => {
    // TODO: Implement filter change logic
    // HINT: This is simple - just update the filterStatus state
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create handleClearCompleted function using useCallback
  // HINT: useCallback(() => { ... }, [])
  // HINT: Use setTasks(prevTasks => prevTasks.filter(task => !task.completed))
  // - Use functional state update to keep only incomplete tasks
  // - Use empty dependency array
  const handleClearCompleted = useCallback(() => {
    // TODO: Implement clear completed logic
    // HINT: Filter out completed tasks using !task.completed
  }, []); // TODO: Add correct dependency array (should be empty [])

  // TODO: Create filteredTasks variable that filters tasks based on:
  // HINT: Use tasks.filter() with multiple conditions
  // HINT: For search: task.title.toLowerCase().includes(searchTerm.toLowerCase())
  // HINT: For filter: filterStatus === 'All' || (filterStatus === 'Complete' && task.completed) || (filterStatus === 'Incomplete' && !task.completed)
  // - Search term (case-insensitive title matching)
  // - Filter status ('All', 'Complete', 'Incomplete')
  const filteredTasks = []; // TODO: Replace with filtering logic
  // HINT: const filteredTasks = tasks.filter(task => {
  //   const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = filterStatus === 'All' || 
  //     (filterStatus === 'Complete' && task.completed) ||
  //     (filterStatus === 'Incomplete' && !task.completed);
  //   return matchesSearch && matchesFilter;
  // });

  console.log('TaskManager rendered');

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Task Manager</h1>
      
      {/* TODO: Pass handleAddTask to TaskForm as onAddTask prop */}
      {/* HINT: <TaskForm onAddTask={handleAddTask} /> */}
      <TaskForm />
      
      {/* TODO: Pass all required props to TaskFilters:
          HINT: <TaskFilters 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onClearCompleted={handleClearCompleted}
            hasCompletedTasks={tasks.some(task => task.completed)}
          />
          - searchTerm, filterStatus, onSearchChange, onFilterChange, 
          - onClearCompleted, hasCompletedTasks (check if any task is completed) */}
      <TaskFilters />
      
      <div style={{ marginTop: '20px' }}>
        {/* TODO: Show filteredTasks length */}
        {/* HINT: {filteredTasks.length} */}
        <h3>Tasks ()</h3>
        {/* TODO: Show "No tasks match your criteria" or "No tasks yet. Add one above!" 
             when filteredTasks is empty, otherwise map through filteredTasks */}
        {/* HINT: Check if searchTerm exists or filterStatus !== 'All' for different messages */}
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            {/* TODO: Show appropriate message based on search/filter state */}
            {/* HINT: {searchTerm || filterStatus !== 'All' ? 'No tasks match your criteria.' : 'No tasks yet. Add one above!'} */}
          </p>
        ) : (
          // TODO: Map through filteredTasks and render TaskItem components
          // HINT: {filteredTasks.map(task => (
          //   <TaskItem key={task.id} task={task} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
          // ))}
          // Pass task, onToggle (handleToggleTask), onDelete (handleDeleteTask)
          <div>
            {/* TODO: Map filteredTasks here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
```

### TaskItem.jsx

```javascript
import React from 'react';

// TODO: Wrap component in React.memo for performance optimization
// HINT: const TaskItem = React.memo(({ task, onToggle, onDelete }) => { ... });
// HINT: Don't forget to add TaskItem.displayName = 'TaskItem'; at the bottom
const TaskItem = ({ task, onToggle, onDelete }) => {
  console.log(`TaskItem ${task.id} rendered`);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: task.completed ? '#f0f8f0' : '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      {/* TODO: Create checkbox input that:
          HINT: <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} style={{ transform: 'scale(1.2)' }} />
          - Shows task.completed as checked state
          - Calls onToggle with task.id when changed
          - Has scale transform of 1.2 */}
      
      <div style={{ flex: 1 }}>
        {/* TODO: Create h4 element that:
            HINT: <h4 style={{ margin: 0, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#666' : '#333' }}>{task.title}</h4>
            - Shows task.title
            - Has line-through decoration if completed
            - Has gray color if completed, dark color if not */}
        
        {/* TODO: Create p element that shows "Category: {task.category}"
            HINT: <p style={{ margin: 0, fontSize: '0.9em', color: '#888' }}>Category: {task.category}</p>
            - Small font size (0.9em)
            - Gray color (#888) */}
      </div>
      
      {/* TODO: Create delete button that:
          HINT: <button onClick={() => onDelete(task.id)} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '0.9em' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff3838'} onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'}>Delete</button>
          - Calls onDelete with task.id when clicked
          - Has red background (#ff4757)
          - Has hover effect (darker red #ff3838) */}
    </div>
  );
};

// TODO: Set displayName to 'TaskItem'
// HINT: TaskItem.displayName = 'TaskItem';

export default TaskItem;
```

### TaskForm.jsx

```javascript
import React, { useState } from 'react';

// TODO: Wrap component in React.memo for performance optimization
// HINT: const TaskForm = React.memo(({ onAddTask }) => { ... });
// HINT: Don't forget TaskForm.displayName = 'TaskForm'; at the bottom
const TaskForm = ({ onAddTask }) => {
  // TODO: Create state for title (initial: empty string)
  // HINT: const [title, setTitle] = useState('');
  
  // TODO: Create state for category (initial: 'Personal')
  // HINT: const [category, setCategory] = useState('Personal');

  console.log('TaskForm rendered');

  // TODO: Create handleSubmit function that:
  // HINT: const handleSubmit = (e) => { e.preventDefault(); if (title.trim()) { onAddTask(title.trim(), category); setTitle(''); setCategory('Personal'); } };
  // - Prevents default form submission
  // - Checks if title is not empty (after trimming)
  // - Calls onAddTask with trimmed title and category
  // - Resets title to empty string and category to 'Personal'
  const handleSubmit = (e) => {
    // TODO: Implement form submission logic
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginTop: 0 }}>Add New Task</h3>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="task-title" style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: 'bold'
          }}>
            Task Title:
          </label>
          {/* TODO: Create text input that:
              HINT: <input id="task-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title..." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }} required />
              - Has value bound to title state
              - Updates title state on change
              - Has placeholder "Enter task title..."
              - Has required attribute
              - Has proper styling */}
        </div>
        
        <div>
          <label htmlFor="task-category" style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: 'bold'
          }}>
            Category:
          </label>
          {/* TODO: Create select dropdown that:
              HINT: <select id="task-category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', backgroundColor: 'white' }}>
              HINT: Add <option value="Personal">Personal</option> etc. for each category
              - Has value bound to category state
              - Updates category state on change
              - Has options: Personal, Work, School, Study, Health, Hobby
              - Has proper styling */}
        </div>
        
        {/* TODO: Create submit button with:
            HINT: <button type="submit" style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'} onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}>Add Task</button>
            - Type "submit"
            - Green background (#2ecc71)
            - Hover effect (darker green #27ae60)
            - Text "Add Task" */}
      </div>
    </form>
  );
};

// TODO: Set displayName to 'TaskForm'
// HINT: TaskForm.displayName = 'TaskForm';

export default TaskForm;
```

### TaskFilters.jsx

```javascript
import React from 'react';

// TODO: Wrap component in React.memo for performance optimization
// HINT: const TaskFilters = React.memo(({ searchTerm, filterStatus, onSearchChange, onFilterChange, onClearCompleted, hasCompletedTasks }) => { ... });
// HINT: Don't forget TaskFilters.displayName = 'TaskFilters'; at the bottom
const TaskFilters = ({ 
  searchTerm, 
  filterStatus, 
  onSearchChange, 
  onFilterChange, 
  onClearCompleted,
  hasCompletedTasks 
}) => {
  console.log('TaskFilters rendered');

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginTop: 0 }}>Filter & Search Tasks</h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 200px auto', 
        gap: '15px',
        alignItems: 'end'
      }}>
        <div>
          <label htmlFor="search-input" style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: 'bold'
          }}>
            Search Tasks:
          </label>
          {/* TODO: Create text input that:
              HINT: <input id="search-input" type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by title..." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }} />
              - Has value bound to searchTerm prop
              - Calls onSearchChange with input value on change
              - Has placeholder "Search by title..."
              - Has proper styling */}
        </div>
        
        <div>
          <label htmlFor="filter-select" style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontWeight: 'bold'
          }}>
            Filter by Status:
          </label>
          {/* TODO: Create select dropdown that:
              HINT: <select id="filter-select" value={filterStatus} onChange={(e) => onFilterChange(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', backgroundColor: 'white' }}>
              HINT: <option value="All">All Tasks</option><option value="Complete">Completed</option><option value="Incomplete">Incomplete</option>
              - Has value bound to filterStatus prop
              - Calls onFilterChange with selected value on change
              - Has options: "All Tasks", "Completed", "Incomplete"
              - Has proper styling */}
        </div>
        
        {/* TODO: Create "Clear Completed" button that:
            HINT: <button onClick={onClearCompleted} disabled={!hasCompletedTasks} style={{ backgroundColor: hasCompletedTasks ? '#e74c3c' : '#bdc3c7', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: hasCompletedTasks ? 'pointer' : 'not-allowed', fontSize: '14px', fontWeight: 'bold' }} onMouseOver={(e) => { if (hasCompletedTasks) e.target.style.backgroundColor = '#c0392b'; }} onMouseOut={(e) => { if (hasCompletedTasks) e.target.style.backgroundColor = '#e74c3c'; }}>Clear Completed</button>
            - Calls onClearCompleted when clicked
            - Is disabled when hasCompletedTasks is false
            - Has red background (#e74c3c) when enabled, gray (#bdc3c7) when disabled
            - Has hover effect when enabled
            - Has appropriate cursor (pointer/not-allowed) */}
      </div>
    </div>
  );
};

// TODO: Set displayName to 'TaskFilters'
// HINT: TaskFilters.displayName = 'TaskFilters';

export default TaskFilters;
```

### App.jsx

```javascript
// TODO: Import TaskManager component
// HINT: import TaskManager from './components/TaskManager';

function App() {
  return (
    <div className="App">
      {/* TODO: Render TaskManager component */}
      {/* HINT: <TaskManager /> */}
    </div>
  );
}

export default App;
```

## Checklist for Completion

### Functionality Requirements:
- [ ] Add new tasks with title and category
- [ ] Toggle task completion status
- [ ] Delete individual tasks
- [ ] Search tasks by title (case-insensitive)
- [ ] Filter tasks by completion status (All/Complete/Incomplete)
- [ ] Clear all completed tasks
- [ ] Display task count

### Performance Optimization Requirements:
- [ ] All child components wrapped in React.memo
- [ ] All event handler functions use useCallback with proper dependencies
- [ ] Functional state updates used to eliminate dependencies
- [ ] Console logs show minimal re-renders during interactions

### Common Mistakes to Avoid:
- **Don't put state values in useCallback dependencies** - Use functional updates instead
- **Don't forget React.memo** - All child components need it for optimization
- **Don't forget displayName** - Required for React.memo components
- **Don't use arrow functions in JSX** - They recreate on every render, breaking optimization
- **Remember case-sensitivity** - Search should be case-insensitive using toLowerCase()

### Testing Scenarios:
1. **Type in search box** - Only TaskFilters should re-render
   - HINT: Look for "TaskFilters rendered" in console, others should not appear
2. **Add a new task** - Only TaskForm should re-render (plus new TaskItem)
   - HINT: TaskManager renders due to new task, but existing TaskItems should not
3. **Toggle task completion** - Only the specific TaskItem should re-render
   - HINT: Only one "TaskItem X rendered" should appear in console
4. **Change filter dropdown** - Only TaskFilters should re-render
   - HINT: Similar to search box, only TaskFilters should log
5. **Delete a task** - Only TaskManager should re-render (to update list)
   - HINT: Remaining TaskItems should not re-render

## Quick Reference for React Hooks:

### useState Syntax:
```javascript
const [stateName, setStateName] = useState(initialValue);
```

### useCallback Syntax:
```javascript
const functionName = useCallback((params) => {
  // function body
}, [dependencies]); // Use [] for empty dependencies
```

### React.memo Syntax:
```javascript
const ComponentName = React.memo(({ props }) => {
  // component body
});
ComponentName.displayName = 'ComponentName';
```

### Functional State Updates:
```javascript
// Instead of: setTasks([...tasks, newTask])
// Use: setTasks(prevTasks => [...prevTasks, newTask])
```

## Tips for Success:
- **Start with TaskManager** - Get the state and functions working first
- **Use functional state updates** - `setState(prevState => newState)` eliminates dependencies
- **Test frequently** - Check console logs after each component completion
- **Remember React.memo** - Wrap ALL child components for optimization
- **Empty dependency arrays** - Most useCallback functions should have `[]`
- **Check console logs** - They show which components are re-rendering