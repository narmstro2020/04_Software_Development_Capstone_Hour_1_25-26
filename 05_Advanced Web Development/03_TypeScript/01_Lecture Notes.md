# Introduction to TypeScript - Lecture Notes

---

## Table of Contents

| Topic | Description | Link |
|-------|-------------|------|
| [1. What is TypeScript?](#1-what-is-typescript) | Understanding TypeScript and its relationship to JavaScript | [↓](#1-what-is-typescript) |
| [2. Setting Up TypeScript](#2-setting-up-typescript) | Installing and configuring TypeScript in projects | [↓](#2-setting-up-typescript) |
| [3. Basic Type Annotations](#3-basic-type-annotations) | Adding types to variables and functions | [↓](#3-basic-type-annotations) |
| [4. Interfaces and Objects](#4-interfaces-and-objects) | Creating custom types for objects | [↓](#4-interfaces-and-objects) |
| [5. Arrays and Functions](#5-arrays-and-functions) | Typing arrays and function parameters/returns | [↓](#5-arrays-and-functions) |
| [6. TypeScript with React](#6-typescript-with-react) | Using TypeScript in React components | [↓](#6-typescript-with-react) |
| [Vocabulary](#vocabulary) | Key TypeScript terms and definitions | [↓](#vocabulary) |
| [Summary](#summary) | Key takeaways from this lesson | [↓](#summary) |
| [Additional Resources](#additional-resources) | Documentation and learning materials | [↓](#additional-resources) |

---

## 1. What is TypeScript?
[🔝 Back to top](#table-of-contents)

### Overview

**TypeScript** is a programming language developed by Microsoft that builds on JavaScript by adding **static type definitions**. Think of TypeScript as "JavaScript with superpowers" - it's essentially JavaScript that can catch errors before your code runs.

### Key Concepts

#### Why TypeScript?
Remember when you've written JavaScript and got errors like:
```javascript
const user = { name: "John", age: 25 };
console.log(user.naem); // Typo! Should be 'name', but JS won't catch this until runtime
```

With TypeScript, you can catch these errors while writing code, not after running it.

#### TypeScript vs JavaScript
- **JavaScript**: Dynamic typing, errors found at runtime
- **TypeScript**: Static typing, errors found during development
- **Compilation**: TypeScript code gets compiled to JavaScript

### Visual Aid: TypeScript Development Flow

```
TypeScript Code (.ts) → TypeScript Compiler → JavaScript Code (.js) → Browser/Node.js
```

---

## 2. Setting Up TypeScript
[🔝 Back to top](#table-of-contents)

### Installation and Setup

Since you're already familiar with npm and package.json from previous lessons, adding TypeScript to your projects is straightforward.

#### Installing TypeScript

**Global Installation:**
```bash
npm install -g typescript
```

**Project Installation (Recommended):**
```bash
npm install --save-dev typescript @types/node
```

#### TypeScript Configuration

Create a `tsconfig.json` file in your project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

#### With React and Vite (which you know!)

For React projects with Vite:
```bash
npm create vite@latest my-app -- --template react-ts
```

Or add TypeScript to existing React project:
```bash
npm install --save-dev typescript @types/react @types/react-dom
```

---

## 3. Basic Type Annotations
[🔝 Back to top](#table-of-contents)

### Primitive Types

Remember JavaScript's basic data types? TypeScript adds type annotations to them:

#### String, Number, Boolean
```typescript
// JavaScript (what you know)
let username = "john_doe";
let age = 25;
let isActive = true;

// TypeScript (with type annotations)
let username: string = "john_doe";
let age: number = 25;
let isActive: boolean = true;

// TypeScript can also infer types (smart!)
let username2 = "jane_doe"; // TypeScript knows this is a string
let age2 = 30; // TypeScript knows this is a number
```

#### Arrays
```typescript
// JavaScript arrays you know
const numbers = [1, 2, 3, 4, 5];
const names = ["Alice", "Bob", "Charlie"];

// TypeScript arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];

// Alternative syntax
const scores: Array<number> = [95, 87, 92];
const colors: Array<string> = ["red", "green", "blue"];
```

#### Functions
Remember arrow functions from ES6? Here's how TypeScript enhances them:

```typescript
// JavaScript function you know
const addNumbers = (a, b) => {
    return a + b;
};

// TypeScript function with type annotations
const addNumbers = (a: number, b: number): number => {
    return a + b;
};

// Function with default parameters (you know this from ES6)
const greetUser = (name: string, greeting: string = "Hello"): string => {
    return `${greeting}, ${name}!`;
};

// Void return type (for functions that don't return anything)
const logMessage = (message: string): void => {
    console.log(message);
};
```

---

## 4. Interfaces and Objects
[🔝 Back to top](#table-of-contents)

### Object Types

You're already comfortable with JavaScript objects. TypeScript adds structure to them:

#### Basic Object Typing
```typescript
// JavaScript object you know
const user = {
    name: "John Doe",
    email: "john@example.com",
    age: 30
};

// TypeScript object with inline type
const user: { name: string; email: string; age: number } = {
    name: "John Doe",
    email: "john@example.com",
    age: 30
};
```

#### Interfaces (Better Way!)

**Interface** is a TypeScript feature that defines the structure of an object:

```typescript
// Define the interface
interface User {
    name: string;
    email: string;
    age: number;
    isActive?: boolean; // Optional property (notice the ?)
}

// Use the interface
const user1: User = {
    name: "John Doe",
    email: "john@example.com",
    age: 30
};

const user2: User = {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    isActive: true
};
```

#### Extending Interfaces
```typescript
interface User {
    name: string;
    email: string;
}

interface AdminUser extends User {
    permissions: string[];
    isAdmin: boolean;
}

const admin: AdminUser = {
    name: "Admin User",
    email: "admin@example.com",
    permissions: ["read", "write", "delete"],
    isAdmin: true
};
```

---

## 5. Arrays and Functions
[🔝 Back to top](#table-of-contents)

### Typed Arrays with Objects

Combining your array knowledge with TypeScript interfaces:

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// Array of products
const products: Product[] = [
    { id: 1, name: "Laptop", price: 999.99, inStock: true },
    { id: 2, name: "Mouse", price: 29.99, inStock: false },
    { id: 3, name: "Keyboard", price: 79.99, inStock: true }
];

// Using array methods you know (map, filter, etc.)
const inStockProducts = products.filter(product => product.inStock);
const productNames = products.map(product => product.name);
```

### Function Signatures with Interfaces

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// Function that takes and returns specific types
const findUserById = (users: User[], id: number): User | undefined => {
    return users.find(user => user.id === id);
};

// Function with destructuring (you know this from ES6)
const createUser = ({ name, email }: { name: string; email: string }): User => {
    return {
        id: Math.random(),
        name,
        email
    };
};
```

### Union Types

Sometimes a variable can be multiple types:

```typescript
// Can be string or number
type ID = string | number;

const userId1: ID = "user_123";
const userId2: ID = 456;

// Function that accepts multiple types
const formatId = (id: string | number): string => {
    return `ID: ${id}`;
};
```

---

## 6. TypeScript with React
[🔝 Back to top](#table-of-contents)

### React Component Props

Since you know React props and components, here's how TypeScript enhances them:

#### Function Components with Props
```typescript
// Interface for props
interface UserCardProps {
    name: string;
    email: string;
    age: number;
    isActive?: boolean;
}

// React component with typed props
const UserCard: React.FC<UserCardProps> = ({ name, email, age, isActive = true }) => {
    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>{email}</p>
            <p>Age: {age}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        </div>
    );
};

// Using the component
const App: React.FC = () => {
    return (
        <div>
            <UserCard 
                name="John Doe" 
                email="john@example.com" 
                age={30} 
            />
        </div>
    );
};
```

#### State with TypeScript

Remember useState? Here it is with TypeScript:

```typescript
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

const UserList: React.FC = () => {
    // State with type annotation
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    // Function to add user
    const addUser = (newUser: User) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
```

#### Event Handlers

Typing React events:

```typescript
const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Typed event handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, password });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};
```

---

## Vocabulary
[🔝 Back to top](#table-of-contents)

| Term | Definition | Example |
|------|------------|---------|
| **Type Annotation** | Explicit specification of a variable's type | `let name: string = "John";` |
| **Type Inference** | TypeScript automatically determining the type | `let name = "John";` // inferred as string |
| **Interface** | A contract that defines the structure of an object | `interface User { name: string; }` |
| **Union Type** | A type that can be one of several types | `string \| number` |
| **Optional Property** | A property that may or may not exist | `age?: number` |
| **Generic** | A way to create reusable components with types | `Array<string>` |
| **Type Guard** | Code that checks the type at runtime | `typeof value === 'string'` |
| **Void** | Type for functions that don't return a value | `(): void` |
| **Any** | Type that disables type checking (avoid when possible) | `let data: any = anything;` |
| **Strict Mode** | TypeScript compiler setting for stricter type checking | In `tsconfig.json`: `"strict": true` |
| **Compilation** | Process of converting TypeScript to JavaScript | `tsc filename.ts` |
| **TSX** | TypeScript file extension for React components | `Component.tsx` |

---

## Summary
[🔝 Back to top](#table-of-contents)

### Key Takeaways

1. **TypeScript is JavaScript with Types**: Everything you know about JavaScript still applies, TypeScript just adds type safety.

2. **Early Error Detection**: TypeScript catches errors during development, not at runtime.

3. **Better Development Experience**: IntelliJ and other editors provide better autocomplete, refactoring, and error detection.

4. **Gradual Adoption**: You can add TypeScript to existing JavaScript projects gradually.

5. **React Integration**: TypeScript works seamlessly with React, providing better props validation and component typing.

6. **Tool Chain**: Works with your existing tools (Vite, npm, git, etc.).

### Best Practices

- **Start Simple**: Begin with basic type annotations, gradually adopt more advanced features
- **Use Interfaces**: Define object structures with interfaces rather than inline types
- **Enable Strict Mode**: Use strict TypeScript settings for better code quality
- **Type Your Props**: Always type React component props
- **Avoid `any`**: Use specific types whenever possible

### Benefits You'll Experience

- **Fewer Runtime Errors**: Catch bugs before they reach production
- **Better Code Documentation**: Types serve as inline documentation
- **Improved Refactoring**: Safer code changes with type checking
- **Enhanced IDE Support**: Better autocomplete and error detection
- **Team Collaboration**: Clearer contracts between different parts of code

---

## Additional Resources
[🔝 Back to top](#table-of-contents)

### Official Documentation
- [TypeScript Official Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript with React](https://www.typescriptlang.org/docs/handbook/react.html)

### W3Schools Resources
- [TypeScript Tutorial](https://www.w3schools.com/typescript/)
- [TypeScript with React Tutorial](https://www.w3schools.com/react/react_typescript.asp)

### Practice and Tools
- [TypeScript Playground](https://www.typescriptlang.org/play) - Online TypeScript compiler
- [DefinitelyTyped](https://definitelytyped.org/) - Type definitions for JavaScript libraries

### IntelliJ Integration
- TypeScript support is built into IntelliJ IDEA and WebStorm
- Enable TypeScript service in Settings → Languages & Frameworks → TypeScript
- Use built-in TypeScript compiler for real-time error checking

---

*This lesson builds upon your existing knowledge of JavaScript ES6+, React, npm, and development tools. TypeScript enhances your current skills without replacing them.*