import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MenuSearchPage.css'; // (★) 아래 CSS 파일 꼭 만드세요!

function MenuSearchPage() {
  const navigate = useNavigate();

  return (
    <div className="menu-search-container">
      {/* 상단 텍스트 영역 */}
      <div className="page-header-group">
        <h2 className="page-title">메뉴 찾기</h2>
        <p className="page-subtitle">어떤 방식으로 식당을 찾으시겠어요?</p>
      </div>

      {/* 카드 선택 영역 (2개 배치) */}
      <div className="search-card-container">
        
        {/* 1. 지도로 찾기 카드 (파란색) */}
        <div className="search-card map-card" onClick={() => navigate('/map')}>
          <div className="icon-circle">
            {/* 아이콘 이미지가 있다면 <img> 태그로 교체하세요 */}
            <span style={{fontSize: '40px'}}>🗺️</span> 
          </div>
          <div className="card-content">
            <h3>지도로 찾기</h3>
            <p>주변 맛집을 지도에서 확인하고 선택하세요</p>
          </div>
        </div>

        {/* 2. 카테고리로 찾기 카드 (분홍색) */}
        <div className="search-card category-card" onClick={() => navigate('/')}> 
          {/* 카테고리는 보통 홈 화면 필터로 가거나 별도 페이지로 이동 */}
          <div className="icon-circle">
            <span style={{fontSize: '40px'}}>🍱</span>
          </div>
          <div className="card-content">
            <h3>카테고리로 찾기</h3>
            <p>음식 종류별로 식당을 탐색하세요</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MenuSearchPage;