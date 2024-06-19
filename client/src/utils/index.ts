import { AuthType, User } from '../typing';

// unauthenticated user
export const defaultUser: User = {
  email: '',
  picture: '',
};

// unauthenticated auth state
export const defaultAuthState: AuthType = {
  user: defaultUser,
  isAuthenticated: false,
  error: undefined,
};
