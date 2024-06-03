import Home from "../pages/home"
import Login from "../pages/login"
import { Route } from "./typing"


// Routes that do not require user auth
export const publicRoutes: Route[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]
