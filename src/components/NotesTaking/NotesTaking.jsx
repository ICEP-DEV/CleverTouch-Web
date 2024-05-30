import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNote, loadNotes, editNote, deleteNote } from './actions';
import './NotesTaking.css';
import remove from '../../assets/remove.png';
import edit from '../../assets/edit.png';

const NotesTaker = () => {
  const [title, setTitle] = useState(localStorage.getItem('noteTitle') || '');
  const [note, setNote] = useState(localStorage.getItem('noteContent') || '');
  const [editId, setEditId] = useState(null); // State to track the note being edited
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      dispatch(loadNotes(storedNotes));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('noteTitle', title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem('noteContent', note);
  }, [note]);

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

  const handleEdit = (id, title, content) => {
    setEditId(id);
    setTitle(title);
    setNote(content);
    localStorage.setItem('noteTitle', title);
    localStorage.setItem('noteContent', content);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
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
      <ul>
      {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((n) => (
            <li key={n.id}>
              <span>{n.title}: {n.content}</span>
              <button onClick={() => handleEdit(n.id, n.title, n.content)}>
                <img src={edit} alt="Edit" className="icon" />
              </button>
              <button onClick={() => handleDelete(n.id)}>
                <img src={remove} alt="Delete" className="icon" />
              </button>
            </li>
          ))
        ) : (
          <li>No notes available</li>
        )}
      </ul>
    </div>
  );
};

export default NotesTaker;
