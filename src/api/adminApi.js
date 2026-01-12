import api from './axiosConfig';

export const adminApi = {
  // 1. 전체 회원 목록 조회
  getUsers: async () => {
    const response = await api.get('/admin/users'); // 혹은 /api/users
    return response.data;
  },

  // 2. 회원 상태 변경
  updateUserStatus: async (userId, newStatus) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
    return response.data;
  },

  // 👇 [NEW] 3. 관리자가 직접 회원 추가 (회원가입 API 재활용)
  createUser: async (userData) => {
    // userData = { email, password, nickname, ... }
    const response = await api.post('/auth/signup', userData);
    return response.data;
  }
};