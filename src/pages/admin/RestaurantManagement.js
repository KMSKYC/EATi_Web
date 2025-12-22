import React, { useState } from 'react';
import './css/RestaurantManagement.css'; 

function RestaurantManagement() {
  // 1. 식당 더미 데이터 (지역 필드 추가)
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: '오레노 라멘', category: '일식', region: '서울 마포구', menuCount: 4, rating: 4.8, status: '영업중', img: 'https://source.unsplash.com/featured/?ramen' },
    { id: 2, name: '다운타우너', category: '양식', region: '서울 강남구', menuCount: 6, rating: 4.5, status: '영업중', img: 'https://source.unsplash.com/featured/?burger' },
    { id: 3, name: '마라공방', category: '중식', region: '경기 성남시', menuCount: 12, rating: 4.2, status: '휴업', img: 'https://source.unsplash.com/featured/?mara' },
    { id: 4, name: '랜디스 도넛', category: '디저트', region: '부산 해운대구', menuCount: 8, rating: 4.7, status: '영업중', img: 'https://source.unsplash.com/featured/?donut' },
  ]);

  const [showModal, setShowModal] = useState(false);

  // 2. 신규 식당 등록용 상태 (입력값 관리)
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    category: '한식', // 기본값
    region: '',       // (★) 지역 선택용
  });

  // 식당 삭제 기능
  const handleDelete = (id) => {
    if (window.confirm('정말로 이 식당을 삭제하시겠습니까?')) {
      setRestaurants(restaurants.filter(r => r.id !== id));
    }
  };

  // (★) 식당 등록 핸들러
  const handleAddRestaurant = () => {
    // 유효성 검사
    if (!newRestaurant.name || !newRestaurant.region) {
      alert('식당 이름과 지역을 모두 선택해주세요.');
      return;
    }

    const id = restaurants.length + 1;
    
    // 새 식당 객체 생성
    const restaurantToAdd = {
      id,
      name: newRestaurant.name,
      category: newRestaurant.category,
      region: newRestaurant.region,
      menuCount: 0, // 초기값
      rating: 0.0,  // 초기값
      status: '준비중', // 초기값
      img: 'https://source.unsplash.com/featured/?restaurant', // 임시 이미지
    };

    setRestaurants([restaurantToAdd, ...restaurants]);
    setShowModal(false);
    setNewRestaurant({ name: '', category: '한식', region: '' }); // 초기화
    alert('새로운 식당이 등록되었습니다!');
  };

  return (
    <div className="manage-container">
      
      {/* 상단 헤더 */}
      <div className="page-header">
        <h3>🍽️ 식당 및 메뉴 관리</h3>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + 식당 등록
        </button>
      </div>

      {/* 식당 목록 테이블 */}
      <div className="table-container">
        <table className="common-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>가게 정보</th>
              <th>카테고리</th>
              <th>지역</th> {/* (★) 컬럼 추가 */}
              <th>메뉴 수</th>
              <th>평점</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>
                  <div className="res-info-cell">
                    <img src={res.img} alt={res.name} className="res-thumb" />
                    <span className="res-name">{res.name}</span>
                  </div>
                </td>
                <td>{res.category}</td>
                <td>{res.region}</td> {/* (★) 데이터 표시 */}
                <td>{res.menuCount}개</td>
                <td>⭐ {res.rating}</td>
                <td>
                  <span className={`status-pill ${res.status === '영업중' ? 'active' : 'inactive'}`}>
                    {res.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit">수정</button>
                  <button className="btn-delete" onClick={() => handleDelete(res.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 식당 등록 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>새로운 식당 등록</h3>
            
            <div className="form-group">
              <label>식당 이름</label>
              <input 
                type="text" 
                placeholder="예: 오레노 라멘" 
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              />
            </div>

            {/* (★) 지역 선택 추가 */}
            <div className="form-group">
              <label>지역</label>
              <select 
                value={newRestaurant.region}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, region: e.target.value })}
              >
                <option value="">지역을 선택하세요</option>
                <option value="서울 강남구">서울 강남구</option>
                <option value="서울 마포구">서울 마포구</option>
                <option value="서울 종로구">서울 종로구</option>
                <option value="경기 성남시">경기 성남시</option>
                <option value="부산 해운대구">부산 해운대구</option>
                <option value="제주 제주시">제주 제주시</option>
              </select>
            </div>

            <div className="form-group">
              <label>카테고리</label>
              <select 
                value={newRestaurant.category}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, category: e.target.value })}
              >
                <option value="한식">한식</option>
                <option value="일식">일식</option>
                <option value="중식">중식</option>
                <option value="양식">양식</option>
                <option value="디저트">디저트</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-save" onClick={handleAddRestaurant}>등록하기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RestaurantManagement;