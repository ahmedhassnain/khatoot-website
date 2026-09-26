import './Navbar.css';
import khatootLogo from '../resources/khatoot-logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
            <header>
              <nav>
                <ul className = "navbar-container">
                  <div className = "left-div">
                    <li><Link className = "nav-link launch-nav-link">Pehla Khat</Link></li>
                    <li><Link className = "nav-link search-nav-link">Search</Link></li>
                  </div>
                  <div className = "center-div">
                    <img className = "khatoot-logo" src= { khatootLogo } />
                  </div>
                  <div className = "right-div">
                    <li><Link to = "/about" className = "nav-link about-nav-link">About</Link></li>
                    <li><Link to = "/cart" className = "nav-link cart-nav-link">Cart</Link></li>
                  </div>
                </ul>
              </nav>
            </header>
    )
}