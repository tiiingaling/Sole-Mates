import React, { useState, useContext, useEffect } from 'react';

// Create our theme context using React.CreateContext()
export const CartContext = React.createContext();

// Create a custom hook that allows easy access to our Cart values
export const useCart = () => useContext(CartContext);

// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function CartProvider({ children }) {
  
  // Creating our state
  const [cartItems, setCartItems] = useState([]);

  // Method to update our state
  const onAddToCart = (item) => {
    console.log('Adding to the Cart');
    setCartItems([...cartItems, item]);    
  };

  const onRemoveFromCart = (item) => {
    console.log('Remove from the Cart');
    setCartItems(cartItems.filter(cartItem => cartItem.title !== item.title));
  };

  const [cartTotal, setCartTotal] = useState({ items: 0, subtotal: 0 });

  // Calculate the cart total whenever the cartItems state changes
  useEffect(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal({ items, subtotal });
  }, [cartItems]);

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // Dark theme and toggle theme are getting provided to the child components
    <CartContext.Provider value={{ cartItems, onAddToCart, onRemoveFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}
