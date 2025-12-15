import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CurationPage.css'; // (★) 아래 CSS 파일 생성 필요

function CurationPage() {
  const navigate = useNavigate();

  // 큐레이션 전체 데이터 리스트
  const curationList = [
    { id: 'stress', title: '스트레스 타파', desc: '매운맛으로 스트레스 날리기', tags: ['#매운맛', '#얼큰', '#땀뻘뻘'], icon: '😤' },
    { id: 'light', title: '가벼운 한 끼', desc: '부담없이 건강하게', tags: ['#샐러드', '#다이어트', '#포케'], icon: '🥗' },
    { id: 'alone', title: '혼밥하기 좋은', desc: '나만의 맛있는 시간', tags: ['#혼밥', '#바테이블', '#조용함'], icon: '🍜' },
    { id: 'date', title: '데이트 코스', desc: '분위기 좋은 맛집', tags: ['#파스타', '#스테이크', '#뷰맛집'], icon: '💑' },
    { id: 'gathering', title: '회식/모임', desc: '단체로 가기 좋은 곳', tags: ['#룸있음', '#단체석', '#고기집'], icon: '🎉' },
    { id: 'late', title: '야식 땡길 때', desc: '늦은 밤 든든하게', tags: ['#새벽영업', '#치킨', '#족발'], icon: '🌙' },
    { id: 'hangover', title: '해장이 필요해', desc: '속 풀어주는 따뜻한 국물', tags: ['#국밥', '#쌀국수', '#해장국'], icon: '🍲' },
    { id: 'budget', title: '가성비 甲', desc: '저렴하고 맛있게', tags: ['#만원이하', '#학생추천', '#푸짐'], icon: '💰' },
    { id: 'special', title: '특별한 날', desc: '기념일 & 생일 맛집', tags: ['#오마카세', '#파인다이닝', '#예약필수'], icon: '🎂' },
    { id: 'quick', title: '빠르게 한 끼', desc: '시간 없을 때 후딱', tags: ['#패스트푸드', '#김밥', '#덮밥'], icon: '⚡' },
    { id: 'comfort', title: '집밥 느낌', desc: '엄마가 해준 것 같은', tags: ['#백반', '#한정식', '#반찬맛집'], icon: '🏠' },
    { id: 'dessert', title: '당 충전 완료', desc: '식사 후 달콤한 마무리', tags: ['#카페', '#케이크', '#빙수'], icon: '🍰' },
  ];

  const handleCardClick = (id) => {
    console.log("", id)
    navigate(`/curation/${id}`);
  };

  return (
    <div className="curation-page-container">
      
      {/* 1. 헤더 (뒤로가기 + 타이틀) */}
      <div className="curation-page-header">
        <button onClick={() => navigate(-1)} className="back-btn-unified">←</button>
        <div className="header-text">
          <h2 className="header-title">상황별 추천 큐레이션</h2>
          <p className="header-subtitle">지금 내 기분과 상황에 딱 맞는 메뉴를 골라보세요</p>
        </div>
      </div>

      {/* 2. 큐레이션 그리드 리스트 */}
      <div className="curation-grid-full">
        {curationList.map((item) => (
          <div 
            key={item.id} 
            className="curation-card-full"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="card-icon-area">
              <span className="card-icon-emoji">{item.icon}</span>
            </div>
            <div className="card-content-area">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
              <div className="card-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag-badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CurationPage;