# Assignment 3: Blog Application with Combined Patterns - Solution

## Complete Solution Code

### App.jsx
```jsx
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
                <header className="app-header">
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

### contexts/ThemeContext.jsx
```jsx
import { createContext } from 'react';

export const ThemeContext = createContext();
```

### components/BlogContainer.jsx
```jsx
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import PostList from './PostList';
import PostDetail from './PostDetail';
import CommentsContainer from './CommentsContainer';

const BlogContainer = () => {
    // Get theme from context
    const { theme } = useContext(ThemeContext);
    
    // State management
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Fetch posts on mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPosts();
    }, []);
    
    // Handle post selection
    const handleSelectPost = (post) => {
        setSelectedPost(post);
    };
    
    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }
    
    return (
        <div className={`blog-container ${theme}`}>
            <div className="posts-sidebar">
                <h2>Posts</h2>
                <PostList 
                    posts={posts}
                    onSelectPost={handleSelectPost}
                    selectedPostId={selectedPost?.id}
                />
            </div>
            
            {selectedPost ? (
                <div className="content-area">
                    <PostDetail post={selectedPost} />
                    <CommentsContainer postId={selectedPost.id} />
                </div>
            ) : (
                <div className="content-area">
                    <div className="no-selection">
                        <p>Select a post to read</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogContainer;
```

### components/CommentsContainer.jsx
```jsx
import { useState, useEffect } from 'react';
import CommentList from './CommentList';

const CommentsContainer = ({ postId }) => {
    // State for comments and loading
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Fetch comments when postId changes
    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;
            
            try {
                setLoading(true);
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
                );
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchComments();
    }, [postId]); // Re-fetch when postId changes
    
    if (loading) {
        return <div className="loading">Loading comments...</div>;
    }
    
    return (
        <div className="comments-section">
            <h3>Comments ({comments.length})</h3>
            <CommentList comments={comments} />
        </div>
    );
};

export default CommentsContainer;
```

### components/PostList.jsx
```jsx
import PostItem from './PostItem';

const PostList = ({ posts, onSelectPost, selectedPostId }) => {
    return (
        <div className="post-list">
            {posts.map(post => (
                <PostItem 
                    key={post.id}
                    post={post}
                    onSelect={onSelectPost}
                    isSelected={post.id === selectedPostId}
                />
            ))}
        </div>
    );
};

export default PostList;
```

### components/PostItem.jsx
```jsx
const PostItem = ({ post, onSelect, isSelected }) => {
    const handleClick = () => {
        onSelect(post);
    };
    
    // Truncate body for preview
    const preview = post.body.substring(0, 60) + '...';
    
    return (
        <div 
            className={`post-item ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <h3>{post.title}</h3>
            <p className="post-preview">{preview}</p>
        </div>
    );
};

export default PostItem;
```

### components/PostDetail.jsx
```jsx
const PostDetail = ({ post }) => {
    return (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <div className="post-meta">
                <span>Post #{post.id}</span>
                <span> | </span>
                <span>User #{post.userId}</span>
            </div>
            <div className="post-body">
                {post.body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
```

### components/CommentList.jsx
```jsx
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    if (comments.length === 0) {
        return (
            <div className="no-comments">
                <p>No comments yet</p>
            </div>
        );
    }
    
    return (
        <div className="comment-list">
            {comments.map(comment => (
                <CommentItem 
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </div>
    );
};

export default CommentList;
```

### components/CommentItem.jsx
```jsx
const CommentItem = ({ comment }) => {
    return (
        <div className="comment-item">
            <div className="comment-header">
                <strong>{comment.name}</strong>
                <span className="comment-email">{comment.email}</span>
            </div>
            <div className="comment-body">
                {comment.body}
            </div>
        </div>
    );
};

export default CommentItem;
```

### components/ThemeToggle.jsx
```jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};

export default ThemeToggle;
```

### Complete App.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Base App Styles */
.App {
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Light Theme */
.App.light {
    background-color: #f5f5f5;
    color: #333;
}

/* Dark Theme */
.App.dark {
    background-color: #1a1a1a;
    color: #f5f5f5;
}

/* Header */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-header h1 {
    font-size: 32px;
}

/* Theme Toggle Button */
.theme-toggle {
    padding: 10px 20px;
    font-size: 16px;
    border: 2px solid white;
    background: transparent;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background: white;
    color: #667eea;
}

/* Blog Container */
.blog-container {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 20px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

/* Posts Sidebar */
.posts-sidebar {
    background: white;
    border-radius: 8px;
    padding: 20px;
    height: calc(100vh - 120px);
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.blog-container.dark .posts-sidebar {
    background: #2a2a2a;
}

.posts-sidebar h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #667eea;
}

/* Post List */
.post-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

/* Post Item */
.post-item {
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.App.light .post-item {
    background: #f8f9fa;
}

.App.light .post-item:hover {
    background: #e9ecef;
}

.App.dark .post-item {
    background: #3a3a3a;
}

.App.dark .post-item:hover {
    background: #4a4a4a;
}

.post-item.selected {
    border-color: #667eea;
    background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
}

.post-item h3 {
    font-size: 16px;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.post-preview {
    font-size: 14px;
    opacity: 0.7;
}

/* Content Area */
.content-area {
    background: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.blog-container.dark .content-area {
    background: #2a2a2a;
}

/* No Selection */
.no-selection {
    text-align: center;
    padding: 100px 20px;
    opacity: 0.5;
}

.no-selection p {
    font-size: 20px;
}

/* Post Detail */
.post-detail {
    margin-bottom: 40px;
}

.post-detail h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #667eea;
}

.post-meta {
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 20px;
}

.post-body {
    font-size: 16px;
    line-height: 1.8;
}

.post-body p {
    margin-bottom: 15px;
}

/* Comments Section */
.comments-section {
    border-top: 2px solid #e0e0e0;
    padding-top: 30px;
}

.blog-container.dark .comments-section {
    border-top-color: #4a4a4a;
}

.comments-section h3 {
    margin-bottom: 20px;
    color: #667eea;
}

/* Comment List */
.comment-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Comment Item */
.comment-item {
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.App.light .comment-item {
    background: #f8f9fa;
}

.App.dark .comment-item {
    background: #3a3a3a;
    border-color: #4a4a4a;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-wrap: wrap;
    gap: 10px;
}

.comment-header strong {
    color: #667eea;
}

.comment-email {
    font-size: 14px;
    opacity: 0.6;
}

.comment-body {
    font-size: 14px;
    line-height: 1.6;
}

/* No Comments */
.no-comments {
    text-align: center;
    padding: 40px;
    opacity: 0.5;
}

/* Loading State */
.loading {
    text-align: center;
    padding: 50px;
    font-size: 20px;
    opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
    .app-header {
        padding: 15px 20px;
    }
    
    .app-header h1 {
        font-size: 24px;
    }
    
    .blog-container {
        grid-template-columns: 1fr;
    }
    
    .posts-sidebar {
        height: auto;
        max-height: 300px;
    }
    
    .theme-toggle {
        padding: 8px 16px;
        font-size: 14px;
    }
}

/* Scrollbar Styling */
.posts-sidebar::-webkit-scrollbar {
    width: 8px;
}

.posts-sidebar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.posts-sidebar::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.posts-sidebar::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
}

.blog-container.dark .posts-sidebar::-webkit-scrollbar-track {
    background: #3a3a3a;
}
```

## Explanation of Solution

### Pattern Implementation

1. **Container-Presentational Pattern**
   - **Containers**: BlogContainer and CommentsContainer handle all data fetching and state
   - **Presentational**: PostDetail, PostItem, CommentItem, ThemeToggle only display data

2. **List-Item Pattern**
   - **PostList/PostItem**: List handles mapping, Item handles individual display
   - **CommentList/CommentItem**: Same separation of concerns

3. **Context Pattern**
   - ThemeContext provides theme state globally
   - Components access theme without prop drilling

### Key Features

1. **Data Flow**
   - BlogContainer fetches posts and manages selection
   - CommentsContainer fetches comments based on selected post
   - Data flows down through props

2. **State Management**
   - Separate loading states for posts and comments
   - Selected post tracked in BlogContainer
   - Theme state managed at App level

3. **User Experience**
   - Visual feedback for selected post
   - Loading indicators during fetch
   - Smooth theme transitions
   - Responsive layout

### Component Responsibilities

1. **BlogContainer**
   - Fetches posts
   - Manages post selection
   - Orchestrates layout

2. **CommentsContainer**
   - Fetches comments for specific post
   - Re-fetches when post changes
   - Manages comment loading state

3. **Presentational Components**
   - Focus purely on UI
   - Receive all data via props
   - No business logic

## Testing Checklist

- [x] Posts load on mount
- [x] Clicking post shows detail
- [x] Comments load for selected post
- [x] Comments update when different post selected
- [x] Theme toggle works
- [x] Theme applies to all components
- [x] Loading states display correctly
- [x] Empty states handled
- [x] Responsive layout works

## Benefits Demonstrated

1. **Separation of Concerns**: Each component has one job
2. **Reusability**: Components can be reused with different data
3. **Maintainability**: Easy to update individual components
4. **Scalability**: Easy to add features like search or pagination
5. **Theme Management**: Context prevents prop drilling for theme