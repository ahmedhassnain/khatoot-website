import React, { createContext, useState, useContext } from 'react';
import pehlaKhatDetails from './PehlaKhatDetails';


// global context creation, for shared global data.
const CartContext = createContext(); 

// function CartProvider that when wrapped around any "children",
// it will provide the global cart state to that element.
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  // this array will contain cart items passed with "add to cart"

  // addToCart is where we pass down details of the product.
  const addToCart = (product) => {

    // this sets a new item into the existing array.
    setCartItems((prevItems) => {
    // this checks if the item we just added is already there
    // or not.
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
    // if a match is found, we take the existing array, match the id
    // of the passed in product with the id of the exisitng product.
    // then, we increase the quantity of the existing product.
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prevItems, { ...product }];
    });
  };

  const changeColor = (oldId, newId) => {
    setCartItems((prevItems) => {
      const oldItem = prevItems.find(item => item.id === oldId);
      if (!oldItem || oldId === newId) return prevItems;

      // New color is already its own cart line: merge quantities into it
      const alreadyInCart = prevItems.find(item => item.id === newId);
      if (alreadyInCart) {
        return prevItems
          .filter(item => item.id !== oldId)
          .map(item =>
            item.id === newId ? { ...item, quantity: item.quantity + oldItem.quantity } : item
          );
      }

      // Otherwise swap this line for the new color, keeping its size and quantity
      const newProduct = pehlaKhatDetails.find(product => product.id === newId);
      if (!newProduct) return prevItems;
      return prevItems.map(item =>
        item.id === oldId ? { ...newProduct, quantity: oldItem.quantity, size: oldItem.size } : item
      );
    });
  };

  const changeSize = (id, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map(item => item.id === id ? { ...item, size: newSize } : item)
    );
  };

  // Same 1-4 limit as the quantity buttons on the product page
  const changeQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.min(4, Math.max(1, item.quantity + delta)) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, changeColor, changeSize, changeQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy consumption
export function useCart() {
  return useContext(CartContext);
}