import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SearchCategoryPage.css'; // (★) CSS import 확인

function SearchCategoryPage() {
  const navigate = useNavigate();

  // 카테고리 데이터
  const categories = [
    { id: 'korean', name: '한식', count: 156, imageUrl: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=2940&auto=format&fit=crop' },
    { id: 'japanese', name: '일식', count: 98, imageUrl: 'https://images.unsplash.com/photo-1617196034438-4e35ad021073?q=80&w=2831&auto=format&fit=crop' },
    { id: 'western', name: '양식', count: 142, imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2932&auto=format&fit=crop' },
    { id: 'chinese', name: '중식', count: 87, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2792&auto=format&fit=crop' },
    { id: 'asian', name: '아시안', count: 73, imageUrl: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=2864&auto=format&fit=crop' },
    { id: 'dessert', name: '디저트', count: 64, imageUrl: 'https://images.unsplash.com/photo-1563729768-6af584667808?q=80&w=2940&auto=format&fit=crop' },
    { id: 'cafe', name: '카페', count: 121, imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop' },
    { id: 'salad', name: '샐러드', count: 45, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop' },
  ];

  return (
    // (★ 중요 ★) 여기 클래스 이름이 'category-page-container'여야 CSS가 적용됩니다!
    <div className="category-page-container">
      
      {/* 1. 헤더 */}
      <div className="category-header">
        <button onClick={() => navigate(-1)} className="back-btn">←</button>
        <h2 className="header-title">카테고리로 찾기</h2>
      </div>

      <p className="category-description">원하는 음식 카테고리를 선택하세요</p>

      {/* 2. 그리드 */}
      <div className="category-list-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-img-card" onClick={() => console.log(cat.name)}>
            <img src={cat.imageUrl} alt={cat.name} className="category-bg-image" />
            <div className="category-overlay"></div>
            <div className="category-text-content">
              <h3 className="category-name">{cat.name}</h3>
              <span className="category-count">{cat.count}개 식당</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCategoryPage;