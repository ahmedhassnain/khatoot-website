import './Product.css'
import sameColHeader from '../resources/item_highlight/same_col_header.png';
import kamaliaEnvelope from '../resources/item_highlight/kamalia_khaddar_ioc.png';
import kamaliaPicture from '../resources/item_highlight/kamalia_image_one_letter.png';
import doriaCoordEnvelope from '../resources/item_highlight/dc_coord_ioc.png';
import doriaCoordPicture from '../resources/item_highlight/doria_cotton_picture.png';
import irishCottonEnvelope from '../resources/item_highlight/irish_cotton_plazo_ioc.png';
import irishCottonPicture from '../resources/item_highlight/irish_cotton_palazzo_picture.png';
import doriaLongEnvelope from '../resources/item_highlight/dc_long_ioc.png';
import doriaLongPicture from '../resources/item_highlight/doria_cotton_long_shirt_picture.png';
import pehlaKhatDetails from './PehlaKhatDetails.js';
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { createCartWithLine } from './shopify';

// Envelope + picture pair shown per design in the "same collection" section below.
const collectionAssets = {
    "Kamalia Khaddar Piece": { envelope: kamaliaEnvelope, picture: kamaliaPicture, width: 390, offsetY: 15 },
    "Doria Cotton Co-Ord Piece": { envelope: doriaCoordEnvelope, picture: doriaCoordPicture, width: 400, offsetY: 0 },
    "Irish Cotton Piece": { envelope: irishCottonEnvelope, picture: irishCottonPicture, width: 420, offsetY: 0 },
    "Doria Cotton Long Piece": { envelope: doriaLongEnvelope, picture: doriaLongPicture, width: 416, offsetY: 0 },
};


export default function Product() {

    const { addToCart, getPrice } = useCart();

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
    const { id } = useParams();

    // Every other design (not this one), earliest-added first, capped at 3.
    const currentTitle = pehlaKhatDetails[id]?.title;
    const otherDesigns = [...new Set(pehlaKhatDetails.map((product) => product.title))]
        .filter((title) => title !== currentTitle)
        .slice(0, 3)
        .map((title) => pehlaKhatDetails.find((product) => product.title === title));

   function goToPrev() {
        setActiveImage(activeImage === 0 ? pehlaKhatDetails[id].image_list.length - 1 : activeImage - 1);
    }

    function goToNext() {
        setActiveImage(activeImage === pehlaKhatDetails[id].image_list.length - 1 ? 0 : activeImage + 1);
    }
    
     console.log(currentQuantity)

    return (
            pehlaKhatDetails.map((eachLetter) => 
            {
                if (eachLetter.id === Number(id))
                return (
                    <section className = "product-container">
                        <div className = "left-right-holder">
                            <div className = "left-slideshow">
                                <div className = "left-slideshow-img" style = {{ backgroundImage: `url(${pehlaKhatDetails[id].image_list[activeImage]})`}}>                                                           
                                    <div className = "button-left-ss">
                                        <button onClick = {() => goToPrev() } >◀</button>
                                    </div>
                                    <div className = "button-right-ss">
                                        <button onClick = {() => goToNext() }>▶︎</button>
                                    </div>
                                </div>
                            </div>
                            <div className = "right-desc-suit">
                                <div className = "title-desc-suit">
                                    <h1>{eachLetter.title}</h1>
                                    <p>{eachLetter.description}</p>
                                </div>
                            <div className = "price-and-buttons">
                                <h3>PKR {getPrice(Number(id))}</h3>
                                <div className = "buttons-div-top">
                                    <div className = "quantity-button">
                                        <h4 onClick = {() => setCurrentQuantity((currentQuantity) => currentQuantity > 1 ? currentQuantity - 1 : 1)}>-</h4>
                                        <h4>{currentQuantity}</h4>
                                        <h4 onClick = {() => setCurrentQuantity((currentQuantity) => currentQuantity < 4 ? currentQuantity + 1 : 4)}>+</h4>
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
                                        onClick = {async () => {
                                            if (!eachLetter.variantId) {
                                                console.error(`No Shopify variantId set for "${eachLetter.title}" (${eachLetter.color}) in PehlaKhatDetails.js`);
                                                return;
                                            }
                                            try {
                                                const cart = await createCartWithLine(eachLetter.variantId, currentQuantity, [{ key: 'Size', value: sizeSelected }]);
                                                if (cart.checkoutUrl) window.location.href = cart.checkoutUrl;
                                            } catch (err) {
                                                console.error('Failed to start checkout', err);
                                            }
                                        }}
                                    >
                                        Buy Now
                                    </button>
                                    <button className = "add-button" onClick = {() => addToCart({...eachLetter, quantity: currentQuantity, size: sizeSelected})}>Add To Cart</button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className = "others-in-collection-div">
                            <div className = "section-header">
                                <img className = "others-header" src = {sameColHeader} />
                            </div>
                            <div className = "others-grid-container">
                                {otherDesigns.map((design) => {
                                    const assets = collectionAssets[design.title];
                                    return (
                                        <Link
                                            to = {`/product/pehla-khat/${design.id}`}
                                            className = "ind-dress-stamp"
                                            key = {design.title}
                                        >
                                            <div
                                                className = "ind-dress-envelope"
                                                style = {{
                                                    backgroundImage: `url(${assets.envelope})`,
                                                    width: `calc(${assets.width} * var(--u))`,
                                                    transform: `translateY(calc(${assets.offsetY} * var(--u)))`,
                                                }}
                                            >
                                                <img className = "image-dress" src = {assets.picture} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )
            
        })
        
    )
}