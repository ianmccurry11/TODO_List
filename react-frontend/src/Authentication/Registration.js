import axios from 'axios';
import { useState, useContext } from 'react';
import useAuthContext from '../context/AuthContext';
import ButtonAppBar from '../Navbar';

const Registration = () => {
  const authContext = useContext(useAuthContext);
  const { dispatch } = authContext;
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirm_password: '',
  });
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setUser({ username: user.username, password: value });
    } else if (name === 'confirm_password') {
      setUser({ username: user.username, password: user.password, confirm_password: value });
    } else {
      setUser(
        { username: value, password: user.password, confirm_password: user.confirm_password },
      );
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (user.password !== user.confirm_password) {
      setUser({ username: '', password: '', confirm_password: '' });
    } else {
      try {
        await axios.post('http://localhost:8000/register', user);
      // Handle success
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ButtonAppBar />
      <div className="container">
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
          <label htmlFor="confirm_password">
            Re-enter Password
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={user.confirm_password}
              onChange={handleChange}
            />
          </label>
          <input type="button" value="Submit" onClick={submitForm} style={{ color: 'black', backgroundColor: '#1bff80' }} />
        </form>
      </div>

    </>
  );
};
export default Registration;
