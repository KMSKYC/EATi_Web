import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  
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