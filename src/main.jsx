import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Global Error Handler to catch top-level errors
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="color: #e11d48; padding: 20px; font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">⚠️ Application Error</h2>
        <p style="font-weight: bold; margin-bottom: 0.5rem;">${event.message}</p>
        <pre style="background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; font-size: 0.875rem;">${event.filename}: ${event.lineno}:${event.colno}</pre>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #0f172a; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Rejection:', event.reason);
});

console.log('ProLog: Script loaded');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );
  console.log('ProLog: App rendered');
} catch (error) {
  console.error('ProLog: Failed to mount app', error);
  document.body.innerHTML += `<div style="color:red; padding:20px;"><h1>App Crash</h1><p>${error.message}</p></div>`;
}
