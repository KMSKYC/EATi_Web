const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://134.185.96.179', // 목적지
      changeOrigin: true,
      
      // 친구가 localhost:3000을 열어줬으므로, 이걸로 위장해서 들어갑니다.
      onProxyReq: function (proxyReq) {
        proxyReq.setHeader('Origin', 'http://localhost:3000');
      }
    })
  );
};