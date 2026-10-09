import kamaliaEnvelope from '../resources/pehla_khat/kamalia_khaddar_envelope.webp';
import KamaliaImageOne from '../resources/pehla_khat/kamalia_image_one.webp';
import KamaliaImageTwo from '../resources/pehla_khat/kamalia_image_two.webp';

import DoriaEnvelope from '../resources/pehla_khat/doria_cotton_envelope.webp';
import DoriaImageOne from '../resources/pehla_khat/doria_coord_image_one.webp';
import DoriaImageTwo from '../resources/pehla_khat/doria_coord_image_two.webp';

import irishCottonEnvelope from '../resources/pehla_khat/irish_cotton_envelope.webp';
import irishCottonImageOne from '../resources/pehla_khat/irish_cotton_image_one.webp';
import irishCottonImageTwo from '../resources/pehla_khat/irish_cotton_image_two.webp';

import doriaLongEnvelope from '../resources/pehla_khat/doria_cotton_long_envelope.webp';
import doriaLongOne from '../resources/pehla_khat/doria_cotton_long_one.webp';
import doriaLongTwo from '../resources/pehla_khat/doria_cotton_long_two.webp';

import { useState } from "react";
import { Link } from 'react-router-dom';
import paperBackground from '../resources/pehla_khat/envelope-background.webp';
import { useCart } from './CartContext';
import './EnvelopeAndPaper.css';

export default function EnvelopeAndPaper({ id }) {

    const { getPrice } = useCart();

    const envelopeDesc = [
        {id: 0, envClassName: "kamaliaEnvelope", paperClassName: "kamaliaPaper", envelopeImage: kamaliaEnvelope, imgOrder: [{id: 0, imgLeft: KamaliaImageOne}, {id: 1, imgRight: KamaliaImageTwo}], heading: "Kamalia Khaddar Set", subHeading: "Where tradition finds a new form"},
        {id: 1, envClassName: "doriaEnvelope", paperClassName: "doriaPaper", envelopeImage: DoriaEnvelope, imgOrder: [{id: 2, imgLeft: DoriaImageOne}, {id: 3, imgRight: DoriaImageTwo}], heading: "Doria Cotton Co-Ord Set", subHeading: "A story written in comfort"},
        {id: 2, envClassName: "irishCottonEnvelope", paperClassName: "irishCottonPaper", envelopeImage: irishCottonEnvelope, imgOrder: [{id: 4, imgLeft: irishCottonImageOne}, {id: 5, imgRight: irishCottonImageTwo}], heading: "Irish Cotton Set", subHeading: "Light, effortless, and made for summer."},
        {id: 3, envClassName: "doriaLongEnvelope", paperClassName: "doriaLongPaper", envelopeImage: doriaLongEnvelope, imgOrder: [{id: 6, imgLeft: doriaLongOne}, {id: 7, imgRight: doriaLongTwo}],  heading: "Doria Cotton Long Shirt Set", subHeading: "A timeless story, reimagined"},
    ];
    const [currentId, setCurrentId] = useState(0);

    return (
        <>
        {
            envelopeDesc.map((eachLetter) => {
                if (eachLetter.id === id) {
                    const idOnLeft = eachLetter.imgOrder[0].id;
                    const idOnRight = eachLetter.imgOrder[1].id;
                return (
                    <div className = "sub-section-one">
                        <div className = {`envelope-bg-div ${eachLetter.envClassName}`} style = {{ backgroundImage: `url(${eachLetter.envelopeImage})`, "--env-top": `calc(${eachLetter.id * 800} * var(--u))` }}>
                            <Link to = {`/product/pehla-khat/${idOnLeft}`} className = "img-on-env kamalia-one"><img src = {eachLetter.imgOrder[0].imgLeft} /></Link>
                            <Link to = {`/product/pehla-khat/${idOnRight}`} className = "img-on-env kamalia-two"><img src = {eachLetter.imgOrder[1].imgRight} /></Link>
                        </div>
                        <div className = {`paper-bg-div ${eachLetter.paperClassName}`} style = {{ backgroundImage: `url(${paperBackground})`, "--base-top": `calc(${(eachLetter.id * 800) + 300} * var(--u))` }}>
                            <div className = "paper-bg-left">
                                <h1>{eachLetter.heading}</h1>
                                <h3>{eachLetter.subHeading}</h3>
                            </div>
                            <div className = "paper-bg-right">
                                <h2>PKR {getPrice(idOnLeft)}</h2>
                            </div>
                        </div>
                    </div>
                    )
                }
            })
        }
        </>
    )
}