// src/MyApp.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import App from './App';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';
import useAuthContext from './hooks/useAuthContext';
import AddTask from './Task/addTask';

function MyApp() {
  const { user } = useAuthContext();
  // initialize characters to have empty state
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/tasks" />} />
          <Route path="/registration" element={!user ? <RegistrationForm /> : <Navigate to="/tasks" />} />
          <Route path="/tasks" element={user ? <AddTask /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
