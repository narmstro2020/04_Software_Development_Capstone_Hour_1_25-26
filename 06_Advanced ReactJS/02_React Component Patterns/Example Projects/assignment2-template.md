# Assignment 2: Shopping Cart with List-Item Pattern

## Objective
Build a shopping cart application using the List-Item pattern. You'll create a product catalog where users can add items to a cart, update quantities, and see the total price.

## Requirements

### Part 1: Container Component (ShopContainer.jsx)
Create a container that:
1. Fetches product data from the API
2. Manages cart state (items in cart with quantities)
3. Calculates total price
4. Handles adding/removing items from cart

### Part 2: List Components
Create these list components:

1. **ProductList.jsx**
   - Receives products array and onAddToCart function
   - Maps over products to render ProductItem components

2. **CartList.jsx**
   - Receives cart items and handler functions
   - Maps over cart items to render CartItem components
   - Shows total price

### Part 3: Item Components
Create these item components:

1. **ProductItem.jsx**
   - Displays individual product info
   - Has "Add to Cart" button

2. **CartItem.jsx**
   - Displays cart item with quantity
   - Has buttons to increase/decrease quantity
   - Has remove button

### API Information
Use this API endpoint:
```
https://fakestoreapi.com/products?limit=8
```

### Starter Code Structure

```jsx
// App.jsx
import ShopContainer from './components/ShopContainer';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Shopping Cart App</h1>
            <ShopContainer />
        </div>
    );
}

export default App;
```

```jsx
// components/ShopContainer.jsx
import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CartList from './CartList';

const ShopContainer = () => {
    // TODO: State for products, cart items, and loading
    
    // TODO: Fetch products on mount
    
    // TODO: Add to cart function
    // Should check if item already in cart and update quantity
    
    // TODO: Update quantity function
    
    // TODO: Remove from cart function
    
    // TODO: Calculate total price
    
    // TODO: Return JSX with product list and cart
};

export default ShopContainer;
```

```jsx
// components/ProductList.jsx
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart }) => {
    // TODO: Map over products and render ProductItem for each
    
    return (
        <div className="product-list">
            <h2>Products</h2>
            {/* Your code here */}
        </div>
    );
};

export default ProductList;
```

```jsx
// components/ProductItem.jsx
const ProductItem = ({ product, onAddToCart }) => {
    // TODO: Display product info and add to cart button
    
    return (
        <div className="product-item">
            {/* Your code here */}
        </div>
    );
};

export default ProductItem;
```

```jsx
// components/CartList.jsx
import CartItem from './CartItem';

const CartList = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    // TODO: Calculate total price
    
    // TODO: Map over cart items
    
    return (
        <div className="cart-list">
            <h2>Shopping Cart</h2>
            {/* Your code here */}
        </div>
    );
};

export default CartList;
```

```jsx
// components/CartItem.jsx
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    // TODO: Display cart item with quantity controls
    
    return (
        <div className="cart-item">
            {/* Your code here */}
        </div>
    );
};

export default CartItem;
```

### Sample API Response
```json
[
    {
        "id": 1,
        "title": "Backpack",
        "price": 109.95,
        "description": "Your perfect pack...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }
]
```

### Expected Cart Item Structure
```javascript
{
    id: 1,
    title: "Backpack",
    price: 109.95,
    image: "...",
    quantity: 2
}
```

### Basic Styling (App.css)
```css
.App {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.product-list {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.product-item {
    background: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.product-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.product-item h3 {
    font-size: 14px;
    margin: 10px 0;
    height: 40px;
    overflow: hidden;
}

.product-item .price {
    color: #007bff;
    font-weight: bold;
    font-size: 18px;
}

.add-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

.cart-list {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    position: sticky;
    top: 20px;
}

.cart-item {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cart-item img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.cart-item-info {
    flex: 1;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-btn {
    background: #007bff;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
}

.remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.cart-total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #ddd;
    font-size: 20px;
    font-weight: bold;
}

.empty-cart {
    text-align: center;
    color: #666;
    padding: 20px;
}

.loading {
    text-align: center;
    padding: 50px;
    font-size: 20px;
}
```

## Grading Criteria

1. **List-Item Pattern Implementation (40 points)**
   - ProductList and ProductItem work correctly (10 points)
   - CartList and CartItem work correctly (10 points)
   - Proper separation between List and Item components (10 points)
   - Props are passed correctly through the hierarchy (10 points)

2. **Container Logic (30 points)**
   - Products fetched and stored correctly (10 points)
   - Cart state management works (10 points)
   - Total calculation is accurate (10 points)

3. **Functionality (30 points)**
   - Can add items to cart (5 points)
   - Quantity updates work (increase/decrease) (10 points)
   - Can remove items from cart (5 points)
   - Prevents quantity from going below 1 (5 points)
   - Shows empty cart message when appropriate (5 points)

## Hints
- Use array methods like `map`, `filter`, and `find`
- For cart state, you can use an array of objects with product info and quantity
- Remember to use the spread operator when updating state
- Consider using `reduce` for calculating the total
- Product images from the API are large - use CSS to control their size

## Bonus Features (Optional)
- Add a cart item counter in the header
- Implement a "Clear Cart" button
- Add loading spinner while fetching products
- Show "Added to Cart" confirmation message
- Persist cart in localStorage

## Submission
Submit all component files and your App.css file. Ensure the app handles all user interactions smoothly!