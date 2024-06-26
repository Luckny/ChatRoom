import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useauth must be used inside auth context provider.');
  }

  return context;
}

export const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);
};
