import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth';
import './css/RestaurantDetailPage1.css';

function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const withAuth = useRequireAuth();
  
  // 디자인 확인용 데이터
  const restaurant = {
    name: "바질 크림 파스타",
    description: "어제 야근하느라 고생하셨죠? 오늘은 고칼로리로 보상받으세요!",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    restaurantName: "다운타우너 안국",
    distance: "450m",
    rating: 4.8,
    reviewCount: 1204,
    matchScore: 78
  };

  return (
    <div className="detail-container">
      {/* 1. 상단 히어로 이미지 */}
      <div 
        className="detail-hero" 
        style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
      >
        <div className="hero-overlay">
          <button onClick={() => navigate(-1)} className="back-arrow">←</button>
          <div className="hero-text-content">
            <span className="today-badge">TODAY'S CHOICE</span>
            <h1 className="menu-title">{restaurant.name}</h1>
            <p className="menu-desc">"{restaurant.description}"</p>
          </div>
        </div>
      </div>

      {/* 2. 흰색 정보 카드 */}
      <div className="content-card">
        
        {/* (1) 매칭 포인트 */}
        <div className="info-section">
          {/* 텍스트 영역: 확실하게 위아래 배치 */}
          <div className="info-text-group">
            <h3>매칭 포인트</h3>
            <p>지민님의 입맛 + 날씨 + 기분 분석 결과</p>
          </div>
          <div className="score-circle">
            <span className="score-num">{restaurant.matchScore}%</span>
          </div>
        </div>

        {/* (2) 맛 분석 프로필 (정교한 오각형 차트) */}
        <div className="chart-section">
          <h3>맛 분석 프로필</h3>
          <div className="chart-box">
             {/* SVG 레이더 차트 */}
             <svg viewBox="0 0 240 220" className="radar-chart-svg">
               {/* --- 1. 배경 가이드라인 (회색 오각형들) --- */}
               <g stroke="#eee" strokeWidth="1" fill="none">
                 {/* 가장 바깥 오각형 */}
                 <polygon points="120,20 215,90 179,200 61,200 25,90" />
                 {/* 중간 오각형 */}
                 <polygon points="120,56 177,98 155,164 85,164 63,98" />
                 {/* 안쪽 오각형 */}
                 <polygon points="120,92 139,106 132,128 108,128 101,106" />
                 {/* 중심선 */}
                 <line x1="120" y1="110" x2="120" y2="20" />  {/* 매운맛 */}
                 <line x1="120" y1="110" x2="215" y2="90" />  {/* 단맛 */}
                 <line x1="120" y1="110" x2="179" y2="200" /> {/* 짠맛 */}
                 <line x1="120" y1="110" x2="61" y2="200" />  {/* 감칠맛 */}
                 <line x1="120" y1="110" x2="25" y2="90" />   {/* 신맛 */}
               </g>

               {/* --- 2. 데이터 영역 --- */}
               
               {/* [내 취향] 보라색 점선 그래프 */}
               <polygon points="120,40 190,95 160,180 80,180 45,95" 
                        fill="rgba(150, 100, 255, 0.1)" 
                        stroke="#a890f0" strokeWidth="2" strokeDasharray="4 2" />
               {/* 보라색 꼭짓점 */}
               <g fill="#a890f0">
                 <circle cx="120" cy="40" r="3" /> <circle cx="190" cy="95" r="3" />
                 <circle cx="160" cy="180" r="3" /> <circle cx="80" cy="180" r="3" />
                 <circle cx="45" cy="95" r="3" />
               </g>

               {/* [이 메뉴] 주황색 실선 그래프 */}
               <polygon points="120,30 180,120 170,190 70,170 50,110" 
                        fill="rgba(255, 127, 80, 0.25)" 
                        stroke="#ff7f50" strokeWidth="2.5" />
               {/* 주황색 꼭짓점 */}
               <g fill="#ff7f50" stroke="white" strokeWidth="1">
                 <circle cx="120" cy="30" r="4" /> <circle cx="180" cy="120" r="4" />
                 <circle cx="170" cy="190" r="4" /> <circle cx="70" cy="170" r="4" />
                 <circle cx="50" cy="110" r="4" />
               </g>

               {/* --- 3. 텍스트 라벨 (위치 조정됨) --- */}
               <text x="120" y="12" textAnchor="middle" fontSize="11" fill="#888">매운맛</text>
               <text x="225" y="90" textAnchor="start" fontSize="11" fill="#888">단맛</text>
               <text x="190" y="215" textAnchor="middle" fontSize="11" fill="#888">짠맛</text>
               <text x="50" y="215" textAnchor="middle" fontSize="11" fill="#888">감칠맛</text>
               <text x="15" y="90" textAnchor="end" fontSize="11" fill="#888">신맛</text>
             </svg>
             
             {/* 하단 범례 (Legend) */}
             <div className="chart-legend">
                <div className="legend-item">
                    <span className="dot orange"></span> 이 메뉴
                </div>
                <div className="legend-item">
                    <span className="dot purple-dashed"></span> 내 취향
                </div>
             </div>
          </div>
        </div>

        <hr className="divider" />

        {/* (3) 식당 정보 및 버튼 */}
        <div className="footer-section">
          <div className="store-info">
            <div>
              <h3 className="store-name">{restaurant.restaurantName}</h3>
              <span className="store-meta">수제버거 · 📍 {restaurant.distance}</span>
            </div>
            <div className="store-rating">
              ⭐ <strong>{restaurant.rating}</strong>
              <span className="review-count">리뷰 {restaurant.reviewCount}</span>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn-black">길찾기</button>
            <button className="btn-white" onClick={() => withAuth(() => alert('주문!'))}>
              배달 주문
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;