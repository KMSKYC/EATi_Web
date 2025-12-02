import React from 'react';
import './css/Category_View.css'

function CategoryView(props) {
const { selectedCategory, onSelectCategory } = props;
const categories = [
  { id: 'all', name: '전체' },
  { id: 'korean', name: '한식' },
  { id: 'japanese', name: '일식' },
  { id: 'chinese', name: '중식' },
  { id: 'western', name: '양식' },
];

  return (
<div className="category-filter-bar">
      {categories.map((category) => (
        <button
          key={category.id}
          // (★ 4. 'selected' 상태에 따라 CSS 클래스를 동적으로 변경 ★)
          className={`category-filter-btn ${
            selectedCategory === category.id ? 'selected' : ''
          }`}
          // (★ 5. 클릭 시, 부모에게 'id'를 전달하는 함수 실행 ★)
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
export default CategoryView;