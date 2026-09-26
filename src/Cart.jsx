import './Cart.css'
import cartLogo from '../resources/cart_elements/cart_logo.png';
import checkoutTag from '../resources/cart_elements/checkout_tag.png';
import CartElement from './CartElement.jsx';
import { useCart } from './CartContext';

export default function Cart() {
    const { cartItems } = useCart();
    console.log(cartItems)
    return (
        <section className = "overall-cart-container" style = {{ minHeight: `calc(${cartItems.length === 0 ? 1050 : (cartItems.length * 544.5) + 807.5} * var(--u))`}}>
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
                            <h1 className = "price-items-num">{cartItems.length * 4500} PKR</h1>
                        </div>
                    </div>
                    <div className = "cart-total-right">
                        <img className = "checkout-tag" src = {checkoutTag} />
                    </div>
                </div>
        </section>
    )
}