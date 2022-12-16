import React, { Routes } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// eslint-disable-next-line
const routes: Routes = [
  {
    path: 'blog',
  }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
