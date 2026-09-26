import kharjiHeader from '../resources/kharji_logo.png';
import baatniHeader from '../resources/baatni_logo.png';
import footersTop from '../resources/footers-top.png';
import './Footer.css'

export default function Footer() {
    return (
        <section>
            <div className = "website-footer">
                <img className = "footers-top" src = {footersTop} />
                <div className = "top-section-footer">
                    <div className = "khaarji-left-section">
                        <div className = "khaarji-title">
                            <img className = "khaarji" src = {kharjiHeader} />
                        </div>
                        <ul className = "khaarji-links">
                            <li>Home</li>
                            <li>Pehla Khat</li>
                            <li>About Us</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div className = "baatni-right-section">
                        <div className = "baatni-title">
                            <img className = "baatni" src = {baatniHeader} />
                        </div>
                        <ul className = "baatni-links">
                            <li>Returns</li>
                            <li>Shipping</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>

                <div className = "bottom-section-footer">
                    <p>© Khatoot, 2026. All Rights Reserved.</p>
                </div>


            </div>
        </section>
    )
}