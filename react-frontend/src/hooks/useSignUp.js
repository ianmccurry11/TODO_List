import { useState } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAuthContext();

  const signup = async (username, password) => {
    setIsLoading(true);
    const response = await axios.post('http://localhost:8000/register', {
      username,
      password,
    });

    const json_response = await response.json();

    if (!response.ok) {
      setError(json_response);
      setIsLoading(false);
    }
    if (response.ok) {
      setError(null);
      setIsLoading(false);
      localStorage.setItem('user', json_response);
      useAuthContext().setUser(json_response);
      dispatch({ type: 'LOGIN', payload: json_response });
    }
  };

  return { signup, isLoading, error };
};

export default useSignUp;
