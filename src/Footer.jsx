import kharjiHeader from '../resources/kharji_logo.webp';
import baatniHeader from '../resources/baatni_logo.webp';
import footersTop from '../resources/footers-top.webp';
import { Link } from 'react-router-dom';
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
                            <li><Link to = "/" className = "footer-link">Pehla Khat</Link></li>
                            <li><Link to = "about" className = "footer-link">About Us</Link></li>
                            <li><Link to = "/missing" className = "footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    <div className = "baatni-right-section">
                        <div className = "baatni-title">
                            <img className = "baatni" src = {baatniHeader} />
                        </div>
                        <ul className = "baatni-links">
                            <li><Link to = "/missing" className = "footer-link">Returns</Link></li>
                            <li><Link to = "/missing" className = "footer-link">Shipping</Link></li>
                            <li><Link to = "/missing" className = "footer-link">Privacy Policy</Link></li>
                            <li><Link to = "/missing" className = "footer-link">Terms & Conditions</Link></li>
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