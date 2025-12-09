// api/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const target = process.env.REAL_API_URL;

  if (!target) {
    return res.status(500).json({ 
      error: "REAL_API_URL 환경변수가 설정되지 않았습니다." 
    });
  }

  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "" 
    },
    // [핵심 해결책] Vercel에서도 로컬호스트인 척 거짓말을 해야 합니다!
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('Origin', 'http://localhost:3000');
    }
  })(req, res);
};