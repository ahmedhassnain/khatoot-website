import './CartElement.css'
import { allProducts } from './Catalogue';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function CartElement({ productKey, size, quantity, price }) {

    const { changeColor, changeSize, changeQuantity, removeFromCart } = useCart();
    const [selected, setSelected] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);
    const sizes = ["Small", "Medium", "Large", "X-Large"];

    const item = allProducts.find((eachItem) => eachItem.key === productKey);
    if (!item) return null;

    // Every entry in the same collection sharing this title is another color of the same suit.
    // Pieces that come in a single color (Kaifiyat) have no color field and skip the picker.
    const variants = allProducts.filter((eachItem) => eachItem.collection === item.collection && eachItem.title === item.title);

    return (
        <section className = "left-right-overall">
            <div className = "element-container">
                <div className = "left-element-container">
                    <div className = "left-postcard">
                        <div className = "left-postcard-title">
                            <h1>{ item.title }</h1>
                        </div>
                        <div className = "left-postcard-details">
                            {item.color && (
                            <div className = "color-picker">
                                <div className = "color-options">
                                    <h3>Color:</h3>
                                    <h3>{item.color}</h3>
                                    <h3 onClick = {() => setColorOpen((open) => !open)}>{colorOpen ? "▲" : "▼"}</h3>
                                </div>
                                {colorOpen && (
                                    <ul className = "color-dropdown">
                                        {variants.map((variant) => (
                                            <li
                                                key = {variant.key}
                                                className = "each-color-option"
                                                onClick = {() => { changeColor(item.key, variant.key); setColorOpen(false); }}
                                            >
                                                {variant.color}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            )}
                            <div className = "color-picker">
                                <div className = "size-options">
                                    <h3>Size:</h3>
                                    <h3>{size}</h3>
                                    <h3 onClick = {() => setSizeOpen((open) => !open)}>{sizeOpen ? "▲" : "▼"}</h3>
                                </div>
                                {sizeOpen && (
                                    <ul className = "color-dropdown">
                                        {sizes.map((eachSize) => (
                                            <li
                                                key = {eachSize}
                                                className = "each-color-option"
                                                onClick = {() => { changeSize(item.key, eachSize); setSizeOpen(false); }}
                                            >
                                                {eachSize}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className = "right-postcard-details">
                        <div className = "image-container">
                            <img className = "image-pc-cart" src = {item.image_list[0]}/>
                        </div>
                        <div className = "quantity-and-price">
                            <div className = "quantity-postcard">
                                <button onClick = {() => changeQuantity(item.key, -1)}>-</button>
                                <h3>{quantity}</h3>
                                <button onClick = {() => changeQuantity(item.key, 1)}>+</button>
                            </div>
                            <div className = "price-postcard">
                                <h3>PKR {quantity * price}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "right-element-container">
                <div className = "checkbox-wrapper">
                    <div
                        className = {`checkbox${selected ? ' checked' : ''}`}
                        role = "checkbox"
                        aria-checked = {selected}
                        aria-label = {`Select ${item.title}`}
                        tabIndex = {0}
                        onClick = {() => setSelected((isSelected) => !isSelected)}
                        onKeyDown = {(e) => {
                            if (e.key === " " || e.key === "Enter") {
                                e.preventDefault();
                                setSelected((isSelected) => !isSelected);
                            }
                        }}
                    >
                    </div>
                    {selected && (
                        <button className = "delete-option" onClick = {() => removeFromCart(item.key)}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}
