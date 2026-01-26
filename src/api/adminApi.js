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
  },

  
  // 🏪 [식당 관리]
  // 1. 전체 식당 목록 조회
  getRestaurants: async () => {
    const response = await api.get('/restaurants');
    return response.data;
  },

  // 2. 식당 추가 (DB 스키마: name, category_id, address, description 등)
  createRestaurant: async (restaurantData) => {
    const response = await api.post('/admin/restaurants', restaurantData);
    return response.data;
  },

  // 3. 식당 삭제
  deleteRestaurant: async (restaurantId) => {
    const response = await api.delete(`/admin/restaurants/${restaurantId}`);
    return response.data;
  },

  // 📋 [메뉴 관리]
  // 1. 특정 식당의 메뉴 목록 조회
  getRestaurantMenus: async (restaurantId) => {
    const response = await api.get(`/admin/restaurants/${restaurantId}/menus`);
    return response.data;
  },

  // 2. 메뉴 추가 (DB 스키마: restaurant_id, menu_name, price, description)
  addMenu: async (restaurantId, menuData) => {
    const response = await api.post(`/admin/restaurants/${restaurantId}/menus`, menuData);
    return response.data;
  },

  // 3. 메뉴 삭제
  deleteMenu: async (menuId) => {
    const response = await api.delete(`/admin/menus/${menuId}`);
    return response.data;
  }

};