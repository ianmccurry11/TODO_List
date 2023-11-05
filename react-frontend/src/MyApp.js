// src/MyApp.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';
import useAuthContext from './hooks/useAuthContext';

function MyApp() {
  const { user } = useAuthContext();
  // initialize characters to have empty state
  return (
    <>
      <h1>
        Hello,
        {' '}
        {user}
      </h1>
      <RegistrationForm />
      <LoginForm />
      {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
      {/* <Form handleSubmit={updateList} /> */}
    </>
  );
}

export default MyApp;
