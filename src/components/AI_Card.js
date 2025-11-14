import React from 'react';
import '../css/AI_Card.css';

function AICard(props) {
  const restaurant = props.restaurant;

  if (!restaurant) {
    return null;
  }

  return (
    <div className="aiCard">
      <h2>오늘은 [{restaurant.menu}] 어떠세요?</h2>
      <p>🤖 AI 추천 이유: 날씨 (비)</p> 
      <p>📍 [{restaurant.name}]</p>
      <p>💸 {restaurant.price}원</p>
    </div>
  );
}

// 이 컴포넌트를 다른 파일에서 쓸 수 있게 '수출'합니다.
export default AICard;