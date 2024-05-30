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
      <div className='navbar'>
        <img src={assets.logo} alt="" className="logo"/>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={showMenu ? "bar open" : "bar"}></div>
          <div className={showMenu ? "bar open" : "bar"}></div>
          <div className={showMenu ? "bar open" : "bar"}></div>
        </div>
        <ul className={showMenu ? "navbar-menu active" : "navbar-menu"}>
            <li className={menu === "home" ? "active" : ""}>
                <Link to="/" onClick={() => setMenu("home")}>Home</Link>
            </li>
            <li className={menu === "about" ? "active" : ""}>
                <Link to="/about" onClick={() => setMenu("about")}>About</Link>
            </li>
        </ul>
        <div className="navbar-right">
          {location.pathname === "/" && !isLoggedIn ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            isLoggedIn && <ProfileDropdown user={user} onLogout={onLogout} />
          )}
        </div>
      </div>
    )
}

export default Navbar;
