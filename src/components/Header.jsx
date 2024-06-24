import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import 'bootstrap/dist/css/bootstrap.min.css';
 //import LoginPopup from './LoginPopup/LoginPopup'; // Commented out because it is not used
import ProfileDropdown from "../components/ProfileDropdown/ProfileDropdown"


const Header = ({ setShowLogin, isLoggedIn, user, onLogout }) => {
    const [checked, setChecked] = useState(false);
    const [currState, setCurrState] = useState("Login"); // Commented out because it is not used

    const location = useLocation();

    function changeTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setChecked(true)
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            setChecked(false)
        }
    }

    // const handleSignUp = () => {
    //     // Commented out because it is not used
    // };

    // const loginUser = () => {
    //     // Commented out because it is not used
    // };

    return (
        <div>
            <header id="site-header" className="fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark stroke">
                        <h1>
                            <a className="navbar-brand" href="/">
                                <span className="fa fa-graduation-cap"></span>
                                <img src={assets.logo} alt="" className="logo"/>
                            </a>
                        </h1>

                        <button
                            className="navbar-toggler collapsed bg-gradient"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
                            <span className="navbar-toggler-icon fa icon-close fa-times"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mx-lg-auto">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">
                                        About
                                    </Link>
                                </li>
                              
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link">
                                        Contact
                                    </Link>
                                </li>
                            </ul>

                            <div className="search-right">
                                <a href="#search" title="search">
                                    <span className="fa fa-search" aria-hidden="true"></span>
                                </a>
                                {/* Search popup */}
                                <div id="search" className="pop-overlay">
                                    <div className="popup">
                                        <form action="error.html" method="GET" className="search-box">
                                            <input
                                                type="search"
                                                placeholder="Search"
                                                name="search"
                                                required="required"
                                                autoFocus=""
                                            />
                                            <button type="submit" className="btn">
                                                <span className="fa fa-search" aria-hidden="true"></span>
                                            </button>
                                        </form>
                                    </div>
                                    <a className="close" href="#close">
                                        &times;
                                    </a>
                                </div>
                                {/* /Search popup */}
                            </div>

                            <div className="navbar-right">
                                {location.pathname === "/" && !isLoggedIn ? (
                                    <div className="top-quote mr-lg-2 text-center">
                                        <a  className="btn login mr-2" onClick={() => setShowLogin(true)}>
                                            <span className="fa fa-user"></span>
                                            Sign In
                                        </a>
                                    </div>
                                ) : (
                                    isLoggedIn && <ProfileDropdown user={user} onLogout={onLogout} />
                                )}
                            </div>
                        </div>

                        <div className="mobile-position">
                            <nav className="navigation">
                                <div className="theme-switch-wrapper">
                                    <label className="theme-switch" htmlFor="checkbox">
                                        <input type="checkbox" id="checkbox" checked={checked} onChange={changeTheme} />
                                        <div className="mode-container py-1">
                                            <i className="gg-sun"></i>
                                            <i className="gg-moon"></i>
                                        </div>
                                    </label>
                                </div>
                            </nav>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;
