import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import { ChildrenType } from '../typing';

export default function ProtectedRoute({ children }: ChildrenType) {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log('about to check auth state in protected route');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated, isLoading]);

  return children;
}
