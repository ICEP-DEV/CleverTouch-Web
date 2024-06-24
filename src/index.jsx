import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import store from './components/NotesTaking/store';
import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
