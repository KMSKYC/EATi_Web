import React, {useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import './css/Header.css'; // (★중요) 아까 만든 CSS 파일을 연결해야 디자인이 바뀝니다!

function Header() {
  const { user } = useAuth(); // 로그인 정보
  const withAuth = useRequireAuth(); // 로그인 강제하는 도구
  const navigate = useNavigate(); // 페이지 이동 도구
  const location = useLocation(); // 현재 주소 확인용 (메뉴 색깔 칠하기)

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

  return (
    <header className="web-header">
      <div className="header-inner">
        
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
            // ✅ (수정) 로그아웃 버튼 삭제 & 클릭 시 마이페이지 이동
            <div 
              className="user-profile-area clickable" 
              onClick={() => navigate('/mypage')}
            >
              <div className="user-profile">
                <div className="avatar">👤</div>
                <span className="user-name"><strong>{user.nickname}</strong>님</span>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="text-btn" onClick={() => navigate('/login')}>로그인</button>
              <button className="btn-black-small" onClick={() => navigate('/signup')}>회원가입</button>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
}

export default Header;