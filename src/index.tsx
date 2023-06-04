import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import '@/assets/index.css';
import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
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
        <App />
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>,
);
