import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SearchCategoryPage.css';

function SearchCategoryPage() {
  const navigate = useNavigate();

  const categories = [
    { id: 'korean', name: '한식', count: 156, imageUrl: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=600&auto=format&fit=crop' },
    { id: 'japanese', name: '일식', count: 98, imageUrl: 'https://images.unsplash.com/photo-1617196034438-4e35ad021073?q=80&w=600&auto=format&fit=crop' },
    { id: 'western', name: '양식', count: 142, imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop' },
    { id: 'chinese', name: '중식', count: 87, imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop' },
    { id: 'asian', name: '아시안', count: 73, imageUrl: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=600&auto=format&fit=crop' },
    { id: 'dessert', name: '디저트', count: 64, imageUrl: 'https://images.unsplash.com/photo-1563729768-6af584667808?q=80&w=600&auto=format&fit=crop' },
    { id: 'cafe', name: '카페', count: 121, imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop' },
    { id: 'salad', name: '샐러드', count: 45, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="category-page-container">
      
      {/* 1. 헤더 (주변 맛집 탐색 페이지와 동일한 스타일) */}
      <div className="category-header-section">
        <div className="header-top-row">
           <button onClick={() => navigate(-1)} className="back-btn-unified">←</button>
           <div className="header-text-group">
             <h2 className="header-title">카테고리로 찾기</h2>
             <p className="header-subtitle">원하는 음식 카테고리를 선택하세요</p>
           </div>
        </div>
      </div>

      {/* 2. 카테고리 그리드 */}
      <div className="category-grid-wrapper">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card" onClick={() => console.log(cat.name)}>
            
            {/* 배경 이미지 */}
            <div className="cat-img-box">
                <img src={cat.imageUrl} alt={cat.name} className="cat-bg-img" />
                <div className="cat-overlay"></div> {/* 어두운 그라데이션 */}
            </div>
            
            {/* 텍스트 내용 */}
            <div className="cat-text-content">
              <h3 className="cat-name">{cat.name}</h3>
              <span className="cat-count">{cat.count}개 식당</span>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}

export default SearchCategoryPage;