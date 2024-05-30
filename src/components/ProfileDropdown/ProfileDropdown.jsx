import React, { useState } from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ user, onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="profile-dropdown">
            <div className="profile-icon" onClick={toggleMenu}>
                {user.initials}
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    <div className="menu-item">Customize</div>
                    <div className="menu-item">Settings</div>
                    <div className="menu-item" onClick={onLogout}>Log out</div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
