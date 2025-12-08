const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  // 여기서 'REAL_API_URL'이라는 비밀 변수를 가져옵니다.
  const target = process.env.REAL_API_URL;

  if (!target) {
    return res.status(500).json({ error: "API URL이 설정되지 않았습니다." });
  }

  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: { "^/api": "" }, 
  })(req, res);
};