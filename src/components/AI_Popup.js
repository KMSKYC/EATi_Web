import React from 'react';
import AICard from './AI_Card'; // (경로 맞게 수정)
import '../css/AI_Popup.css'

function AIPopup(props) {
  const { restaurant, onClose, onLike } = props;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" > 
        <button className="close-x-btn" onClick={onClose}>
            &times;
        </button>
        
        <h3>✨ AI가 추천하는 오늘의 메뉴! ✨</h3>
        <AICard restaurant={restaurant} />
        
        <div className="popup-buttons">
          <button className="popup-btn-like" onClick={onLike}>
            좋아요 👍
          </button>
          <button className="popup-btn-dislike" onClick={onClose}>
            싫어요
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIPopup;