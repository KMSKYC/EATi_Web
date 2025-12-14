import { useState, useEffect } from 'react';
import AICard from '../components/AI_Card';
import './css/HomePage.css';
import AIPopup from '../components/AI_Popup';
import { foodApi } from '../api/foodApi';


const POPUP_CLOSED_KEY = 'aiPopupClosed';

function HomePage() {
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
  const [todayRecommendation, setTodayRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [categories, setCategories] = useState([{id: 'all', name: '전체'}]);
  const [menus, setMenus] = useState([]);


  // ✅ 2. 메뉴를 가져오는 함수 (재사용하기 위해 따로 뺌)
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

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const serverData = await foodApi.getCategories();

          const formattedData = serverData.map(item => ({
            id: item.categoryId,      // categoryId -> id 로 변경
            name: item.categoryName   // categoryName -> name 으로 변경
        }));

          setCategories([
                { id: 'all', name: '전체' }, 
                ...formattedData
            ]);
          
        } catch (error) {
          console.error("카테고리 로딩 실패:", error);
        }
      };

      fetchCategories();
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

      {/* 카테고리 필터 섹션 */}
      <section className="category-filter-section">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab-btn ${activeCategory === category.name ? 'active' : ''}`}
              
              // ✅ 클릭 시 우리가 만든 핸들러 실행
              onClick={() => handleCategoryClick(category)} 
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* ✅ 메뉴 리스트 뿌려주는 곳 (새로 추가) */}
      <section className="menu-list-section">
        <h3>{activeCategory} 메뉴</h3>
        <div className="menu-grid">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <div key={menu.menuId || menu.id} className="menu-item">
                {/* 친구가 준 데이터 이름에 맞춰서 수정하세요 (예: menu.name, menu.price 등) */}
                <div className="menu-name">{menu.name}</div>
                {/* <div className="menu-price">{menu.price}원</div> */}
              </div>
            ))
          ) : (
            <p>등록된 메뉴가 없습니다.</p>
          )}
        </div>
      </section>    

      {/* 3. 추천 메뉴 카드 리스트 */}
      <section className="recommendation-cards-section">
        <div className="card-grid">
          {/* categories 대신 menus를 써야 합니다! */}
          {menus.length > 0 ? (
            menus.map((item) => (
              <AICard 
                key={item.id || item.menuId} 
                // 서버 데이터(item)와 AICard의 기대치가 다를 수 있으니 여기서 맞춰줍니다.
                restaurant={{
                    id: item.id || item.menuId,
                    imageUrl: item.imageUrl || 'https://via.placeholder.com/300', // 이미지 없으면 기본 이미지
                    category: activeCategory, // 현재 보고 있는 카테고리 이름 (예: 한식)
                    menu: item.name || item.menuName || item.menu, 
                    
                    description: item.description || `${item.price}원`, // 설명이 없으면 가격이라도 표시
                }}
              />
            ))
          ) : (
             // 데이터가 없을 때 표시할 내용
             <p className="no-data-msg">등록된 메뉴가 없습니다.</p>
          )}
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