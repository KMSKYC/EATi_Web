import React, { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import MemberManagement from './MemberManagement'; // (★) import 추가
import RestaurantManagement from './RestaurantManagement';
import ReviewManagement from './ReviewManagement';
import './css/AdminPage.css';

function AdminPage() {
  const navigate = useNavigate();
  
  // (★) 현재 어떤 탭을 보고 있는지 상태 관리 ('dashboard' | 'member' | ...)
  const [activeTab, setActiveTab] = useState('dashboard');

  const dashboardData = {
    todayVisitor: 1240,
    newMember: 45,
    newReview: 128,
    pendingReport: 3, // 처리 안 된 신고 건수 (중요!)
    
    // 인기 카테고리 통계
    categoryStats: [
      { name: '한식', value: 40, color: '#ff6b6b' },
      { name: '일식', value: 25, color: '#4ecdc4' },
      { name: '양식', value: 20, color: '#ffe66d' },
      { name: '중식', value: 15, color: '#1a535c' },
    ],

    // 실시간 인기 검색어/식당
    hotKeywords: [
      { rank: 1, keyword: '마라탕', upDown: 'up' },
      { rank: 2, keyword: '성수동 카페', upDown: 'same' },
      { rank: 3, keyword: '오레노 라멘', upDown: 'down' },
      { rank: 4, keyword: '방어회', upDown: 'new' },
      { rank: 5, keyword: '크리스마스', upDown: 'up' },
    ],

    // 최근 신고/문의 내역 (처리 대상)
    recentReports: [
      { id: 1, type: '리뷰 신고', content: '욕설이 포함되어 있습니다.', date: '10분 전', status: '대기' },
      { id: 2, type: '정보 수정', content: '폐업한 식당입니다.', date: '1시간 전', status: '처리중' },
      { id: 3, type: '회원 신고', content: '광고성 도배 유저입니다.', date: '어제', status: '대기' },
    ]
  };

  return (
    <div className="admin-container">
      
      {/* 1. 사이드바 */}
      <aside className="admin-sidebar">
        <div className="admin-logo">EATi <span className="admin-badge">ADMIN</span></div>
        
        <nav className="admin-nav">
          {/* (★) 클릭 시 activeTab 변경 */}
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 대시보드
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'member' ? 'active' : ''}`}
            onClick={() => setActiveTab('member')}
          >
            👥 회원 관리
          </button>
          
          <button className={`nav-item ${activeTab === 'restaurant' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurant')}>🍽️ 식당/메뉴 관리</button>
          <button 
            className={`nav-item ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            ⭐ 리뷰 관리
          </button>
        </nav>
        {/* ... 로그아웃 버튼 ... */}
      </aside>

      {/* 2. 우측 메인 콘텐츠 */}
      <main className="admin-content">
          <header className="admin-header">
            <h2>{activeTab === 'dashboard' ? '대시보드' : activeTab === 'member' ? '회원 관리' : '식당 관리'}</h2>
            <div className="admin-profile">
              <span>관리자님</span>
              <button className="mini-logout" onClick={() => navigate('/')}>나가기</button>
            </div>
          </header>

        {/* (★) 탭에 따라 다른 내용 보여주기 */}
        
        {/* 1. 대시보드 화면 */}
       {activeTab === 'dashboard' && (
          <div className="dashboard-wrapper">
            
            {/* 1. 상단 현황 카드 (KPI) */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">👥</div>
                <div className="kpi-info">
                   <p>오늘 방문자</p>
                   <h3>{dashboardData.todayVisitor.toLocaleString()}명</h3>
                </div>
                <span className="kpi-badge up">+12%</span>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">📝</div>
                <div className="kpi-info">
                   <p>신규 리뷰</p>
                   <h3>+{dashboardData.newReview}건</h3>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon">👤</div>
                <div className="kpi-info">
                   <p>신규 가입</p>
                   <h3>+{dashboardData.newMember}명</h3>
                </div>
              </div>
              {/* (★중요) 신고 건수는 빨간색으로 강조 */}
              <div className="kpi-card alert">
                <div className="kpi-icon">🚨</div>
                <div className="kpi-info">
                   <p>신고 접수</p>
                   <h3>{dashboardData.pendingReport}건</h3>
                </div>
                <span className="kpi-badge danger">Action!</span>
              </div>
            </div>

            {/* 2. 중간 섹션: 통계 그래프 & 인기 순위 */}
            <div className="chart-rank-section">
              
              {/* (왼쪽) 카테고리 통계 (CSS Bar Chart) */}
              <div className="dashboard-box chart-box">
                <h3>📊 카테고리별 리뷰 비율</h3>
                <div className="simple-bar-chart">
                  {dashboardData.categoryStats.map((stat) => (
                    <div key={stat.name} className="chart-row">
                      <span className="chart-label">{stat.name}</span>
                      <div className="chart-bar-bg">
                        <div 
                          className="chart-bar-fill" 
                          style={{ width: `${stat.value}%`, background: stat.color }}
                        ></div>
                      </div>
                      <span className="chart-value">{stat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* (오른쪽) 실시간 인기 검색어 */}
              <div className="dashboard-box rank-box">
                <h3>🔥 실시간 인기 검색어</h3>
                <ul className="rank-list">
                  {dashboardData.hotKeywords.map((item) => (
                    <li key={item.rank}>
                      <span className={`rank-num rank-${item.rank}`}>{item.rank}</span>
                      <span className="rank-keyword">{item.keyword}</span>
                      <span className={`rank-status ${item.upDown}`}>
                        {item.upDown === 'up' && '▲'}
                        {item.upDown === 'down' && '▼'}
                        {item.upDown === 'same' && '-'}
                        {item.upDown === 'new' && 'NEW'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. 하단 섹션: 최근 신고/요청 내역 (To-Do List 느낌) */}
            <div className="dashboard-box report-box">
              <div className="box-header">
                <h3>🚨 최근 접수된 신고/문의</h3>
                <button className="text-btn">전체보기 &gt;</button>
              </div>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>유형</th>
                    <th>내용</th>
                    <th>시간</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentReports.map(report => (
                    <tr key={report.id}>
                      <td><span className="report-tag">{report.type}</span></td>
                      <td>{report.content}</td>
                      <td className="text-gray">{report.date}</td>
                      <td><span className={`status-dot ${report.status === '대기' ? 'red' : 'green'}`}></span>{report.status}</td>
                      <td><button className="btn-xs">확인</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
        {/* ---------------- 대시보드 끝 ---------------- */}

        {activeTab === 'member' && <MemberManagement />}
        {activeTab === 'restaurant' && <RestaurantManagement />}
        {activeTab === 'review' && <ReviewManagement />}

      </main>
    </div>
  );
}

export default AdminPage;