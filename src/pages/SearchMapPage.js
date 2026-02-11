import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KaKaoMap';
import './css/SearchMapPage.css';

// 빠른 검색 키워드 - 메뉴/음식 종류 기반
const QUICK_KEYWORDS = [
  { label: '한식', icon: '🍚' },
  { label: '중식', icon: '🥟' },
  { label: '일식', icon: '🍣' },
  { label: '양식', icon: '🍝' },
  { label: '카페', icon: '☕' },
  { label: '치킨', icon: '🍗' },
  { label: '피자', icon: '🍕' },
  { label: '분식', icon: '🍜' },
];

function SearchMapPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  // 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setNoResults(false);
      setShowAllResults(false);
      setSearchKeyword(searchInput.trim());
    }
  };

  // 엔터키 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // 검색 결과 수신
  const handlePlacesFound = useCallback((places, hasNoResults = false) => {
    setSearchResults(places);
    setNoResults(hasNoResults);
    if (places.length > 0) {
      setSelectedPlace(places[0]); // 첫 번째 결과 자동 선택
    } else {
      setSelectedPlace(null);
    }
  }, []);

  // 장소 선택
  const handlePlaceSelect = useCallback((place) => {
    setSelectedPlace(place);
  }, []);

  // 카카오맵 길찾기 링크
  const getDirectionsUrl = (place) => {
    if (!place) return '#';
    return `https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}`;
  };

  // 카카오맵 상세 링크
  const getPlaceUrl = (place) => {
    if (!place) return '#';
    return place.place_url || `https://map.kakao.com/link/map/${place.id}`;
  };

  return (
    <div className="search-map-container">
      {/* 1. 헤더 영역 (뒤로가기 + 검색) */}
      <div className="map-header-section">
        <div className="header-top-row">
          <button className="back-btn-map" onClick={() => navigate(-1)}>←</button>
          <h2 className="header-title">주변 맛집 탐색</h2>
        </div>

        {/* 검색바 */}
        <form className="map-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="메뉴, 식당, 지역을 검색해보세요"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchInput && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setSearchInput('');
                setSearchKeyword('');
                setSearchResults([]);
                setSelectedPlace(null);
                setNoResults(false);
              }}
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-submit-btn">
            검색
          </button>
        </form>

        {/* 빠른 검색 키워드 */}
        <div className="filter-group">
          {QUICK_KEYWORDS.map(({ label, icon }) => (
            <button
              key={label}
              className={`filter-pill ${searchKeyword === label ? 'active' : ''}`}
              onClick={() => {
                setSearchInput(label);
                setSearchKeyword(label);
                setNoResults(false);
                setShowAllResults(false);
              }}
            >
              <span className="filter-icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* 검색 결과 카운트 또는 검색 결과 없음 */}
        {searchKeyword && (
          <div className={`search-result-count ${noResults ? 'no-results' : ''}`}>
            {noResults ? (
              <>
                <span className="result-keyword">"{searchKeyword}"</span>에 대한 검색 결과가 없어요
                <p className="no-results-hint">다른 키워드로 검색해보세요</p>
              </>
            ) : searchResults.length > 0 ? (
              <>
                <span className="result-keyword">"{searchKeyword}"</span> 검색 결과 <span className="result-num">{searchResults.length}</span>건
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* 2. 메인 컨텐츠 (지도 + 카드) */}
      <div className="map-content-wrapper">
        {/* (Left) 카카오 지도 */}
        <div className="radar-map-section">
          <KakaoMap
            searchKeyword={searchKeyword}
            onPlacesFound={handlePlacesFound}
            onPlaceSelect={handlePlaceSelect}
            selectedPlace={selectedPlace}
          />
        </div>

        {/* (Right) 식당 정보 카드 */}
        <div className="side-card-section">
          {selectedPlace ? (
            <div className="restaurant-card-item">
              <div className="card-thumb-placeholder">
                <span className="placeholder-icon">🍽️</span>
                <span className="placeholder-text">{selectedPlace.category_group_name || '음식점'}</span>
              </div>
              <div className="card-info-box">
                <div className="card-top-row">
                  <h3 className="card-name">{selectedPlace.place_name}</h3>
                  {selectedPlace.distance && (
                    <span className="match-badge">{Math.round(selectedPlace.distance)}m</span>
                  )}
                </div>
                <span className="card-meta">
                  {selectedPlace.category_name?.split(' > ').slice(-1)[0] || '음식점'}
                </span>
                <p className="card-desc">
                  <span className="desc-icon">📍</span>
                  {selectedPlace.road_address_name || selectedPlace.address_name}
                </p>
                {selectedPlace.phone && (
                  <p className="card-phone">
                    <span className="phone-icon">📞</span>
                    <a href={`tel:${selectedPlace.phone}`}>{selectedPlace.phone}</a>
                  </p>
                )}

                <div className="card-actions">
                  <a
                    href={getPlaceUrl(selectedPlace)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-small"
                  >
                    상세보기
                  </a>
                  <a
                    href={getDirectionsUrl(selectedPlace)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-small-outline"
                  >
                    길찾기
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="restaurant-card-item empty-card">
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <h3>맛집을 검색해보세요</h3>
                <p>메뉴, 식당 이름, 지역으로<br />검색할 수 있어요</p>
              </div>
            </div>
          )}

          {/* 검색 결과 리스트 */}
          {searchResults.length > 1 && (
            <div className="search-result-list">
              <div className="result-list-header">
                <h4 className="result-list-title">검색 결과</h4>
                {searchResults.length > 5 && (
                  <button
                    className="show-all-btn"
                    onClick={() => setShowAllResults(!showAllResults)}
                  >
                    {showAllResults ? '접기' : `전체보기 (${searchResults.length})`}
                  </button>
                )}
              </div>
              {(showAllResults ? searchResults : searchResults.slice(0, 8)).map((place, index) => (
                <div
                  key={place.id}
                  className={`result-list-item ${selectedPlace?.id === place.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlace(place)}
                >
                  <span className="result-index">{index + 1}</span>
                  <div className="result-info">
                    <span className="result-name">{place.place_name}</span>
                    <span className="result-category">
                      {place.category_name?.split(' > ').slice(-1)[0]}
                    </span>
                  </div>
                  {place.distance && (
                    <span className="result-distance">{Math.round(place.distance)}m</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMapPage;
