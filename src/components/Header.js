import React from 'react';
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

  // 3. 'AI 채팅' 클릭 시 로그인 체크 (새로 추가된 기능)
  const handleAiClick = () => {
    // 로그인이 안 되어 있으면 로그인 창 뜸
    withAuth(() => navigate('/chat'));
  };

  return (
    <header className="web-header">
      <div className="header-inner">
        
        {/* (1) 로고 영역 */}
        <div className="brand-logo" onClick={() => navigate('/')}>
          EATi
        </div>

        {/* (2) 메뉴 네비게이션 */}
        <nav className="web-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            홈
          </Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu')}`}>
            메뉴 찾기
          </Link>
          {/* <Link to="/ranking" className={`nav-link ${isActive('/ranking')}`}> */}
           <Link to="" className={`nav-link ${isActive('/ranking')}`}>
            랭킹
          </Link>
          {/* 같이 먹기는 클릭 시 검사 함수 실행 */}
          <Link to="/together" className={`nav-link ${isActive('/together')}`} onClick={handleEatTogetherClick}>
            같이 먹기
          </Link>
        </nav>

        <div className="header-actions">
          
          {/* <button className="ai-chat-btn" onClick={handleAiClick}>
            🤖 AI 추천받기
          </button> */}

          {user ? (
            // [로그인 상태] -> 프로필 표시 (누르면 마이페이지)
            <div 
              className="user-profile" 
              onClick={() => navigate('/mypage')} 
              style={{ cursor: 'pointer' }}
            >
              <div className="avatar">👤</div>
              <span>{user.nickname || '사용자'}님</span>
            </div>
          ) : (
            // [비로그인 상태] -> 로그인, 회원가입 버튼 표시
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="nav-link" 
                onClick={() => navigate('/login')}
                style={{ fontSize: '14px' }}
              >
                로그인
              </button>
              <button 
                className="btn-primary" 
                onClick={() => navigate('/signup')}
                style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '20px' }}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
}

export default Header;