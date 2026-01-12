import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './css/AdminPage.css'; // 기존 어드민 스타일
import './css/RestaurantManagement.css'; // 👈 (NEW) 방금 만든 CSS 불러오기!

const RestaurantManagement = () => {
  // ... (상태 관리 로직은 기존과 100% 동일합니다. 복잡하니 생략 안 하고 전체 다 적어드릴게요) ...
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('eatiData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // 🛠️ 마이그레이션: menus가 없는 옛날 데이터에 빈 배열([])을 강제로 넣어줌
      const fixedData = parsedData.map(item => ({
        ...item,
        menus: item.menus || [] // menus가 있으면 쓰고, 없으면 빈 배열 넣어라!
      }));

      setRestaurants(fixedData);
    }
  }, []);
  
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedResId, setSelectedResId] = useState(null);
  const [inputs, setInputs] = useState({ name: '', category: '한식', address: '' });
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [menuInput, setMenuInput] = useState({ name: '', price: '', desc: '' });

  // ... (로직 함수들: handleCompletePost, handleSaveRestaurant 등 기존과 동일) ...
  const handleCompletePost = (data) => {
    let fullAddress = data.address;
    if (data.addressType === 'R' && data.bname !== '') fullAddress += ` (${data.bname})`;
    setInputs({ ...inputs, address: fullAddress });
    setIsPostOpen(false);
    if (window.kakao && window.kakao.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(fullAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setCoords({ lat: result[0].y, lng: result[0].x });
        }
      });
    }
  };

  const handleSaveRestaurant = () => {
    if (!inputs.name || !inputs.address || !coords.lat) return alert("정보 부족!");
    const newRes = { id: Date.now(), name: inputs.name, category: inputs.category, address: inputs.address, lat: coords.lat, lng: coords.lng, menus: [], status: '영업중' };
    saveData([...restaurants, newRes]);
    setIsResModalOpen(false);
    setInputs({ name: '', category: '한식', address: '' });
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm("삭제하시겠습니까?")) saveData(restaurants.filter(r => r.id !== id));
  };

  const saveData = (newData) => {
    setRestaurants(newData);
    localStorage.setItem('eatiData', JSON.stringify(newData));
  };

  const openMenuModal = (resId) => {
    setSelectedResId(resId);
    setMenuInput({ name: '', price: '', desc: '' });
    setIsMenuModalOpen(true);
  };

  const handleAddMenu = () => {
    if (!menuInput.name || !menuInput.price) return alert("메뉴명/가격 필수!");
    const updated = restaurants.map(res => {
      if (res.id === selectedResId) {
        return { ...res, menus: [...res.menus, { id: Date.now(), name: menuInput.name, price: Number(menuInput.price), desc: menuInput.desc }] };
      }
      return res;
    });
    saveData(updated);
    setMenuInput({ name: '', price: '', desc: '' });
  };

  const handleDeleteMenu = (menuId) => {
    const updated = restaurants.map(res => {
      if (res.id === selectedResId) return { ...res, menus: res.menus.filter(m => m.id !== menuId) };
      return res;
    });
    saveData(updated);
  };

  const targetRestaurant = restaurants.find(r => r.id === selectedResId);

  // -----------------------------------------------------------
  // 👇 여기가 진짜 바뀐 부분입니다! (style={} 대신 className="")
  // -----------------------------------------------------------
  return (
    <div className="dashboard-wrapper">
      <div className="box-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>🍽️ 식당 및 메뉴 관리</h3>
        <button className="btn-primary" onClick={() => setIsResModalOpen(true)} style={{padding:'10px 20px', backgroundColor:'#333', color:'#fff', border:'none', borderRadius:'5px', cursor:'pointer'}}>
          + 식당 등록
        </button>
      </div>

      {/* 리스트 테이블 (기존 유지) */}
      <div className="dashboard-box">
        <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>가게명</th>
              <th>카테고리</th>
              <th>주소</th>
              <th>메뉴 수</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{res.name}</td>
                <td>{res.category}</td>
                <td style={{ fontSize: '14px', color: '#666' }}>{res.address}</td>
                <td><span style={{ fontWeight: 'bold' }}>{res.menus ? res.menus.length : 0}개</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => openMenuModal(res.id)} style={{ padding: '5px 10px', backgroundColor: '#4ecdc4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>📋 메뉴판</button>
                    <button onClick={() => handleDeleteRestaurant(res.id)} className="btn-delete">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟡 1. 식당 등록 모달 */}
      {isResModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>새 식당 등록</h2>
              <button onClick={() => setIsResModalOpen(false)} className="btn-close">✖</button>
            </div>
            
            <input className="modal-input" placeholder="식당 이름" value={inputs.name} onChange={(e) => setInputs({...inputs, name: e.target.value})} />
            
            <select className="modal-input" value={inputs.category} onChange={(e) => setInputs({...inputs, category: e.target.value})}>
               <option>한식</option><option>일식</option><option>중식</option><option>양식</option><option>디저트</option>
            </select>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input className="modal-input" placeholder="주소" value={inputs.address} readOnly style={{ flex: 1, backgroundColor: '#f9f9f9' }} />
              <button onClick={() => setIsPostOpen(!isPostOpen)} className="btn-search">🔍</button>
            </div>
            
            {isPostOpen && <div style={{border:'1px solid #ddd', marginBottom:'10px'}}><DaumPostcode onComplete={handleCompletePost} style={{ height: '300px' }} /></div>}
            
            <div className="modal-footer">
              <button onClick={() => setIsResModalOpen(false)} className="btn-cancel">취소</button>
              <button onClick={handleSaveRestaurant} className="btn-save">저장</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 2. 메뉴 관리 모달 */}
      {isMenuModalOpen && targetRestaurant && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: '600px' }}>
            <div className="modal-header">
              <h2>📋 메뉴 관리 : <span style={{ color: '#4ecdc4' }}>{targetRestaurant.name}</span></h2>
              <button onClick={() => setIsMenuModalOpen(false)} className="btn-close">✖</button>
            </div>

            {/* 메뉴 추가 폼 */}
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input className="modal-input" style={{marginBottom:0, flex:2}} placeholder="메뉴명" value={menuInput.name} onChange={(e) => setMenuInput({...menuInput, name: e.target.value})} />
                <input className="modal-input" style={{marginBottom:0, flex:1}} type="number" placeholder="가격" value={menuInput.price} onChange={(e) => setMenuInput({...menuInput, price: e.target.value})} />
                <button onClick={handleAddMenu} className="btn-save" style={{ margin: 0, whiteSpace:'nowrap' }}>추가</button>
              </div>
              <input className="modal-input" style={{marginBottom:0}} placeholder="설명 (선택)" value={menuInput.desc} onChange={(e) => setMenuInput({...menuInput, desc: e.target.value})} />
            </div>

            {/* 👇👇👇 [여기가 수정된 부분입니다] 👇👇👇 */}
            {/* targetRestaurant.menus 뒤에 || [] 를 붙여서 에러를 막았습니다 */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {(targetRestaurant.menus || []).length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>등록된 메뉴가 없습니다.</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(targetRestaurant.menus || []).map(menu => (
                    <li key={menu.id} className="menu-item">
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{menu.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{menu.desc}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>{menu.price.toLocaleString()}원</span>
                        <button onClick={() => handleDeleteMenu(menu.id)} className="btn-delete">삭제</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* 👆👆👆 [수정 끝] 👆👆👆 */}

          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement;