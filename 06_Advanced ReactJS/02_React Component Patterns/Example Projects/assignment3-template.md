# Assignment 3: Blog Application with Combined Patterns

## Objective
Create a blog application that combines Container-Presentational and List-Item patterns. The app will fetch posts and comments from an API, display them using appropriate components, and include a theme switcher using Context.

## Requirements

### Part 1: Context Setup (ThemeContext.jsx)
Create a theme context that provides light/dark theme throughout the app.

### Part 2: Container Components
Create these container components:

1. **BlogContainer.jsx**
   - Fetches posts from API
   - Manages selected post state
   - Handles post selection

2. **CommentsContainer.jsx**
   - Fetches comments for selected post
   - Manages comments state

### Part 3: Presentational Components

1. **PostList.jsx** (List component)
   - Displays list of posts

2. **PostItem.jsx** (Item component)
   - Shows individual post preview

3. **PostDetail.jsx** (Presentational)
   - Shows full post content

4. **CommentList.jsx** (List component)
   - Displays list of comments

5. **CommentItem.jsx** (Item component)
   - Shows individual comment

6. **ThemeToggle.jsx** (Presentational)
   - Button to toggle theme

### API Endpoints
```
Posts: https://jsonplaceholder.typicode.com/posts?_limit=10
Comments for post: https://jsonplaceholder.typicode.com/posts/{postId}/comments
```

### Starter Code Structure

```jsx
// App.jsx
import { useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import BlogContainer from './components/BlogContainer';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`App ${theme}`}>
                <header>
                    <h1>My Blog</h1>
                    <ThemeToggle />
                </header>
                <BlogContainer />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
```

```jsx
// contexts/ThemeContext.jsx
import { createContext } from 'react';

export const ThemeContext = createContext();
```

```jsx
// components/BlogContainer.jsx
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import PostList from './PostList';
import PostDetail from './PostDetail';
import CommentsContainer from './CommentsContainer';

const BlogContainer = () => {
    // TODO: Get theme from context
    
    // TODO: State for posts, selected post, loading
    
    // TODO: Fetch posts on mount
    
    // TODO: Handle post selection
    
    // TODO: Conditional rendering based on selected post
    // Show list on left, detail on right when post selected
};

export default BlogContainer;
```

```jsx
// components/CommentsContainer.jsx
import { useState, useEffect } from 'react';
import CommentList from './CommentList';

const CommentsContainer = ({ postId }) => {
    // TODO: State for comments and loading
    
    // TODO: Fetch comments when postId changes
    
    // TODO: Render CommentList with comments
};

export default CommentsContainer;
```

```jsx
// components/PostList.jsx
import PostItem from './PostItem';

const PostList = ({ posts, onSelectPost, selectedPostId }) => {
    // TODO: Map over posts and render PostItem for each
    // Pass selected state to highlight active post
};

export default PostList;
```

```jsx
// components/PostItem.jsx
const PostItem = ({ post, onSelect, isSelected }) => {
    // TODO: Display post title and preview
    // Add selected class if isSelected
    // Handle click to select post
};

export default PostItem;
```

```jsx
// components/PostDetail.jsx
const PostDetail = ({ post }) => {
    // TODO: Display full post content
};

export default PostDetail;
```

```jsx
// components/CommentList.jsx
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    // TODO: Map over comments or show "no comments" message
};

export default CommentList;
```

```jsx
// components/CommentItem.jsx
const CommentItem = ({ comment }) => {
    // TODO: Display comment details
};

export default CommentItem;
```

```jsx
// components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    // TODO: Get theme and toggleTheme from context
    // TODO: Render toggle button
};

export default ThemeToggle;
```

### Styling Guidelines (App.css)
```css
/* Base styles */
.App {
    min-height: 100vh;
    transition: all 0.3s ease;
}

/* Light theme */
.App.light {
    background-color: #f5f5f5;
    color: #333;
}

/* Dark theme */
.App.dark {
    background-color: #1a1a1a;
    color: #f5f5f5;
}

/* Add more styles for components */
/* Consider theme-aware styling */
```

## Expected Features

1. **Post List View**
   - Shows all posts in a scrollable list
   - Clicking a post shows its detail

2. **Post Detail View**
   - Shows full post content
   - Displays comments below

3. **Theme Switching**
   - Toggle between light and dark themes
   - Theme persists across all components

4. **Loading States**
   - Show loading while fetching data
   - Separate loading for posts and comments

## Grading Criteria

1. **Pattern Implementation (40 points)**
   - Container components handle logic correctly (15 points)
   - Presentational components are pure (10 points)
   - List-Item pattern used properly (15 points)

2. **Context Usage (20 points)**
   - Theme context implemented correctly (10 points)
   - Components use context appropriately (10 points)

3. **Data Flow (20 points)**
   - Posts fetched and displayed (10 points)
   - Comments fetched for selected post (10 points)

4. **User Experience (20 points)**
   - Smooth post selection (5 points)
   - Theme switching works (5 points)
   - Loading states shown (5 points)
   - Responsive layout (5 points)

## Hints
- Use grid or flexbox for side-by-side layout
- Remember to clean up effects when component unmounts
- Use conditional classes for theme styling
- Consider using optional chaining for safe property access
- Comments should refetch when a different post is selected

## Bonus Features (Optional)
- Add search/filter for posts
- Implement pagination for posts
- Add user info display
- Create a "Back to List" button in mobile view
- Persist selected theme in localStorage

## Submission
Submit all component files, context file, and CSS. Ensure smooth navigation and theme switching!