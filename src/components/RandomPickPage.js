import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
import './css/RandomPickPage.css';

const MAX_CALLS = 3;

function RandomPickPage() {
  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [currentRound, setCurrentRound] = useState(MAX_CALLS);

  const fetchRandomMenu = async ({ initial = false } = {}) => {
    try {
      if (initial) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const data = await foodApi.getRandomMenu();
      setCurrentMenu(data);
      setError(null);
    } catch (err) {
      console.error('랜덤 메뉴 조회 실패:', err);
      setError('메뉴를 불러오는데 실패했습니다.');
    } finally {
      if (initial) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchRandomMenu({ initial: true });
  }, []);

  const menuTitle = currentMenu?.name || currentMenu?.menuName || '오늘의 메뉴';
  const menuDescription =
    currentMenu?.description || '오늘 컨디션에 맞는 메뉴를 가볍게 골라봤어요.';
  const menuId = currentMenu?.menuId || currentMenu?.id;
  const menuImage =
    currentMenu?.imageUrl ||
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80';

  const score = useMemo(() => {
    const value = Number(currentMenu?.matchScore);
    if (Number.isFinite(value)) {
      return Math.max(55, Math.min(99, Math.round(value)));
    }
    return 92;
  }, [currentMenu?.matchScore]);

  const tags = useMemo(() => {
    if (Array.isArray(currentMenu?.tags) && currentMenu.tags.length > 0) {
      return currentMenu.tags.slice(0, 4);
    }
    return ['오늘픽', '랜덤추천', '메뉴탐색'];
  }, [currentMenu?.tags]);

  const handlePass = async () => {
    if (refreshing) return;

    if (currentRound > 1) {
      setCurrentRound((prev) => prev - 1);
      await fetchRandomMenu({ initial: false });
    } else {
      setCurrentRound(0);
    }
  };

  const handlePick = () => {
    if (!menuId) return;
    navigate(`/menu/${menuId}/restaurants`);
  };

  const handleRetry = async () => {
    setCurrentRound(MAX_CALLS);
    await fetchRandomMenu({ initial: true });
  };

  if (loading) {
    return (
      <div className="random-page-container">
        <section className="random-state-card">
          <p className="state-kicker">RANDOM MENU</p>
          <h1 className="state-title">메뉴 고르는 중</h1>
          <p className="state-text">잠깐만요. 오늘 먹기 좋은 메뉴를 찾고 있어요.</p>
          <div className="loading-bar">
            <span />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="random-page-container">
        <section className="random-state-card">
          <p className="state-kicker">RANDOM MENU</p>
          <h1 className="state-title">잠시 문제가 생겼어요</h1>
          <p className="state-text">{error}</p>
          <div className="state-actions">
            <button className="action-btn secondary" onClick={handleRetry}>
              다시 시도
            </button>
            <button className="action-btn primary" onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (currentRound === 0) {
    return (
      <div className="random-page-container">
        <section className="random-state-card">
          <p className="state-kicker">RANDOM MENU</p>
          <h1 className="state-title">오늘의 랜덤 추천 완료</h1>
          <p className="state-text">
            3번 모두 확인했어요. 지금 본 메뉴 중에서 고르거나 다시 시작해보세요.
          </p>
          <div className="state-actions">
            <button className="action-btn secondary" onClick={handleRetry}>
              다시 시작
            </button>
            <button className="action-btn primary" onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (!currentMenu) {
    return (
      <div className="random-page-container">
        <section className="random-state-card">
          <p className="state-kicker">RANDOM MENU</p>
          <h1 className="state-title">추천할 메뉴가 없습니다</h1>
          <p className="state-text">잠시 후 다시 시도해 주세요.</p>
          <div className="state-actions">
            <button className="action-btn secondary" onClick={handleRetry}>
              다시 시도
            </button>
            <button className="action-btn primary" onClick={() => navigate('/menu')}>
              메뉴 보러가기
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="random-page-container">
      <section className="random-stage">
        <header className="random-stage-top">
          <button className="stage-back-btn" onClick={() => navigate(-1)}>
            ← 돌아가기
          </button>
          <div className="stage-count-box">
            <strong>{currentRound}</strong>
            <span>/ {MAX_CALLS}회 남음</span>
          </div>
        </header>

        <div className="random-grid">
          <figure className={`random-visual ${refreshing ? 'is-busy' : ''}`}>
            <img src={menuImage} alt={menuTitle} className="main-food-img" />
            {refreshing && <div className="visual-loading">다시 고르는 중...</div>}
          </figure>

          <article className={`random-panel ${refreshing ? 'is-busy' : ''}`}>
            <p className="panel-kicker">RANDOM RECOMMEND</p>
            <h1 className="menu-title">{menuTitle}</h1>
            <p className="panel-desc">{menuDescription}</p>

            <div className="tags-wrapper">
              {tags.map((tag, idx) => (
                <span key={`${tag}-${idx}`} className="tag-pill">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="score-section">
              <div className="score-label">
                <span>취향 적합도</span>
                <span className="score-num">{score}%</span>
              </div>
              <div className="score-track">
                <div className="score-fill" style={{ width: `${score}%` }} />
              </div>
            </div>

            <div className="panel-actions">
              <button
                className="action-btn secondary"
                onClick={handlePass}
                disabled={refreshing}
              >
                다시 뽑기
              </button>
              <button
                className="action-btn primary"
                onClick={handlePick}
                disabled={refreshing || !menuId}
              >
                이 메뉴 보기
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default RandomPickPage;
