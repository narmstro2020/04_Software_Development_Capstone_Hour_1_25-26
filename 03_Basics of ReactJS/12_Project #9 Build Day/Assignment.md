# Assignment 1: Shopping Cart with useReducer

[Back to Main Notes](usereducer_useref_notes.md)

## Assignment Overview

Create a shopping cart application using `useReducer` to manage the cart state. The application should allow users to add items, remove items, update quantities, and view the total price.

## Requirements

1. Create a `ShoppingCart` component that displays:
   - A list of available products
   - The current cart contents
   - Total price of items in cart
   - Buttons to add/remove items and adjust quantities

2. Use `useReducer` to manage the cart state with the following actions:
   - `ADD_ITEM`: Add a new item to the cart
   - `REMOVE_ITEM`: Remove an item completely from the cart
   - `UPDATE_QUANTITY`: Change the quantity of an item
   - `CLEAR_CART`: Empty the entire cart

3. Display the following information:
   - Product name and price
   - Quantity in cart
   - Subtotal for each item
   - Total cart value

## Starter Code Structure

Create the following files in your React project:

### File: `ShoppingCart.jsx`

```javascript
import React, { useReducer } from 'react';

// Available products
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Phone', price: 699.99 },
  { id: 3, name: 'Headphones', price: 199.99 },
  { id: 4, name: 'Keyboard', price: 79.99 },
  { id: 5, name: 'Mouse', price: 49.99 }
];

// TODO: Create your reducer function here
function cartReducer(state, action) {
  // Implement the reducer logic
}

function ShoppingCart() {
  // TODO: Set up useReducer with initial state
  const initialState = [];
  
  // TODO: Implement component logic
  
  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      
      {/* TODO: Display available products */}
      <div className="products">
        <h2>Available Products</h2>
        {/* Product list goes here */}
      </div>
      
      {/* TODO: Display cart contents */}
      <div className="cart">
        <h2>Your Cart</h2>
        {/* Cart items go here */}
        
        {/* TODO: Display total */}
        <div className="total">
          <strong>Total: $0.00</strong>
        </div>
        
        {/* TODO: Clear cart button */}
      </div>
    </div>
  );
}

export default ShoppingCart;
```

### File: `ShoppingCart.css` (Optional styling)

```css
.shopping-cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.products, .cart {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-item, .cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.product-item:last-child, .cart-item:last-child {
  border-bottom: none;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.quantity-controls button:hover {
  background: #f0f0f0;
}

.total {
  text-align: right;
  font-size: 1.2em;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #333;
}

button {
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.add-button {
  background-color: #4CAF50;
  color: white;
}

.remove-button {
  background-color: #f44336;
  color: white;
}

.clear-button {
  background-color: #ff9800;
  color: white;
}

button:hover {
  opacity: 0.8;
}
```

## Implementation Steps

1. **Set up the reducer function** with switch cases for each action type
2. **Initialize useReducer** with an empty array as the initial state
3. **Create helper functions** to calculate totals and find items
4. **Implement the product display** with "Add to Cart" buttons
5. **Implement the cart display** with quantity controls and remove buttons
6. **Add the clear cart functionality**

## Expected Behavior

- Clicking "Add to Cart" should add the item with quantity 1 or increase quantity if already in cart
- Quantity controls (+/-) should update the item quantity
- Remove button should completely remove the item from cart
- Total should update automatically when cart changes
- Clear Cart should empty the entire cart

## Testing Your Solution

Test the following scenarios:
1. Add multiple different items to cart
2. Add the same item multiple times
3. Increase and decrease quantities
4. Remove individual items
5. Clear the entire cart
6. Verify totals are calculated correctly

## Bonus Features (Optional)

- Add a quantity input field for direct quantity entry
- Implement a "Continue Shopping" vs "Checkout" flow
- Add item images or descriptions
- Implement local storage to persist cart between sessions

---

**Solution available in:** [Assignment 1 Solution](assignment1-solution.md)