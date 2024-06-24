import React from 'react';
import editIcon from './path/to/editIcon'; // Update with the correct path to the edit icon
import removeIcon from './path/to/removeIcon'; // Update with the correct path to the remove icon

// Define the NotesSection component
const NotesSection = ({ notes, handleEditNote, handleDeleteNote }) => {
  return (
    <div className="notes-section">
      <h2>Notes</h2>
      <ul>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}: {note.content}</span>
              <button onClick={() => handleEditNote(note.id, note.title, note.content)}>
                <img src={editIcon} alt="Edit" className="icon" />
              </button>
              <button onClick={() => handleDeleteNote(note.id)}>
                <img src={removeIcon} alt="Delete" className="icon" />
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

export default NotesSection;
