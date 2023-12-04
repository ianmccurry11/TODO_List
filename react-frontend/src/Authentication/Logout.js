import { useState, useContext } from 'react';
import useAuthContext from '../context/AuthContext';

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
    console.log('logout');
    authContext.dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Login;
