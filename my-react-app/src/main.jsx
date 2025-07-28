// Main entry point for the React application
// This file bootstraps the app and renders it into the DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Create the root element and render the app with React Strict Mode
// Strict Mode helps catch potential problems during development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);