import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
// import { useAuth } from '../context/AuthContext'; 
import './css/HomPage.css'; // (★) CSS 파일 이름 변경 확인!
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


  //메뉴를 가져오는 함수
  const fetchMenus = async (categoryId) => {
    try {
      const menuData = await foodApi.getMenus(categoryId);
      setMenus(menuData); // 받아온 메뉴로 화면 갱신
    } catch (error) {
      console.error("메뉴 불러오기 실패:", error);
    }
  };

    // 3. 화면 켜지면 '카테고리'랑 '전체 메뉴' 가져오기
  useEffect(() => {
    const initData = async () => {
      // (1) 카테고리 로딩
      const catData = await foodApi.getCategories();
      const formattedCats = catData.map(c => ({ id: c.categoryId, name: c.categoryName }));
      setCategories([{ id: 'all', name: '전체' }, ...formattedCats]);

      // (2) 초기 메뉴 로딩 (전체)
      fetchMenus('all'); 
    };
    initData();
  }, []);

  // ✅ 4. 카테고리 버튼 클릭 핸들러 수정
  const handleCategoryClick = (category) => {
    // (1) 탭 활성화 (색깔 바꾸기용)
    setActiveCategory(category.name); 
    
    // (2) 진짜 데이터 교체 요청 (id를 보냄)
    fetchMenus(category.id); 
  };

  // 3. AI 팝업 관련
  const openAiPopup = () => {
    if (!localStorage.getItem(POPUP_CLOSED_KEY)) setIsAiPopupOpen(true);
    else alert("오늘은 이미 AI 추천을 받았습니다.");
  };
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
            <div className="hero-text-overlay">
              <span className="badge-today">Today's Pick ✨</span>
              <h1>{recommendation ? (recommendation.name || recommendation.menuName) : "오늘은 바질 파스타 어때요?"}</h1>
              <p>{recommendation?.description || "비 오는 날엔 따뜻하고 크리미한 소스가 위로가 되죠."}</p>
              <button className="btn-detail" onClick={() => navigate(`/restaurant/${recommendation?.id || 1}`)}>
                보러 가기 →
              </button>
            </div>
            <img 
              src={recommendation?.imageUrl || "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80"} 
              alt="Hero" 
              className="hero-bg-img"
            />
          </div>

          {/* 오른쪽: 퀵 메뉴 + 인사이트 (사이드바 느낌) */}
          <div className="side-widgets">
            
            {/* 퀵 버튼 3개 */}
            <div className="quick-access-box">
              <h3>Quick Access</h3>
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

            {/* 트렌드 카드 */}
            <div className="trend-box">
              <div className="trend-text">
                <span className="trend-label">HOT TREND 🔥</span>
                <h4>마라 로제 떡볶이</h4>
                <p>20대 검색 급상승 1위</p>
              </div>
              <div className="trend-img">🌶️</div>
            </div>
          </div>
        </section>

        {/* 하단: 메뉴 리스트 */}
        <section className="menu-list-container">
           <div className="section-header">
              <h2><span className="highlight">{activeCategory}</span> 맛집 리스트</h2>
              
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

          <div className="menu-grid-web">
            {menus.map((item) => (
               <AICard 
                 key={item.id}
                 restaurant={{
                   ...item,
                   // 이미지 없을 때를 대비해 랜덤 음식 이미지 URL 사용
                   imageUrl: item.imageUrl || `https://source.unsplash.com/featured/?food,${item.id}`
                 }}
               />
            ))}
          </div>
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