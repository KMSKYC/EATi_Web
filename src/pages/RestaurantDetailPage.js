import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // (★) URL의 :id를 가져오는 훅
import { mockCards } from '../data/mockCards'; // (★) 데이터 가져오기
import { useRequireAuth } from '../hooks/useRequireAuth';
import './css/RestaurantDetailPage.css';

function RestaurantDetailPage() {
  const { id } = useParams(); // URL에서 'id'를 꺼냅니다.
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const withAuth = useRequireAuth();

  const gotoEatTogether = () => {
    navigate('/together');
  };

  useEffect(() => {
    const found = mockCards.find(r => r.id === parseInt(id));
    if (found) {
      setRestaurant(found);
    } else {
      // 데이터가 없으면 (임시로) 첫 번째 데이터를 보여주거나 에러 처리
      setRestaurant(mockCards[0]); 
    }
  }, [id]);

  if (!restaurant) return <div>로딩 중...</div>;

  return (
    <div className="detail-page-container">
      {/* 1. 상단 네비게이션 (뒤로가기) */}
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">←</button>
      </div>

      {/* 2. 대표 이미지 */}
      <div className="detail-image-wrapper">
        <img src={restaurant.imageUrl} alt={restaurant.title} className="detail-image" />
      </div>

      {/* 3. 식당 정보 내용 */}
      <div className="detail-content">
        <span className="detail-category">{restaurant.category}</span>
        <h2 className="detail-title">{restaurant.title || restaurant.name}</h2>
        <p className="detail-description">{restaurant.description || '설명 맛집입니다.'}</p>
        
        <div className="detail-info-row">
          <span>⭐ 4.8 (120)</span>
          <span>📍 350m</span>
          <span>💸 {restaurant.price ? restaurant.price.toLocaleString() : '12,000'}원</span>
        </div>

        <hr className="divider" />

        {/* 4. 액션 버튼들 */}
        <div className="action-buttons">
          <button className="action-btn primary" onClick={()=>withAuth(gotoEatTogether)}>
            같이 먹기 모집하기 🍚
          </button>
          <button className="action-btn secondary">
            지도 보기 🗺️
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;