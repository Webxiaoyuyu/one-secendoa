const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.121.66:8888',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    configure: {},
  },
};
export {};
