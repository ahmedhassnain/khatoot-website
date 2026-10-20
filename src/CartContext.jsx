import React, { createContext, useState, useContext, useEffect } from 'react';
import { allProducts } from './Catalogue';
import { useToast } from './Toast.jsx';
import { createCart, fetchCart, addCartLine, updateCartLine, removeCartLine, fetchVariantPrices } from './shopify';

// global context creation, for shared global data.
const CartContext = createContext();

function linesToCartItems(cart) {
  if (!cart) return [];
  return cart.lines.nodes.map((line) => {
    const variantId = line.merchandise.id;
    const product = allProducts.find((p) => p.variantId === variantId);
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
// Most of any one piece a cart can hold (same limit as the quantity buttons)
export const MAX_QUANTITY = 4;

function describe(product) {
  return product.color ? `${product.title} (${product.color})` : product.title;
}

const VIEW_CART = { label: 'View cart', to: '/cart' };

export function CartProvider({ children }) {
  const { notify } = useToast();
  const [cartId, setCartId] = useState(() => localStorage.getItem('shopifyCartId'));
  const [cartItems, setCartItems] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [prices, setPrices] = useState({});
  // 'loading' until Shopify answers, so pages show a placeholder instead of PKR 0
  const [priceStatus, setPriceStatus] = useState('loading');
  // True while a saved cart is being fetched, so the cart page doesn't flash "empty"
  const [cartLoading, setCartLoading] = useState(() => Boolean(localStorage.getItem('shopifyCartId')));

  // Prices are fetched once up front so product/listing pages can show
  // real Shopify pricing without waiting on a cart to exist yet.
  useEffect(() => {
    fetchVariantPrices(allProducts.map((p) => p.variantId))
      .then((fetched) => {
        setPrices(fetched);
        setPriceStatus('ready');
      })
      .catch((err) => {
        console.error('Failed to fetch variant prices', err);
        setPriceStatus('error');
      });
  }, []);

  // Resume an existing Shopify cart on load (carts expire after ~10 weeks).
  useEffect(() => {
    if (!cartId) {
      setCartLoading(false);
      return;
    }
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
      .catch((err) => {
        console.error('Failed to fetch cart', err);
        notify("Couldn't load your saved cart. Refresh the page to try again.", { tone: 'error' });
      })
      .finally(() => setCartLoading(false));
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
      console.error(`No Shopify variantId set for "${product.title}" (${product.key})`);
      notify(`${product.title} can't be ordered online yet.`, { tone: 'error' });
      return;
    }
    const existing = cartItems.find((item) => item.variantId === product.variantId);
    if (existing && existing.quantity >= MAX_QUANTITY) {
      notify(`Your cart already has ${MAX_QUANTITY} of ${describe(product)}, the most you can order.`, { action: VIEW_CART });
      return;
    }
    const quantity = existing ? Math.min(MAX_QUANTITY, existing.quantity + product.quantity) : product.quantity;
    try {
      const id = await ensureCart();
      const cart = existing
        ? await updateCartLine(id, existing.lineId, { quantity })
        : await addCartLine(id, product.variantId, product.quantity, [{ key: 'Size', value: product.size }]);
      applyCart(cart);
      if (existing && existing.quantity + product.quantity > MAX_QUANTITY) {
        notify(`Your cart now has ${MAX_QUANTITY} of ${describe(product)}, the most you can order.`, { action: VIEW_CART });
      } else {
        const count = product.quantity > 1 ? `${product.quantity} × ` : '';
        notify(`Added ${count}${describe(product)}, size ${product.size}, to your cart.`, { action: VIEW_CART });
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
      notify(`Couldn't add ${product.title} to your cart. Check your connection and try again.`, { tone: 'error' });
    }
  };

  // Products are identified by their catalogue key (see Catalogue.js), since ids repeat across collections
  const changeColor = async (oldKey, newKey) => {
    if (oldKey === newKey) return;
    const oldItem = cartItems.find((item) => item.key === oldKey);
    const newProduct = allProducts.find((product) => product.key === newKey);
    if (!oldItem || !newProduct) return;

    try {
      // New color is already its own cart line: merge quantities into it
      const alreadyInCart = cartItems.find((item) => item.key === newKey);
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
      notify("Couldn't change the color. Try again in a moment.", { tone: 'error' });
    }
  };

  const changeSize = async (key, newSize) => {
    const item = cartItems.find((item) => item.key === key);
    if (!item) return;
    try {
      const cart = await updateCartLine(cartId, item.lineId, { attributes: [{ key: 'Size', value: newSize }] });
      applyCart(cart);
    } catch (err) {
      console.error('Failed to change size', err);
      notify("Couldn't change the size. Try again in a moment.", { tone: 'error' });
    }
  };

  // Same 1-4 limit as the quantity buttons on the product page
  const changeQuantity = async (key, delta) => {
    const item = cartItems.find((item) => item.key === key);
    if (!item) return;
    if (delta > 0 && item.quantity >= MAX_QUANTITY) {
      notify(`You can order up to ${MAX_QUANTITY} of each piece.`);
      return;
    }
    const nextQuantity = Math.min(MAX_QUANTITY, Math.max(1, item.quantity + delta));
    if (nextQuantity === item.quantity) return;
    try {
      const cart = await updateCartLine(cartId, item.lineId, { quantity: nextQuantity });
      applyCart(cart);
    } catch (err) {
      console.error('Failed to change quantity', err);
      notify("Couldn't change the quantity. Try again in a moment.", { tone: 'error' });
    }
  };

  const removeFromCart = async (key) => {
    const item = cartItems.find((item) => item.key === key);
    if (!item) return;
    try {
      const cart = await removeCartLine(cartId, item.lineId);
      applyCart(cart);
      notify(`Removed ${describe(item)} from your cart.`);
    } catch (err) {
      console.error('Failed to remove from cart', err);
      notify(`Couldn't remove ${item.title}. Try again in a moment.`, { tone: 'error' });
    }
  };

  // Display text for a product's price: a placeholder while prices load, a note if they failed
  const formatPrice = (key) => {
    if (priceStatus === 'loading') return 'PKR …';
    if (priceStatus === 'error') return 'Price unavailable';
    return `PKR ${getPrice(key)}`;
  };

  const getPrice = (key) => {
    const product = allProducts.find((p) => p.key === key);
    return product ? prices[product.variantId] ?? 0 : 0;
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartLoading, addToCart, changeColor, changeSize, changeQuantity, removeFromCart, checkoutUrl, getPrice, formatPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easy consumption
export function useCart() {
  return useContext(CartContext);
}
