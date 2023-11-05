import axios from 'axios';
import React, { useState } from 'react';
import useSignUp from '../hooks/useSignUp';

function Registration() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') { setUser({ username: user.username, password: value }); } else setUser({ username: value, password: user.password });
  };

  const submitForm = () => {
    console.log(user);
    alert(`You are submitting ${user.username} ${user.password}`);
    setUser({ username: '', password: '' });
    // axios
    //   .post('http://localhost:8000/register', user)
    //   .then((result) => {
    //     console.log(result);
    //     setRegister(true);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    useSignUp(user.username, user.password);
  };

  return (
    <>
      <h1>Register</h1>
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
export default Registration;
