// reducers.js
import { SAVE_SCREENSHOT, LOAD_SCREENSHOT } from '../../actionss';

const initialState = {
  screenshot: null
};

const screenshotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SCREENSHOT:
      return {
        ...state,
        screenshot: action.payload
      };
    case LOAD_SCREENSHOT:
      return {
        ...state,
        screenshot: action.payload
      };
    default:
      return state;
  }
};

export default screenshotReducer;
