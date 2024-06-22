import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { StyledEngineProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/auth/AuthContext';
import Layout from './components/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <Layout>
          <AppRoutes />
        </Layout>
      </StyledEngineProvider>
    </BrowserRouter>
  </AuthProvider>
);
