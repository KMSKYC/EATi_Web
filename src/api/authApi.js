// import api from './axiosConfig';

export const authApi = {
  // ... (기존 signup, login 함수는 그대로 유지) ...

  // (★ 추가 ★) 이메일 중복 체크 함수
  checkEmailDuplicate: async (email) => {
    // 백엔드 API 설계: GET /auth/check-email?email=user@test.com
    // 응답 예시: { isDuplicate: true } 또는 false
    try {
      // (지금은 백엔드가 없으니 가짜 응답을 주는 코드로 대체합니다)
      console.log(`📡 [API 요청] 이메일 중복 확인: ${email}`);
      
      // (가짜 로직) 'test@test.com'만 중복되었다고 가정
      if (email === 'test@test.com') {
        return true; // 중복됨!
      }
      return false; // 사용 가능!

      // (나중에 백엔드 생기면 아래 주석 해제)
      // const response = await api.get(`/auth/check-email?email=${email}`);
      // return response.data.isDuplicate;

    } catch (error) {
      console.error("중복 체크 에러:", error);
      throw error;
    }
  }
};