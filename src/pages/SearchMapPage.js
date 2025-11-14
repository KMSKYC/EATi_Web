import React from 'react';
import { useNavigate } from 'react-router-dom'; // (★) '뒤로 가기'를 위한 훅
import RestaurantListItem from '../components/RestaurantListItem'; // (★) 방금 만든 리스트 카드
import '../css/SearchMapPage.css'; // (★) 이 페이지의 CSS

// (★) 이 페이지에서 사용할 가짜 데이터 (스크린샷 참고)
// (나중에 API로 받아올 데이터입니다)
const mockMapResults = [
  { id: 1, name: '맛있는 김치찌개', category: '한식', rating: 4.5, reviewCount: 128, distance: '350m', status: '영업중', imageUrl: 'https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Kimchi' },
  { id: 2, name: '라멘 하우스', category: '일식 - 라멘', rating: 4.7, reviewCount: 256, distance: '520m', status: '영업중', imageUrl: 'https://via.placeholder.com/80x80/4682B4/FFFFFF?text=Ramen' },
  { id: 3, name: '이탈리안 키친', category: '양식 - 파스타', rating: 4.3, reviewCount: 98, distance: '1.2km', status: '아이조', imageUrl: 'https://via.placeholder.com/80x80/32CD32/FFFFFF?text=Pasta' }
];

function SearchMapPage() {
  const navigate = useNavigate(); // '뒤로 가기' 함수

  return (
    <div className="search-map-container">
      <div className="search-page-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ←
        </button>
        <h2 className="search-page-title-text">지도로 찾기</h2>
      </div>
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="메뉴, 식당 이름으로 검색" className="search-input" />
        <button className="filter-btn">
          ☰
        </button>
      </div>

      <div className="map-placeholder">
        <div className="map-center-pin">📍</div>
        <div className="map-center-text">지도가 표시됩니다</div>
        <span className="map-marker" style={{ top: '40%', left: '20%' }}>맛있는 김치찌개</span>
        <span className="map-marker" style={{ top: '50%', left: '50%', background: '#4A90E2' }}>라멘 하우스</span>
        <span className="map-marker" style={{ top: '60%', left: '70%' }}>이탈리안 키친</span>
      </div>

      <div className="list-section">
        <h4>{mockMapResults.length}개의 식당</h4>
        <div className="list-items-container">
          {mockMapResults.map(restaurant => (
            <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchMapPage;