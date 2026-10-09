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

    // Phone menu: the four nav options drop down from the hamburger
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuSearchOpen, setMenuSearchOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return;
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        }
        function handleEscape(e) {
            if (e.key === 'Escape') closeMenu();
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    function closeMenu() {
        setMenuOpen(false);
        setMenuSearchOpen(false);
        setSearchQuery('');
    }

    function renderSearchResults() {
        if (query === '') return null;
        return (
            <ul className = "search-results">
                {searchResults.length === 0 ? (
                    <li className = "search-no-results">No matches found.</li>
                ) : (
                    searchResults.map((product) => (
                        <li key = {product.id} className = "search-result">
                            <Link to = {`/product/pehla-khat/${product.id}`} onClick = {() => { closeSearch(); closeMenu(); }}>
                                {product.title} ({product.color})
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        );
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
                                {renderSearchResults()}
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

                <div className = "mobile-menu" ref = {menuRef}>
                    <button
                        type = "button"
                        className = {`hamburger${menuOpen ? ' is-open' : ''}`}
                        aria-label = {menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded = {menuOpen}
                        aria-controls = "mobile-menu-panel"
                        onClick = {() => (menuOpen ? closeMenu() : setMenuOpen(true))}
                    >
                        {/* Three hand-drawn strokes, roughened and bled by the filter to match Malevice Ink */}
                        <svg className = "hamburger-icon" viewBox = "0 0 40 32" aria-hidden = "true">
                            <defs>
                                <filter id = "ink-bleed" x = "-25%" y = "-50%" width = "150%" height = "200%">
                                    <feTurbulence type = "fractalNoise" baseFrequency = "0.38" numOctaves = "2" seed = "7" result = "noise" />
                                    <feDisplacementMap in = "SourceGraphic" in2 = "noise" scale = "2" xChannelSelector = "R" yChannelSelector = "G" result = "rough" />
                                    <feGaussianBlur in = "rough" stdDeviation = "0.7" result = "bled" />
                                    <feComponentTransfer in = "bled">
                                        <feFuncA type = "table" tableValues = "0 0 0 1 1 1" />
                                    </feComponentTransfer>
                                </filter>
                            </defs>
                            <g filter = "url(#ink-bleed)">
                                <path className = "hamburger-line line-top" d = "M5 8.5 Q13 7.4 21 8.2 T35.5 7.6" />
                                <path className = "hamburger-line line-middle" d = "M6.5 16.4 Q15 15.6 23 16.3 T33 15.9" />
                                <path className = "hamburger-line line-bottom" d = "M5.5 24.2 Q14 23.5 22 24.4 T34.5 23.8" />
                            </g>
                        </svg>
                    </button>

                    {menuOpen && (
                        <div id = "mobile-menu-panel" className = "mobile-menu-panel">
                            <ul className = "mobile-menu-list">
                                <li><Link to = "/" className = "nav-link" onClick = {closeMenu}>Pehla Khat</Link></li>
                                <li>
                                    <button
                                        type = "button"
                                        className = "nav-link mobile-search-toggle"
                                        aria-expanded = {menuSearchOpen}
                                        onClick = {() => setMenuSearchOpen((open) => !open)}
                                    >
                                        Search
                                    </button>
                                    {menuSearchOpen && (
                                        <div className = "mobile-search">
                                            <input
                                                type = "text"
                                                autoFocus
                                                className = "search-input"
                                                placeholder = "Search for your piece..."
                                                value = {searchQuery}
                                                onChange = {(e) => setSearchQuery(e.target.value)}
                                            />
                                            {renderSearchResults()}
                                        </div>
                                    )}
                                </li>
                                <li><Link to = "/about" className = "nav-link" onClick = {closeMenu}>About</Link></li>
                                <li><Link to = "/cart" className = "nav-link" onClick = {closeMenu}>Cart</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
              </nav>
            </header>
    )
}