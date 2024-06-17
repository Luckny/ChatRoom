import { ReactNode } from 'react';

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
