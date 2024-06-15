import { SocketProvider } from '../context/websocket/SocketContext';
import Chat from '../pages/chat';
import { Route } from './typing';

// Routes that require user auth
const privateRoutes: Route[] = [
  {
    path: '/chat',
    element: (
      <SocketProvider>
        <Chat />
      </SocketProvider>
    ),
  },
];

export default privateRoutes;
