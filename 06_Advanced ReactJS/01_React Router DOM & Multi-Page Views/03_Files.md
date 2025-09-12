# Visual Diagrams and Setup Files

## Package.json Template

Create this file for students to use as a starting point:

```json
{
  "name": "react-router-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.8"
  }
}
```

## Project Setup Instructions

### setup-instructions.md

```markdown
# React Router DOM Project Setup Instructions

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- IntelliJ IDEA (or your preferred IDE)
- Git installed and configured

## Step-by-Step Setup

### 1. Create New Vite React Project
```bash
npm create vite@latest my-router-project -- --template react
cd my-router-project
```

### 2. Install React Router DOM
```bash
npm install react-router-dom
```

### 3. Install All Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in IntelliJ IDEA
- Open IntelliJ IDEA
- Click "Open" and select your project folder
- IntelliJ will automatically detect it's a React project

### 6. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### 7. Create GitHub Repository
- Go to GitHub.com
- Create a new repository
- Follow the instructions to push your local repository

### 8. Project Structure
Your project should look like this:
```
my-router-project/
├── public/
├── src/
│   ├── components/
│   ├── data/ (for assignments)
│   ├── context/ (for advanced assignments)
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## Useful IntelliJ Extensions
- ES6 support (usually built-in)
- React snippets
- Git integration (built-in)

## Common Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to GitHub

## Troubleshooting
- If you get dependency errors, try `npm install` again
- If the development server won't start, check if port 5173 is available
- For routing issues, make sure React Router DOM is properly installed
```

## URL Pattern Reference Chart

```markdown
# React Router URL Patterns Quick Reference

## Basic Route Patterns

| Pattern | Example URL | Matches | Use Case |
|---------|-------------|---------|----------|
| `/` | `https://app.com/` | Exact root path | Homepage |
| `/about` | `https://app.com/about` | Static path | Static pages |
| `/blog` | `https://app.com/blog` | Static path | Blog listing |

## Dynamic Route Patterns

| Pattern | Example URL | Parameter Access | Use Case |
|---------|-------------|------------------|----------|
| `/user/:id` | `/user/123` | `const { id } = useParams()` | User profiles |
| `/post/:slug` | `/post/my-article` | `const { slug } = useParams()` | Blog posts |
| `/category/:name` | `/category/tech` | `const { name } = useParams()` | Categories |

## Query Parameters

| Pattern | Example URL | Parameter Access | Use Case |
|---------|-------------|------------------|----------|
| `/search?q=term` | `/search?q=react` | `searchParams.get('q')` | Search functionality |
| `/products?sort=price` | `/products?sort=price&order=asc` | `searchParams.get('sort')` | Filtering/sorting |

## Nested Route Patterns

| Parent Pattern | Child Pattern | Full URL | Use Case |
|----------------|---------------|----------|----------|
| `/blog` | `index` | `/blog` | Blog home |
| `/blog` | `:slug` | `/blog/my-post` | Individual post |
| `/blog` | `category/:name` | `/blog/category/tech` | Category posts |

## Advanced Patterns

| Pattern | Description | Example | Use Case |
|---------|-------------|---------|----------|
| `*` | Catch-all route | Any unmatched URL | 404 pages |
| `/admin/*` | Wildcard routes | `/admin/users`, `/admin/settings` | Admin sections |

## Code Examples

### Basic Route Setup
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### Dynamic Routes
```javascript
<Routes>
  <Route path="/user/:id" element={<UserProfile />} />
  <Route path="/post/:slug" element={<BlogPost />} />
</Routes>
```

### Nested Routes
```javascript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="blog" element={<BlogLayout />}>
      <Route index element={<BlogList />} />
      <Route path=":slug" element={<BlogPost />} />
    </Route>
  </Route>
</Routes>
```

### Navigation Links
```javascript
// Basic navigation
<Link to="/about">About Us</Link>

// Dynamic navigation
<Link to={`/user/${userId}`}>View Profile</Link>

// Navigation with query parameters
<Link to="/search?q=react">Search React</Link>

// Active link styling
<NavLink 
  to="/about" 
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```
```

## Common Routing Patterns Cheat Sheet

```markdown
# React Router Common Patterns Cheat Sheet

## 1. Basic Setup Pattern
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 2. Layout Pattern
```javascript
// Layout component with navigation
function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
}

// Route setup with layout
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>
```

## 3. URL Parameters Pattern
```javascript
// Route definition
<Route path="/product/:id" element={<ProductDetail />} />

// Component using parameter
function ProductDetail() {
  const { id } = useParams();
  return <div>Product ID: {id}</div>;
}

// Navigation to dynamic route
<Link to={`/product/${product.id}`}>View Product</Link>
```

## 4. Query Parameters Pattern
```javascript
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const updateSearch = (value) => {
    setSearchParams({ search: value });
  };

  return (
    <div>
      <input onChange={(e) => updateSearch(e.target.value)} />
      {/* Display filtered results */}
    </div>
  );
}
```

## 5. Programmatic Navigation Pattern
```javascript
function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    if (success) {
      navigate('/dashboard'); // Redirect after login
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
    </form>
  );
}
```

## 6. Protected Routes Pattern
```javascript
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 7. 404 Error Handling Pattern
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  {/* Catch-all route for 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

## 8. Active Navigation Styling Pattern
```javascript
<NavLink
  to="/about"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  About
</NavLink>
```

## 9. Context + Router Pattern
```javascript
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
```

## 10. Lazy Loading Pattern
```javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

<Route 
  path="/lazy" 
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  } 
/>
```
```
