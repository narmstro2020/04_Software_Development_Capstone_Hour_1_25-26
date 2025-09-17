# Personal Dashboard Application

## Project Setup Instructions

### Step 1: Create a New React Project with Vite

Open your terminal in IntelliJ and run:

```bash
npm create vite@latest personal-dashboard -- --template react
cd personal-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Replace Default Files

Delete the default files in the `src` folder and replace them with the provided starter files:

1. **Create the folder structure:**
   ```
   src/
   ├── components/
   │   ├── Dashboard.jsx
   │   ├── TaskManager.jsx
   │   ├── WeatherWidget.jsx
   │   ├── QuoteCollection.jsx
   │   └── ThemeToggle.jsx
   ├── context/
   │   └── ThemeContext.jsx
   ├── App.jsx
   ├── main.jsx
   └── index.css
   ```

2. **Copy the provided starter code into each file**

### Step 4: Update package.json

Replace the generated `package.json` with the provided one, or ensure it has these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 5: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial project setup"
```

### Step 6: Create GitHub Repository

1. Go to GitHub and create a new repository
2. Follow the instructions to push your local repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-dashboard.git
git branch -M main
git push -u origin main
```

### Step 7: Start Development Server

```bash
npm run dev
```

Your application will open at `http://localhost:3000`

## Daily Development Workflow

### Before Starting Each Day:
1. Open IntelliJ and your project
2. Open the terminal in IntelliJ
3. Pull any changes (if working with a team):
   ```bash
   git pull
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### During Development:
1. Make changes to your components
2. Save files (changes will auto-reload in browser)
3. Use browser Developer Tools (F12) for debugging

### End of Each Day:
1. Test all your features
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Day X: Description of what you completed"
   git push
   ```

## Component Implementation Order

Follow this order for implementing features:

### Day 1: Setup ✓
- Project is set up with all starter files

### Day 2: ThemeContext
- Complete the `ThemeContext.jsx` TODOs
- Implement theme toggle functionality
- Add localStorage persistence

### Day 3: TaskManager Component
- Implement add task functionality
- Create delete task feature
- Add complete/incomplete toggle

### Day 4: Task Filtering
- Implement filter functionality
- Add localStorage for tasks
- Create task statistics with reduce

### Day 5: WeatherWidget
- Set up API calls with fetch
- Implement loading states
- Handle errors properly

### Day 6: QuoteCollection
- Build quote management system
- Add favorite feature
- Implement random quote display

### Day 7: Integration & Styling
- Ensure all components work together
- Refine CSS and responsive design
- Add final touches

### Day 8: Testing & Submission
- Test all features thoroughly
- Fix any bugs
- Prepare presentation
- Submit to GitHub

## Important Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to GitHub
git push

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

## Debugging Tips

1. **Check the Browser Console** (F12) for errors
2. **Use console.log()** to debug your code:
   ```javascript
   console.log('Current state:', tasks)
   ```
3. **React Developer Tools** - Install the browser extension
4. **Check Network tab** for API calls
5. **Verify localStorage** in Application tab of DevTools

## Common Issues & Solutions

### Issue: "Module not found"
**Solution:** Check your import paths and file names

### Issue: "useState is not defined"
**Solution:** Import it from React:
```javascript
import { useState } from 'react'
```

### Issue: API not working
**Solution:** 
- Check your API URL
- Verify internet connection
- Look at Network tab for errors
- Check if you need an API key

### Issue: Theme not persisting
**Solution:** Check localStorage implementation in useEffect

### Issue: Tasks disappearing on refresh
**Solution:** Implement localStorage save/load in TaskManager

## Resources

- **React Documentation:** https://react.dev/
- **Vite Documentation:** https://vitejs.dev/
- **MDN Web Docs:** https://developer.mozilla.org/
- **W3Schools React:** https://www.w3schools.com/react/
- **CSS Tricks:** https://css-tricks.com/
- **Free Weather API:** https://open-meteo.com/

## Project Requirements Checklist

### JavaScript Features
- [ ] let and const used properly
- [ ] Arrow functions implemented
- [ ] Template literals for strings
- [ ] Destructuring for props/state
- [ ] Spread/rest operators
- [ ] Default parameters
- [ ] Ternary operators
- [ ] Array methods (map, filter, reduce)

### React Features
- [ ] Functional components with JSX
- [ ] Props passed correctly
- [ ] useState for state management
- [ ] useEffect for side effects
- [ ] useContext for theme
- [ ] Event handlers working
- [ ] Conditional rendering

### Project Features
- [ ] Task Manager works
- [ ] Weather Widget displays data
- [ ] Quote Collection functional
- [ ] Theme switching works
- [ ] Data persists in localStorage
- [ ] Responsive design
- [ ] Git commits (minimum 10)
- [ ] GitHub repository

## Good Luck!

Remember: Start simple, get it working, then add features. Commit your code frequently!