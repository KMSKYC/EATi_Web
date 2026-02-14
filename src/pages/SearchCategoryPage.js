import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './css/SearchCategoryPage.css';

// 기본 이미지 (imageUrl이 없을 경우)
const DEFAULT_IMAGES = {
  '한식': 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=600&auto=format&fit=crop',
  '일식': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop',
  '양식': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop',
  '중식': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop',
  '아시안': 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=600&auto=format&fit=crop',
  '디저트': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
  '카페': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
  '샐러드': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
  '기타': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop';

function SearchCategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/categories');
        const topLevelCategories = response.data.filter(cat => cat.parentId === null);
        setCategories(topLevelCategories);
        setError(null);
      } catch (err) {
        console.error('카테고리 조회 실패:', err);
        setError('카테고리를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // 카테고리 클릭 시 해당 카테고리의 메뉴 목록 페이지로 이동
    navigate(`/menu/category/${category.categoryId}`);
  };

  const getImageUrl = (category) => {
    if (category.imageUrl) return category.imageUrl;
    return DEFAULT_IMAGES[category.categoryName] || DEFAULT_IMAGE;
  };

  if (loading) {
    return (
      <div className="category-page-container">
        <div className="category-header-section">
          <div className="header-top-row">
            <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
            <div className="header-text-group">
              <h2 className="header-title">카테고리로 찾기</h2>
              <p className="header-subtitle">원하는 음식 카테고리를 선택하세요</p>
            </div>
          </div>
        </div>
        <div className="category-loading">
          <p>카테고리를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-page-container">
        <div className="category-header-section">
          <div className="header-top-row">
            <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
            <div className="header-text-group">
              <h2 className="header-title">카테고리로 찾기</h2>
              <p className="header-subtitle">원하는 음식 카테고리를 선택하세요</p>
            </div>
          </div>
        </div>
        <div className="category-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page-container">
      <div className="category-header-section">
        <div className="header-top-row">
          <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
          <div className="header-text-group">
            <h2 className="header-title">카테고리로 찾기</h2>
            <p className="header-subtitle">원하는 음식 카테고리를 선택하세요</p>
          </div>
        </div>
      </div>

      <div className="category-grid-wrapper">
        {categories.map((cat) => (
          <div
            key={cat.categoryId}
            className="category-card"
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="cat-img-wrapper">
              <img src={getImageUrl(cat)} alt={cat.categoryName} className="cat-bg-img" />
            </div>
            <div className="cat-info">
              <span className="cat-name">{cat.categoryName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCategoryPage;
