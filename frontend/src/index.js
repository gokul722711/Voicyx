// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Default styles
import App from './App'; // Import the App component
import reportWebVitals from './reportWebVitals'; // For performance monitoring
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
