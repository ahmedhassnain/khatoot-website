import './Product.css'
import sameColHeader from '../resources/item_highlight/same_col_header.png';
import stampBorder from '../resources/item_highlight/stamp_border_letter.png';
import envOne from '../resources/item_highlight/dc_coord_ioc.png';
import envTwo from '../resources/item_highlight/irish_cotton_plazo_ioc.png';
import envThree from '../resources/item_highlight/dc_long_ioc.png';
import imgOne from '../resources/item_highlight/doria_cotton_picture.png';
import imgTwo from '../resources/item_highlight/irish_cotton_palazzo_picture.png';
import imgThree from '../resources/item_highlight/doria_cotton_long_shirt_picture.png';
import pehlaKhatDetails from './PehlaKhatDetails.js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';


export default function Product() {

    const { addToCart } = useCart();

    const [activeImage, setActiveImage] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [sizeSelected, setSizeSelected] = useState("Medium");

    const [currentCart, setCurrentCart] = useState(
        [

        ]
    );
    const { id } = useParams(); 

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
                                <h3>PKR 4500</h3>
                                <div className = "buttons-div-top">
                                    <div className = "quantity-button">
                                        <h4 onClick = {() => setCurrentQuantity((currentQuantity) => currentQuantity > 1 ? currentQuantity - 1 : 1)}>-</h4>
                                        <h4>{currentQuantity}</h4>
                                        <h4 onClick = {() => setCurrentQuantity((currentQuantity) => currentQuantity < 4 ? currentQuantity + 1 : 4)}>+</h4>
                                    </div>
                                    <div className = "sizing-button">
                                        <div className = "dropdown-select-button">
                                            <h4>Size:</h4>
                                            <h4>{sizeSelected}</h4>
                                            <h4 onClick = {() => setDropdownVisibility(currentVisibility => !currentVisibility)}>{dropdownVisibility ? "▲" : "▼"}</h4>
                                        </div>
                                        <div className = "dropdown-options-div" style={{ display: dropdownVisibility === false ? 'none' : 'block' }}>
                                            <ul className = "dropdown-options">
                                                <li className = "each-drop-option" onClick = {() => setSizeSelected("Small")}>Small</li>
                                                <li className = "each-drop-option" onClick = {() => setSizeSelected("Medium")}>Medium</li>
                                                <li className = "each-drop-option" onClick = {() => setSizeSelected("Large")}>Large</li>
                                                <li className = "each-drop-option" onClick = {() => setSizeSelected("X-Large")}>X-Large</li>
                                            </ul>
                                        </div>
                                        </div>
                                </div>
                                <div className = "buttons-div-bottom">
                                    <button className = "buy-button">Buy Now</button>
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
                                <div className = "ind-dress-stamp">
                                    <div className = "ind-dress-envelope img-one">
                                        <img className = "image-dress" src = {imgOne} />
                                    </div>
                                </div>
                                <div className = "ind-dress-stamp">
                                    <div className = "ind-dress-envelope img-two">
                                        <img className = "image-dress" src = {imgTwo}/>
                                    </div>
                                </div>
                                <div className = "ind-dress-stamp">
                                    <div className = "ind-dress-envelope img-three">
                                        <img className = "image-dress dress-three" src = {imgThree}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            
        })
        
    )
}