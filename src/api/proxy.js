// api/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  // Vercel 환경변수에서 진짜 주소를 가져옵니다.
  const target = process.env.REAL_API_URL;

  if (!target) {
    return res.status(500).json({ 
      error: "REAL_API_URL 환경변수가 설정되지 않았습니다." 
    });
  }

  // 프록시 생성 및 실행
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: {
      // vercel.json에서 /api/... 로 들어온 요청을
      // 백엔드에는 /... 로 줄여서 보냅니다. (/api 제거)
      "^/api": "" 
    },
    // 백엔드 서버가 로컬호스트나 특정 오리진만 받는다면 설정
    onProxyReq: (proxyReq) => {
       // 필요하다면 친구가 허용해준 도메인이나 localhost로 위장
       // proxyReq.setHeader('Origin', 'http://localhost:3000'); 
    }
  })(req, res);
};