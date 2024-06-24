// Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import { assets } from "../../assets/assets";
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

const Navbar = ({ setShowLogin, isLoggedIn, user, onLogout }) => {
    const [menu, setMenu] = useState("menu");
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className="navbar-logo">
                    <img src={assets.logo} alt="CleverTouch Logo" className="logo" />
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={showMenu ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links' onClick={() => setMenu("home")}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/about" className='nav-links' onClick={() => setMenu("about")}>About</Link>
                    </li>
                </ul>
                <div className="navbar-btn">
                    {location.pathname === "/" && !isLoggedIn ? (
                        <button className="btn-primary" onClick={() => setShowLogin(true)}>Sign In</button>
                    ) : (
                        isLoggedIn && <ProfileDropdown user={user} onLogout={onLogout} />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
