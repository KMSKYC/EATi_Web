import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AICard from './AI_Card'; // 홈 화면에서 쓰던 카드 재사용
import './css/CurationDetailPage.css'; // (★) 아래 CSS 파일 생성 필요

function CurationDetailPage() {
  const { id } = useParams(); // URL에서 테마 ID 가져오기 (예: 'stress')
  const navigate = useNavigate();

  // 테마별 정보 데이터 (제목, 설명, 아이콘, 배경색)
  const themeInfo = {
    stress: { title: '스트레스 타파! 🔥', desc: '매운맛으로 땀 흘리고 스트레스 날려버리세요.', icon: '😤', color: '#fff0f0' },
    light: { title: '가벼운 한 끼 🥗', desc: '속 편하고 부담 없는 건강 식단 모음.', icon: '🥑', color: '#f0f9f0' },
    alone: { title: '프로 혼밥러 🍜', desc: '눈치 안 보고 혼자서도 맛있게!', icon: '🎧', color: '#f5f5f5' },
    date: { title: '로맨틱 데이트 🍷', desc: '성공적인 데이트를 위한 분위기 맛집.', icon: '💕', color: '#fff0f5' },
    // ... 필요한 만큼 추가 (기본값 처리 되어 있음)
  };

  const currentTheme = themeInfo[id] || { 
    title: '테마 맛집 모음 ✨', 
    desc: '엄선된 맛집 리스트를 확인해보세요.', 
    icon: '🍽️', 
    color: '#f8f9fa' 
  };

  // 더미 식당 데이터 (실제로는 API로 받아오겠지만, 지금은 예시로)
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const dummyData = Array(8).fill().map((_, i) => ({
      id: i + 1,
      name: id === 'stress' ? `매운 갈비찜 ${i+1}호점` : `맛집 ${i+1}호점`,
      category: id === 'stress' ? '한식' : '퓨전',
      matchScore: 90 - i, // 매칭 점수
      distance: `${(i + 1) * 100}m`,
      imageUrl: `https://source.unsplash.com/featured/?food,${id},${i}`, // 테마 키워드로 이미지 랜덤
      description: "입맛 돋우는 최고의 선택!"
    }));
    setRestaurantList(dummyData);
  }, [id]);


  return (
    <div className="curation-detail-container">
      <div className="theme-header" style={{ backgroundColor: currentTheme.color }}>
        <button onClick={() => navigate(-1)} className="back-btn-theme">←</button>
        <div className="theme-title-area">
          <span className="theme-icon-large">{currentTheme.icon}</span>
          <h1>{currentTheme.title}</h1>
          <p>{currentTheme.desc}</p>
        </div>
      </div>

      {/* 2. 맛집 리스트 그리드 */}
      <div className="theme-content-wrapper">
        <div className="list-status">
          <span className="count-badge">총 {restaurantList.length}곳</span>
          <span className="sort-option">추천순 ▾</span>
        </div>

        <div className="theme-grid">
          {restaurantList.map((item) => (
             <AICard 
               key={item.id}
               restaurant={item}
             />
          ))}
        </div>
      </div>

    </div>
  );
}

export default CurationDetailPage;