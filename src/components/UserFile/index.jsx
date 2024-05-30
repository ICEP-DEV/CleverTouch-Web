// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ScreenshotProvider } from './ScreenshotContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScreenshotProvider>
        <App />
      </ScreenshotProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
