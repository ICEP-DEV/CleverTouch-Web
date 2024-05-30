import React, { useState } from 'react';
import './Popup.css';
import NotesTaker from '../NotesTaking/NotesTaking';

import notes from '../../assets/notes.png';
import add from '../../assets/add.png';


const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotesTaker, setShowNotesTaker] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotesTaker = () => {
    setShowNotesTaker(!showNotesTaker);
  };

  return (
    <div>
      <button onClick={togglePopup} className="button">
        <img src={add} alt="Add" className="add-icon" /> {/* Include the 'add' icon inside the button */}
      </button>
      {isOpen && (
        <div>
          <button onClick={toggleNotesTaker} className="button" style={{ backgroundImage: `url(${notes})` }}></button>
          
        </div>
      )}
      {showNotesTaker && <NotesTaker />}
    </div>
  );
};

export default Popup;
