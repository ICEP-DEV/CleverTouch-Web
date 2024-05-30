// reducer.js
const initialState = {
    screenshots: [],
  };
  
  const screenshotReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_SCREENSHOT':
        return { ...state, screenshots: [...state.screenshots, action.payload] };
      case 'LOAD_SCREENSHOTS':
        return { ...state, screenshots: action.payload };
      default:
        return state;
    }
  };
  
  export default screenshotReducer;
  