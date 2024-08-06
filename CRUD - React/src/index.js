import React from 'react';
import ReactDOM from 'react-dom/client'; // dom basically displays the html elements into the browser 
import './index.css';
import App from './App';

// This file is scene automatically without including it in a <script> tag
// there's a webpack that knows path to the index.html and includes index.js to it automatically
// webpack does alot of things that we'll talk about later

//entry point for whole file
const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot takes an html element with id="root" 
root.render(
  /* <React.StrictMode> */
    <App />
  /* </React.StrictMode> */
);