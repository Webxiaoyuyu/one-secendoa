/* eslint-disable no-cond-assign */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Layout from '@/views/Layout';
import RouterConfig from '@/router';
import { useLocation } from 'react-router-dom';
import Auth from '@/auth/Auth';

function getCookie(name: string) {
  let arr;
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  return null;
}

function App() {
  const location = useLocation();
  const [isOK, setIsOK] = useState(getCookie('token'));
  useEffect(() => {
    const token = getCookie('token');
    if (token) {
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
