import { useContext } from 'react';
import { SocketContext } from './SocketContext';

export default function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw Error('useSocketContext must be used inside SocketContextProvider');
  }

  return context;
}
