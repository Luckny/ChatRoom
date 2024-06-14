/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthType = {
  user: string; // TODO: create user type
  isLoading: Boolean;
  isAuthenticated: Boolean;
  error?: string;
};

const initialAuth: AuthType = {
  user: '',
  isLoading: true,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthType>(initialAuth);

export function AuthProvider({ children }: any) {
  const [isLoading, setLoading] = useState(true);
  console.log('isLoading: ', isLoading);
  // TODO: refactor
  const [authState, setState] = useState({
    user: '',
    isAuthenticated: false,
    error: undefined,
  });
  console.log('Auth State: ', authState);

  const getUser = useCallback(async () => {
    setLoading(true);
    console.log('Getting user');
    // TODO: handle type
    let response: AxiosResponse<any, any>;
    try {
      response = await axios.get('http://localhost:8080/user', {
        withCredentials: true,
      });
      console.log('The get user response: ', response);

      setState(() => ({
        user: 'luckny',
        isAuthenticated: true,
        error: undefined,
      }));
      setLoading(false);
      console.log('Auth State updated: ', authState);
    } catch (e) {
      console.log('There was an error getting the user: ', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const value = useMemo(() => {
    return {
      ...authState,
      isLoading,
    };
  }, [authState, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
