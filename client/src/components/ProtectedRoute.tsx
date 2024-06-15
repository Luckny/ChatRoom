import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { ChildrenType } from '../typing';

export default function ProtectedRoute({ children }: ChildrenType) {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isLoading && !isAuthenticated) {
    navigate('/login');
  } else if (isLoading) {
    // TODO: make a loading component
    <div>waiting</div>;
  } else {
    return children;
  }
}
