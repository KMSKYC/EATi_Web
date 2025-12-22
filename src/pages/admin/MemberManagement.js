import React, { useState } from 'react';
import './css/MemberManagement.css';

function MemberManagement() {
  // 1. 더미 데이터
  const [members, setMembers] = useState([
    { id: 1, name: '김지민', nickname: '지민', email: 'jimin@test.com', gender: '여성', region: '서울 강남구', joinDate: '2024-03-15', status: '정상' },
    { id: 2, name: '박민수', nickname: '관리자1', email: 'admin@eat.com', gender: '남성', region: '경기 성남시', joinDate: '2024-01-01', status: '정상' },
    { id: 3, name: '이영희', nickname: '맛집탐방러', email: 'yummy@food.com', gender: '여성', region: '부산 해운대구', joinDate: '2024-07-02', status: '정상' },
    { id: 4, name: '최철수', nickname: '불만제로', email: 'bad@user.com', gender: '남성', region: '서울 마포구', joinDate: '2024-05-20', status: '정지' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // 2. (수정) 비밀번호(password) 필드 추가
  const [newMember, setNewMember] = useState({
    name: '', nickname: '', email: '', password: '', gender: '남성', region: ''
  });

  const toggleStatus = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: m.status === '정상' ? '정지' : '정상' } : m));
  };

  const handleAddMember = () => {
    // 3. (수정) 비밀번호 입력 확인 로직 추가
    if (!newMember.name || !newMember.nickname || !newMember.email || !newMember.password) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    const id = members.length + 1;
    const today = new Date().toISOString().split('T')[0];
    
    // 실제로는 비밀번호는 암호화해서 서버로 보내야 하지만, 여기선 화면 표시용 데이터에만 추가합니다.
    // (보안상 테이블 리스트에는 비밀번호를 보여주지 않는 것이 원칙입니다!)
    setMembers([{ id, ...newMember, joinDate: today, status: '정상' }, ...members]);
    
    setShowModal(false);
    // 초기화
    setNewMember({ name: '', nickname: '', email: '', password: '', gender: '남성', region: '' });
    alert('회원이 등록되었습니다.');
  };

  const filteredMembers = members.filter(m => 
    m.name.includes(searchTerm) || m.nickname.includes(searchTerm) || m.email.includes(searchTerm)
  );

  return (
    <div className="member-manage-container">
      
      {/* 상단 헤더 */}
      <div className="page-header">
        <div className="header-left">
            <h3>👥 회원 관리</h3>
            <span className="member-count">총 {members.length}명</span>
        </div>
        
        <div className="header-right">
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="이름, 별명, 이메일 검색" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="primary-btn" onClick={() => setShowModal(true)}>
                + 회원 등록
            </button>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="table-container">
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
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
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>
                    <div className="user-info-cell">
                        <div className="avatar-circle">{member.name[0]}</div>
                        <div className="user-text">
                            <div className="u-name">{member.name}</div>
                            <div className="u-email">{member.email}</div>
                        </div>
                    </div>
                </td>
                <td>{member.nickname}</td>
                <td>{member.gender}</td>
                <td>{member.region}</td>
                <td className="text-gray">{member.joinDate}</td>
                <td>
                  <span className={`status-badge ${member.status === '정상' ? 'green' : 'red'}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => toggleStatus(member.id)}>
                    {member.status === '정상' ? '⛔ 정지' : '✅ 해제'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 회원 등록 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>신규 회원 등록</h3>
            
            <div className="modal-form-grid">
                <div className="form-group">
                    <label>이름</label>
                    <input type="text" placeholder="예: 홍길동" 
                        value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>별명</label>
                    <input type="text" placeholder="예: 먹방요정" 
                        value={newMember.nickname} onChange={(e) => setNewMember({...newMember, nickname: e.target.value})} />
                </div>
                
                <div className="form-group full-width">
                    <label>이메일 (ID)</label>
                    <input type="email" placeholder="email@example.com" 
                        value={newMember.email} onChange={(e) => setNewMember({...newMember, email: e.target.value})} />
                </div>

                {/* 🚨 (추가됨) 비밀번호 입력 필드 */}
                <div className="form-group full-width">
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        placeholder="초기 비밀번호를 입력하세요" 
                        value={newMember.password} 
                        onChange={(e) => setNewMember({...newMember, password: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>성별</label>
                    <select value={newMember.gender} onChange={(e) => setNewMember({...newMember, gender: e.target.value})}>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>거주지역</label>
                    <select value={newMember.region} onChange={(e) => setNewMember({...newMember, region: e.target.value})}>
                        <option value="">선택하세요</option>
                        <option value="서울 강남구">서울 강남구</option>
                        <option value="서울 마포구">서울 마포구</option>
                        <option value="경기 성남시">경기 성남시</option>
                        <option value="부산 해운대구">부산 해운대구</option>
                    </select>
                </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-save" onClick={handleAddMember}>등록하기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MemberManagement;