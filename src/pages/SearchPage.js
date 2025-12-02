import React from 'react';
import { Link } from 'react-router-dom'; 
import './css/SearchPage.css'; 

function SearchPage() {
    
  return (
    <div className="search-page-container">
      <h2 className="search-page-title">메뉴 찾기</h2>
      <p className="search-page-description">
        어떤 방식으로 식당을 찾으시겠어요?
      </p>

      <div className="search-options-grid">
        <Link to="/menu/map" className="search-option-card map-card">
          <div className="icon-placeholder">
            <span role="img" aria-label="map">🗺️</span> 
          </div>
          <h3>지도로 찾기</h3>
          <p>주변 맛집을 지도에서 확인하고 선택하세요</p>
        </Link>

        <Link to="/menu/category" className="search-option-card category-card">
          <div className="icon-placeholder">
            <span role="img" aria-label="category">🍱</span>
          </div>
          <h3>카테고리로 찾기</h3>
          <p>음식 종류별로 식당을 탐색하세요</p>
        </Link>

      </div>
    </div>
  );
}

export default SearchPage;