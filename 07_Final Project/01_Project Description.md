# Final Project: Personal Dashboard Application

## Project Overview
**Duration:** 8 class periods (86 minutes each)  
**Total Time:** 688 minutes (approximately 11.5 hours)

### Project Description
Students will create a **Personal Dashboard Application** using React with Vite. This application will serve as a customizable hub where users can manage tasks, view weather information, save favorite quotes, and toggle between light and dark themes. The project will demonstrate mastery of React fundamentals, state management, API integration, and modern JavaScript features.

### Core Features Required
1. **Task Manager Component** - Add, complete, delete, and filter tasks
2. **Weather Widget** - Fetch and display weather data from a public API
3. **Quote Collection** - Display and manage favorite quotes
4. **Theme Context** - Light/Dark mode toggle affecting entire application
5. **Local Storage Integration** - Persist user data between sessions
6. **Responsive Design** - Mobile-friendly layout

## Day-by-Day Schedule

### Day 1: Project Setup & Planning (86 min)
- Set up React project using Vite
- Initialize Git repository and connect to GitHub
- Create project structure and component folders
- Plan component hierarchy
- Create basic App component and routing structure
- Set up package.json dependencies

### Day 2: Theme Context Implementation (86 min)
- Create ThemeContext using useContext
- Implement theme provider component
- Add theme toggle button component
- Apply theme styles across application
- Test theme switching functionality

### Day 3: Task Manager Component (86 min)
- Create Task component with props
- Implement add task functionality using state
- Add delete task feature with filter method
- Create complete/incomplete toggle
- Use map to render task list

### Day 4: Task Filtering & Local Storage (86 min)
- Add task filtering (all, active, completed) using filter
- Implement local storage save/load with useEffect
- Add task counter using reduce
- Create clear completed tasks feature

### Day 5: Weather Widget Component (86 min)
- Set up weather API integration with fetch
- Create weather display component
- Implement useEffect for API calls
- Add loading states with conditional rendering
- Handle API errors

### Day 6: Quote Collection Component (86 min)
- Create quote display component
- Implement quote management (add, delete)
- Use array methods for quote manipulation
- Add favorite marking feature
- Integrate with local storage

### Day 7: Integration & Styling (86 min)
- Integrate all components in main dashboard
- Implement responsive CSS layout
- Add animations and transitions
- Ensure theme consistency
- Code cleanup and refactoring

### Day 8: Testing & Presentation (86 min)
- Comprehensive testing of all features
- Fix any remaining bugs
- Prepare project presentation
- Code documentation
- Submit to GitHub

## Technical Requirements

### Must Use JavaScript Features:
- ✅ `let` and `const` for variable declarations
- ✅ Arrow functions for component methods
- ✅ Template literals for string formatting
- ✅ Destructuring for props and state
- ✅ Spread/rest operators for array/object manipulation
- ✅ Default parameters in functions
- ✅ Ternary operators for conditional rendering
- ✅ Array methods: `map`, `filter`, `reduce`, `find`, `forEach`
- ✅ Object shorthand properties

### Must Use React Features:
- ✅ Functional components with JSX
- ✅ Props for component communication
- ✅ useState for component state
- ✅ useEffect for side effects and API calls
- ✅ useContext for theme management
- ✅ Event handling (onClick, onChange, onSubmit)
- ✅ Conditional rendering (if statements, &&, ternary)

### Must Use Tools:
- ✅ Vite for project bundling
- ✅ npm for package management
- ✅ Git for version control
- ✅ GitHub for repository hosting
- ✅ IntelliJ as IDE

## Grading Rubric (100 points total)

### 1. Project Setup & Structure (10 points)
- **Excellent (9-10):** Well-organized file structure, proper Git commits, clean GitHub repository
- **Good (7-8):** Organized structure, regular Git commits, functional GitHub repo
- **Satisfactory (5-6):** Basic structure, some Git commits, GitHub repo exists
- **Needs Improvement (0-4):** Poor organization, minimal Git usage

### 2. JavaScript Implementation (20 points)
- **Excellent (18-20):** Effective use of all required ES6+ features, clean and efficient code
- **Good (14-17):** Uses most ES6+ features correctly, mostly clean code
- **Satisfactory (10-13):** Uses some ES6+ features, functional but not optimal code
- **Needs Improvement (0-9):** Limited use of modern JavaScript, inefficient code

### 3. React Components & Props (15 points)
- **Excellent (14-15):** Well-structured components, proper prop passing, reusable components
- **Good (11-13):** Good component structure, mostly proper prop usage
- **Satisfactory (8-10):** Basic components work, some prop passing
- **Needs Improvement (0-7):** Poor component structure, minimal prop usage

### 4. State Management (15 points)
- **Excellent (14-15):** Proper useState implementation, efficient state updates, no unnecessary re-renders
- **Good (11-13):** Good state management, mostly efficient
- **Satisfactory (8-10):** Basic state works, some inefficiencies
- **Needs Improvement (0-7):** Poor state management, many issues

### 5. Context & Theme Implementation (10 points)
- **Excellent (9-10):** Perfect theme context setup, smooth theme switching, consistent styling
- **Good (7-8):** Good context usage, theme works well
- **Satisfactory (5-6):** Basic theme switching works
- **Needs Improvement (0-4):** Context issues, theme doesn't work properly

### 6. API Integration & useEffect (10 points)
- **Excellent (9-10):** Clean API integration, proper useEffect usage, good error handling
- **Good (7-8):** API works well, decent useEffect implementation
- **Satisfactory (5-6):** Basic API calls work
- **Needs Improvement (0-4):** API issues, poor useEffect usage

### 7. User Interface & Experience (10 points)
- **Excellent (9-10):** Intuitive UI, responsive design, smooth interactions
- **Good (7-8):** Good UI, mostly responsive
- **Satisfactory (5-6):** Basic UI works, some responsiveness
- **Needs Improvement (0-4):** Poor UI, not responsive

### 8. Code Quality & Documentation (5 points)
- **Excellent (5):** Clean, readable code with comments, good naming conventions
- **Good (4):** Mostly clean code, some comments
- **Satisfactory (2-3):** Functional code, minimal comments
- **Needs Improvement (0-1):** Messy code, no documentation

### 9. Feature Completeness (5 points)
- **Excellent (5):** All required features work perfectly
- **Good (4):** Most features work well
- **Satisfactory (2-3):** Basic features work
- **Needs Improvement (0-1):** Missing many features

## Submission Requirements
1. GitHub repository link with:
   - Complete source code
   - README.md with project description and setup instructions
   - At least 10 meaningful Git commits showing project progression
2. Live demonstration during Day 8
3. All code must be original student work

## Example Code Structure
```
personal-dashboard/
├── src/
│   ├── components/
│   │   ├── TaskManager.jsx
│   │   ├── WeatherWidget.jsx
│   │   ├── QuoteCollection.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Dashboard.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Resources
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- MDN JavaScript Reference: https://developer.mozilla.org/
- W3Schools React Tutorial: https://www.w3schools.com/react/
- Free Weather API: https://openweathermap.org/api or https://open-meteo.com/

## Tips for Success
1. Start with a working basic version, then add features incrementally
2. Commit to Git frequently (after each working feature)
3. Test each component individually before integration
4. Use the browser console to debug issues
5. Ask for help when stuck for more than 15 minutes
6. Keep your code organized and use meaningful variable names
7. Comment complex logic to help with understanding

## Academic Integrity
- All code must be your own work
- You may reference documentation and tutorials
- Cite any code snippets from external sources in comments
- Collaboration is allowed for debugging, but not for writing code

---

**Note:** This project is designed to showcase all the React and JavaScript skills learned throughout the course. Focus on creating a functional application first, then enhance with additional features if time permits.