import axios from 'axios';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { ChildrenType } from '../../typing';

// TODO: move to type file
type AuthType = {
  email: string; // TODO: create user type
  isAuthenticated: boolean;
  error?: string;
};

// unauthenticated user state
const initialAuth: AuthType = {
  email: '',
  isAuthenticated: false,
  error: undefined,
};

export const AuthContext = createContext<AuthType & { isLoading: boolean }>({
  ...initialAuth,
  isLoading: true,
});

// available dispatch actions
const actions = {
  LOGIN: 'lOGIN',
};

const authReducer = (
  state: AuthType,
  action: any /* TODO: type is a string with a payload */
): AuthType => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        email: action.payload.email,
        isAuthenticated: true,
        error: undefined,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }: ChildrenType) {
  const [authState, dispatch] = useReducer(authReducer, initialAuth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initiateAuthState = useCallback(async () => {
    const email = localStorage.getItem('email');

    if (email) {
      // no need to hit the server
      dispatch({
        type: actions.LOGIN,
        payload: { email },
      });
    } else {
      // get the user information from the endpoint
      try {
        const { data } = await axios.get('http://localhost:8080/user', {
          withCredentials: true,
        });

        // Persist in localstorage
        localStorage.setItem('email', data.Email);
        // dispatch initial authenticatd state
        dispatch({
          type: actions.LOGIN,
          payload: { email: data.Email },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error getting data.');
      }
    }

    // stop loading
    setIsLoading(false);
  }, []);

  // Set auth state on render
  useEffect(() => {
    initiateAuthState();
  }, [initiateAuthState]);

  const providerValue = useMemo(() => {
    return {
      ...authState,
      isLoading,
    };
  }, [authState, isLoading]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
