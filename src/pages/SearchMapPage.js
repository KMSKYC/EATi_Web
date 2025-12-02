import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantListItem from '../components/RestaurantListItem';
import './css/SearchMapPage.css';

const mockMapResults = [
  { 
    id: 1, name: '맛있는 김치찌개', category: '한식', rating: 4.5, reviewCount: 128, distance: '350m', status: '영업중', 
    imageUrl: 'https://images.unsplash.com/photo-1627993425875-9e6b4e72c5b3?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 2, name: '라멘 하우스', category: '일식 - 라멘', rating: 4.7, reviewCount: 256, distance: '520m', status: '영업중', 
    imageUrl: 'https://images.unsplash.com/photo-1612712497645-3642332617f1?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 3, name: '이탈리안 키친', category: '양식 - 파스타', rating: 4.3, reviewCount: 98, distance: '1.2km', status: '영업 종료', 
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f84?q=80&w=200&auto=format&fit=crop' 
  }
];

function SearchMapPage() {
  const navigate = useNavigate();

  return (
    <div className="search-map-container">
      
      {/* 1. 헤더 */}
      <div className="search-page-header">
        <button onClick={() => navigate(-1)} className="back-btn">←</button>
        <h2 className="search-page-title-text">지도로 찾기</h2>
      </div>

      {/* 2. 검색바 */}
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="메뉴, 식당 이름으로 검색" className="search-input" />
          <button className="filter-btn">☰</button>
        </div>
      </div>

      {/* (★ 수정) 3. 컨텐츠 래퍼 (지도 + 리스트) */}
      <div className="search-map-content-wrapper">
        
        {/* 지도 영역 */}
        <div className="map-placeholder">
          <div className="map-center-pin">📍</div>
          <div className="map-center-text">지도가 표시됩니다</div>
          <span className="map-marker" style={{ top: '40%', left: '20%' }}>맛있는 김치찌개</span>
          <span className="map-marker" style={{ top: '50%', left: '50%', background: '#4A90E2' }}>라멘 하우스</span>
          <span className="map-marker" style={{ top: '60%', left: '70%' }}>이탈리안 키친</span>
        </div>

        {/* 리스트 영역 */}
        <div className="list-section">
          <h4>{mockMapResults.length}개의 식당</h4>
          <div className="list-items-container">
            {mockMapResults.map(restaurant => (
              <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchMapPage;