// Redux/FileActions/fileReducer.js

const initialState = {
  files: JSON.parse(localStorage.getItem('files')) || [],
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FILES':
      const newFiles = [...state.files, ...action.payload];
      localStorage.setItem('files', JSON.stringify(newFiles));
      return {
        ...state,
        files: newFiles,
      };
    case 'DELETE_FILE':
      const updatedFiles = state.files.filter((_, index) => index !== action.payload);
      localStorage.setItem('files', JSON.stringify(updatedFiles));
      return {
        ...state,
        files: updatedFiles,
      };
    default:
      return state;
  }
};

export default fileReducer;
