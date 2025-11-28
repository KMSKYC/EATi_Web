import React from 'react';
// (★) 이 CSS 파일에 고퀄리티 디자인이 정의되어 있습니다.
import '../css/AI_Card.css'; 

function AICard(props) {
  const { restaurant } = props;

  if (!restaurant) {
    return null;
  }

  return (
    // (★) 1. 외곽 래퍼 클래스를 'ai-card-item'으로 변경 (그림자/애니메이션 기준)
    <div className="ai-card-item">
      {/* (★) 2. 이미지와 뱃지를 담을 래퍼 (비율, 오버플로우 관리) */}
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
    </div>
  );
}

export default AICard;