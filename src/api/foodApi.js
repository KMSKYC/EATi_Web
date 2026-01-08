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
  }

};