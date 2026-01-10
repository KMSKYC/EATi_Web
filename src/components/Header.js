import React, {useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import './css/Header.css'; // (★중요) 아까 만든 CSS 파일을 연결해야 디자인이 바뀝니다!

function Header() {
  const { user, logout } = useAuth(); // 로그인 정보
  const withAuth = useRequireAuth(); // 로그인 강제하는 도구
  const navigate = useNavigate(); // 페이지 이동 도구
  const location = useLocation(); // 현재 주소 확인용 (메뉴 색깔 칠하기)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 모바일 메뉴 상태

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleEatTogetherClick = (e) => {
    if (!user) {
      e.preventDefault(); // 이동 막기
      withAuth(() => navigate('/together')); // 로그인 창 띄우고, 성공하면 이동
    }
  };


  const handleAiClick = () => {
    // 로그인이 안 되어 있으면 로그인 창 뜸
    withAuth(() => navigate('/chat'));
  };

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="web-header">
      <div className="header-inner">

        {/* 햄버거 메뉴 버튼 (모바일에서만 표시) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* (1) 로고 영역 */}
        <div className="brand-logo" onClick={() => navigate('/')}>
          <img src="/EATi.png" alt="EATi" className="logo-img" />
        </div>

        {/* (2) 메뉴 네비게이션 */}
        <nav className="web-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            홈
          </Link>
          <Link to="/" className={`nav-link ${isActive('/recommend')}`}>
            메뉴추천
          </Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu')}`}>
            메뉴찾기
          </Link>
          <Link to="/ranking" className={`nav-link ${isActive('/ranking')}`}>
            랭킹
          </Link>
          <Link to="/together" className={`nav-link ${isActive('/together')}`} onClick={handleEatTogetherClick}>
            같이먹기
          </Link>
        </nav>

<div className="header-actions">
          {user ? (
            <div className="user-profile-area">
              <div className="user-profile clickable" onClick={() => navigate('/mypage')}>
                <div className="avatar">👤</div>
                <span className="user-name"><strong>{user.nickname}</strong>님</span>
              </div>
              <button className="logout-btn" onClick={logout}>로그아웃</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="text-btn" onClick={() => navigate('/login')}>로그인</button>
              <button className="btn-black-small" onClick={() => navigate('/signup')}>회원가입</button>
            </div>
          )}
        </div>

      </div>

      {/* 모바일 메뉴 (드롭다운) */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className={`mobile-nav-link ${isActive('/')}`} onClick={() => setMobileMenuOpen(false)}>
            홈
          </Link>
          <Link to="/" className={`mobile-nav-link ${isActive('/recommend')}`} onClick={() => setMobileMenuOpen(false)}>
            메뉴추천
          </Link>
          <Link to="/menu" className={`mobile-nav-link ${isActive('/menu')}`} onClick={() => setMobileMenuOpen(false)}>
            메뉴찾기
          </Link>
          <Link to="/ranking" className={`mobile-nav-link ${isActive('/ranking')}`} onClick={() => setMobileMenuOpen(false)}>
            랭킹
          </Link>
          <Link
            to="/together"
            className={`mobile-nav-link ${isActive('/together')}`}
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleEatTogetherClick(e);
            }}
          >
            같이먹기
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;