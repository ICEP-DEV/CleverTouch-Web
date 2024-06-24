import React from 'react';
import Screening from '../../components/Screening/Screening';


import Popup from '../../components/Popup/Popup'; // Adjust the path relative to Present.jsx

import './Present.css';

const Present = () => {
  return (
    <div className="present-container">
      <h2 className="present-title"></h2>
      <div className="present-content">
        <Screening />
        
        <Popup />
      </div>
    </div>
  );
}

export default Present;