import './Cart.css'
import cartLogo from '../resources/cart_elements/cart_logo.webp';
import checkoutTag from '../resources/cart_elements/checkout_tag.webp';
import CartElement from './CartElement.jsx';
import { useCart } from './CartContext';

export default function Cart() {
    const { cartItems, checkoutUrl, getPrice } = useCart();
    const totalPrice = cartItems.reduce((sum, item) => sum + getPrice(item.id) * item.quantity, 0);
    return (
        <section className = "overall-cart-container" style = {{ "--cart-min-h": `calc(${cartItems.length === 0 ? 1050 : (cartItems.length * 544.5) + 737.5} * var(--u))`}}>
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
                        cartItems.length === 0 ? 
                        <div className = "empty-cart-div">
                            <h1>"You've not blessed your envelopes just yet."</h1>
                            <p>- we do not know who said that</p>
                        </div>
                        :
                        cartItems.map((eachItem) => {
                            return (
                                <CartElement
                                    key = {eachItem.id}
                                    id = {eachItem.id}
                                    quantity = {eachItem.quantity}
                                    size = {eachItem.size}
                                    price = {getPrice(eachItem.id)}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className = {`cart-total-footer${cartItems.length > 0 ? ' sticky' : ''}`}>
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
        </section>
    )
}