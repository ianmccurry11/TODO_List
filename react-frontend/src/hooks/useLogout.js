import useAuthContext from '../context/AuthContext';

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  return logout;
};

export default useLogout;
