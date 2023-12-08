import { useState, useContext } from 'react';
import useAuthContext from '../context/AuthContext';
import '../stylesheets/App.css';

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

  const handleLogout = () => {
    localStorage.clear();
    setUser({ username: '', password: '', user_id: '' });
    authContext.dispatch({ type: 'LOGOUT' });
  };

  return (
    <container>
      <div className="logout-button">
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </container>
  );
};
export default Login;
