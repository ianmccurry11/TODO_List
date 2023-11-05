// src/index.js
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import MyApp from './MyApp';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';

const container = document.getElementById('root');

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(
  <AuthContextProvider>
    <MyApp />
  </AuthContextProvider>,
);
