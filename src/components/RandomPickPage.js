import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
import './css/RandomPickPage.css';

function RandomPickPage() {
  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRound, setCurrentRound] = useState(3);
  const MAX_CALLS = 3;

  const fetchRandomMenu = async () => {
    try {
      setLoading(true);
      const data = await foodApi.getRandomMenu();
      setCurrentMenu(data);
      setError(null);
    } catch (err) {
      console.error('랜덤 메뉴 조회 실패:', err);
      setError('메뉴를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMenu();
  }, []);

  if (loading) {
    return (
      <div className="random-page-container">
        <div className="loading-message">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="random-page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  // 3번 모두 사용한 경우
  if (currentRound === 0) {
    return (
      <div className="random-page-container">
        <div className="random-main-card" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div className="card-right-section" style={{ textAlign: 'center', width: '100%' }}>
            <div className="text-content">
              <h1 className="menu-title">오늘 추천 끝났어요! 🎉</h1>
              <p className="ai-desc">내일 다시 새로운 메뉴를 추천해드릴게요</p>
            </div>
            <div className="control-buttons" style={{ justifyContent: 'center' }}>
              <button className="ctrl-btn like" onClick={() => navigate(-1)}>
                <span className="label">돌아가기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentMenu && !loading) {
    return (
      <div className="random-page-container">
        <div className="error-message">추천할 메뉴가 없습니다.</div>
      </div>
    );
  }

  const handlePass = () => {
    if (currentRound > 1) {
      // 남은 횟수가 있으면 새로운 메뉴 가져오기
      setCurrentRound(prev => prev - 1);
      fetchRandomMenu();
    } else {
      // currentRound === 1일 때 "다른 거" 누르면 종료 화면으로
      setCurrentRound(0);
    }
  };

  const handleLike = () => {
    navigate(`/restaurant/${currentMenu.id}`);
  };

  const defaultImage = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80";
  const menuImage = currentMenu.imageUrl || defaultImage;

  return (
    <div className="random-page-container">

      {/* 배경에 깔리는 블러 이미지 */}
      <div className="bg-blur-layer" style={{ backgroundImage: `url(${menuImage})` }}></div>

      {/* 중앙 메인 카드 (웹 표준 사이즈) */}
      <div className="random-main-card">

        {/* [Left] 이미지 영역 */}
        <div className="card-left-section">
            <img src={menuImage} alt={currentMenu.name} className="main-food-img" />
            <div className="img-overlay-gradient"></div>
            <button onClick={() => navigate(-1)} className="close-btn-overlay">✕ 닫기</button>
        </div>

        {/* [Right] 정보 및 컨트롤 영역 */}
        <div className="card-right-section">

            {/* 상단: 진행 상태 */}
            <div className="status-bar">
                <span className="analysis-badge">🤖 AI 취향 분석 중</span>
                <span className="page-count">{currentRound} / {MAX_CALLS}</span>
            </div>

            {/* 메인 텍스트 */}
            <div className="text-content">
                <h1 className="menu-title">{currentMenu.name || currentMenu.menuName}</h1>
                <div className="tags-wrapper">
                    {currentMenu.tags && currentMenu.tags.map((tag, idx) => (
                        <span key={idx} className="tag-pill">{tag}</span>
                    ))}
                </div>
                <p className="ai-desc">"{currentMenu.description || '맛있는 메뉴를 추천해드려요!'}"</p>
            </div>

            {/* AI 적합도 그래프 */}
            <div className="ai-score-container">
                <div className="score-label">
                    <span>AI 예측 적합도</span>
                    <span className="score-num">{currentMenu.matchScore || 95}%</span>
                </div>
                <div className="score-track">
                    <div className="score-fill" style={{ width: `${currentMenu.matchScore || 95}%` }}></div>
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