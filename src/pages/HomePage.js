import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
// import { useAuth } from '../context/AuthContext'; 
import './css/HomePage.css'; // (★) CSS 파일 이름 변경 확인!
import AICard from '../components/AI_Card';
import AIPopup from '../components/AI_Popup';

const POPUP_CLOSED_KEY = 'aiPopupClosed';

function HomePage() {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const user = { nickname: '관리자' }; 

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState([{id: 'all', name: '전체'}]); 
  const [activeCategory, setActiveCategory] = useState('전체'); //카테고리 메뉴
  const [menus, setMenus] = useState([]); //메뉴 리스트
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false); //AI 추천 서비스 팝업
  const [todayRecommendation, setTodayRecommendation] = useState(null);
  const curationRef = useRef(null);

  // 큐레이션 슬라이더 스크롤
  const scrollCuration = (direction) => {
    if (curationRef.current) {
      const scrollAmount = 300;
      curationRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  //메뉴를 가져오는 함수
  const fetchMenus = async (categoryId) => {
    try {
      setLoading(true);
      const menuData = await foodApi.getMenus(categoryId);
      setMenus(menuData);
    } catch (error) {
      console.error("메뉴 불러오기 실패:", error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  // 화면 켜지면 '카테고리'랑 '전체 메뉴' 가져오기
  useEffect(() => {
    const initData = async () => {
      try {
        // (1) 랜덤 메뉴 추천 가져오기
        const randomMenu = await foodApi.getRandomMenu();
        setRecommendation(randomMenu);

        // (2) 카테고리 로딩
        const catData = await foodApi.getCategories();
        const formattedCats = catData.map(c => ({ id: c.categoryId, name: c.categoryName }));
        setCategories([{ id: 'all', name: '전체' }, ...formattedCats]);

        // (3) 초기 메뉴 로딩 (전체)
        await fetchMenus('all');
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };
    initData();
  }, []);

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = async (category) => {
    // 같은 카테고리 클릭 시 무시
    if (activeCategory === category.name) return;

    // (1) 탭 활성화
    setActiveCategory(category.name);

    // (2) 해당 카테고리 메뉴 로딩
    await fetchMenus(category.id);
  };

  // // 3. AI 팝업 관련
  // const openAiPopup = () => {
  //   if (!localStorage.getItem(POPUP_CLOSED_KEY)) setIsAiPopupOpen(true);
  //   else alert("오늘은 이미 AI 추천을 받았습니다.");
  // };
  const closeAiPopup = () => { //팝업 닫기
    setIsAiPopupOpen(false);
    localStorage.setItem(POPUP_CLOSED_KEY, 'true');
  };
  const handleAiLike = () => {
    console.log("좋아요 처리 로직 실행");
    closeAiPopup(); 
  };


  return (
    <div className="web-container">
      <main className="main-content">
        <section className="top-grid-section">
          <div className="hero-card">
            <span className="badge-today">🤖 AI 추천, 오늘의 메뉴!</span>
            <div className="hero-text-overlay">
              {recommendation ? (
                <>
                  <h1>오늘은 "{recommendation.name || recommendation.menuName}" 어때요?</h1>
                  <p>{recommendation.description || "당신의 최근 선호도와 날씨를 분석해 선별했어요"}</p>
                  <button className="btn-detail" onClick={() => navigate(`/menu/${recommendation.menuId}/restaurants`)}>
                    보러 가기 →
                  </button>
                </>
              ) : (
                <>
                  <h1>오늘의 추천 메뉴를 찾고 있어요...</h1>
                  <p>잠시만 기다려주세요</p>
                </>
              )}
            </div>
            <img
              src={recommendation?.imageUrl || "https://images.unsplash.com/vector-1757229601027-713f8fce08f3?w=800&q=80"}
              alt="Hero"
              className="hero-bg-img"
            />
          </div>

          {/* 오른쪽: 퀵 메뉴 + 인사이트 (사이드바 느낌) */}
          <div className="side-widgets">
            
            {/* 퀵 버튼 3개 */}
            <div className="quick-access-box">
              <h3>바로가기</h3>
              <div className="quick-icons">
                <div className="q-btn" onClick={() => navigate('/random')}>
                  <span className="q-icon">🎲</span>
                  <span>랜덤</span>
                </div>
                <div className="q-btn" onClick={() => navigate('/menu/map')}>
                  <span className="q-icon">📍</span>
                  <span>내 주변</span>
                </div>
                <div className="q-btn" onClick={() => navigate('/ranking')}>
                  <span className="q-icon">🏆</span>
                  <span>랭킹</span>
                </div>
              </div>
            </div>

            {/* 트렌드 카드 - 검색어 순위 스타일 */}
            <div className="trend-box">
              <div className="trend-header">
                <span className="trend-label">실시간 인기 메뉴</span>
              </div>
              <ul className="trend-rank-list">
                <li className="trend-rank-item">
                  <span className="rank-number rank-1">1</span>
                  <span className="rank-name">마라 로제 떡볶이</span>
                  <span className="rank-change up">▲</span>
                </li>
                <li className="trend-rank-item">
                  <span className="rank-number rank-2">2</span>
                  <span className="rank-name">크림 파스타</span>
                  <span className="rank-change down">▼</span>
                </li>
                <li className="trend-rank-item">
                  <span className="rank-number rank-3">3</span>
                  <span className="rank-name">치킨</span>
                  <span className="rank-change up">▲</span>
                </li>
                <li className="trend-rank-item">
                  <span className="rank-number">4</span>
                  <span className="rank-name">삼겹살</span>
                  <span className="rank-change stay">-</span>
                </li>
                <li className="trend-rank-item">
                  <span className="rank-number">5</span>
                  <span className="rank-name">초밥</span>
                  <span className="rank-change new">NEW</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 상황별 추천 큐레이션 */}
        <section className="curation-section">
          <div className="curation-header">
            <h2>상황별 추천</h2>
            <button className="view-all-btn" onClick={() => navigate('/curation')}>
              전체보기 →
            </button>
          </div>
          <div className="curation-slider">
            <button className="slider-btn slider-btn-left" onClick={() => scrollCuration('left')}>
              ‹
            </button>
            <div className="curation-track" ref={curationRef}>
              <div className="curation-card" onClick={() => navigate('/curation/stress')}>
                <div className="curation-icon">😤</div>
                <div className="curation-info">
                  <h4>스트레스 타파</h4>
                  <p>매운맛으로 스트레스 날리기</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/light')}>
                <div className="curation-icon">🥗</div>
                <div className="curation-info">
                  <h4>가벼운 한 끼</h4>
                  <p>부담없이 건강하게</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/alone')}>
                <div className="curation-icon">🍜</div>
                <div className="curation-info">
                  <h4>혼밥하기 좋은</h4>
                  <p>나만의 맛있는 시간</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/date')}>
                <div className="curation-icon">💑</div>
                <div className="curation-info">
                  <h4>데이트 코스</h4>
                  <p>분위기 좋은 맛집</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/gathering')}>
                <div className="curation-icon">🎉</div>
                <div className="curation-info">
                  <h4>회식/모임</h4>
                  <p>단체로 가기 좋은 곳</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/late')}>
                <div className="curation-icon">🌙</div>
                <div className="curation-info">
                  <h4>야식 땡길 때</h4>
                  <p>늦은 밤 든든하게</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/hangover')}>
                <div className="curation-icon">🍲</div>
                <div className="curation-info">
                  <h4>해장이 필요해</h4>
                  <p>속 풀어주는 따뜻한 국물</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/budget')}>
                <div className="curation-icon">💰</div>
                <div className="curation-info">
                  <h4>가성비 甲</h4>
                  <p>저렴하고 맛있게</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/special')}>
                <div className="curation-icon">🎂</div>
                <div className="curation-info">
                  <h4>특별한 날</h4>
                  <p>기념일 & 생일 맛집</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/quick')}>
                <div className="curation-icon">⚡</div>
                <div className="curation-info">
                  <h4>빠르게 한 끼</h4>
                  <p>시간 없을 때 후딱</p>
                </div>
              </div>
              <div className="curation-card" onClick={() => navigate('/curation/comfort')}>
                <div className="curation-icon">🏠</div>
                <div className="curation-info">
                  <h4>집밥 느낌</h4>
                  <p>엄마가 해준 것 같은</p>
                </div>
              </div>
            </div>
            <button className="slider-btn slider-btn-right" onClick={() => scrollCuration('right')}>
              ›
            </button>
          </div>
        </section>

        {/* 하단: 메뉴 리스트 */}
        <section className="menu-list-container">
           <div className="section-header">
              <h2><span className="highlight">{activeCategory}</span> 메뉴 리스트</h2>
              
              {/* 카테고리 탭을 우측 상단으로 이동 */}
              <div className="category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`pill-btn ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
           </div>

          {menus.length > 0 ? (
            <div className="menu-grid-web">
              {menus.map((item) => (
                <AICard
                  key={item.id}
                  restaurant={item}
                />
              ))}
            </div>
          ) : (
            <div className="empty-menu-message">
              <p>해당 카테고리에 등록된 메뉴가 없습니다.</p>
            </div>
          )}
        </section>

      </main>

    {isAiPopupOpen && (
      <AIPopup 
          restaurant={todayRecommendation}
          onClose={closeAiPopup} // 'X'나 '싫어요' 버튼 클릭 시
          onLike={handleAiLike} 
        />
     )}
    </div>
  );
}

export default HomePage;