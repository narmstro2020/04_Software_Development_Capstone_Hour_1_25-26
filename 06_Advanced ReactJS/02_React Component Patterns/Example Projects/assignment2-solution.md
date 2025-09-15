# Assignment 2: Shopping Cart with List-Item Pattern - Solution

## Complete Solution Code

### App.jsx
```jsx
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

### components/ShopContainer.jsx
```jsx
import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CartList from './CartList';

const ShopContainer = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=8');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Add to cart function
    const handleAddToCart = (product) => {
        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            // If exists, increase quantity
            handleUpdateQuantity(product.id, existingItem.quantity + 1);
        } else {
            // If new item, add to cart with quantity 1
            const newCartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    // Update quantity function
    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1
        
        setCartItems(cartItems.map(item => 
            item.id === itemId 
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    // Remove from cart function
    const handleRemoveItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    // Show loading state
    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    // Main render
    return (
        <div className="container">
            <ProductList 
                products={products} 
                onAddToCart={handleAddToCart} 
            />
            <CartList 
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

export default ShopContainer;
```

### components/ProductList.jsx
```jsx
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="product-list">
            <h2>Products</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductItem 
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
```

### components/ProductItem.jsx
```jsx
const ProductItem = ({ product, onAddToCart }) => {
    const handleClick = () => {
        onAddToCart(product);
    };

    return (
        <div className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="add-btn" onClick={handleClick}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;
```

### components/CartList.jsx
```jsx
import CartItem from './CartItem';

const CartList = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    return (
        <div className="cart-list">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <CartItem 
                            key={item.id}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemoveItem}
                        />
                    ))}
                    <div className="cart-total">
                        Total: ${totalPrice.toFixed(2)}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartList;
```

### components/CartItem.jsx
```jsx
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const handleIncrease = () => {
        onUpdateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrease = () => {
        onUpdateQuantity(item.id, item.quantity - 1);
    };

    const handleRemove = () => {
        onRemove(item.id);
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
                <button 
                    className="quantity-btn" 
                    onClick={handleDecrease}
                    disabled={item.quantity === 1}
                >
                    -
                </button>
                <span>{item.quantity}</span>
                <button 
                    className="quantity-btn" 
                    onClick={handleIncrease}
                >
                    +
                </button>
            </div>
            <button className="remove-btn" onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
};

export default CartItem;
```

### Enhanced App.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.App {
    padding: 20px;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.App h1 {
    text-align: center;
    color: white;
    margin-bottom: 30px;
    font-size: 36px;
}

.container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.product-list {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-list h2 {
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.product-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 1px solid #e0e0e0;
}

.product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 10px;
}

.product-item h3 {
    font-size: 14px;
    margin: 10px 0;
    height: 40px;
    overflow: hidden;
    color: #333;
}

.product-item .price {
    color: #007bff;
    font-weight: bold;
    font-size: 18px;
    margin: 10px 0;
}

.add-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
    width: 100%;
}

.add-btn:hover {
    background: #218838;
}

.cart-list {
    background: white;
    padding: 20px;
    border-radius: 12px;
    position: sticky;
    top: 20px;
    height: fit-content;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-list h2 {
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #28a745;
    padding-bottom: 10px;
}

.cart-item {
    background: #f8f9fa;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #e0e0e0;
}

.cart-item img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.cart-item-info {
    flex: 1;
}

.cart-item-info h4 {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
}

.cart-item-info p {
    color: #007bff;
    font-weight: bold;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-controls span {
    font-weight: bold;
    min-width: 20px;
    text-align: center;
}

.quantity-btn {
    background: #007bff;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.3s;
}

.quantity-btn:hover:not(:disabled) {
    background: #0056b3;
}

.quantity-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.3s;
}

.remove-btn:hover {
    background: #c82333;
}

.cart-total {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #ddd;
    font-size: 24px;
    font-weight: bold;
    color: #28a745;
    text-align: right;
}

.empty-cart {
    text-align: center;
    color: #666;
    padding: 40px 20px;
    font-size: 16px;
}

.loading {
    text-align: center;
    padding: 50px;
    font-size: 24px;
    color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
    
    .cart-list {
        position: static;
    }
    
    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
}
```

## Explanation of Solution

### List-Item Pattern Implementation

1. **ProductList & ProductItem**
   - ProductList receives products array and maps over it
   - Each ProductItem is responsible for displaying one product
   - Clear separation: List handles iteration, Item handles individual display

2. **CartList & CartItem**
   - CartList manages the collection and calculates total
   - CartItem handles individual cart item display and controls
   - Each component has a single, clear responsibility

### Container Component (ShopContainer)

1. **State Management**
   - Products: Fetched from API
   - Cart Items: Array of objects with product info and quantity
   - Loading: Boolean for loading state

2. **Business Logic**
   - `handleAddToCart`: Checks for existing items, updates or adds new
   - `handleUpdateQuantity`: Updates item quantity with validation
   - `handleRemoveItem`: Removes item from cart

3. **Data Flow**
   - Container fetches and owns all data
   - Passes data down through props
   - Receives events through callback functions

### Key Features

1. **Quantity Management**
   - Prevents quantity from going below 1
   - Disable decrease button when quantity is 1
   - Updates existing items instead of duplicating

2. **Price Calculation**
   - Uses `reduce` to calculate total
   - Formats prices to 2 decimal places
   - Updates automatically when cart changes

3. **User Experience**
   - Empty cart message
   - Loading state
   - Hover effects on products
   - Sticky cart for easy access

## Testing Checklist

- [x] Products load from API
- [x] Add to cart works for new items
- [x] Adding existing item increases quantity
- [x] Quantity controls work (increase/decrease)
- [x] Cannot decrease quantity below 1
- [x] Remove item works
- [x] Total price calculates correctly
- [x] Empty cart shows appropriate message
- [x] All prices formatted to 2 decimal places

## Pattern Benefits Demonstrated

1. **Reusability**: Item components can be reused with different data
2. **Maintainability**: Each component has clear responsibility
3. **Testability**: Components can be tested in isolation
4. **Scalability**: Easy to add new features to specific components