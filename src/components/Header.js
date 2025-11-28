import React from 'react';
import { Link } from 'react-router-dom'; 
import {useAuth } from '../context/AuthContext'
import '../css/Header.css'; // (CSS 파일 import)

function Header() {

  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <h1>EATI</h1> 
        </Link>
      </div>
      <nav className="main-nav">
        <Link to="/" className="nav-link">
          홈
        </Link>
        <Link to="/menu" className="nav-link">
          메뉴 찾기
        </Link>
        <Link to="/together" className="nav-link">
          같이 먹기
        </Link>
        {user ? (
          // [CASE 1] 로그인 상태일 때 (user가 있음) -> 마이페이지, 로그아웃
          <>
            <Link to="/mypage" className="nav-link">
              마이페이지
            </Link>
            {/* <button className="nav-link logout-btn" onClick={logout}>
              로그아웃
            </button> */}
          </>
        ) : (
          // [CASE 2] 비로그인 상태일 때 (user가 없음) -> 로그인, 회원가입
          <>
            <Link to="/login" className="nav-link">
              로그인
            </Link>
            {/* (★) 회원가입 버튼 추가 (강조 스타일 적용 가능) */}
            <Link to="/signup" className="nav-link signup-btn">
              회원가입
            </Link>
          </>
        )}  
      </nav>

    </header>
  );
}
export default Header;