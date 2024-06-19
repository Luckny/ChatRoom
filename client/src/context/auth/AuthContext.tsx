import axios from 'axios';
import {
  Dispatch,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  AuthActionType,
  AuthContextType,
  AuthType,
  ChildrenType,
  User,
} from '../../typing';

import { defaultAuthState, defaultUser } from '../../utils';

const noOpDispatch: Dispatch<AuthActionType> = () => {};

export const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  isLoading: true,
  dispatch: noOpDispatch,
});

// available dispatch actions
const actions = {
  LOGIN: 'lOGIN',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state: AuthType, action: AuthActionType): AuthType => {
  switch (action.type) {
    case actions.LOGIN:
      return action.payload;

    case actions.LOGOUT:
      return {
        user: defaultUser,
        isAuthenticated: false,
        error: undefined,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }: ChildrenType) {
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initiateAuthState = useCallback(async () => {
    const user = localStorage.getItem('user');

    if (user) {
      // no need to hit the server
      dispatch({
        type: actions.LOGIN,
        payload: {
          user: JSON.parse(user),
          isAuthenticated: true,
          error: undefined,
        },
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
          payload: {
            user: userData,
            isAuthenticated: true,
            error: undefined,
          },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error getting user data.');
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
      dispatch,
    };
  }, [authState, isLoading, dispatch]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
