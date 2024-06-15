import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/auth/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      {/* TODO: implement layout */}
      {/* <Layout> */}
      <AppRoutes />
      {/* </Layout> */}
    </BrowserRouter>
  </AuthProvider>
);
