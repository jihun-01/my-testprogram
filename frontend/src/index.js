import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 💡 React 18부터는 createRoot를 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);