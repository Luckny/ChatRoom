import axios from 'axios';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { AuthType, ChildrenType, User } from '../../typing';

const unauthenticatedUser: User = {
  email: '',
  picture: '',
};
// unauthenticated user state
const initialAuth: AuthType = {
  user: unauthenticatedUser,
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
        user: {
          email: action.payload.user.email,
          picture: action.payload.user.picture,
        },
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
    const user = localStorage.getItem('user');

    if (user) {
      console.log(JSON.parse(user));
      // no need to hit the server
      dispatch({
        type: actions.LOGIN,
        payload: { user: JSON.parse(user) },
      });
    } else {
      // get the user information from the endpoint
      try {
        const { data } = await axios.get('http://localhost:8080/user', {
          withCredentials: true,
        });

        const userData: User = {
          email: data.Email,
          picture: data.Picture,
        };
        // Persist in localstorage
        localStorage.setItem('user', JSON.stringify(userData));
        // dispatch initial authenticatd state
        dispatch({
          type: actions.LOGIN,
          payload: { user: userData },
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
