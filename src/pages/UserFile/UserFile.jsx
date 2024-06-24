import React, { useState, useEffect } from 'react';
import './UserFile.css';
import remove from './assets/remove.png';
import edit from './assets/edit.png';

const UserFile = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [title, setTitle] = useState(localStorage.getItem('noteTitle') || '');
  const [note, setNote] = useState(localStorage.getItem('noteContent') || '');
  const [editId, setEditId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // State for view mode

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedInUser(user);
    }

    const storedFiles = JSON.parse(localStorage.getItem('files')) || [];
    setFiles(storedFiles);

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleFiles = (event) => {
    const selectedFilesArray = Array.from(event.target.files).map((file) => ({
      name: file.name,
      modified: new Date().toLocaleDateString(),
      modifiedBy: loggedInUser || 'User',
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      content: URL.createObjectURL(file),
    }));
    setSelectedFiles(selectedFilesArray);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setSelectedFiles([]);
      document.getElementById('file-input').value = '';
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleView = (file) => {
    setSelectedFile(file);
  };

  const handleClose = () => {
    setSelectedFile(null);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      if (editId !== null) {
        setNotes(notes.map((n) => n.id === editId ? { ...n, title, content: note } : n));
        setEditId(null);
      } else {
        setNotes([...notes, { id: new Date().getTime(), title, content: note, date: new Date().toLocaleDateString() }]);
      }
      setTitle('');
      setNote('');
      localStorage.removeItem('noteTitle');
      localStorage.removeItem('noteContent');
    } else {
      console.log("Note is empty. Not saving.");
    }
  };

  const handleClearNote = () => {
    setTitle('');
    setNote('');
    localStorage.removeItem('noteTitle');
    localStorage.removeItem('noteContent');
  };

  const handleEditNote = (id, title, content) => {
    setEditId(id);
    setTitle(title);
    setNote(content);
    localStorage.setItem('noteTitle', title);
    localStorage.setItem('noteContent', content);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
  };

  return (
    <div className="file-manager">
      <header>
        <h1>My Files</h1>
        <input 
          type="file" 
          id="file-input" 
          multiple 
          onChange={handleFiles} 
        />
        <button 
          onClick={handleUpload} 
          style={{ 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            cursor: 'pointer', 
            borderRadius: '3px', 
            marginLeft: '10px' 
          }}
        >
          Upload
        </button>

        <input 
          type="text" 
          placeholder="Search files..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-bar"
        />
      </header>

      {showSuccessMessage && (
        <div className="success-message">
          File(s) uploaded successfully!
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Modified</th>
            <th>Modified By</th>
            <th>File Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file, index) => (
            <tr key={index}>
              <td onClick={() => handleView(file)}>
                {file.type === 'image' ? (
                  <span role="img" aria-label="image">🖼️</span>
                ) : (
                  <span role="img" aria-label="file">📄</span>
                )}
                {file.name}
              </td>
              <td>{file.modified}</td>
              <td>{file.modifiedBy}</td>
              <td>{file.size}</td>
              <td>
                <button onClick={() => handleDeleteFile(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFile && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleClose}>&times;</span>
            {selectedFile.type === 'image' ? (
              <img src={selectedFile.content} alt={selectedFile.name} className="large-image" />
            ) : (
              <p>{selectedFile.name}</p>
            )}
          </div>
        </div>
      )}

      <div className="notes-section">
        <h2>My Notes</h2>
        <div className="note-input">
          <input
            type="text"
            placeholder="Type to add a note..."
            value={note}
            onChange={handleNoteChange}
            maxLength="200"
          />
          <div>
            <span>{200 - note.length} Remaining</span>
            <button onClick={handleSaveNote}>Save</button>
          </div>
        </div>
        <div className="view-toggle">
          <button onClick={toggleViewMode}>
            {viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'}
          </button>
        </div>
        <div className={`notes-list ${viewMode}`}>
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((n) => (
              <div key={n.id} className="note-card">
                <p>{n.title ? n.title : 'No Title'}</p>
                {viewMode === 'grid' && <p>{n.content}</p>}
                {viewMode === 'grid' && <p className="note-date">{n.date}</p>}
                <button onClick={() => handleEditNote(n.id, n.title, n.content)}>
                  <img src={edit} alt="Edit" className="icon" />
                </button>
                <button onClick={() => handleDeleteNote(n.id)}>
                  <img src={remove} alt="Delete" className="icon" />
                </button>
              </div>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFile;
