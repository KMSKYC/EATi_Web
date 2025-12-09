// api/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  // Vercel 환경변수에서 진짜 주소 가져오기
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
      "^/api": "" // /api를 떼고 백엔드로 보냄
    },
    onProxyReq: (proxyReq) => {
      // (옵션) 친구 서버가 localhost:3000을 허용했다면
      // proxyReq.setHeader('Origin', 'http://localhost:3000');
    }
  })(req, res);
};