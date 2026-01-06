import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KaKaoMap';
import './css/SearchMapPage.css';

function SearchMapPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('영업중');

  // 선택된 식당 데이터
  const selectedRestaurant = {
    id: 1,
    name: "오레노 라멘",
    category: "일식 라멘",
    distance: "200m",
    matchScore: 95,
    matchReason: "진한 국물",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80"
  };

  // // 지도 마커들
  // const mapMarkers = [
  //   { id: 1, name: "내 위치", top: '50%', left: '50%', type: 'center' },
  //   { id: 2, name: "오레노 라멘", top: '35%', left: '42%', type: 'target', active: true },
  //   { id: 3, name: "마라공방", top: '30%', left: '65%', type: 'target' },
  //   { id: 4, name: "다운타우너", top: '65%', left: '58%', type: 'target' },
  //   { id: 5, name: "런던 베이글", top: '72%', left: '30%', type: 'target' },
  // ];

  return (
    <div className="search-map-container">
      {/* 1. 헤더 영역 (뒤로가기 + 검색) */}
      <div className="map-header-section">
        <div className="header-top-row">
            {/* 🔙 뒤로가기 버튼 */}
            <button className="back-btn-map" onClick={() => navigate(-1)}>←</button>
            <h2 className="header-title">주변 맛집 탐색</h2>
        </div>
        
        {/* 검색바 */}
        <div className="map-search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="먹고 싶은 메뉴, 지역 검색" className="search-input" />
        </div>

        {/* 필터 */}
        <div className="filter-group">
          {['영업중', '1km 이내', '⭐ 4.5 이상', '웨이팅 적음'].map((filter) => (
            <button 
              key={filter}
              className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 메인 컨텐츠 (지도 + 카드) */}
      <div className="map-content-wrapper">
        
        {/* (Left) 레이더 지도 */}
        <div className="radar-map-section">
          <KakaoMap />
        </div>

        {/* (Right) 식당 정보 카드 */}
        <div className="side-card-section">
          <div className="restaurant-card-item" onClick={() => navigate(`/restaurant/${selectedRestaurant.id}`)}>
            <img src={selectedRestaurant.imageUrl} alt="food" className="card-thumb" />
            <div className="card-info-box">
              <div className="card-top-row">
                <h3 className="card-name">{selectedRestaurant.name}</h3>
                <span className="match-badge">{selectedRestaurant.matchScore}% 일치</span>
              </div>
              <span className="card-meta">{selectedRestaurant.category} · {selectedRestaurant.distance}</span>
              <p className="card-desc">"{selectedRestaurant.matchReason}"</p>
              
              <div className="card-actions">
                  <button className="btn-small">상세보기</button>
                  <button className="btn-small-outline">길찾기</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchMapPage;