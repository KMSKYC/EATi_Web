import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '../api/authApi'; // (★) 주석 해제! 진짜 API 사용

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // 서버 응답 형식 (실무 표준):
      // {
      //   accessToken: string,
      //   user: {
      //     id: string,
      //     nickname: string,
      //     email?: string  // 선택적 - 보안상 필요시에만
      //   }
      // }
      const data = await authApi.login(email, password);

      // 토큰 추출 및 저장
      const token = data.accessToken;
      if (!token) {
        throw new Error('토큰이 응답에 포함되지 않았습니다.');
      }
      localStorage.setItem('accessToken', token);

      // 사용자 정보 추출 (닉네임 필수)
      const userData = {
        id: data.user?.id,
        nickname: data.user?.nickname || email.split('@')[0], // fallback: 이메일 앞부분
        email: data.user?.email || email
      };

      // 상태 업데이트 & 쿠키 저장 (로그인 유지용)
      setUser(userData);
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // 7일 유지

      return true; // 성공

    } catch (error) {
      console.error("❌ 로그인 실패:", error);
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
    const storedToken = sessionStorage.getItem('accessToken');

    if (storedUser && storedToken) {
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