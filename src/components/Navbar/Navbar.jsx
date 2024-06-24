import React, { useState } from "react";
import { useLocation } from "react-router-dom";  // Remove Link from here
import './Navbar.css';
//import { assets } from "../../assets/assets";
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

const Navbar = ({ setShowLogin, isLoggedIn, user, onLogout }) => {
   // const [menu, setMenu] = useState("menu");
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
      <div className='navbar'>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={showMenu ? "bar open" : "bar"}></div>
          <div className={showMenu ? "bar open" : "bar"}></div>
          <div className={showMenu ? "bar open" : "bar"}></div>
        </div>
        
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
