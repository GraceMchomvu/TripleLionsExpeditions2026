import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminApp from './admin/AdminApp';
import './index.css';

// Simple router based on pathname
const pathname = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (pathname.startsWith('/admin')) {
  root.render(
    <React.StrictMode>
      <AdminApp />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
