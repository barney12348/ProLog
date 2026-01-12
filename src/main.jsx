import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('ProLog: Script loaded');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('ProLog: App rendered');
} catch (error) {
  console.error('ProLog: Failed to mount app', error);
  document.body.innerHTML += `<div style="color:red; padding:20px;"><h1>App Crash</h1><p>${error.message}</p></div>`;
}
