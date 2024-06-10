import Chat from '../pages/chat';
import { Route } from './typing';

// Routes that require user auth
const privateRoutes: Route[] = [
  {
    path: '/chat',
    element: <Chat />,
  },
];

export default privateRoutes;
