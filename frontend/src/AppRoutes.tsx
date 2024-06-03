import { RouteObject, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { fallbackRoutes } from "./routes/fallback";
import { privateRoutes } from "./routes/private";
import { publicRoutes } from "./routes/public";
import { Route } from "./routes/typing";


export function AppRoutes() {
  // Convert each route to a routeObject as required by react-router-dom
  const parseRouteObjects = (routes: Route[], isPrivate: boolean = false): RouteObject[] => {

    return routes.map((route) => ({
      path: route.path,
      // wraps private routes with a protected route component
      element: isPrivate ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element
    }))
  }

  const routes = [
    ...parseRouteObjects(publicRoutes),
    ...parseRouteObjects(privateRoutes, true),
    ...parseRouteObjects(fallbackRoutes),
  ]

  const allRoutes = useRoutes(routes)

  return <>{allRoutes}</>
}

