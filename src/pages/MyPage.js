import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './css/MyPage.css';

function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 로그인이 안 된 상태로 접근했을 때 방어 코드
  if (!user) {
    return <div style={{textAlign:'center', marginTop:'50px'}}>로그인이 필요합니다.</div>;
  }

  const handleLogout = () => {
    // 1. 로그아웃 실행
    logout();
    // 2. 홈으로 튕겨내기
    navigate('/');
  };

  return (
    // (★) 로그인/회원가입과 똑같은 '흰색 박스' 디자인 적용
    <div className="auth-wrapper">
      <div className="page-container">
        <h2>마이페이지</h2>
        
        {/* 내 정보 보여주는 영역 */}
        <div className="user-profile-section" style={{textAlign: 'center', marginBottom: '30px'}}>
          <img 
            src={user.profileImage} 
            alt="프로필" 
            style={{width: '100px', height: '100px', borderRadius: '50%', marginBottom: '15px'}}
          />
          <h3>{user.nickname}님</h3>
          <p style={{color: '#666'}}>{user.email}</p>
          <p style={{color: '#888', fontSize: '14px'}}>{user.region}</p>
        </div>

        <hr className="divider" />

        {/* 메뉴 리스트 (예시) */}
        <div className="mypage-menu">
          <button className="menu-item-btn">
            ✏️ 내 정보 수정
          </button>
          <button className="menu-item-btn">
            ❤️ 찜한 식당 목록
          </button>
          <button className="menu-item-btn">
            📝 내가 쓴 리뷰
          </button>
        </div>

        <hr className="divider" />

        {/* (★) 로그아웃 버튼 */}
        <button 
          onClick={handleLogout} 
          className="logout-action-btn"
        >
          로그아웃
        </button>

      </div>
    </div>
  );
}

export default MyPage;