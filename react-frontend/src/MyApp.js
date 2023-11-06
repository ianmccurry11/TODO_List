// src/MyApp.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/tasks" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
