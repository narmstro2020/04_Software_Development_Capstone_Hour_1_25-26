# Assignment 2 Solution: Next.js Page Creation

## Complete Solution Code

### File: pages/index.js (Home Page)
```javascript
import { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Our Store!</h1>
      <p>Browse our amazing products and find what you need.</p>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Visitor Counter</h2>
        <p>Visitors today: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Count Visit
        </button>
      </div>
      
      <Link href="/products">
        <a style={{
          display: 'inline-block',
          padding: '15px 30px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '18px'
        }}>
          View Our Products →
        </a>
      </Link>
    </div>
  );
};

export default HomePage;
```

### File: pages/api/products.js (API Route)
```javascript
export default function handler(req, res) {
  const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, name: 'Phone', price: 699, description: 'Latest smartphone' },
    { id: 3, name: 'Tablet', price: 399, description: 'Portable tablet device' }
  ];
  
  // Handle different request methods if needed
  if (req.method === 'GET') {
    // Check if requesting specific product by id
    const { id } = req.query;
    
    if (id) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } else {
      // Return all products
      res.status(200).json(products);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### File: pages/products/index.js (Products Listing - Client-Side)

```javascript
import {useState, useEffect} from 'react';
import Link from 'next/link';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from API
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{padding: '20px'}}>
                <h1>Our Products</h1>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Our Products</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '8px'
                        }}
                    >
                        <h2>{product.name}</h2>
                        <p style={{fontSize: '24px', color: '#0070f3'}}>
                            ${product.price}
                        </p>
                        <p>{product.description}</p>
                        <Link href={`/products/${product.id}`}>
                            <a style={{
                                color: '#0070f3',
                                textDecoration: 'underline'
                            }}>
                                View Details →
                            </a>
                        </Link>
                    </div>
                ))}
            </div>

            <div style={{marginTop: '30px'}}>
                <Link href="/">
                    <a style={{color: '#0070f3'}}>← Back to Home</a>
                </Link>
            </div>
        </div>
    );
};

export default ProductsPage;
```

### File: pages/products/[id].js (Product Detail Page)
```javascript
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Fetch specific product
      fetch(`/api/products?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [id]);
  
  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find that product.</p>
        <Link href="/products">
          <a style={{ color: '#0070f3' }}>← Back to Products</a>
        </Link>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p style={{ fontSize: '32px', color: '#0070f3', margin: '0' }}>
          ${product.price}
        </p>
        <p style={{ fontSize: '18px', marginTop: '15px' }}>
          {product.description}
        </p>
        
        <button 
          style={{
            padding: '10px 30px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={() => alert('Added to cart!')}
        >
          Add to Cart
        </button>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <Link href="/products">
          <a style={{ color: '#0070f3', marginRight: '20px' }}>
            ← Back to Products
          </a>
        </Link>
        <Link href="/">
          <a style={{ color: '#0070f3' }}>
            Go to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
```

## Bonus: Server-Side Rendering (SSR) Version

### File: pages/products/index.js (SSR Version)
```javascript
import Link from 'next/link';

// This function runs on the server before rendering
export async function getServerSideProps() {
  try {
    // Note: In development, use full URL
    // In production, you'd use environment variables
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
    
    return {
      props: {
        products
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: []
      }
    };
  }
}

const ProductsPage = ({ products }) => {
  // No useState or useEffect needed - products come as props!
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Our Products (SSR)</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>
        This page was rendered on the server with the products already loaded!
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(product => (
          <div 
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px'
            }}
          >
            <h2>{product.name}</h2>
            <p style={{ fontSize: '24px', color: '#0070f3' }}>
              ${product.price}
            </p>
            <p>{product.description}</p>
            <Link href={`/products/${product.id}`}>
              <a style={{
                color: '#0070f3',
                textDecoration: 'underline'
              }}>
                View Details →
              </a>
            </Link>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <Link href="/">
          <a style={{ color: '#0070f3' }}>← Back to Home</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;
```

## Alternative: Static Site Generation (SSG) Version

```javascript
// This would be in pages/products/index.js
import Link from 'next/link';

// This function runs at BUILD TIME
export async function getStaticProps() {
  // Fetch data at build time
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();
  
  return {
    props: {
      products
    },
    // Optionally revalidate every 60 seconds
    revalidate: 60
  };
}

// Component remains the same as SSR version
const ProductsPage = ({ products }) => {
  // ... same component code as SSR version
};
```

## Testing Instructions

1. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

2. **Test each feature:**
   - Visit http://localhost:3000 - Home page with counter
   - Click "Count Visit" - Counter should increment
   - Click "View Our Products" - Navigate to products page
   - Products should load and display
   - Click on any product - Navigate to detail page
   - Detail page should show correct product info
   - Test all navigation links

3. **Test the API directly:**
   - Visit http://localhost:3000/api/products - Should see JSON with all products
   - Visit http://localhost:3000/api/products?id=1 - Should see single product

## Key Learning Points

1. **File-based routing** - Files in `pages/` automatically become routes
2. **API Routes** - Backend endpoints in `pages/api/`
3. **Dynamic routes** - `[id].js` creates parameterized routes
4. **Client-side fetching** - Using `useEffect` and `fetch`
5. **Server-side rendering** - Using `getServerSideProps`
6. **Navigation** - Using `Link` component and `useRouter` hook

## Common Issues and Solutions

- **Issue:** "fetch is not defined" in getServerSideProps
  - **Solution:** Use full URL (http://localhost:3000/api/...) in SSR

- **Issue:** Products not loading
  - **Solution:** Check browser console for errors, ensure API route is working

- **Issue:** Navigation not working
  - **Solution:** Make sure to wrap link text in `<a>` tag when using Link component