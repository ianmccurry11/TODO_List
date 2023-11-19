import axios from 'axios';
import { useState, useContext } from 'react';
import useAuthContext from '../context/AuthContext';

const Registration = () => {
  const authContext = useContext(useAuthContext);
  const { dispatch } = authContext;
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') { setUser({ username: user.username, password: value }); } else setUser({ username: value, password: user.password });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/register', user);
      // Handle success
    } catch (error) {
      console.log(error);
    }
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
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Re-enter Password
          <input
            type="password"
            name="password"
            id="password"
          />
        </label>
        <input type="button" value="Submit" onClick={submitForm} />
      </form>
    </>
  );
};
export default Registration;
