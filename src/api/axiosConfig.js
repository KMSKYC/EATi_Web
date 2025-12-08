import axios from 'axios';

console.log("-------------", process.env.REACT_APP_API_BASE_URL)

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  // baseURL : '/api',
  
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 응답 인터셉터 (에러 로그용)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 통신 오류:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;