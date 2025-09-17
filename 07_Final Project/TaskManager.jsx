import { useState, useEffect } from 'react'

const TaskManager = () => {
  // TODO: Initialize tasks state with an empty array
  // Each task should have: { id, text, completed, createdAt }
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  // TODO: Load tasks from localStorage on mount
  useEffect(() => {
    // Your code here
  }, [])

  // TODO: Save tasks to localStorage whenever they change
  useEffect(() => {
    // Your code here
  }, [tasks])

  // TODO: Function to add a new task
  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      // Create a new task object with:
      // - id: Date.now()
      // - text: newTask
      // - completed: false
      // - createdAt: new Date().toISOString()
      
      // Add the new task to tasks array using spread operator
      // Clear the input field
    }
  }

  // TODO: Function to toggle task completion
  const toggleTask = (id) => {
    // Use map to update the completed status of the task with matching id
  }

  // TODO: Function to delete a task
  const deleteTask = (id) => {
    // Use filter to remove the task with matching id
  }

  // TODO: Function to clear completed tasks
  const clearCompleted = () => {
    // Use filter to keep only active (not completed) tasks
  }

  // TODO: Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    // Return tasks based on filter value:
    // 'all' - return all tasks
    // 'active' - return only incomplete tasks
    // 'completed' - return only completed tasks
    return true // Replace with your logic
  })

  // TODO: Calculate task statistics using reduce
  const stats = tasks.reduce((acc, task) => {
    // Calculate total, active, and completed counts
    return {
      total: tasks.length,
      active: 0, // Replace with actual count
      completed: 0 // Replace with actual count
    }
  }, { total: 0, active: 0, completed: 0 })

  return (
    <div className="task-manager">
      {/* Add Task Form */}
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="task-add-btn">
          Add Task
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="task-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({stats.active})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks to display</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="task-delete"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed Button */}
      {stats.completed > 0 && (
        <button onClick={clearCompleted} className="clear-completed">
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TaskManager