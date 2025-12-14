import React from 'react';
import { Link } from 'react-router-dom';
import './css/AI_Card.css';

function AICard({ restaurant }) {
  if (!restaurant) {
    return null;
  }

  const hasImage = restaurant.imageUrl && restaurant.imageUrl.trim() !== '';

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="ai-card-item">
      <div className="ai-card-image-wrapper">
        {hasImage ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.menuName || "메뉴 이미지"}
            className="ai-card-image"
          />
        ) : (
          <div className="ai-card-placeholder">
            <span className="placeholder-emoji">🍽️</span>
          </div>
        )}
        {restaurant.category && (
          <span className="ai-card-category-badge">{restaurant.category}</span>
        )}
      </div>

      <div className="ai-card-content">
        <h3 className="ai-card-title">{restaurant.menuName || "메뉴 이름 없음"}</h3>
        <p className="ai-card-description">
          {restaurant.description || "상세 설명이 없습니다."}
        </p>
      </div>
    </Link>
  );
}

export default AICard;