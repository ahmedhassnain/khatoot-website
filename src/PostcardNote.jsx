import { Link } from 'react-router-dom';
import stamp from '../resources/kaifiyat/stamp-textile-mill.png';
import seal from '../resources/khatoot_seal.webp';
import './PostcardNote.css';

// A short note written on the same kraft postcard the cart items use, for places with nothing
// to show yet (an empty cart, a page still being made). The message is handwritten on the left;
// the right half carries postage sealed with the Khatoot wax seal and, on its dashed address
// lines, where to go next.
export default function PostcardNote({ message, signature, prompt, links }) {
    return (
        <div className = "postcard-note">
            <p className = "pn-message">{message}</p>
            <p className = "pn-signature">{signature}</p>

            <img className = "pn-stamp" src = {stamp} alt = "" aria-hidden = "true" />
            <img className = "pn-seal" src = {seal} alt = "" aria-hidden = "true" />

            <p className = "pn-prompt">{prompt}</p>
            <div className = "pn-links" role = "group" aria-label = {prompt}>
                {links.map((link) => (
                    <Link key = {link.to} to = {link.to} className = "pn-link">{link.label}</Link>
                ))}
            </div>
        </div>
    );
}
