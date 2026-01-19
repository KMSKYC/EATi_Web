import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
import './css/MenuRestaurantsPage.css';

function MenuRestaurantsPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [menuInfo, setMenuInfo] = useState(null);
  const [restaurantMenus, setRestaurantMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. 메뉴 정보 가져오기
        const menuData = await foodApi.getMenuById(menuId);
        setMenuInfo(menuData);

        // 2. 해당 메뉴를 판매하는 레스토랑 목록 가져오기
        const data = await foodApi.getRestaurantsByMenuId(menuId);

        if (Array.isArray(data)) {
          setRestaurantMenus(data);
        }
      } catch (err) {
        console.error('데이터 조회 실패:', err);
        setError('정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (menuId) {
      fetchData();
    }
  }, [menuId]);

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  // 가격 포맷팅 (10000.00 -> 10,000원)
  const formatPrice = (price) => {
    if (!price) return null;
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    return Math.floor(numPrice).toLocaleString() + '원';
  };

  // children 배열에서 식당 정보 가져오기
  const getRestaurantInfo = (item) => {
    if (item.children && item.children.length > 0) {
      return item.children[0];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="menu-restaurants-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>맛집 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-restaurants-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="btn-back">
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-restaurants-page">
      {/* 히어로 섹션 - 메뉴 이미지 */}
      <div className="menu-hero">
        <button onClick={() => navigate(-1)} className="back-btn">
          ←
        </button>
        <img
          src={menuInfo?.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"}
          alt={menuInfo?.menuName || "메뉴"}
          className="menu-hero-image"
        />
        <div className="menu-hero-overlay">
          <div className="menu-hero-content">
            <span className="menu-badge">MENU</span>
            <h1>{menuInfo?.menuName || '메뉴'}</h1>
            <p>{menuInfo?.description || '맛있는 음식을 찾아보세요'}</p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="menu-restaurants-content">
        {/* 레스토랑 목록 헤더 */}
        <div className="restaurants-header">
          <h2>
            <span className="highlight">{menuInfo?.menuName || '이 메뉴'}</span>를 판매하는 맛집
          </h2>
          <span className="restaurant-count">{restaurantMenus.length}곳</span>
        </div>

        {/* 레스토랑 목록 */}
        {restaurantMenus.length > 0 ? (
          <div className="restaurants-grid">
            {restaurantMenus.map((item) => {
              const restaurant = getRestaurantInfo(item);

              return (
                <div
                  key={item.restaurantMenuId}
                  className="restaurant-card"
                  onClick={() => handleRestaurantClick(item.restaurantId)}
                >
                  {/* 이미지 영역 */}
                  <div className="restaurant-image-wrapper">
                    {menuInfo?.imageUrl ? (
                      <img
                        src={menuInfo.imageUrl}
                        alt={item.restaurantMenuName}
                        className="restaurant-image"
                      />
                    ) : (
                      <div className="restaurant-image-placeholder">
                        <span>🍽️</span>
                      </div>
                    )}
                    {/* 가격 뱃지 */}
                    {item.price && (
                      <span className="price-badge">{formatPrice(item.price)}</span>
                    )}
                  </div>

                  {/* 정보 영역 */}
                  <div className="restaurant-info">
                    {/* 식당 이름 */}
                    <h4 className="restaurant-name">
                      {restaurant?.restaurantName || '식당'}
                    </h4>

                    {/* 메뉴 이름 (식당에서 부르는 이름) */}
                    <p className="menu-name-in-restaurant">
                      {item.restaurantMenuName}
                    </p>

                    {/* 메뉴 설명 */}
                    {item.description && (
                      <p className="restaurant-description">{item.description}</p>
                    )}

                    {/* 주소 */}
                    {restaurant?.address && (
                      <div className="restaurant-address">
                        <span className="address-icon">📍</span>
                        <span>{restaurant.address}</span>
                      </div>
                    )}

                    {/* 식당 설명 (주소가 없을 때 표시) */}
                    {!restaurant?.address && restaurant?.description && (
                      <div className="restaurant-address">
                        <span className="address-icon">💬</span>
                        <span>{restaurant.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>아직 등록된 맛집이 없어요</h3>
            <p>곧 맛있는 맛집들이 추가될 예정입니다!</p>
            <button onClick={() => navigate('/')} className="btn-home">
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuRestaurantsPage;
