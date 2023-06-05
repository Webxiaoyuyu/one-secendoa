/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Layout from '@/views/Layout';
import RouterConfig from '@/router';
import { useLocation } from 'react-router-dom';
import Auth from '@/auth/Auth';

function App() {
  const location = useLocation();
  const [isOK, setIsOK] = useState(localStorage.getItem('token'));
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsOK('ok');
    } else {
      setIsOK(null);
    }
  }, [location.pathname]);
  return (
    <div>
      {isOK ? (
        <Layout />
      ) : (
        <Auth>
          <RouterConfig />
        </Auth>
      )}
    </div>
  );
}

export default App;
