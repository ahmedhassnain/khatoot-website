import letterOne from '../resources/stamp_landing/letter_one.webp'
import letterTwo from '../resources/stamp_landing/letter_two.webp'
import letterThree from '../resources/stamp_landing/letter_three.webp'
import stampTop from '../resources/footers-top.webp';
import './Stamp.css';

export default function Stamp() {
    return (
        <section className = "section-stamp">
            <img className = "stamp-top" src = {stampTop} />
            <div className = "stamp-border-div">
                <div className = "letter-container">
                    <img className = "letter letter-three" src = {letterThree} />
                    <img className = "letter letter-two" src = {letterTwo} />
                    <img className = "letter letter-one" src = {letterOne} />
                </div>
            </div>
        </section>
    )
}