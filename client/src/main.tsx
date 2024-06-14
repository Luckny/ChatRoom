import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/websocket/SocketContext';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/auth/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <SocketProvider>
        {/* TODO: implement layout */}
        {/* <Layout> */}
        <AppRoutes />
        {/* </Layout> */}
      </SocketProvider>
    </BrowserRouter>
  </AuthProvider>
);
