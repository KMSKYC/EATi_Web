import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '../api/authApi'; // (★) 주석 해제! 진짜 API 사용

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      console.log(`[AuthContext] 서버로 로그인 요청: ${email}`);

      const data = await authApi.login(email, password);
      console.log("서버 응답 성공:", data);

      const token = data.accessToken || data.token; 
      const userData = data.user || { email: email, nickname: '사용자' }; 

      if (token) {
        localStorage.setItem('accessToken', token);
      }

      // 3. 상태 업데이트 & 쿠키 저장 (로그인 유지용)
      setUser(userData);
      Cookies.set('user', JSON.stringify(userData), { expires: 1 }); // 1일 유지

      return true; // 성공

    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      // 에러 메시지 띄우기 (옵션)
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      return false;
    }
  };

  // (★) 로그아웃
  const logout = () => {
    setUser(null);
    Cookies.remove('user'); // 유저 정보 삭제
    localStorage.removeItem('accessToken'); // 토큰 삭제
    console.log("👋 로그아웃");
  };

  // (★) 앱 켤 때 복구
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);