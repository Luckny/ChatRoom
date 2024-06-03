import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { SocketProvider } from './context/websocket/SocketContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <SocketProvider>
      {/* TODO: implement layout */}
      {/* <Layout> */}
      <AppRoutes />
      {/* </Layout> */}
    </SocketProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
