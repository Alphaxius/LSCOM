import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import wl from './Loc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
document.getElementById(wl.h).scrollIntoView(false);
