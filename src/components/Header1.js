// import React from 'react';
import { Link } from 'react-router-dom'; 
import {useAuth } from '../context/AuthContext'
import { useRequireAuth } from '../hooks/useRequireAuth';
import './css/Header.css'; 
function Header() {

// const { user, logout } = useAuth();
  const { user } = useAuth();
  // const navigate = useNavigate(); // (★) 이동 도구
  const withAuth = useRequireAuth();

  const handleEatTogetherClick = (e) => {
    // 만약 로그인이 '안 되어' 있다면?
    if (!user) {
      e.preventDefault(); // (★핵심) Link의 원래 기능(페이지 이동)을 강제로 막습니다.
      withAuth(); // 그리고 로그인 유도 팝업을 띄웁니다.
    }
    // 로그인이 되어 있다면? -> 아무것도 안 함 (Link가 알아서 페이지를 이동시킴)
  };

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
        <Link  to="/together" className="nav-link" onClick={handleEatTogetherClick}>
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