/* 
==========================================================
TYPESCRIPT ASSIGNMENT - Task Manager Application
Complete the TODOs below to learn TypeScript concepts
==========================================================
*/

// TODO 7: Define Priority constants and types
// Create an object with LOW, MEDIUM, and HIGH priority constants
// In TypeScript, you can also define this as an enum for better type safety

const Priority = {
    // TODO: Add LOW: 'low'
    // TODO: Add MEDIUM: 'medium'  
    // TODO: Add HIGH: 'high'
} as const;

// TODO: Create a type from the Priority object for type safety
// type PriorityType = typeof Priority[keyof typeof Priority];

/* 
TODO 8: Complete the Task class
This class represents a single task with proper TypeScript-style structure
In TypeScript, you would add type annotations to properties and parameters
*/
class Task {
    id: string;
    title: string;
    description: string;
    priority: string; // TODO: Change to PriorityType when you create the type
    completed: boolean;
    createdAt: Date;

    constructor(title: string, description: string = '', priority: string = Priority.MEDIUM) {
        this.id = this.generateId();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    // TODO 9: Implement the toggle method
    // This method should toggle the completed status of the task
    toggle(): void {
        // TODO: Toggle this.completed between true and false
    }

    // TODO 10: Implement the isOverdue method
    // A task is overdue if it's not completed and created more than 7 days ago
    isOverdue(): boolean {
        const daysSinceCreated = (new Date().getTime() - this.createdAt.getTime()) / (1000 * 3600 * 24);
        // TODO: Return true if task is not completed AND daysSinceCreated > 7
        return false; // Replace this
    }
}

/* 
TODO 11: Complete the TaskManager class
This class manages all tasks and handles the application logic
In TypeScript, you would add type annotations and interfaces for better type safety
*/
class TaskManager {
    private tasks: Task[];

    constructor() {
        this.tasks = this.loadTasks();
        this.initializeEventListeners();
        this.updateUI();
    }

    // TODO 12: Implement loadTasks method
    // Load tasks from localStorage, handle errors gracefully
    // Return type should be Task[]
    private loadTasks(): Task[] {
        try {
            const stored = localStorage.getItem('tasks');
            if (stored) {
                const taskData = JSON.parse(stored);
                // TODO: Map over the parsed data and recreate Task objects
                // You'll need to create new Task instances and restore their properties
                // Don't forget to convert the createdAt string back to a Date object
                // Example: 
                // return taskData.map((data: any) => {
                //     const task = new Task(data.title, data.description, data.priority);
                //     Object.assign(task, data);
                //     task.createdAt = new Date(data.createdAt);
                //     return task;
                // });
                return []; // Replace this
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
        return [];
    }

    // TODO 13: Implement saveTasks method
    // Save tasks to localStorage with error handling
    private saveTasks(): void {
        try {
            // TODO: Save this.tasks to localStorage as JSON
            // Use localStorage.setItem('tasks', JSON.stringify(this.tasks))
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    // TODO 14: Implement addTask method
    // Create a new task and add it to the tasks array
    // In TypeScript, specify parameter types and return type
    addTask(title: string, description: string, priority: string): Task {
        // TODO: Validate that title is not empty (throw error if invalid)
        // if (!title.trim()) { throw new Error('Task title is required'); }
        
        // TODO: Create a new Task instance
        // TODO: Add it to the beginning of this.tasks array (use unshift)
        // TODO: Call saveTasks() and updateUI()
        // TODO: Return the created task
        
        throw new Error('Method not implemented'); // Remove this line
    }

    // TODO 15: Implement deleteTask method
    // Remove a task by its ID
    deleteTask(taskId: string): void {
        // TODO: Find the index of the task with matching ID
        // const index = this.tasks.findIndex(task => task.id === taskId);
        // TODO: Remove it from this.tasks array if found (use splice)
        // TODO: Call saveTasks() and updateUI()
    }

    // TODO 16: Implement toggleTask method
    // Toggle the completion status of a task
    toggleTask(taskId: string): void {
        // TODO: Find the task with matching ID
        // const task = this.tasks.find(task => task.id === taskId);
        // TODO: Call its toggle() method if found
        // TODO: Call saveTasks() and updateUI()
    }

    // TODO 17: Implement clearAllTasks method
    // Remove all tasks with user confirmation
    clearAllTasks(): void {
        // TODO: Show confirmation dialog if tasks exist
        // if (this.tasks.length > 0 && confirm('Are you sure you want to delete all tasks?'))
        // TODO: If confirmed, clear this.tasks array (this.tasks = [])
        // TODO: Call saveTasks() and updateUI()
    }

    // Helper methods for filtering tasks - complete these for practice
    getCompletedTasks(): Task[] {
        return this.tasks.filter(task => task.completed);
    }

    getPendingTasks(): Task[] {
        return this.tasks.filter(task => !task.completed);
    }

    getTasksByPriority(priority: string): Task[] {
        return this.tasks.filter(task => task.priority === priority);
    }

    getOverdueTasks(): Task[] {
        return this.tasks.filter(task => task.isOverdue());
    }

    // TODO 18: Implement event listeners
    // Set up form submission and button click handlers
    private initializeEventListeners(): void {
        const form = document.getElementById('taskForm') as HTMLFormElement;
        const clearAllBtn = document.getElementById('clearAllBtn') as HTMLButtonElement;

        // TODO: Add submit event listener to form
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     this.handleFormSubmit();
        // });

        // TODO: Add click event listener to clearAllBtn  
        // clearAllBtn.addEventListener('click', () => {
        //     this.clearAllTasks();
        // });
    }

    // TODO 19: Implement form submission handler
    // Handle the task creation form submission
    private handleFormSubmit(): void {
        const titleInput = document.getElementById('taskTitle') as HTMLInputElement;
        const descriptionInput = document.getElementById('taskDescription') as HTMLTextAreaElement;
        const priorityInput = document.getElementById('taskPriority') as HTMLSelectElement;

        try {
            // TODO: Call addTask with form values
            // this.addTask(titleInput.value, descriptionInput.value, priorityInput.value);

            // TODO: Reset form fields
            // titleInput.value = '';
            // descriptionInput.value = '';  
            // priorityInput.value = 'medium';
            
            // TODO: Focus on title input for better UX
            // titleInput.focus();
        } catch (error) {
            // Type assertion for error handling in TypeScript
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            alert(errorMessage);
        }
    }

    // TODO 20: Implement updateUI method
    // Update both stats and task list
    private updateUI(): void {
        // TODO: Call updateStats() and renderTasks()
    }

    // TODO 21: Implement updateStats method
    // Update the statistics display
    private updateStats(): void {
        const totalElement = document.getElementById('totalTasks') as HTMLElement;
        const completedElement = document.getElementById('completedTasks') as HTMLElement;
        const pendingElement = document.getElementById('pendingTasks') as HTMLElement;

        // TODO: Set textContent for each element with correct counts
        // totalElement.textContent = this.tasks.length.toString();
        // completedElement.textContent = this.getCompletedTasks().length.toString();
        // pendingElement.textContent = this.getPendingTasks().length.toString();
    }

    // TODO 22: Implement renderTasks method
    // Render all tasks in the container
    private renderTasks(): void {
        const container = document.getElementById('tasksContainer') as HTMLElement;
        
        if (this.tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No tasks yet!</h3>
                    <p>Add your first task above to get started.</p>
                </div>
            `;
            return;
        }

        // TODO: Map over this.tasks and render each one using renderTask method
        // TODO: Join the results and set container.innerHTML
        // const tasksHTML = this.tasks.map(task => this.renderTask(task)).join('');
        // container.innerHTML = tasksHTML;
    }

    // TODO 23: Implement renderTask method
    // Render a single task as HTML string
    private renderTask(task: Task): string {
        const isOverdue = task.isOverdue();
        const overdueClass = isOverdue ? 'overdue' : '';
        
        // TODO: Return HTML string for the task
        // Include: task title, description, priority, creation date, buttons
        // Use this.escapeHtml() for user content to prevent XSS
        // Add onclick handlers for toggle and delete buttons
        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${overdueClass}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    <div class="task-priority ${task.priority}">${task.priority}</div>
                </div>
                
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                
                <div class="task-meta">
                    <span>Created: ${task.createdAt.toLocaleDateString()}</span>
                    ${isOverdue ? '<span style="color: var(--danger-color); font-weight: 600;">⚠️ Overdue</span>' : ''}
                </div>
                
                <div class="task-actions">
                    <button class="btn-${task.completed ? 'warning' : 'success'}" onclick="taskManager.toggleTask('${task.id}')">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="btn-danger" onclick="taskManager.deleteTask('${task.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    // Security helper method - prevents XSS attacks
    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/* 
TODO 24: Initialize the application
Create a new TaskManager instance and make it globally available
*/

// TODO: Create new TaskManager instance
// const taskManager = new TaskManager();

// TODO: Make it available globally for button onclick handlers
// In TypeScript, you should properly type the global object:
// declare global {
//     interface Window {
//         taskManager: TaskManager;
//     }
// }
// window.taskManager = taskManager;

/* 
TODO 25: BONUS - Add demo tasks
If no tasks exist, add some sample tasks after a short delay
This demonstrates async operations and conditional logic
*/

// TODO: Check if taskManager.tasks.length === 0
// TODO: Use setTimeout to add demo tasks after 500ms for better UX
// TODO: Add 2-3 sample tasks with different priorities
// setTimeout(() => {
//     if (taskManager.tasks.length === 0) {
//         try {
//             taskManager.addTask('Welcome to Task Manager!', 'This is a demo task. You can edit, complete, or delete it.', Priority.MEDIUM);
//             taskManager.addTask('Learn TypeScript', 'Study TypeScript interfaces, classes, and type annotations.', Priority.HIGH);
//             taskManager.addTask('Practice SCSS', 'Explore SCSS variables, mixins, and nesting features.', Priority.LOW);
//         } catch (error) {
//             console.error('Error adding demo tasks:', error);
//         }
//     }
// }, 500);

/* 
==========================================================
TYPESCRIPT ASSIGNMENT COMPLETION CHECKLIST:
==========================================================

TypeScript Fundamentals (19 TODOs):
□ TODO 7: Define Priority constants and create types
□ TODO 8: Complete Task class with proper typing
□ TODO 9: Implement toggle method
□ TODO 10: Implement isOverdue method  
□ TODO 11: Set up TaskManager class structure
□ TODO 12: Implement loadTasks with proper error handling
□ TODO 13: Implement saveTasks method
□ TODO 14: Implement addTask with validation
□ TODO 15: Implement deleteTask method
□ TODO 16: Implement toggleTask method
□ TODO 17: Implement clearAllTasks with confirmation
□ TODO 18: Set up event listeners with proper typing
□ TODO 19: Implement form submission handler
□ TODO 20: Implement updateUI orchestration
□ TODO 21: Implement updateStats method
□ TODO 22: Implement renderTasks method  
□ TODO 23: Implement renderTask method with XSS protection
□ TODO 24: Initialize application and global access
□ TODO 25: BONUS - Add demo tasks with async timing

TYPESCRIPT CONCEPTS COVERED:
- Classes and object-oriented programming
- Type annotations and interfaces
- Access modifiers (private, public)
- Type guards and error handling
- DOM type assertions (HTMLElement, HTMLInputElement, etc.)
- Local storage integration with type safety
- Method chaining and return types
- Generics and utility types
- Enum alternatives with const assertions

COMPILATION INSTRUCTIONS:
To compile this TypeScript to JavaScript:
- TypeScript CLI: tsc app.ts
- VS Code with TypeScript support
- Build tools like Webpack, Vite, or Parcel
- Online TypeScript compiler for testing

For a complete setup, create a tsconfig.json:
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020", 
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "dom": true
  }
}

==========================================================
*/