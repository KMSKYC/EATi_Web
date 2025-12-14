// import api from './axiosConfig';

import api from './axiosConfig';

export const authApi = {

  signup: async (userData) => { //회원가입
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (email, password) => {
    const requestBody = {email, password}
    const response = await api.post('/auth/login', requestBody);
    return response.data;
  },

  logout: async () =>{
      try {
      await api.post('/auth/logout'); 
    } catch (error) {
      console.error("로그아웃 에러", error);
    } finally {
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // 3. 로그인 페이지로 이동 및 상태 초기화
      window.location.href = '/login';
    }
  },

  checkEmailDuplicate: async (email) => {
    // [수정] 주소 뒤에 직접 ?email= 하고 변수를 붙입니다.
    // const response = await api.post(`/auth/check-email?email=${email}`);
    const response = await api.post('/auth/check-email', { email: email });
    return response.data;
  }

};