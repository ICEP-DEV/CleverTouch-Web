import React, { useState } from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown}>
        {user.name}
      </button>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li onClick={onLogout}>Logout</li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
