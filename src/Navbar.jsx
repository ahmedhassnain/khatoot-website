import './Navbar.css';
import khatootLogo from '../resources/khatoot-logo.webp';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import pehlaKhatDetails from './PehlaKhatDetails.js';

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef(null);

    useEffect(() => {
        if (!searchOpen) return;
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchOpen]);

    const query = searchQuery.trim().toLowerCase();
    const searchResults = query === '' ? [] : pehlaKhatDetails.filter((product) =>
        product.title.toLowerCase().includes(query) || product.color.toLowerCase().includes(query)
    );

    function closeSearch() {
        setSearchOpen(false);
        setSearchQuery('');
    }

    return (
            <header>
              <nav>
                <ul className = "navbar-container">
                  <div className = "left-div">
                    <li><Link to = "/" className = "nav-link launch-nav-link">Pehla Khat</Link></li>
                    <li className = "search-item" ref = {searchRef}>
                        <span
                            className = "nav-link search-nav-link"
                            onClick = {() => setSearchOpen((open) => !open)}
                        >
                            Search
                        </span>
                        {searchOpen && (
                            <div className = "search-panel">
                                <input
                                    type = "text"
                                    autoFocus
                                    className = "search-input"
                                    placeholder = "Search for your piece..."
                                    value = {searchQuery}
                                    onChange = {(e) => setSearchQuery(e.target.value)}
                                />
                                {query !== '' && (
                                    <ul className = "search-results">
                                        {searchResults.length === 0 ? (
                                            <li className = "search-no-results">No matches found.</li>
                                        ) : (
                                            searchResults.map((product) => (
                                                <li key = {product.id} className = "search-result">
                                                    <Link to = {`/product/pehla-khat/${product.id}`} onClick = {closeSearch}>
                                                        {product.title} ({product.color})
                                                    </Link>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                            </div>
                        )}
                    </li>
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