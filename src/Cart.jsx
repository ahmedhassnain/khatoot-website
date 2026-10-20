import './Cart.css'
import cartLogo from '../resources/cart_elements/cart_logo.webp';
import checkoutTag from '../resources/cart_elements/checkout_tag.webp';
import CartElement from './CartElement.jsx';
import PostcardNote from './PostcardNote.jsx';
import khatootSeal from '../resources/khatoot_seal.webp';
import { useCart } from './CartContext';
import { useState, useRef, useEffect } from 'react';

export default function Cart() {
    const { cartItems, cartLoading, checkoutUrl } = useCart();
    // Each cart line carries its own Shopify price, so the cart never waits on the price lookup
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // The totals only make sense once there's something in the cart
    const hasItems = !cartLoading && cartItems.length > 0;

    // The postage strip at the bottom of the screen stands in for the totals until the real
    // totals stamp scrolls into view, then steps aside so it never covers the cart items.
    const totalsRef = useRef(null);
    const [totalsVisible, setTotalsVisible] = useState(true);

    useEffect(() => {
        if (!hasItems || !totalsRef.current) return;
        const observer = new IntersectionObserver(([entry]) => setTotalsVisible(entry.isIntersecting), { threshold: 0.35 });
        observer.observe(totalsRef.current);
        return () => observer.disconnect();
    }, [hasItems]);

    const showStrip = hasItems && !totalsVisible;

    // Notes (toasts) float just above the strip while it's showing, instead of covering it
    const stripRef = useRef(null);
    useEffect(() => {
        const root = document.documentElement;
        if (showStrip && stripRef.current) root.style.setProperty('--toast-lift', `${stripRef.current.offsetHeight}px`);
        else root.style.removeProperty('--toast-lift');
        return () => root.style.removeProperty('--toast-lift');
    }, [showStrip]);
    return (
        <section className = "overall-cart-container" style = {{ "--cart-min-h": `calc(${hasItems ? (cartItems.length * 544.5) + 737.5 : 1050} * var(--u))`}}>
            <div className = "header-and-elements">
                <div className = "header-cart">
                    <div className = "header-cart-left">
                        <h1>Shopping Cart</h1>
                        <p>Your picks, ready to be sealed and sent your way.</p>
                    </div>
                    <div className = "header-cart-right">
                        <img className = "cart-logo" src = {cartLogo} />
                    </div>
                </div>
                <div className = "cart-elements">
                    {
                        cartLoading ?
                        <div className = "cart-loading" role = "status">
                            <img className = "cart-loading-seal" src = {khatootSeal} alt = "" aria-hidden = "true" />
                            <p>Opening your envelopes…</p>
                        </div>
                        :
                        cartItems.length === 0 ? 
                        <div className = "empty-cart-div">
                            <PostcardNote
                                message = "“You’ve not blessed your envelopes just yet.”"
                                signature = "— we do not know who said that"
                                prompt = "Start with a collection:"
                                links = {[
                                    { label: "Kaifiyat", to: "/kaifiyat" },
                                    { label: "Pehla Khat", to: "/pehla-khat" },
                                ]}
                            />
                        </div>
                        :
                        cartItems.map((eachItem) => {
                            return (
                                <CartElement
                                    key = {eachItem.lineId}
                                    productKey = {eachItem.key}
                                    quantity = {eachItem.quantity}
                                    size = {eachItem.size}
                                    price = {eachItem.price}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {hasItems && (
            <div className = "cart-total-footer" ref = {totalsRef}>
                    <div className = "cart-total-left">
                        <div className = "total-quantity">
                            <h1 className = "cart-items">Cart Items:</h1>
                            <h1 className = "cart-items-num">{cartItems.length}</h1>
                        </div>
                        <div className = "total-amount">
                            <h1 className = "price-items">Total Price:</h1>
                            <h1 className = "price-items-num">{totalPrice} PKR</h1>
                        </div>
                    </div>
                    <div className = "cart-total-right">
                        <a
                            href = {checkoutUrl || undefined}
                            className = {`checkout-link${cartItems.length === 0 || !checkoutUrl ? ' checkout-disabled' : ''}`}
                            onClick = {(e) => { if (cartItems.length === 0 || !checkoutUrl) e.preventDefault(); }}
                        >
                            <img className = "checkout-tag" src = {checkoutTag} />
                        </a>
                    </div>
                </div>
            )}
            <button
                type = "button"
                ref = {stripRef}
                className = {`cart-postage-strip${showStrip ? ' is-shown' : ''}`}
                aria-hidden = {!showStrip}
                tabIndex = {showStrip ? 0 : -1}
                onClick = {() => totalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
                <span className = "strip-summary">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    <span className = "strip-divider" aria-hidden = "true"></span>
                    PKR {totalPrice}
                </span>
                <span className = "strip-action">See total</span>
            </button>
        </section>
    )
}