import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RankingPage.css'; // CSS 파일 생성 필요

function RankingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu'); // 현재 탭 (menu | age | region)
  
  // 서브 필터 (나이대, 지역 선택용)
  const [ageFilter, setAgeFilter] = useState('20대');
  const [regionFilter, setRegionFilter] = useState('강남');

  // 1. 전체 메뉴 랭킹 데이터 (예시)
  const menuRankings = [
    { id: 1, rank: 1, name: '마라 로제 떡볶이', diff: '-', score: 98, img: 'https://source.unsplash.com/featured/?tteokbokki' },
    { id: 2, rank: 2, name: '숙성 삼겹살', diff: '▲1', score: 95, img: 'https://source.unsplash.com/featured/?pork' },
    { id: 3, rank: 3, name: '바질 크림 파스타', diff: '▼1', score: 91, img: 'https://source.unsplash.com/featured/?pasta' },
    { id: 4, rank: 4, name: '후토마키', diff: 'NEW', score: 88, img: 'https://source.unsplash.com/featured/?sushi' },
    { id: 5, rank: 5, name: '치즈 돈카츠', diff: '-', score: 85, img: 'https://source.unsplash.com/featured/?cutlet' },
  ];

  // 2. 연령별 데이터 (필터에 따라 바뀌는 척)
  const getAgeData = () => {
    // 실제로는 API 호출하겠지만 여기선 더미로
    if (ageFilter === '20대') return [
        { id: 11, rank: 1, name: '마라탕', score: 99 }, { id: 12, rank: 2, name: '탕후루', score: 95 }, { id: 13, rank: 3, name: '하이볼', score: 92 }
    ];
    return [
        { id: 21, rank: 1, name: '평양냉면', score: 96 }, { id: 22, rank: 2, name: '국밥', score: 93 }, { id: 23, rank: 3, name: '아구찜', score: 90 }
    ];
  };

  // 3. 지역별 데이터
  const getRegionData = () => {
    if (regionFilter === '강남') return [
        { id: 31, rank: 1, name: '쉐이크쉑', score: 97 }, { id: 32, rank: 2, name: '땀땀', score: 94 }
    ];
    return [
        { id: 41, rank: 1, name: '연남토마', score: 98 }, { id: 42, rank: 2, name: '랜디스도넛', score: 95 }
    ];
  };

  // 랭킹 카드 컴포넌트 (내부에서 재사용)
  const RankItem = ({ item }) => (
    <div className="rank-item-card" onClick={() => navigate(`/restaurant/${item.id}`)}>
      <div className={`rank-badge rank-${item.rank}`}>{item.rank}</div>
      <div className="rank-info">
        <h3>{item.name}</h3>
        <p>인기 점수 🔥 {item.score}</p>
      </div>
      <div className="rank-diff">{item.diff || '-'}</div>
    </div>
  );

  return (
    <div className="ranking-page-container">
      <div className="ranking-header">
        <h2>🔥 실시간 랭킹</h2>
        <p>지금 가장 핫한 맛집은 어디일까요?</p>
      </div>

      {/* 메인 탭 메뉴 */}
      <div className="ranking-tabs">
        <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>🏆 전체 인기</button>
        <button className={activeTab === 'age' ? 'active' : ''} onClick={() => setActiveTab('age')}>🎂 연령별</button>
        <button className={activeTab === 'region' ? 'active' : ''} onClick={() => setActiveTab('region')}>📍 지역별</button>
      </div>

      {/* 탭 내용 영역 */}
      <div className="ranking-content">
        
        {/* 1. 전체 인기 탭 */}
        {activeTab === 'menu' && (
            <div className="rank-list">
                {menuRankings.map(item => <RankItem key={item.id} item={item} />)}
            </div>
        )}

        {/* 2. 연령별 탭 */}
        {activeTab === 'age' && (
            <div>
                <div className="sub-filter">
                    {['10대', '20대', '30대', '40대+'].map(age => (
                        <button key={age} className={ageFilter === age ? 'on' : ''} onClick={() => setAgeFilter(age)}>{age}</button>
                    ))}
                </div>
                <div className="rank-list">
                    {getAgeData().map(item => <RankItem key={item.id} item={item} />)}
                </div>
            </div>
        )}

        {/* 3. 지역별 탭 */}
        {activeTab === 'region' && (
             <div>
                <div className="sub-filter">
                    {['강남', '홍대', '성수', '이태원'].map(loc => (
                        <button key={loc} className={regionFilter === loc ? 'on' : ''} onClick={() => setRegionFilter(loc)}>{loc}</button>
                    ))}
                </div>
                <div className="rank-list">
                    {getRegionData().map(item => <RankItem key={item.id} item={item} />)}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default RankingPage;