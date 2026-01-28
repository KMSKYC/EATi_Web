import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import './css/MemberManagement.css'; // 👈 방금 만드신 CSS 파일 경로 확인!

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 모달(팝업) 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🟢 입력 폼 데이터 관리
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    nickname: '',
    gender: '남성',
    region: ''
  });

  // 초기 데이터 로딩
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. API 호출
      const data = await adminApi.getUsers();
    
      // 2. 데이터 저장
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        // 데이터가 배열이 아닐 경우 (혹시 모를 에러 방지)
        console.warn("데이터가 배열 형식이 아닙니다!", data);
        setMembers([]);
      }

    } catch (err) {
      console.error("회원 목록 로딩 실패:", err);
      setError("데이터를 불러오지 못했습니다.");
      // 에러 나면 빈 배열로 초기화 (화면 안 깨지게)
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 예쁘게 보여주기
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.split('T')[0]; // 2024-05-20T... -> 2024-05-20
  };


  // 🟢 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // 🟢 회원 등록 실행
  const handleCreateUser = async () => {
    // 유효성 검사
    if (!newUser.email || !newUser.password || !newUser.nickname) {
      alert("이메일, 비밀번호, 별명은 필수 입력값입니다.");
      return;
    }

    try {
      // API 호출
      await adminApi.createUser(newUser);
      
      alert(`✅ 회원 [${newUser.nickname}]님이 등록되었습니다.`);
      setIsModalOpen(false); // 모달 닫기
      setNewUser({ email: '', password: '', nickname: '', gender: '남성', region: '' }); // 폼 초기화
      fetchMembers(); // 목록 새로고침
      
    } catch (err) {
      console.error(err);
      alert("회원 등록 실패! (이메일 중복 등을 확인해주세요)");
    }
  };

  // 상태 변경 (기존 기능)
  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === '정지' ? '정상' : '정지';
    if (window.confirm(`상태를 [${newStatus}]로 변경하시겠습니까?`)) {
      try {
        await adminApi.updateUserStatus(userId, newStatus);
        fetchMembers(); // 간단하게 목록 새로고침
      } catch (err) {
        alert("상태 변경 실패");
      }
    }
  };

  return (
    <div className="member-manage-container">
      {/* 1. 상단 헤더 */}
      <div className="page-header">
        <div className="header-left">
          <h3>👥 회원 관리</h3>
          <span className="member-count">총 {members.length}명</span>
        </div>
        
        <div className="header-right">
          <div className="search-box">
            <input placeholder="이름, 별명, 이메일 검색" />
          </div>
          {/* 모달 열기 버튼 */}
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            + 회원 등록
          </button>
        </div>
      </div>

      {/* 2. 회원 리스트 테이블 */}
      <div className="table-container">
        <table className="member-table">
          <thead>
            <tr>
              <th>사용자 정보</th>
              <th>별명</th>
              <th>성별</th>
              <th>거주지역</th>
              <th>가입일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'30px'}}>데이터가 없습니다.</td></tr>
            ) : (
              members.map((m) => (
                <tr key={m.user_id}>
                  <td>
                    <div className="user-info-cell">
                      <div className="avatar-circle">
                        {m.nickname ? m.nickname.substring(0,1) : 'U'}
                      </div>
                      <div className="user-text">
                        <span className="u-name">{m.nickname || '이름없음'}</span>
                        <span className="u-email">{m.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{m.nickname}</td>
                  <td>{m.gender}</td>
                  <td>{m.region || '-'}</td>
                  <td className="text-gray">{m.created_at ? m.created_at.split('T')[0] : '-'}</td>
                  <td>
                    <span className={`status-badge ${m.status === '정지' ? 'red' : 'green'}`}>
                      {m.status || '정상'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-btn"
                      onClick={() => handleStatusChange(m.user_id, m.status)}
                    >
                      {m.status === '정지' ? '✅ 해제' : '⛔ 정지'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. 회원 등록 모달 (CSS 클래스 활용) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>새 회원 등록</h3>
            
            <div className="modal-form-grid">
              {/* 이메일 (꽉 찬 너비) */}
              <div className="form-group full-width">
                <label>이메일 (ID)</label>
                <input 
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com" 
                />
              </div>

              {/* 비밀번호 (꽉 찬 너비) */}
              <div className="form-group full-width">
                <label>비밀번호</label>
                <input 
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호 입력" 
                />
              </div>

              {/* 닉네임 */}
              <div className="form-group">
                <label>별명</label>
                <input 
                  name="nickname"
                  value={newUser.nickname}
                  onChange={handleInputChange}
                  placeholder="홍길동" 
                />
              </div>

              {/* 성별 */}
              <div className="form-group">
                <label>성별</label>
                <select name="gender" value={newUser.gender} onChange={handleInputChange}>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </div>

              {/* 지역 (꽉 찬 너비) */}
              <div className="form-group full-width">
                <label>거주 지역</label>
                <input 
                  name="region"
                  value={newUser.region}
                  onChange={handleInputChange}
                  placeholder="예: 서울 강남구" 
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>취소</button>
              <button className="btn-save" onClick={handleCreateUser}>등록하기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MemberManagement;