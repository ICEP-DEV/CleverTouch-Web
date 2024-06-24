import { combineReducers, createStore } from 'redux';
import notesReducer from './NotesActions/reducer';
import filesReducer from './FileActions/fileReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  files: filesReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
