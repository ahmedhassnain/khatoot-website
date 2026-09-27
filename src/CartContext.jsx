import React, { createContext, useState, useContext, useEffect } from 'react';
import pehlaKhatDetails from './PehlaKhatDetails';
import { createCart, fetchCart, addCartLine, updateCartLine, removeCartLine, fetchVariantPrices } from './shopify';

// global context creation, for shared global data.
const CartContext = createContext();

function linesToCartItems(cart) {
  if (!cart) return [];
  return cart.lines.nodes.map((line) => {
    const variantId = line.merchandise.id;
    const product = pehlaKhatDetails.find((p) => p.variantId === variantId);
    const sizeAttr = line.attributes.find((a) => a.key === 'Size');
    return {
      ...product,
      lineId: line.id,
      variantId,
      quantity: line.quantity,
      size: sizeAttr ? sizeAttr.value : undefined,
      price: Number(line.merchandise.price.amount),
    };
  });
}

// function CartProvider that when wrapped around any "children",
// it will provide the global cart state to that element.
export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(() => localStorage.getItem('shopifyCartId'));
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [prices, setPrices] = useState({});

  // Prices are fetched once up front so product/listing pages can show
  // real Shopify pricing without waiting on a cart to exist yet.
  useEffect(() => {
    fetchVariantPrices(pehlaKhatDetails.map((p) => p.variantId))
      .then(setPrices)
      .catch((err) => console.error('Failed to fetch variant prices', err));
  }, []);

  // Resume an existing Shopify cart on load (carts expire after ~10 weeks).
  useEffect(() => {
    if (!cartId) return;
    fetchCart(cartId)
      .then((cart) => {
        if (!cart) {
          localStorage.removeItem('shopifyCartId');
          setCartId(null);
          return;
        }
        setCartItems(linesToCartItems(cart));
        setCheckoutUrl(cart.checkoutUrl);
      })
      .catch((err) => console.error('Failed to fetch cart', err));
  }, [cartId]);

  const applyCart = (cart) => {
    setCartItems(linesToCartItems(cart));
    setCheckoutUrl(cart.checkoutUrl);
  };

  const ensureCart = async () => {
    if (cartId) return cartId;
    const cart = await createCart();
    localStorage.setItem('shopifyCartId', cart.id);
    setCartId(cart.id);
    applyCart(cart);
    return cart.id;
  };

  // addToCart is where we pass down details of the product.
  const addToCart = async (product) => {
    if (!product.variantId) {
      console.error(`No Shopify variantId set for "${product.title}" (${product.color}) in PehlaKhatDetails.js`);
      return;
    }
    try {
      const id = await ensureCart();
      const existing = cartItems.find((item) => item.variantId === product.variantId);
      const cart = existing
        ? await updateCartLine(id, existing.lineId, { quantity: existing.quantity + product.quantity })
        : await addCartLine(id, product.variantId, product.quantity, [{ key: 'Size', value: product.size }]);
      applyCart(cart);
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const changeColor = async (oldId, newId) => {
    if (oldId === newId) return;
    const oldItem = cartItems.find((item) => item.id === oldId);
    const newProduct = pehlaKhatDetails.find((product) => product.id === newId);
    if (!oldItem || !newProduct) return;

    try {
      // New color is already its own cart line: merge quantities into it
      const alreadyInCart = cartItems.find((item) => item.id === newId);
      if (alreadyInCart) {
        await updateCartLine(cartId, alreadyInCart.lineId, { quantity: alreadyInCart.quantity + oldItem.quantity });
        const cart = await removeCartLine(cartId, oldItem.lineId);
        applyCart(cart);
        return;
      }

      // Otherwise swap this line for the new color's variant, keeping size/quantity
      const cart = await updateCartLine(cartId, oldItem.lineId, { merchandiseId: newProduct.variantId });
      applyCart(cart);
    } catch (err) {
      console.error('Failed to change color', err);
    }
  };

  const changeSize = async (id, newSize) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    try {
      const cart = await updateCartLine(cartId, item.lineId, { attributes: [{ key: 'Size', value: newSize }] });
      applyCart(cart);
    } catch (err) {
      console.error('Failed to change size', err);
    }
  };

  // Same 1-4 limit as the quantity buttons on the product page
  const changeQuantity = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const nextQuantity = Math.min(4, Math.max(1, item.quantity + delta));
    try {
      const cart = await updateCartLine(cartId, item.lineId, { quantity: nextQuantity });
      applyCart(cart);
    } catch (err) {
      console.error('Failed to change quantity', err);
    }
  };

  const removeFromCart = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    try {
      const cart = await removeCartLine(cartId, item.lineId);
      applyCart(cart);
    } catch (err) {
      console.error('Failed to remove from cart', err);
    }
  };

  const getPrice = (id) => {
    const product = pehlaKhatDetails.find((p) => p.id === id);
    return product ? prices[product.variantId] ?? 0 : 0;
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, changeColor, changeSize, changeQuantity, removeFromCart, checkoutUrl, getPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy consumption
export function useCart() {
  return useContext(CartContext);
}
