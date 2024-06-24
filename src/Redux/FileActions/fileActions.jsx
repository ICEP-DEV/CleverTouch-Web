// fileActions.js
export const ADD_FILES = 'ADD_FILES';
export const DELETE_FILE = 'DELETE_FILE';

export const addFiles = (files) => ({
  type: ADD_FILES,
  payload: files,
});

export const deleteFile = (index) => ({
  type: DELETE_FILE,
  payload: index,
});
