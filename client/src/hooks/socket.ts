import { useContext } from 'react';
import { SocketContext } from '../context/websocket/SocketContext';

export default function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw Error('useSocket must be used inside SocketContextProvider');
  }

  return context;
}
