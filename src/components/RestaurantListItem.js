import React from 'react';
import '../css/RestaurantListItem.css'; // (★) 새로 만들 CSS 파일 import

// (★) props로 restaurant 데이터를 받습니다.
function RestaurantListItem({ restaurant }) {
  if (!restaurant) return null;

  return (
    // (★) 가로형 카드
    <div className="list-item-card">
      {/* 1. 이미지 */}
      <img src={restaurant.imageUrl} alt={restaurant.name} className="list-item-image" />
      
      {/* 2. 텍스트 컨텐츠 */}
      <div className="list-item-content">
        <h3>{restaurant.name}</h3>
        <p className="list-item-category">{restaurant.category}</p>
        <div className="list-item-info">
          <span className="rating">⭐ {restaurant.rating} ({restaurant.reviewCount})</span>
          <span className="distance">{restaurant.distance}</span>
        </div>
      </div>
      
      {/* 3. 영업 상태 배지 */}
      <span className="list-item-badge">{restaurant.status}</span>
    </div>
  );
}

export default RestaurantListItem;