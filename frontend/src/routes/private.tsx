import Chat from "../pages/chat";
import { Route } from "./typing";



// Routes that require user auth
export const privateRoutes: Route[] = [
  {
    path: '/chat',
    element: <Chat />
  }
]
