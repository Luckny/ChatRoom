import { ReactNode } from 'react';

export type User = {
  email: string;
  picture: string;
};

export type AuthType = {
  user: User;
  isAuthenticated: boolean;
  error?: string;
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

export type PageType = {
  name: string;
  ref: string;
};

export type NavbarPropsType = {
  pages: PageType[];
  handleMenuItemClick: (page: any) => void;
};
