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
      };
    case 'LOGOUT':
      return {
        user: null,
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
