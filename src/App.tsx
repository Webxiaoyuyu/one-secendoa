import React from 'react';
import Layout from '@/views/Layout';
import RouterConfig from '@/router';
import { BrowserRouter } from 'react-router-dom';
import Auth from '@/auth/Auth';

function App() {
  return (
    <div>
      {localStorage.getItem('token') ? (
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Auth>
            <RouterConfig />
          </Auth>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
