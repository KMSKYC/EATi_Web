import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AIPopup from '../components/AI_Popup';
import CategoryView from '../components/Category_View';
import AICard from '../components/AI_Card';

function HomePage() {
const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('all');
  
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
    price: 11000,
    category: '한식',
    description: '얼큰하고 맛있는 부대찌개',
    imageUrl: 'https://i.imgur.com/example.jpg'
  };
  
  const mockCardData = [
    { id: 10, category: '한식', menu: '김치짜개', description: '얼큰하고 맛있는 김치짜개', imageUrl: 'https://i.imgur.com/example1.jpg' },
    { id: 11, category: '일식', menu: '라면', description: '진한 국물과 쫄깃한 면발', imageUrl: 'https://i.imgur.com/example2.jpg' },
    { id: 12, category: '기타', menu: '짜파게티', description: '설명이 필요없는 그 맛', imageUrl: 'https://i.imgur.com/example3.jpg' },
    { id: 13, category: '양식', menu: '치즈버거', description: '육즙 가득한 패티', imageUrl: 'https://i.imgur.com/example4.jpg' },
  ];

  return (
    <div>
      {/* {isAiPopupOpen && ( )} */}
        
        <div className="hero-section">
        <h2>오늘의 점심, AI가 추천해드려요</h2>
        <p>당신의 취향을 학습하고, 기분에 맞는 완벽한 점심 메뉴를 찾아드립니다</p>
        <button className="hero-btn" onClick={() => setIsAiPopupOpen(true)}>
          ✨ AI 추천 받기
        </button>
        </div>

        {/* <AIPopup 
          restaurant={todayRecommendation} 
          onClose={handleAiPopupClose}
          onLike={handleAiPopupLike}
        /> */}
      <CategoryView 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="card-grid">
        {mockCardData.map((item) => (
          <AICard key={item.id} restaurant={item} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;