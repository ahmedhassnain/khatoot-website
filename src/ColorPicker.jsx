import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ColorPicker.css';

// A letter that opens over the page listing every colour of one set. Each colour shows its
// photo in the product page's stamp frame and leads to that colour's product page.
// Built on <dialog>, so focus stays inside it and Escape closes it.
export default function ColorPicker({ open, onClose, heading, variants }) {
    const dialogRef = useRef(null);
    const { formatPrice } = useCart();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref = {dialogRef}
            className = "color-picker-letter"
            aria-labelledby = "color-picker-heading"
            onClose = {onClose}
            onClick = {(e) => { if (e.target === dialogRef.current) onClose(); }}
        >
            <div className = "cpl-inner">
                <button type = "button" className = "cpl-close" aria-label = "Close" onClick = {onClose}>
                    <svg viewBox = "0 0 16 16" aria-hidden = "true"><path d = "M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" /></svg>
                </button>

                <h2 id = "color-picker-heading" className = "cpl-heading">{heading}</h2>
                <p className = "cpl-subheading">Pick a colour to see the piece</p>

                <ul className = "cpl-options">
                    {variants.map((variant, i) => (
                        <li key = {variant.key}>
                            <Link
                                to = {`/product/${variant.collection}/${variant.id}`}
                                className = "cpl-option"
                                style = {{ '--tilt': `${i % 2 === 0 ? -2 : 2}deg` }}
                                onClick = {onClose}
                            >
                                <span className = "cpl-frame">
                                    <img src = {variant.image_list[0]} alt = "" />
                                </span>
                                <span className = "cpl-color">{variant.color}</span>
                                <span className = "cpl-price">{formatPrice(variant.key)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </dialog>
    );
}
