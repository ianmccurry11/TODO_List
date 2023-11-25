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
import ResponsiveAppBar from './Navbar';
import RegistrationForm from './Authentication/Registration';
import useAuthContext from './hooks/useAuthContext';
import AddTask from './Task/addTask';
import ListTasks from './Task/listTasks';
import HomePage from './Home';

function MyApp() {
  const { user } = useAuthContext();
  // initialize characters to have empty state
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/tasks" />} />
        <Route path="/registration" element={!user ? <RegistrationForm /> : <Navigate to="/tasks" />} />
        <Route path="/tasks" element={user ? <AddTask /> : <Navigate to="/" />} />
        <Route path="/display-tasks" element={<ListTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyApp;
