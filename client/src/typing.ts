import { Dispatch, ReactNode } from 'react';

export type User = {
  email: string;
  picture: string;
};

export type AuthType = {
  user: User;
  isAuthenticated: boolean;
  error?: string;
};

export type AuthActionType = {
  type: string;
  payload: AuthType;
};

export type AuthContextType = AuthType & {
  isLoading: boolean;
  dispatch: Dispatch<AuthActionType>;
};

export type MessageType = {
  id: string;
  message: string;
  when: Date;
  type: 'handshake' | undefined;
};

export type ChildrenType = {
  children: ReactNode;
};

export type LinkType = {
  name: string;
  href: string;
  needsAuth?: boolean;
};

export type Links = {
  [key: string]: LinkType[];
};

export type NavbarPropsType = {
  links: LinkType[];
  handleMenuItemClick: (page: any) => void;
};
