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

export default api;