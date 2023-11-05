/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, {
  useRef, useState, useEffect, useContext,
} from 'react';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') { setUser({ username: user.username, password: value }); } else setUser({ username: value, password: user.password });
  };

  const submitForm = () => {
    setUser({ username: '', password: '' });
    axios
      .post('http://localhost:8000/login', user)
      .then((result) => {
        setLoggedIn(true);
        console.log(result);
      })
      .catch((error) => {
        setLoggedIn(false);
        setLoginError(true);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    </>
  );
}
export default Login;
