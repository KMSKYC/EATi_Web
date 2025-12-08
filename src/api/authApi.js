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
    // const response = await api.get(`/auth/check-email?email=${email}`);
    // return response.data; // (true면 중복, false면 사용가능)

    console.log(`[임시] 이메일 중복 확인 통과: ${email}`);
    return false; // 무조건 통과 (나중에 API 나오면 연결)
  }

};