import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authApi } from '../api/authApi'; 

// 1. 방송국 채널 생성 (빈 껍데기)
const AuthContext = createContext(null);

// 2. 방송국 건물 (Provider) 만들기
export function AuthProvider({ children }) {
  // 'user' 상태: 로그인하면 객체가 들어가고, 로그아웃하면 null이 됨
  const [user, setUser] = useState(null);

  // (★) 로그인 함수
  const login = async (email, password) => {
    try {
      console.log(`[AuthContext] 로그인 시도: ${email}`);

      // --- [1. 나중에 백엔드 API 연동 시 사용할 코드] ---
      // const response = await authApi.login(email, password);
      // const userData = response.user; // 백엔드에서 준 유저 정보
      // const token = response.token;   // 백엔드에서 준 토큰
      // localStorage.setItem('token', token); // 토큰 저장
      
      // --- [2. 지금 사용할 테스트용 가짜 코드] ---
      // (백엔드가 없으니 무조건 성공한다고 가정하고 가짜 정보를 만듭니다)
      const mockUser = { 
        id: 1, 
        email: email, 
        nickname: '런치왕', // (가짜 닉네임)
        region: '서울' 
      };
      
      // 상태 업데이트 (앱에 알림)
      setUser(mockUser);
      
      // '새로고침' 해도 안 날아가게 브라우저 창고(LocalStorage)에 저장
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true; // "로그인 성공!"

    } catch (error) {
      console.error("로그인 에러:", error);
      return false; // "로그인 실패..."
    }
  };

  // (★) 로그아웃 함수
  const logout = () => {
    setUser(null); // 상태 비우기
    localStorage.removeItem('user'); // 창고에서 삭제
    localStorage.removeItem('token'); // 토큰도 삭제
    console.log("[AuthContext] 로그아웃 되었습니다.");
  };

  // (★) 앱이 처음 켜질 때 '로그인 복구' (새로고침 대비)
  useEffect(() => {
    // 창고(LocalStorage)를 뒤져봅니다.
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // "어? 저장된 사람이 있네?" -> 복구!
      setUser(JSON.parse(storedUser));
      console.log("[AuthContext] 로그인 정보가 복구되었습니다.");
    }
  }, []); // [] : 앱 켜질 때 딱 한 번만 실행

  // 3. 방송 송출 (값들을 자식 컴포넌트들에게 내려보냄)
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. 방송 수신기 (Hook) - 다른 파일에서 'useAuth()'로 쉽게 쓰기 위함
export const useAuth = () => useContext(AuthContext);