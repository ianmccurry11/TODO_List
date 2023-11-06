// src/MyApp.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import App from './App';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';
import useAuthContext from './hooks/useAuthContext';

function MyApp() {
  const { user } = useAuthContext();
  // initialize characters to have empty state
  return (
    <div>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
}

export default MyApp;
