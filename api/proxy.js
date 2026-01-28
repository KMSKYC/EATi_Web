// api/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const target = process.env.REACT_APP_API_URL;

  if (!target) {
    return res.status(500).json({ error: "REACT_APP_API_URL 설정 안됨" });
  }

  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    
    // [중요] pathRewrite를 삭제했습니다! 
    // 이제 로컬처럼 '/api'가 붙은 채로 백엔드에 전송됩니다.
    // pathRewrite: { "^/api": "" },  <-- 이 부분이 범인이었습니다.

    onProxyReq: (proxyReq) => {
      // 친구 서버가 허용한 localhost:3000으로 완벽 위장
      proxyReq.setHeader('Origin', 'http://localhost:3000');
      proxyReq.setHeader('Referer', 'http://localhost:3000/');
    }
  })(req, res);
};