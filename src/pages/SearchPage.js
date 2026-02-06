import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/SearchPage.css';

function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="search-page-container">
      {/* 히어로 섹션 */}
      <section className="search-hero-section">
        <div className="search-hero-content">
          <span className="search-badge">메뉴 탐색</span>
          <h1>오늘 뭐 먹지?</h1>
          <p>원하는 방식으로 완벽한 한 끼를 찾아보세요</p>
        </div>
        <div className="search-hero-bg"></div>
      </section>

      {/* 메인 그리드 영역 - 2x2 배치 */}
      <section className="search-main-grid">
        {/* 행 1: 지도로 찾기 + 빠른 추천 */}
        <Link to="/menu/map" className="search-option-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">📍</span>
          </div>
          <div className="card-text">
            <h3>지도로 찾기</h3>
            <p>내 주변 맛집을 지도에서 한눈에</p>
          </div>
          <span className="card-arrow">→</span>
        </Link>

        <div className="sidebar-box">
          <h4>빠른 추천</h4>
          <div className="quick-buttons">
            <button className="quick-btn" onClick={() => navigate('/random')}>
              <span>🎲</span>
              <span>랜덤 추천</span>
            </button>
            <button className="quick-btn" onClick={() => navigate('/ranking')}>
              <span>🏆</span>
              <span>인기 랭킹</span>
            </button>
          </div>
        </div>

        {/* 행 2: 카테고리로 찾기 + 오늘의 인기 키워드 */}
        <Link to="/" className="search-option-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">🍱</span>
          </div>
          <div className="card-text">
            <h3>카테고리로 찾기</h3>
            <p>한식, 중식, 양식 등 종류별 탐색</p>
          </div>
          <span className="card-arrow">→</span>
        </Link>

        <div className="sidebar-box">
          <h4>오늘의 인기 키워드</h4>
          <div className="tag-list">
            <span className="tag"># 혼밥</span>
            <span className="tag"># 가성비</span>
            <span className="tag"># 데이트</span>
            <span className="tag"># 야식</span>
            <span className="tag"># 해장</span>
            <span className="tag"># 회식</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchPage;