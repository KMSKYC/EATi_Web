import { useState, useEffect } from 'react';
import AICard from '../components/AI_Card';
import './css/HomePage.css';
import AIPopup from '../components/AI_Popup';
import { mockCards } from '../data/mockCards';

const POPUP_CLOSED_KEY = 'aiPopupClosed';

function HomePage() {
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
  const [todayRecommendation, setTodayRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('전체');

  // 목업 데이터 (API 실패 시 사용)
  const mockRecommendation = mockCards[0];

  // (★) 선택된 카테고리에 따라 필터링된 카드 리스트
  const filteredCards = activeCategory === '전체'
    ? mockCards
    : mockCards.filter(card => card.category === activeCategory);

useEffect(() => {
    // 1. (데이터 로딩 역할) API 호출 및 상태 설정 로직
    const fetchData = async () => {
        try {
            setLoading(true);
            // (실제 API 호출 주석 처리)
            // const data = await restaurantApi.getTodayRecommendation();
            // setTodayRecommendation(data);
            setTodayRecommendation(mockRecommendation); // 목업 데이터 사용
        } catch (err) {
            console.error("데이터 로딩 실패:", err);
            // setError("데이터 로딩에 실패했습니다."); // 에러 상태가 있다면 처리
            setTodayRecommendation(mockRecommendation);
        } finally {
            setLoading(false);
        }
    };
    // 데이터 로드 실행
    fetchData(); 

    // 2. (팝업 확인 역할) 로컬 스토리지 체크 로직
    const hasClosed = localStorage.getItem(POPUP_CLOSED_KEY);
    // 닫은 기록이 없으면 팝업 상태를 준비합니다.
    if (!hasClosed) {
        // setIsAiPopupOpen(true); // 버튼 클릭 유도이므로 주석 처리된 상태 유지
    }
    
}, []);

  const openAiPopup = () => {
    if (!localStorage.getItem(POPUP_CLOSED_KEY)) {
      setIsAiPopupOpen(true);
    } else {
      alert("오늘은 이미 AI 추천을 받았습니다.");
    }
  }
  const closeAiPopup = () => {
    setIsAiPopupOpen(false);
    localStorage.setItem(POPUP_CLOSED_KEY, 'true');
  }

  const handleAiLike = () => {
    console.log("좋아요 처리 로직 실행");
    closeAiPopup(); 
  };


  return (
    <div className="home-container">
      {/* 1. 메인 배너 영역 */}
      <section className="main-banner">
        <h2 className="banner-title">오늘의 점심, AI가 추천해드려요</h2>
        <p className="banner-description">
          당신의 취향을 학습하고, 기분에 맞는 완벽한 점심 메뉴를 찾아드립니다
        </p>
        <button className="ai-recommend-btn" onClick={openAiPopup}>
          ✨ AI 추천 받기
        </button>
        <div className="scroll-down-indicator">
          <span className="arrow-down"></span>
        </div>
      </section>

      {/* 2. 카테고리 필터 */}
      <section className="category-filter-section">
        <div className="category-tabs">
          {['전체', '한식', '일식', '중식', '양식', '기타'].map(category => (
            <button
              key={category}
              className={`category-tab-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. 추천 메뉴 카드 리스트 */}
      <section className="recommendation-cards-section">
        <div className="card-grid">
          {filteredCards.map(card => (
            <AICard 
              // key={card.id} 
              // title={card.title} 
              // category={card.category} 
              // description={card.description} 
              // imageUrl={card.imageUrl}
              key={card.id}
              restaurant={card}
            />
          ))}
        </div>
      </section>

     {isAiPopupOpen && (
      <AIPopup 
          restaurant={todayRecommendation}
          // isOpen={isAiPopupOpen} 
          onClose={closeAiPopup} // 'X'나 '싫어요' 버튼 클릭 시
          onLike={handleAiLike} 
        />
     )}
    </div>
  );
}

export default HomePage;