import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RandomPickPage.css';

function RandomPickPage() {
  const navigate = useNavigate();
  
  // 데이터
  const recommendations = [
    {
      id: 1,
      name: "매콤 로제 떡볶이",
      tags: ["#스트레스해소", "#매운맛", "#꾸덕함"],
      matchScore: 92,
      description: "오늘같이 흐린 날엔 매콤하고 부드러운 로제 소스가 딱이에요. 지민님이 평소 즐겨찾는 맵기입니다.",
      imageUrl: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "육즙 가득 수제버거",
      tags: ["#미국맛", "#헤비급", "#치즈듬뿍"],
      matchScore: 88,
      description: "진한 육향을 느끼고 싶다면 추천해요. 체다 치즈가 듬뿍 들어가 풍미가 살아있습니다.",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "숙성 연어 덮밥",
      tags: ["#다이어트", "#프레시", "#혼밥딱"],
      matchScore: 95,
      description: "가볍지만 든든한 한 끼! 신선한 연어의 감칠맛이 입맛을 돋워줄 거예요.",
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = recommendations[currentIndex];

  const handlePass = () => {
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("모든 추천을 확인했습니다! 다시 처음으로 돌아갑니다.");
      setCurrentIndex(0);
    }
  };

  const handleLike = () => {
    navigate(`/restaurant/${currentItem.id}`);
  };

  return (
    <div className="random-page-container">
      
      {/* 배경에 깔리는 블러 이미지 (고급스러운 느낌 연출) */}
      <div className="bg-blur-layer" style={{ backgroundImage: `url(${currentItem.imageUrl})` }}></div>

      {/* 중앙 메인 카드 (웹 표준 사이즈) */}
      <div className="random-main-card">
        
        {/* [Left] 이미지 영역 */}
        <div className="card-left-section">
            <img src={currentItem.imageUrl} alt={currentItem.name} className="main-food-img" />
            <div className="img-overlay-gradient"></div>
            <button onClick={() => navigate(-1)} className="close-btn-overlay">✕ 닫기</button>
        </div>

        {/* [Right] 정보 및 컨트롤 영역 */}
        <div className="card-right-section">
            
            {/* 상단: 진행 상태 */}
            <div className="status-bar">
                <span className="analysis-badge">✨ AI 취향 분석 중</span>
                <span className="page-count">{currentIndex + 1} / {recommendations.length}</span>
            </div>

            {/* 메인 텍스트 */}
            <div className="text-content">
                <h1 className="menu-title">{currentItem.name}</h1>
                <div className="tags-wrapper">
                    {currentItem.tags.map((tag, idx) => (
                        <span key={idx} className="tag-pill">{tag}</span>
                    ))}
                </div>
                <p className="ai-desc">"{currentItem.description}"</p>
            </div>

            {/* AI 적합도 그래프 */}
            <div className="ai-score-container">
                <div className="score-label">
                    <span>AI 예측 적합도</span>
                    <span className="score-num">{currentItem.matchScore}%</span>
                </div>
                <div className="score-track">
                    <div className="score-fill" style={{ width: `${currentItem.matchScore}%` }}></div>
                </div>
            </div>

            {/* 하단 버튼 (좋아요 / 싫어요) */}
            <div className="control-buttons">
                <button className="ctrl-btn pass" onClick={handlePass}>
                    <span className="icon">✕</span>
                    <span className="label">다른 거</span>
                </button>
                <button className="ctrl-btn like" onClick={handleLike}>
                    <span className="icon">♥</span>
                    <span className="label">이거 먹을래요</span>
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default RandomPickPage;