// src/MyApp.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';
import { AuthContextProvider } from './context/AuthContext';

function MyApp() {
  // initialize characters to have empty state
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <RegistrationForm />
        <LoginForm />
        {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
        {/* <Form handleSubmit={updateList} /> */}
      </AuthContextProvider>
    </React.StrictMode>
  );
}

export default MyApp;
