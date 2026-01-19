import api from './axiosConfig'; // 우리가 만든 axios 설정 불러오기

export const foodApi = {
 
  // 카테고리 목록 가져오기
  getCategories: async () => {
    const response = await api.get('/categories'); 
    return response.data; 
  },

  // 2. 오늘의 추천 (기존 코드)
  // getTodayRecommendation: async () => {
  //   const response = await api.get('/recommendations/today');
  //   return response.data;
  // },

  // ✅ 3. [추가] 메뉴 목록 조회 (전체 or 카테고리별)
  getMenus: async (categoryId) => {
    // categoryId가 'all'이거나 없으면 -> 전체 조회 (/api/menus)
    if (!categoryId || categoryId === 'all') {
      const response = await api.get('/menus');
      return response.data;
    }
    // categoryId가 있으면 -> 카테고리별 조회 (/api/menus?categoryId=1)
    else {
      const response = await api.get(`/menus?categoryId=${categoryId}`);
      return response.data;
    }
  },

  getRandomMenu: async () => {
    const response = await api.get('/menus/random');
    return response.data;
  },

  // 메뉴 상세 정보 조회
  getMenuById: async (menuId) => {
    const response = await api.get(`/menus/${menuId}`);
    return response.data;
  },

  // 특정 메뉴를 제공하는 레스토랑 목록 조회
  // GET /menus/{menuId}/restaurants
  // 응답 예시: { menuInfo: {...}, restaurants: [...] }
  getRestaurantsByMenuId: async (menuId) => {
    const response = await api.get(`/menus/${menuId}/restaurants`);
    return response.data;
  }

};