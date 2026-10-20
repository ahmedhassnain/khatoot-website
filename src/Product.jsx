import './Product.css'
import sameColHeader from '../resources/item_highlight/same_col_header.webp';
import kamaliaEnvelope from '../resources/item_highlight/kamalia_khaddar_ioc.webp';
import kamaliaPicture from '../resources/item_highlight/kamalia_image_one_letter.webp';
import doriaCoordEnvelope from '../resources/item_highlight/dc_coord_ioc.webp';
import doriaCoordPicture from '../resources/item_highlight/doria_cotton_picture.webp';
import irishCottonEnvelope from '../resources/item_highlight/irish_cotton_plazo_ioc.webp';
import irishCottonPicture from '../resources/item_highlight/irish_cotton_palazzo_picture.webp';
import doriaLongEnvelope from '../resources/item_highlight/dc_long_ioc.webp';
import doriaLongPicture from '../resources/item_highlight/doria_cotton_long_shirt_picture.webp';
import { collections, findProduct } from './Catalogue.js';
import Missing from './Missing.jsx';
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart, MAX_QUANTITY } from './CartContext';
import { useToast } from './Toast.jsx';
import { createCartWithLine } from './shopify';

// Envelope + picture pair shown per Pehla Khat design in the "same collection" section below.
// Kaifiyat designs carry their own pair in KaifiyatDetails.js (see collectionAssetsFor).
const collectionAssets = {
    "Kamalia Khaddar Piece": { envelope: kamaliaEnvelope, picture: kamaliaPicture, width: 390, offsetY: 15 },
    "Doria Cotton Co-Ord Piece": { envelope: doriaCoordEnvelope, picture: doriaCoordPicture, width: 400, offsetY: 0 },
    "Irish Cotton Piece": { envelope: irishCottonEnvelope, picture: irishCottonPicture, width: 420, offsetY: 0 },
    "Doria Cotton Long Piece": { envelope: doriaLongEnvelope, picture: doriaLongPicture, width: 416, offsetY: 0 },
};

function collectionAssetsFor(design) {
    if (design.collectionEnvelope) return { envelope: design.collectionEnvelope, picture: design.collectionPicture, width: 364, offsetY: 0, anchorBottom: true, isPolaroid: true };
    return collectionAssets[design.title];
}


export default function Product() {

    const { addToCart, formatPrice } = useCart();
    const { notify } = useToast();

    const [activeImage, setActiveImage] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [sizeSelected, setSizeSelected] = useState("Medium");
    const sizingButtonRef = useRef(null);

    useEffect(() => {
        if (!dropdownVisibility) return;
        function handleClickOutside(e) {
            if (sizingButtonRef.current && !sizingButtonRef.current.contains(e.target)) {
                setDropdownVisibility(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownVisibility]);

    const [currentCart, setCurrentCart] = useState(
        [

        ]
    );
    const { collection, id } = useParams();
    const eachLetter = findProduct(collection, id);

    // Moving between products keeps this component mounted, so start each one on its first photo
    useEffect(() => {
        setActiveImage(0);
    }, [collection, id]);

    if (!eachLetter) return <Missing />;

    // Every other design in this collection (not this one), earliest-added first, capped at 3.
    const collectionProducts = collections[collection];
    const otherDesigns = [...new Set(collectionProducts.map((product) => product.title))]
        .filter((title) => title !== eachLetter.title)
        .slice(0, 3)
        .map((title) => collectionProducts.find((product) => product.title === title));

    const imageCount = eachLetter.image_list.length;
    // Pieces not yet listed on Shopify have no variant, so they can't be priced or bought yet
    const isPurchasable = Boolean(eachLetter.variantId);

   function goToPrev() {
        setActiveImage(activeImage === 0 ? imageCount - 1 : activeImage - 1);
    }

    function goToNext() {
        setActiveImage(activeImage === imageCount - 1 ? 0 : activeImage + 1);
    }

    return (
        <section className = "product-container">
            <div className = "left-right-holder">
                <div className = "left-slideshow">
                    <div className = "left-slideshow-img" style = {{ backgroundImage: `url(${eachLetter.image_list[activeImage]})`}}>                                                           
                        <div className = "button-left-ss">
                            <button type = "button" className = "wax-arrow" aria-label = "Previous photo" onClick = {() => goToPrev()}>
                                <svg viewBox = "0 0 24 24" aria-hidden = "true"><path d = "M14.5 6 Q9 12 14.5 18" /></svg>
                            </button>
                        </div>
                        <div className = "button-right-ss">
                            <button type = "button" className = "wax-arrow" aria-label = "Next photo" onClick = {() => goToNext()}>
                                <svg viewBox = "0 0 24 24" aria-hidden = "true"><path d = "M9.5 6 Q15 12 9.5 18" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className = "right-desc-suit">
                    <div className = "title-desc-suit">
                        <h1>{eachLetter.title}</h1>
                        <p>{eachLetter.description}</p>
                    </div>
                <div className = "price-and-buttons">
                    <h3>{isPurchasable ? formatPrice(eachLetter.key) : 'Price coming soon'}</h3>
                    <div className = "buttons-div-top">
                        <div className = "quantity-button">
                            <h4 onClick = {() => setCurrentQuantity((currentQuantity) => currentQuantity > 1 ? currentQuantity - 1 : 1)}>-</h4>
                            <h4>{currentQuantity}</h4>
                            <h4 onClick = {() => {
                                    if (currentQuantity >= MAX_QUANTITY) notify(`You can order up to ${MAX_QUANTITY} of each piece.`);
                                    else setCurrentQuantity(currentQuantity + 1);
                                }}>+</h4>
                        </div>
                        <div className = "sizing-button" ref = {sizingButtonRef}>
                            <div className = "dropdown-select-button" onClick = {() => setDropdownVisibility(currentVisibility => !currentVisibility)}>
                                <h4>Size:</h4>
                                <h4>{sizeSelected}</h4>
                                <h4>{dropdownVisibility ? "▲" : "▼"}</h4>
                            </div>
                            <div className = "dropdown-options-div" style={{ display: dropdownVisibility === false ? 'none' : 'block' }}>
                                <ul className = "dropdown-options">
                                    <li className = "each-drop-option" onClick = {() => { setSizeSelected("Small"); setDropdownVisibility(false); }}>Small</li>
                                    <li className = "each-drop-option" onClick = {() => { setSizeSelected("Medium"); setDropdownVisibility(false); }}>Medium</li>
                                    <li className = "each-drop-option" onClick = {() => { setSizeSelected("Large"); setDropdownVisibility(false); }}>Large</li>
                                    <li className = "each-drop-option" onClick = {() => { setSizeSelected("X-Large"); setDropdownVisibility(false); }}>X-Large</li>
                                </ul>
                            </div>
                            </div>
                    </div>
                    <div className = "buttons-div-bottom">
                        <button
                            className = "buy-button"
                            disabled = {!isPurchasable}
                            onClick = {async () => {
                                if (!isPurchasable) return;
                                try {
                                    const cart = await createCartWithLine(eachLetter.variantId, currentQuantity, [{ key: 'Size', value: sizeSelected }]);
                                    if (cart.checkoutUrl) window.location.href = cart.checkoutUrl;
                                } catch (err) {
                                    console.error('Failed to start checkout', err);
                                    notify("Couldn't start checkout. Check your connection and try again.", { tone: 'error' });
                                }
                            }}
                        >
                            Buy Now
                        </button>
                        <button className = "add-button" disabled = {!isPurchasable} onClick = {() => addToCart({...eachLetter, quantity: currentQuantity, size: sizeSelected})}>Add To Cart</button>
                    </div>
                </div>
                </div>
            </div>

            <div className = "others-in-collection-div">
                <div className = "section-header">
                    <img className = "others-header" src = {sameColHeader} />
                </div>
                {/* Fewer than three tiles (Kaifiyat has two) are spaced evenly across the row instead of packing left */}
                <div className = {`others-grid-container${otherDesigns.length < 3 ? ' others-grid-spread' : ''}`}>
                    {otherDesigns.map((design) => {
                        const assets = collectionAssetsFor(design);
                        return (
                            <Link
                                to = {`/product/${collection}/${design.id}`}
                                className = "ind-dress-stamp"
                                key = {design.title}
                            >
                                <div
                                    className = {`ind-dress-envelope${assets.anchorBottom ? ' ind-dress-envelope-bottom' : ''}`}
                                    style = {{
                                        backgroundImage: `url(${assets.envelope})`,
                                        width: `calc(${assets.width} * var(--u))`,
                                        transform: `translateY(calc(${assets.offsetY} * var(--u)))`,
                                    }}
                                >
                                    <img className = {`image-dress${assets.isPolaroid ? ' image-dress-polaroid' : ''}`} src = {assets.picture} alt = {design.title} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}