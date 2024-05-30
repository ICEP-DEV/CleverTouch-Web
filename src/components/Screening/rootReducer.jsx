// rootReducer.js
import { combineReducers } from 'redux';
import screenshotReducer from './ScreenshotReducer';

// import other reducers here if you have any

const rootReducer = combineReducers({
  screenshot: screenshotReducer,
  // other reducers go here
});

export default rootReducer;