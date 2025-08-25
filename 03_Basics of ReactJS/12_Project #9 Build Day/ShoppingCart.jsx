import React, { useReducer } from 'react';
import './ShoppingCart.css';

// Available products
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Phone', price: 699.99 },
  { id: 3, name: 'Headphones', price: 199.99 },
  { id: 4, name: 'Keyboard', price: 79.99 },
  { id: 5, name: 'Mouse', price: 49.99 }
];

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // TODO: Check if the item already exists in the cart
      // If it exists, increase its quantity by 1
      // If it doesn't exist, add it to the cart with quantity 1
      
      // Hints:
      // 1. Use state.find(item => item.id === action.payload.id) to check if item exists
      // 2. Store the result in a variable (e.g., existingItem)
      // 3. If existingItem exists:
      //    - Use state.map() to create a new array
      //    - For the matching item, return { ...item, quantity: item.quantity + 1 }
      //    - For other items, return them unchanged
      // 4. If existingItem doesn't exist:
      //    - Return a new array with all existing items plus the new one
      //    - Use [...state, { ...action.payload, quantity: 1 }]
      // Remember: action.payload contains the product object
      
      // TODO: Implement ADD_ITEM logic
      return state;
    }
    
    case 'REMOVE_ITEM': {
      // TODO: Remove the item with the given id from the cart
      
      // Hints:
      // 1. action.payload contains the product id (not the whole product)
      // 2. Use state.filter() to create a new array without the item
      // 3. Keep only items where item.id !== action.payload
      // Example structure: return state.filter(item => ...)
      
      // TODO: Implement REMOVE_ITEM logic
      return state;
    }
    
    case 'UPDATE_QUANTITY': {
      // TODO: Update the quantity of an item in the cart
      // If quantity <= 0, remove the item from cart
      // Otherwise, update the item's quantity
      
      // Hints:
      // 1. action.payload is an object with { id, quantity }
      // 2. First destructure: const { id, quantity } = action.payload;
      // 3. Check if quantity <= 0:
      //    - If true, remove the item using filter (similar to REMOVE_ITEM)
      //    - return state.filter(item => item.id !== id)
      // 4. If quantity > 0:
      //    - Use state.map() to update the specific item
      //    - For matching item: return { ...item, quantity: quantity }
      //    - For other items: return item unchanged
      // Remember: You need an if-else statement here!
      
      // TODO: Implement UPDATE_QUANTITY logic
      return state;
    }
    
    case 'CLEAR_CART': {
      // TODO: Clear all items from the cart
      
      // Hints:
      // 1. This is the simplest case!
      // 2. Just return an empty array: []
      // 3. This resets the cart to its initial state
      
      // TODO: Implement CLEAR_CART logic
      return state;
    }
    
    default:
      return state;
  }
}

function ShoppingCart() {
  // Initialize useReducer with empty cart
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Helper function to calculate total price
  const calculateTotal = () => {
    // TODO: Calculate the total price of all items in the cart
    
    // Hints:
    // 1. Use cart.reduce() with an accumulator starting at 0
    // 2. For each item, multiply item.price by item.quantity
    // 3. Add this to the accumulator
    // Example structure: 
    // return cart.reduce((total, item) => {
    //   return total + (item.price * item.quantity);
    // }, 0);
    // Or shorter: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    // TODO: Implement calculateTotal logic
    return 0;
  };

  // Helper function to get quantity of item in cart
  const getItemQuantity = (productId) => {
    // TODO: Find the item in the cart and return its quantity
    // If item is not in cart, return 0
    
    // Hints:
    // 1. Use cart.find(item => item.id === productId) to find the item
    // 2. Store the result in a variable (e.g., cartItem)
    // 3. If cartItem exists, return cartItem.quantity
    // 4. If cartItem doesn't exist (is undefined), return 0
    // You can use a ternary operator: return cartItem ? cartItem.quantity : 0
    
    // TODO: Implement getItemQuantity logic
    return 0;
  };

  // Action handlers
  const addToCart = (product) => {
    // TODO: Dispatch ADD_ITEM action with the product as payload
    
    // Hints:
    // 1. Call dispatch() with an action object
    // 2. The action object should have:
    //    - type: 'ADD_ITEM'
    //    - payload: product (the entire product object passed as parameter)
    // Example: dispatch({ type: 'ADD_ITEM', payload: product });
    
    // TODO: Implement addToCart
  };

  const removeFromCart = (productId) => {
    // TODO: Dispatch REMOVE_ITEM action with the productId as payload
    
    // Hints:
    // 1. Similar to addToCart, but simpler
    // 2. dispatch({ type: 'REMOVE_ITEM', payload: productId })
    // 3. Note: payload is just the id, not an object
    
    // TODO: Implement removeFromCart
  };

  const updateQuantity = (productId, newQuantity) => {
    // TODO: Dispatch UPDATE_QUANTITY action with id and quantity as payload
    
    // Hints:
    // 1. The payload needs to be an object with both id and quantity
    // 2. Create the payload object: { id: productId, quantity: newQuantity }
    // 3. Dispatch the action:
    //    dispatch({ 
    //      type: 'UPDATE_QUANTITY', 
    //      payload: { id: productId, quantity: newQuantity } 
    //    });
    
    // TODO: Implement updateQuantity
  };

  const clearCart = () => {
    // TODO: Dispatch CLEAR_CART action
    
    // Hints:
    // 1. This action doesn't need a payload
    // 2. Just dispatch: { type: 'CLEAR_CART' }
    // Example: dispatch({ type: 'CLEAR_CART' });
    
    // TODO: Implement clearCart
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      
      {/* Available Products Section */}
      <div className="products">
        <h2>Available Products</h2>
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            <div className="product-actions">
              <span className="in-cart">In Cart: {getItemQuantity(product.id)}</span>
              <button 
                className="add-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Shopping Cart Section */}
      <div className="cart">
        <h2>Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
        
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)} each</span>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="cart-actions">
              <button 
                className="clear-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
        
        <div className="total">
          <strong>Total: ${calculateTotal().toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;