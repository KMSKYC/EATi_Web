import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authApi } from '../api/authApi'; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // (★) 로그인 함수
const login = async (userId, password) => {
    try {
      console.log(`[AuthContext] 로그인 시도: ${userId} / ${password}`);
      if (userId === 'admin' && password === '1234') {
        const mockUser = {
          id: 1,
          userId: userId,
          email: 'admin@eati.com',
          nickname: 'eati', // 마이페이지에서 보여줄 닉네임
          profileImage: '', // 가짜 프로필 사진
          region: '서울 강남구'
        };
        setUser(mockUser);

        // 4. '새로고침' 해도 로그인 유지되게 브라우저 저장소에 저장
        localStorage.setItem('user', JSON.stringify(mockUser));
        // localStorage.setItem('token', 'fake-jwt-token'); // 토큰도 가짜로 저장
        console.log("✅ 로그인 성공!");
        return true; // LoginPage에게 성공 알림
      } 
      
      else {
        console.warn("❌ 로그인 실패: 아이디 또는 비번 불일치");
        return false; // LoginPage에게 실패 알림
      }

    } catch (error) {
      console.error("로그인 에러:", error);
      return false;
    }
  };

  // (★) 로그아웃 함수
  const logout = () => {
    setUser(null); // 상태 비우기
    localStorage.removeItem('user'); // 창고에서 삭제
    localStorage.removeItem('token'); // 토큰도 삭제
    console.log("[AuthContext] 로그아웃 되었습니다.");
  };


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("🔄 로그인 정보 복구됨");
    }
  }, []);

  // 3. 방송 송출 (값들을 자식 컴포넌트들에게 내려보냄)
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. 방송 수신기 (Hook) - 다른 파일에서 'useAuth()'로 쉽게 쓰기 위함
export const useAuth = () => useContext(AuthContext);