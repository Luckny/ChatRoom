import { ChildrenType } from '../typing';
import Navbar from './navbar';

export default function Layout({ children }: ChildrenType) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
