import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from '@/router';
import Auth from '@/auth/Auth';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Auth>
          <RouterConfig />
        </Auth>
      </BrowserRouter>
    </div>
  );
}

export default App;
