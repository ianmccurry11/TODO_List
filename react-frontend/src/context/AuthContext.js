import {
  createContext, useReducer, useMemo, useEffect,
} from 'react';

const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('user_id', action.payload.user_id);
      return {
        user: action.payload.user,
        user_id: action.payload.id,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        user: null,
        username: null,
        user_id: null,
      };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  useEffect(() => {
    const user = {
      user: localStorage.getItem('user'),
      user_id: localStorage.getItem('user_id'),
    };
    if (user && user.user && user.user_id) {
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);
  const authContextValue = useMemo(() => ({
    user: state.user,
    user_id: state.user_id,
    dispatch,
  }), [state.user, state.user_id, dispatch]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
