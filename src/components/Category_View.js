import React from 'react';
import '../css/Category_View.css'

function CategoryView() {
  return (
    <div className="category-view">
      <h2>카테고리</h2>
      <div className="category-grid">
        <button className="category-btn">한식 🇰🇷</button>
        <button className="category-btn">중식 🇨🇳</button>
        <button className="category-btn">일식 🇯🇵</button>
        <button className="category-btn">양식 🍕</button>
        <button className="category-btn">인스턴트 🍔</button>
        <button className="category-btn">기타 🍜</button>
      </div>
    </div>
  );
}

export default CategoryView;