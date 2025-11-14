import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AIPopup from '../components/AI_Popup';
import CategoryView from '../components/Category_View';

function HomePage() {
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);

  useEffect(() => {
    const popupCookie = Cookies.get('popupViewed');
    if (!popupCookie) {
      setIsAiPopupOpen(true);
    }
  }, []);

  const handleAiPopupClose = () => {
    setIsAiPopupOpen(false);
    Cookies.set('popupViewed', 'true', { expires: 1 });
  };
  const handleAiPopupLike = () => {
    console.log('AI 추천 좋아요!');
    handleAiPopupClose();
  };

  const todayRecommendation = { 
    id: 1, 
    name: 'OOO부대찌개', 
    menu: '부대찌개', 
    price: 11000 
  };
  
  return (
    <div>
      {isAiPopupOpen && (
        <AIPopup 
          restaurant={todayRecommendation} 
          onClose={handleAiPopupClose}
          onLike={handleAiPopupLike}
        />
      )}
      <CategoryView />
    </div>
  );
}

export default HomePage;