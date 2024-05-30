import { SAVE_NOTE, LOAD_NOTES, EDIT_NOTE, DELETE_NOTE } from './actionTypes';

export const saveNote = (note) => ({
  type: SAVE_NOTE,
  payload: note,
});

export const loadNotes = (notes) => ({
  type: LOAD_NOTES,
  payload: notes,
});

export const editNote = (id, updatedNote) => ({
  type: EDIT_NOTE,
  payload: { id, updatedNote },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});
