import stripe from '../resources/footers-top.webp';
import './Stamp.css';

// The airmail stripe that edges the bottom of the navbar. Pages drawn on the letter background
// (and the home page's stamp) carry their own; pages without one get this strip on top.
export default function PageStripe() {
    return <img className = "stamp-top" src = {stripe} alt = "" aria-hidden = "true" />;
}
