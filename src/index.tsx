import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import '@/assets/index.css';
import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StyleProvider hashPriority="high">
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#955ce6',
          colorInfo: '#955ce6',
          wireframe: false,
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StyleProvider>,
);
