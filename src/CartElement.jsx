import './CartElement.css'
import pehlaKhatDetails from './PehlaKhatDetails';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function CartElement({ id, size, quantity }) {

    const { changeColor, changeSize, changeQuantity, removeFromCart } = useCart();
    const [selected, setSelected] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);
    const sizes = ["Small", "Medium", "Large", "X-Large"];

    const item = pehlaKhatDetails.find((eachItem) => eachItem.id === id);
    if (!item) return null;

    // Every entry sharing this title is another color of the same suit
    const variants = pehlaKhatDetails.filter((eachItem) => eachItem.title === item.title);

    return (
        <section className = "left-right-overall">
            <div className = "element-container">
                <div className = "left-element-container">
                    <div className = "left-postcard">
                        <div className = "left-postcard-title">
                            <h1>{ item.title }</h1>
                        </div>
                        <div className = "left-postcard-details">
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
                                                key = {variant.id}
                                                className = "each-color-option"
                                                onClick = {() => { changeColor(item.id, variant.id); setColorOpen(false); }}
                                            >
                                                {variant.color}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
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
                                                onClick = {() => { changeSize(item.id, eachSize); setSizeOpen(false); }}
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
                                <button onClick = {() => changeQuantity(item.id, -1)}>-</button>
                                <h3>{quantity}</h3>
                                <button onClick = {() => changeQuantity(item.id, 1)}>+</button>
                            </div>
                            <div className = "price-postcard">
                                <h3>PKR {quantity * 4500}</h3>
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
                        <button className = "delete-option" onClick = {() => removeFromCart(item.id)}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}
