import { SAVE_NOTE, LOAD_NOTES, EDIT_NOTE, DELETE_NOTE } from './actionTypes';

const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NOTE:
      const updatedNotes = [...state.notes, action.payload];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return {
        ...state,
        notes: updatedNotes,
      };
    case LOAD_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case EDIT_NOTE:
      const editedNotes = state.notes.map(note =>
        note.id === action.payload.id ? { ...note, ...action.payload.updatedNote } : note
      );
      localStorage.setItem('notes', JSON.stringify(editedNotes));
      return {
        ...state,
        notes: editedNotes,
      };
    case DELETE_NOTE:
      const filteredNotes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      return {
        ...state,
        notes: filteredNotes,
      };
    default:
      return state;
  }
};

export default notesReducer;
