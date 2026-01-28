import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode'; // 👈 주소 검색 기능 살리기!
import { adminApi } from '../../api/adminApi';     // 👈 진짜 DB API 사용
import './css/AdminPage.css'; 
import './css/sss.css';        // 👈 예쁜 디자인 적용

const RestaurantManagement = () => {
  // 1️⃣ 상태 관리
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 모달 상태
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false); // 주소 검색창 열기/닫기

  // 선택된 식당 정보 (메뉴 관리용)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  // 식당 입력 폼
  const [newRes, setNewRes] = useState({ name: '', category: '한식', address: '', desc: '' });
  
  // 메뉴 관련 상태 (DB는 메뉴가 따로 있으므로 별도 관리)
  const [restaurantMenus, setRestaurantMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ name: '', price: '', desc: '' });

  // 🔄 초기 로딩: 진짜 DB에서 식당 목록 가져오기
  useEffect(() => {
    loadRestaurants();
  }, []);

//  const loadRestaurants = async () => {
//   try {
//     const data = await adminApi.getRestaurants();
//     setRestaurants(data);
//   } catch (err) {
//     console.error("❌ 식당 목록 로드 실패:", err);
//     // 🚨 에러가 나면 빈 배열을 넣거나, 가짜 데이터를 넣어서 화면이 멈추지 않게 함
//     setRestaurants([]); 
//     alert("서버에서 식당 목록을 불러오지 못했습니다. (500 에러)");
//   } finally {
//     setLoading(false);
//   }
// };

const loadRestaurants = async () => {
    try {
      const data = await adminApi.getRestaurants();

      if (data && data.length > 0) {
        setRestaurants(data);
      } else {
        // 데이터가 빈 배열([])일 경우
        console.log("데이터가 0개입니다.");
        setRestaurants([]); 
      }
    } catch (err) {
      console.error("에러 발생, 가짜 데이터 사용:", err);
      
      // 🛠️ [임시] DB 연결 안 될 때 테스트용 가짜 데이터
      setRestaurants([
        { 
          restaurant_id: 1, 
          restaurant_name: '임시 식당 1', 
          category_id: '한식', 
          address: '서울시 강남구 테스트동', 
          description: 'DB 연결 확인 전 테스트입니다.' 
        },
        { 
          restaurant_id: 2, 
          restaurant_name: '임시 식당 2', 
          category_id: '일식', 
          address: '서울시 마포구 테스트동', 
          description: '화면이 잘 나오나 보세요.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 🏠 [주소 검색] 다음 우편번호 API 연동 (기존 코드 살림 ✨)
  const handleCompletePost = (data) => {
    let fullAddress = data.address;
    if (data.addressType === 'R' && data.bname !== '') {
      fullAddress += ` (${data.bname})`;
    }
    // 주소 입력칸에 자동으로 채워줌
    setNewRes({ ...newRes, address: fullAddress });
    setIsPostOpen(false); // 검색창 닫기
  };

  // 💾 [식당 저장] API 호출
  const handleCreateRestaurant = async () => {
    if (!newRes.name || !newRes.address) return alert("이름과 주소는 필수입니다!");
    
    try {
      // 백엔드로 데이터 전송
      await adminApi.createRestaurant({
        restaurant_name: newRes.name,
        category_id: newRes.category,
        address: newRes.address,
        description: newRes.desc
      });
      
      alert("✅ 식당이 등록되었습니다!");
      setIsResModalOpen(false);
      setNewRes({ name: '', category: '한식', address: '', desc: '' }); // 초기화
      loadRestaurants(); // 목록 새로고침
    } catch (err) {
      console.error(err);
      alert("등록 실패! (서버 에러)");
    }
  };

  // 🗑️ [식당 삭제]
  const handleDeleteRestaurant = async (id) => {
    if(window.confirm("정말 이 식당을 삭제하시겠습니까? 관련 메뉴도 모두 삭제됩니다.")) {
        try {
            await adminApi.deleteRestaurant(id);
            loadRestaurants();
        } catch(err) { alert("삭제 실패"); }
    }
  };

  // 📋 [메뉴 모달 열기] 클릭 시 해당 식당의 메뉴 가져오기
  const openMenuModal = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsMenuModalOpen(true);
    setNewMenu({ name: '', price: '', desc: '' }); // 입력폼 초기화

    try {
      // 이 식당의 메뉴만 DB에서 가져옴!
      const menus = await adminApi.getRestaurantMenus(restaurant.restaurant_id);
      setRestaurantMenus(menus);
    } catch (err) {
      console.error("메뉴 로드 실패:", err);
      setRestaurantMenus([]);
    }
  };

  // ➕ [메뉴 추가] API 호출
  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.price) return alert("메뉴명과 가격을 입력해주세요.");

    try {
      await adminApi.addMenu(selectedRestaurant.restaurant_id, {
        restaurant_menu_name: newMenu.name,
        price: parseInt(newMenu.price),
        description: newMenu.desc
      });
      
      // 메뉴 목록 새로고침 (방금 추가한거 보여주기)
      const updatedMenus = await adminApi.getRestaurantMenus(selectedRestaurant.restaurant_id);
      setRestaurantMenus(updatedMenus);
      setNewMenu({ name: '', price: '', desc: '' }); // 입력창 비우기
    } catch (err) {
      alert("메뉴 추가 실패");
    }
  };

  // ➖ [메뉴 삭제]
  const handleDeleteMenu = async (menuId) => {
    if(window.confirm("메뉴를 삭제하시겠습니까?")) {
        try {
            await adminApi.deleteMenu(menuId);
            // 목록 갱신
            const updatedMenus = await adminApi.getRestaurantMenus(selectedRestaurant.restaurant_id);
            setRestaurantMenus(updatedMenus);
        } catch(err) { alert("삭제 실패"); }
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="box-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>🍽️ 식당 관리 <span style={{fontSize:'14px', color:'#888', marginLeft:'10px'}}>총 {restaurants.length}개</span></h3>
        <button className="btn-primary" onClick={() => setIsResModalOpen(true)}>+ 식당 등록</button>
      </div>

      {/* 메인 리스트 테이블 */}
      <div className="dashboard-box">
        {loading ? ( <div style={{padding:'20px', textAlign:'center'}}>로딩 중...</div> ) : (
        <table className="mini-table" style={{width:'100%'}}>
          <thead>
            <tr style={{textAlign:'left', color:'#666', borderBottom:'1px solid #eee'}}>
              <th style={{padding:'10px'}}>카테고리</th>
              <th>이름</th>
              <th>주소</th>
              <th>설명</th>
              <th style={{textAlign:'right'}}>관리</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res.restaurant_id} style={{borderBottom:'1px solid #f9f9f9', height:'50px'}}>
                <td style={{padding:'10px'}}><span className="category-badge">{res.category_id}</span></td>
                <td style={{fontWeight:'bold'}}>{res.restaurant_name}</td>
                <td style={{color:'#666', fontSize:'14px'}}>{res.address}</td>
                <td style={{color:'#999', fontSize:'13px', maxWidth:'200px', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{res.description}</td>
                <td style={{textAlign:'right'}}>
                  <button className="btn-secondary" onClick={() => openMenuModal(res)}>📋 메뉴 관리</button>
                  <button className="btn-danger" onClick={() => handleDeleteRestaurant(res.restaurant_id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* 🟢 [모달 1] 식당 등록 (주소 검색 기능 포함!) */}
      {isResModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
                <h3>새 식당 등록</h3>
                <button onClick={() => setIsResModalOpen(false)} className="close-btn">✖</button>
            </div>
            
            <div className="modal-body">
                {/* 이름 입력 */}
                <input 
                    placeholder="식당 이름 (예: 오레노라멘)" 
                    value={newRes.name} 
                    onChange={(e) => setNewRes({...newRes, name: e.target.value})} 
                />
                
                {/* 카테고리 선택 */}
                <select value={newRes.category} onChange={(e) => setNewRes({...newRes, category: e.target.value})}>
                    <option value="한식">한식</option>
                    <option value="일식">일식</option>
                    <option value="중식">중식</option>
                    <option value="양식">양식</option>
                    <option value="분식">분식</option>
                    <option value="카페">카페</option>
                </select>

                {/* 주소 검색 부분 (중요!) */}
                <div style={{display:'flex', gap:'5px'}}>
                    <input 
                        placeholder="주소 (검색 버튼을 눌러주세요)" 
                        style={{flex:1, backgroundColor:'#f8f9fa'}} 
                        value={newRes.address} 
                        readOnly 
                    />
                    <button className="search-btn" onClick={() => setIsPostOpen(!isPostOpen)}>🔍</button>
                </div>

                {/* 주소 검색창 열렸을 때만 보임 */}
                {isPostOpen && (
                    <div style={{border:'1px solid #ddd', maxHeight:'300px', overflowY:'auto'}}>
                        <DaumPostcode onComplete={handleCompletePost} />
                    </div>
                )}

                <textarea 
                    placeholder="간단한 설명 (선택)" 
                    rows="3" 
                    value={newRes.desc} 
                    onChange={(e) => setNewRes({...newRes, desc: e.target.value})}
                ></textarea>
            </div>

            <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setIsResModalOpen(false)}>취소</button>
                <button className="btn-save" onClick={handleCreateRestaurant}>저장</button>
            </div>
          </div>
        </div>
      )}

      {/* 🟠 [모달 2] 메뉴 관리 (DB 연동 버전) */}
      {isMenuModalOpen && selectedRestaurant && (
        <div className="modal-overlay">
          <div className="modal-box" style={{width:'500px'}}>
            <div className="modal-header">
                <h3>📋 메뉴 관리 : <span style={{color:'#0ca678'}}>{selectedRestaurant.restaurant_name}</span></h3>
                <button onClick={() => setIsMenuModalOpen(false)} className="close-btn">✖</button>
            </div>
            
            {/* 메뉴 입력 폼 */}
            <div className="menu-input-area">
                <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                    <input placeholder="메뉴명" style={{flex:2}} value={newMenu.name} onChange={(e) => setNewMenu({...newMenu, name: e.target.value})} />
                    <input placeholder="가격" type="number" style={{flex:1}} value={newMenu.price} onChange={(e) => setNewMenu({...newMenu, price: e.target.value})} />
                    <button className="btn-add-menu" onClick={handleAddMenu}>추가</button>
                </div>
                <input placeholder="설명 (선택)" style={{width:'100%'}} value={newMenu.desc} onChange={(e) => setNewMenu({...newMenu, desc: e.target.value})} />
            </div>

            {/* 메뉴 리스트 */}
            <div className="menu-list-area">
                {restaurantMenus.length === 0 ? (
                    <div style={{textAlign:'center', padding:'20px', color:'#999'}}>등록된 메뉴가 없습니다.</div>
                ) : (
                    restaurantMenus.map(menu => (
                        <div key={menu.restaurant_menu_id} className="menu-item">
                            <div className="menu-info">
                                <div className="menu-name">{menu.restaurant_menu_name}</div>
                                <div className="menu-desc">{menu.description || '-'}</div>
                            </div>
                            <div className="menu-price-action">
                                <span className="menu-price">{Number(menu.price).toLocaleString()}원</span>
                                <button className="btn-delete-mini" onClick={() => handleDeleteMenu(menu.restaurant_menu_id)}>삭제</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;