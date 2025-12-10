// import api from './axiosConfig';

import api from './axiosConfig';

export const authApi = {

  signup: async (userData) => { //회원가입
    // const requestBody ={
    //   email : userData.eamil,
    //   password: userData.password,
    //   nickname: userData.nickname,
    //   birthdate: userData.birthdate || null,
    //   gender: userData.gender || null,
    //   region: userData.region || null,
    // }
    
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (email, password) => {
    const requestBody = {email, password}
    const response = await api.post('/auth/login', requestBody);
    return response.data;
  },

  checkEmailDuplicate: async (email) => {
    // [수정] 주소 뒤에 직접 ?email= 하고 변수를 붙입니다.
    // const response = await api.post(`/auth/check-email?email=${email}`);
    const response = await api.post('/auth/check-email', { email: email });
    return response.data;
  }

};