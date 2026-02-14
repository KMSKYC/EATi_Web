import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
import AICard from '../components/AI_Card';
import './css/SearchPage.css';

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([{ id: 'all', name: '전체' }]);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // 메뉴를 가져오는 함수
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

  // 초기 데이터 로딩
  useEffect(() => {
    const initData = async () => {
      try {
        // 카테고리 로딩
        const catData = await foodApi.getCategories();
        const formattedCats = catData.map(c => ({ id: c.categoryId, name: c.categoryName }));
        setCategories([{ id: 'all', name: '전체' }, ...formattedCats]);

        // URL에서 카테고리 파라미터 확인
        const categoryParam = searchParams.get('category');
        const categoryName = searchParams.get('name');

        if (categoryParam && categoryName) {
          // URL에 카테고리가 있으면 해당 카테고리 메뉴 로딩
          setActiveCategory(categoryName);
          setActiveCategoryId(categoryParam);
          await fetchMenus(categoryParam);
        } else {
          // 없으면 전체 메뉴 로딩
          await fetchMenus('all');
        }
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };
    initData();
  }, [searchParams]);

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = async (category) => {
    if (activeCategoryId === category.id) return;
    setActiveCategory(category.name);
    setActiveCategoryId(category.id);
    await fetchMenus(category.id);
  };

  return (
    <div className="search-page-container">
      {/* 히어로 섹션 */}
      <section className="search-hero-section">
        <div className="search-hero-content">
          <span className="search-badge">메뉴 탐색</span>
          <h1>오늘 뭐 먹지?</h1>
          <p>원하는 방식으로 완벽한 한 끼를 찾아보세요</p>
        </div>
        <div className="search-hero-bg"></div>
      </section>

      {/* 메인 그리드 영역 - 2x2 배치 */}
      <section className="search-main-grid">
        {/* PC: 왼쪽 상단 / 모바일: 1번 */}
        <Link to="/menu/map" className="search-option-card grid-map">
          <div className="card-icon-wrapper">
            <span className="card-icon">📍</span>
          </div>
          <div className="card-text">
            <h3>지도로 찾기</h3>
            <p>내 주변 맛집을 지도에서 한눈에</p>
          </div>
          <span className="card-arrow">→</span>
        </Link>

        {/* PC: 오른쪽 상단 / 모바일: 3번 */}
        <div className="sidebar-box grid-quick">
          <h4>빠른 추천</h4>
          <div className="quick-buttons">
            <button className="quick-btn" onClick={() => navigate('/random')}>
              <span>🎲</span>
              <span>랜덤 추천</span>
            </button>
            <button className="quick-btn" onClick={() => navigate('/ranking')}>
              <span>🏆</span>
              <span>인기 랭킹</span>
            </button>
          </div>
        </div>

        {/* PC: 왼쪽 하단 / 모바일: 2번 */}
        <Link to="/menu/category" className="search-option-card grid-category">
          <div className="card-icon-wrapper">
            <span className="card-icon">🍱</span>
          </div>
          <div className="card-text">
            <h3>카테고리로 찾기</h3>
            <p>한식, 중식, 양식 등 종류별 탐색</p>
          </div>
          <span className="card-arrow">→</span>
        </Link>

        {/* PC: 오른쪽 하단 / 모바일: 4번 */}
        <div className="sidebar-box grid-keyword">
          <h4>오늘의 인기 키워드</h4>
          <div className="tag-list">
            <span className="tag"># 혼밥</span>
            <span className="tag"># 가성비</span>
            <span className="tag"># 데이트</span>
            <span className="tag"># 야식</span>
            <span className="tag"># 해장</span>
            <span className="tag"># 회식</span>
          </div>
        </div>
      </section>

      {/* 메뉴 리스트 섹션 */}
      <section className="search-menu-section">
        <div className="search-menu-header">
          <h2><span className="highlight">{activeCategory}</span> 메뉴</h2>
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`pill-btn ${activeCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="search-menu-loading">
            <p>메뉴를 불러오는 중...</p>
          </div>
        ) : menus.length > 0 ? (
          <div className="search-menu-grid">
            {menus.map((item) => (
              <AICard key={item.id || item.menuId} restaurant={item} />
            ))}
          </div>
        ) : (
          <div className="search-menu-empty">
            <p>해당 카테고리에 등록된 메뉴가 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchPage;
