import axios from 'axios';

// 여기엔 절대 require('http-proxy-middleware')가 있으면 안 됩니다!
const api = axios.create({
  // 기존 코드
// baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api'
  baseURL: '/api', // 우리는 프록시를 믿고 '/api'로만 보냅니다.
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청이 날아가기 전에 '가로채서(Intercept)' 토큰을 주머니에 넣어줍니다.
api.interceptors.request.use(
  (config) => {
    // 1. 저장된 토큰 꺼내기
    const token = localStorage.getItem('accessToken');

    // 2. 토큰이 있으면 헤더에 붙이기 (이게 없어서 403이 뜬 겁니다)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;