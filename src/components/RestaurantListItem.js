import React from 'react';
import { Link } from 'react-router-dom';
import '../css/RestaurantListItem.css'; // (★) 새로 만들 CSS 파일 import

function RestaurantListItem({ restaurant }) {
  if (!restaurant) return null;

  return (
    // (★) 가로형 카드
    <Link to={`/restaurant/${restaurant.id}`} className="list-item-card">
      <img src={restaurant.imageUrl} alt={restaurant.name} className="list-item-image" />
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
    </Link>
  );
}

export default RestaurantListItem;