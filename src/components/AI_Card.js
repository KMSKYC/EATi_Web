import React from 'react';
import { Link } from 'react-router-dom';
import './css/AI_Card.css'; 

function AICard({ restaurant }) {
  if (!restaurant) {
    return null;
  }

  // (팁) 이미지가 없을 때 보여줄 '임시 이미지 주소' (무료 이미지 사이트 활용)
const defaultImage = "https://placehold.co/300x200?text=No+Image";

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="ai-card-item">
      <div className="ai-card-image-wrapper">
        <img 
          // ✅ [수정] 이미지가 있으면 그거 쓰고, 없으면(null) 기본 이미지 보여줌
          src={restaurant.imageUrl || defaultImage} 
          alt={restaurant.menu || "메뉴 이미지"}      
          className="ai-card-image"  
        />
        {restaurant.category && (
          <span className="ai-card-category-badge">{restaurant.category}</span>
        )}
      </div>
      
      <div className="ai-card-content">
        {/* 제목이 없으면 '메뉴 이름 없음' 이라고라도 뜨게 처리 */}
        <h3 className="ai-card-title">{restaurant.menu || "메뉴 이름 없음"}</h3> 
        
        {/* 설명이 너무 길면 잘라주는 CSS가 있겠지만, 내용이 없을 때 대비 */}
        <p className="ai-card-description">
          {restaurant.description || "상세 설명이 없습니다."}
        </p>
      </div> 
    </Link>
  );
}

export default AICard;