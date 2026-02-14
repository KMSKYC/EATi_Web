import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { foodApi } from '../api/foodApi';
import AICard from '../components/AI_Card';
import './css/CategoryMenusPage.css';

function CategoryMenusPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryMenus = async () => {
      try {
        setLoading(true);

        // 카테고리 정보 조회
        const categories = await foodApi.getCategories();
        const category = categories.find(c => c.categoryId === categoryId);
        if (category) {
          setCategoryName(category.categoryName);
        }

        // 해당 카테고리의 메뉴 조회
        const menuData = await foodApi.getMenus(categoryId);
        setMenus(menuData);
        setError(null);
      } catch (err) {
        console.error('메뉴 조회 실패:', err);
        setError('메뉴를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryMenus();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="category-menus-container">
        <div className="category-menus-header">
          <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
          <div className="header-text-group">
            <h2 className="header-title">메뉴 불러오는 중...</h2>
          </div>
        </div>
        <div className="category-menus-loading">
          <p>잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-menus-container">
        <div className="category-menus-header">
          <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
          <div className="header-text-group">
            <h2 className="header-title">오류 발생</h2>
          </div>
        </div>
        <div className="category-menus-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-menus-container">
      <div className="category-menus-header">
        <button onClick={() => navigate(-1)} className="back-btn-map">←</button>
        <div className="header-text-group">
          <h2 className="header-title">{categoryName || '카테고리'} 메뉴</h2>
          <p className="header-subtitle">{menus.length}개의 메뉴가 있습니다</p>
        </div>
      </div>

      {menus.length > 0 ? (
        <div className="category-menus-grid">
          {menus.map((menu) => (
            <AICard key={menu.menuId || menu.id} restaurant={menu} />
          ))}
        </div>
      ) : (
        <div className="category-menus-empty">
          <p>해당 카테고리에 등록된 메뉴가 없습니다.</p>
          <button onClick={() => navigate('/menu/category')}>다른 카테고리 보기</button>
        </div>
      )}
    </div>
  );
}

export default CategoryMenusPage;
