import NotFound from "../components/NotFound";
import { Route } from "./typing";

export const fallbackRoutes: Route[] = [
  {
    path: '*',
    element: <NotFound />
  }
]
