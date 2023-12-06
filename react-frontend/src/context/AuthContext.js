import {
  createContext, useReducer, useMemo, useEffect,
} from 'react';

const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        username: action.payload.username,
        user_id: action.payload.id,
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
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);
  const authContextValue = useMemo(() => ({
    user: state.user,
    dispatch,
  }), [state.user, dispatch]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
