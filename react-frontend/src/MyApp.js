// src/MyApp.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';
import useAuthContext from './hooks/useAuthContext';
import AddTask from './Task/addTask';
import ListTasks from './Task/listTasks';
import HomePage from './home/Home';
import LifeTimeUserMetrics from './user_metrics/lifetime_user_metrics';

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
        <Route path="/display-tasks" element={user ? <ListTasks /> : <Navigate to="/" />} />
        <Route path="/metrics" element={user ? <LifeTimeUserMetrics /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyApp;
