import axios from 'axios';
import { useState, useContext } from 'react';
import useAuthContext from '../context/AuthContext';
import ButtonAppBar from '../Navbar';

const Login = () => {
  const authContext = useContext(useAuthContext);
  const { dispatch } = authContext;
  const [user, setUser] = useState({
    username: '',
    user_id: '',
    password: '',
  });
  const [register, setRegister] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') { setUser({ username: user.username, password: value }); } else setUser({ username: value, password: user.password, user_id: user.user_id });
  };

  const submitForm = async () => {
    axios
      .post('http://localhost:8000/login', user)
      .then((result) => {
        localStorage.setItem('user', result.data.username);
        localStorage.setItem('id', result.data.id);
        localStorage.setItem('token', result.data.token);
        dispatch({ type: 'LOGIN', payload: { user: result.data.id, token: result.data.token } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ButtonAppBar />
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
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>

        <input type="button" value="Submit" onClick={submitForm} style={{ color: 'black', backgroundColor: '#1bff80' }} />
      </form>
    </>
  );
};
export default Login;
