import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RankingPage.css';

function RankingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');

  const [ageFilter, setAgeFilter] = useState('20대');
  const [regionFilter, setRegionFilter] = useState('강남');

  // 1. 전체 메뉴 랭킹 데이터
  const menuRankings = [
    { id: 1, rank: 1, name: '마라 로제 떡볶이', diff: '-', score: 98, img: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600&q=80' },
    { id: 2, rank: 2, name: '숙성 삼겹살', diff: '▲1', score: 95, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
    { id: 3, rank: 3, name: '바질 크림 파스타', diff: '▼1', score: 91, img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80' },
    { id: 4, rank: 4, name: '후토마키', diff: 'NEW', score: 88, img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' },
    { id: 5, rank: 5, name: '치즈 돈카츠', diff: '-', score: 85, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
  ];

  // 2. 연령별 데이터
  const getAgeData = () => {
    if (ageFilter === '10대') return [
      { id: 101, rank: 1, name: '탕후루', diff: '-', score: 99, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
      { id: 102, rank: 2, name: '마라탕', diff: '▲2', score: 96, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' },
      { id: 103, rank: 3, name: '떡볶이', diff: '▼1', score: 94, img: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&q=80' },
      { id: 104, rank: 4, name: '치킨', diff: '-', score: 91, img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80' },
    ];
    if (ageFilter === '20대') return [
      { id: 111, rank: 1, name: '마라탕', diff: '-', score: 99, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80' },
      { id: 112, rank: 2, name: '하이볼', diff: 'NEW', score: 95, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
      { id: 113, rank: 3, name: '연어 초밥', diff: '▲1', score: 92, img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' },
      { id: 114, rank: 4, name: '파스타', diff: '▼1', score: 89, img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80' },
    ];
    if (ageFilter === '30대') return [
      { id: 121, rank: 1, name: '숙성 삼겹살', diff: '-', score: 98, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
      { id: 122, rank: 2, name: '스테이크', diff: '▲1', score: 95, img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80' },
      { id: 123, rank: 3, name: '와인', diff: '▼1', score: 92, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
      { id: 124, rank: 4, name: '오마카세', diff: 'NEW', score: 90, img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80' },
    ];
    return [
      { id: 131, rank: 1, name: '평양냉면', diff: '-', score: 96, img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80' },
      { id: 132, rank: 2, name: '국밥', diff: '-', score: 93, img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80' },
      { id: 133, rank: 3, name: '한정식', diff: '▲2', score: 90, img: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=400&q=80' },
      { id: 134, rank: 4, name: '아구찜', diff: '▼1', score: 88, img: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80' },
    ];
  };

  // 3. 지역별 데이터
  const getRegionData = () => {
    if (regionFilter === '강남') return [
      { id: 201, rank: 1, name: '쉐이크쉑 버거', diff: '-', score: 97, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
      { id: 202, rank: 2, name: '땀땀 쌀국수', diff: '▲1', score: 94, img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80' },
      { id: 203, rank: 3, name: '고든램지 버거', diff: 'NEW', score: 91, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
      { id: 204, rank: 4, name: '스시 오마카세', diff: '▼1', score: 88, img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
    ];
    if (regionFilter === '홍대') return [
      { id: 211, rank: 1, name: '연남토마 파스타', diff: '-', score: 98, img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80' },
      { id: 212, rank: 2, name: '랜디스 도넛', diff: '▲2', score: 95, img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' },
      { id: 213, rank: 3, name: '이자카야', diff: '-', score: 92, img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80' },
      { id: 214, rank: 4, name: '타코', diff: 'NEW', score: 89, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
    ];
    if (regionFilter === '성수') return [
      { id: 221, rank: 1, name: '브런치 카페', diff: '-', score: 97, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80' },
      { id: 222, rank: 2, name: '수제 버거', diff: '-', score: 94, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
      { id: 223, rank: 3, name: '크래프트 맥주', diff: '▲1', score: 91, img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&q=80' },
      { id: 224, rank: 4, name: '디저트 카페', diff: '▼1', score: 88, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    ];
    return [
      { id: 231, rank: 1, name: '이태원 타코', diff: '-', score: 96, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
      { id: 232, rank: 2, name: '케밥', diff: '▲1', score: 93, img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
      { id: 233, rank: 3, name: '루프탑 바', diff: 'NEW', score: 90, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
      { id: 234, rank: 4, name: '브런치', diff: '▼2', score: 87, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80' },
    ];
  };

  // 랭킹 카드 컴포넌트
  const RankItem = ({ item, showImage = true }) => (
    <div className="rank-item-card" onClick={() => navigate(`/restaurant/${item.id}`)}>
      {showImage && item.img && (
        <div className="rank-img-wrapper">
          <img src={item.img} alt={item.name} />
        </div>
      )}
      <div className={`rank-badge rank-${item.rank}`}>{item.rank}</div>
      <div className="rank-info">
        <h3>{item.name}</h3>
        <p>인기 점수 <span className="score-highlight">{item.score}</span></p>
      </div>
      <div className={`rank-diff ${item.diff === 'NEW' ? 'new' : item.diff?.includes('▲') ? 'up' : item.diff?.includes('▼') ? 'down' : ''}`}>
        {item.diff || '-'}
      </div>
    </div>
  );

  return (
    <div className="ranking-page-container">
      {/* 히어로 섹션 */}
      <section className="ranking-hero-section">
        <div className="ranking-hero-content">
          <span className="ranking-badge">실시간 랭킹</span>
          <h1>지금 가장 핫한 메뉴</h1>
          <p>실시간으로 업데이트되는 인기 메뉴 순위를 확인하세요</p>
        </div>
        <div className="ranking-hero-bg"></div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="ranking-main-content">
        {/* 메인 탭 메뉴 */}
        <div className="ranking-tabs">
          <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
            전체 인기
          </button>
          <button className={activeTab === 'age' ? 'active' : ''} onClick={() => setActiveTab('age')}>
            연령별
          </button>
          <button className={activeTab === 'region' ? 'active' : ''} onClick={() => setActiveTab('region')}>
            지역별
          </button>
        </div>

        {/* 탭 내용 영역 */}
        <div className="ranking-content">

          {/* 1. 전체 인기 탭 */}
          {activeTab === 'menu' && (
            <div className="ranking-grid">
              {/* 1위 하이라이트 */}
              <div className="top-rank-card" onClick={() => navigate(`/restaurant/${menuRankings[0].id}`)}>
                <div className="top-rank-img">
                  <img src={menuRankings[0].img} alt={menuRankings[0].name} />
                  <div className="top-rank-overlay"></div>
                </div>
                <div className="top-rank-badge">1</div>
                <div className="top-rank-info">
                  <span className="crown-icon">👑</span>
                  <h2>{menuRankings[0].name}</h2>
                  <p>인기 점수 {menuRankings[0].score}</p>
                </div>
              </div>

              {/* 2~5위 리스트 */}
              <div className="rank-list">
                <h3 className="list-title">TOP 5</h3>
                {menuRankings.slice(1).map(item => (
                  <RankItem key={item.id} item={item} showImage={true} />
                ))}
              </div>
            </div>
          )}

          {/* 2. 연령별 탭 */}
          {activeTab === 'age' && (
            <div className="filter-section">
              <div className="sub-filter">
                {['10대', '20대', '30대', '40대+'].map(age => (
                  <button
                    key={age}
                    className={ageFilter === age ? 'on' : ''}
                    onClick={() => setAgeFilter(age)}
                  >
                    {age}
                  </button>
                ))}
              </div>
              <div className="ranking-grid">
                {/* 1위 하이라이트 */}
                <div className="top-rank-card" onClick={() => navigate(`/restaurant/${getAgeData()[0].id}`)}>
                  <div className="top-rank-img">
                    <img src={getAgeData()[0].img} alt={getAgeData()[0].name} />
                    <div className="top-rank-overlay"></div>
                  </div>
                  <div className="top-rank-badge">1</div>
                  <div className="top-rank-info">
                    <span className="crown-icon">👑</span>
                    <h2>{getAgeData()[0].name}</h2>
                    <p>인기 점수 {getAgeData()[0].score}</p>
                  </div>
                </div>

                {/* 2~4위 리스트 */}
                <div className="rank-list">
                  <h3 className="list-title">{ageFilter} 인기 TOP 4</h3>
                  {getAgeData().slice(1).map(item => (
                    <RankItem key={item.id} item={item} showImage={true} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. 지역별 탭 */}
          {activeTab === 'region' && (
            <div className="filter-section">
              <div className="sub-filter">
                {['강남', '홍대', '성수', '이태원'].map(loc => (
                  <button
                    key={loc}
                    className={regionFilter === loc ? 'on' : ''}
                    onClick={() => setRegionFilter(loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
              <div className="ranking-grid">
                {/* 1위 하이라이트 */}
                <div className="top-rank-card" onClick={() => navigate(`/restaurant/${getRegionData()[0].id}`)}>
                  <div className="top-rank-img">
                    <img src={getRegionData()[0].img} alt={getRegionData()[0].name} />
                    <div className="top-rank-overlay"></div>
                  </div>
                  <div className="top-rank-badge">1</div>
                  <div className="top-rank-info">
                    <span className="crown-icon">👑</span>
                    <h2>{getRegionData()[0].name}</h2>
                    <p>인기 점수 {getRegionData()[0].score}</p>
                  </div>
                </div>

                {/* 2~4위 리스트 */}
                <div className="rank-list">
                  <h3 className="list-title">{regionFilter} 인기 TOP 4</h3>
                  {getRegionData().slice(1).map(item => (
                    <RankItem key={item.id} item={item} showImage={true} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RankingPage;
