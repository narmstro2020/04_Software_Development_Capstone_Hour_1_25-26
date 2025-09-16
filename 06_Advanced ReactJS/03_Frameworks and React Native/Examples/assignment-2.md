# Assignment 2: Next.js Page Creation

## Objective
Practice creating pages in Next.js using file-based routing and implement both client-side and server-side data fetching.

## Setup
For this assignment, you'll create a simple product catalog with:
- A home page
- A products listing page
- Individual product detail pages

## Part A: File Structure

Create the following file structure (you'll write the actual Next.js code):

```
pages/
  index.js           (Home page)
  products/
    index.js         (All products)
    [id].js          (Individual product)
  api/
    products.js      (API route)
```

## Part B: Implementation Tasks

### Task 1: Create the Home Page
Create a home page with:
- A welcome message
- A link/button to navigate to the products page
- A counter using useState (to practice client-side interactivity)

**Starter Code:**
```javascript
// pages/index.js
import { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  // TODO: Add a counter with useState
  
  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      {/* TODO: Add counter display and button */}
      {/* TODO: Add Link to /products */}
    </div>
  );
};

export default HomePage;
```

### Task 2: Create the Products API Route
Create an API route that returns product data.

**Starter Code:**
```javascript
// pages/api/products.js
export default function handler(req, res) {
  const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Phone', price: 699, description: 'Latest smartphone' },
    { id: 3, name: 'Tablet', price: 399, description: 'Portable tablet device' }
  ];
  
  // TODO: Return products as JSON with proper status
}
```

### Task 3: Create Products Listing Page
Create a page that fetches and displays all products.

**Starter Code:**
```javascript
// pages/products/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // TODO: Use useEffect to fetch products from /api/products
  
  // TODO: Show loading state
  
  // TODO: Map through products and display them
  // Each product should link to /products/[id]
  
  return (
    <div>
      <h1>Our Products</h1>
      {/* Your code here */}
    </div>
  );
};

export default ProductsPage;
```

### Task 4: Create Dynamic Product Page
Create a page that shows individual product details.

**Starter Code:**
```javascript
// pages/products/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  
  // TODO: Fetch the specific product based on id
  // Hint: You'll need to modify the API or filter the results
  
  // TODO: Display product details
  
  // TODO: Add a "Back to Products" link
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
};

export default ProductDetailPage;
```

## Part C: Bonus Challenge

Convert the products listing page to use Server-Side Rendering (SSR) instead of client-side fetching.

**Template:**
```javascript
// pages/products/index.js (SSR version)
export async function getServerSideProps() {
  // TODO: Fetch products on the server
  // Hint: You'll need the full URL for the API
  
  return {
    props: {
      // TODO: Return products as props
    }
  };
}

const ProductsPage = ({ products }) => {
  // TODO: Use the products prop directly (no useState/useEffect needed)
  
  return (
    <div>
      <h1>Our Products</h1>
      {/* Display products */}
    </div>
  );
};

export default ProductsPage;
```

## Requirements Checklist

- [ ] Home page with working counter
- [ ] Navigation between pages using Next.js Link
- [ ] API route returns product data
- [ ] Products page fetches and displays all products
- [ ] Each product links to its detail page
- [ ] Product detail page shows correct product based on ID
- [ ] All pages have "Back" or navigation links
- [ ] (Bonus) SSR implementation works

## Testing Your Code

1. Home page counter increments when clicked
2. Clicking "View Products" navigates to /products
3. Products page shows loading state then products
4. Clicking a product navigates to /products/[id]
5. Product detail page shows the correct product
6. Navigation links work throughout the app

## Hints

- Remember to use `Link` from 'next/link' for navigation
- The `useRouter` hook gives you access to route parameters
- For the API route, use `res.status(200).json(data)`
- When fetching in useEffect, don't forget the empty dependency array `[]`
- For the bonus SSR challenge, the API URL needs to be absolute (e.g., 'http://localhost:3000/api/products')

## Grading Criteria

- Home page functionality: 15%
- API route works correctly: 15%
- Products listing page: 25%
- Dynamic product page: 25%
- Navigation works throughout: 10%
- Code organization and cleanliness: 10%
- Bonus SSR implementation: +10% extra credit