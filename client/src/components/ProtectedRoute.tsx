import { ChildrenType } from '../typing';
// import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: ChildrenType) {
  // TODO: implement  const [isLoggedIn] =
  // const { pathname } = useLocation();

  // if (!isLoggedIn && pathname) {
  //   return <Navigate to={`/login?from=${pathname}`} />;
  // }

  return children;
}
