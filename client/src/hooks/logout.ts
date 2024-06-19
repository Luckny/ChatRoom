import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './auth';
import { defaultAuthState } from '../utils';

export default function useLogout() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('http://localhost:8080/logout/google', {
        withCredentials: true,
      });

      // remove user from storage
      localStorage.removeItem('user');
      localStorage.removeItem('chatId');
      dispatch({ type: 'LOGOUT', payload: defaultAuthState });
      navigate('/');
    } catch (e) {
      // TODO: handle
      // eslint-disable-next-line no-console
      console.log('Error logging out');
    }
  };

  return { logout };
}
