import NotFound from '../components/NotFound';
import { Route } from './typing';

const fallbackRoutes: Route[] = [
  {
    path: '*',
    element: <NotFound />,
  },
];

export default fallbackRoutes;
