import React from 'react';
import { Link } from 'react-router-dom'
import '../css/AI_Card.css'; 

function AICard({restaurant}) {

  if (!restaurant) {
    return null;
  }

  return (
    <Link to={`/restaurant/${restaurant.id}`}className="ai-card-item">
      <div className="ai-card-image-wrapper">
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.menu}      
          className="ai-card-image"  
        />
        {/* (★) 3. 카테고리 뱃지 (이미지 위에 위치) */}
        <span className="ai-card-category-badge">{restaurant.category}</span>
      </div>
      
      {/* (★) 4. 텍스트 컨텐츠 영역 */}
      <div className="ai-card-content">
        {/* (★) 5. title과 description에 명확한 클래스 부여 */}
        <h3 className="ai-card-title">{restaurant.menu}</h3> 
        <p className="ai-card-description">{restaurant.description}</p>
      </div> 
    </Link>
  );
}

export default AICard;