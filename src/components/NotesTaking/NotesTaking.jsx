import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNote, editNote } from '../../Redux/NotesActions/actions';
import './NotesTaking.css';

const NotesTaker = () => {
  const [title, setTitle] = useState(localStorage.getItem('noteTitle') || '');
  const [note, setNote] = useState(localStorage.getItem('noteContent') || '');
  const [editId, setEditId] = useState(null); // State to track the note being edited
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSave = () => {
    if (note.trim() !== '') {
      if (editId !== null) {
        dispatch(editNote(editId, {
          title,
          content: note
        }));
        setEditId(null);
      } else {
        dispatch(saveNote({
          id: new Date().getTime(), // Assign a unique ID
          title,
          content: note
        }));
      }
      
      setTitle('');
      setNote('');
      localStorage.removeItem('noteTitle');
      localStorage.removeItem('noteContent');
    } else {
      console.log("Note is empty. Not saving.");
    }
  };

  const handleClear = () => {
    setTitle('');
    setNote('');
    localStorage.removeItem('noteTitle');
    localStorage.removeItem('noteContent');
  };

  return (
    <div className="notes-taker-container">
      <input 
        type="text" 
        value={title} 
        onChange={handleTitleChange} 
        placeholder="Enter title..." 
        className="notes-taker-title-input" 
      />
      <textarea 
        value={note} 
        onChange={handleNoteChange} 
        placeholder="Take notes here..." 
        className="notes-taker-textarea" 
      />
      <button 
        onClick={handleSave} 
        className="notes-taker-save-button"
      >
        {editId !== null ? 'Update' : 'Save'}
      </button>
      <button 
        onClick={handleClear} 
        className="notes-taker-clear-button"
      >
        Clear
      </button>
    </div>
  );
};

export default NotesTaker;
