// src/MyApp.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import LoginForm from './Authentication/Login';
import RegistrationForm from './Authentication/Registration';

function MyApp() {
  // initialize characters to have empty state
  const [characters, setCharacters] = useState([]);

  // function removeOneCharacter(index) {
  //   const id = characters[index]._id;
  //   makeDeleteCallCharacter(id).then((result) => {
  //     console.log(result);
  //     if (result.status === 204) {
  //       const updated = characters.filter((character, i) => i !== index);
  //       console.log(updated);
  //       setCharacters(updated);
  //     }
  //   });
  // }

  // async function makeDeleteCallCharacter(index) {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8000/users/${index}`,
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // // src/MyApp.js (a new function inside the MyApp function)
  // function updateList(person) {
  //   makePostCall(person).then((result) => {
  //     if (result && result.status === 201 && result.data) {
  //       const new_person = result.data;
  //       setCharacters([...characters, new_person]);
  //     }
  //     console.log(result.data);
  //   });
  // }

  // async function fetchAll() {
  //   try {
  //     const response = await axios.get('http://localhost:8000/users');
  //     return response.data.users_list;
  //   } catch (error) {
  //     // We're not handling errors. Just logging into the console.
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function makePostCall(person) {
  //   try {
  //     const response = await axios.post('http://localhost:8000/users', person);
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // useEffect(() => {
  //   fetchAll().then((result) => {
  //     if (result) setCharacters(result);
  //   });
  // }, []);

  return (
    <div className="container">
      <RegistrationForm />
      <LoginForm />
      {/* <Table characterData={characters} removeCharacter={removeOneCharacter} /> */}
      {/* <Form handleSubmit={updateList} /> */}
    </div>
  );
}

export default MyApp;
