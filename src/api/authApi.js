// import api from './axiosConfig';

import api from './axiosConfig';

export const authApi = {

  signup: async (userData) => { //회원가입
    const requestBody ={
      email : userData.eamil,
      password: userData.password,
      nickname: userData.nickname,
      birthdate: userData.birthdate || null,
      gender: userData.gender || null,
      region: userData.region || null,
    }
    const response = await api.post('/auth/signup', requestBody);
    return response.data;
  },

  login: async (email, password) => {
    const requestBody = {
      email: email,
      password: password,
    };
    const response = await api.post('/auth/login', requestBody);
    return response.data;
  }

};