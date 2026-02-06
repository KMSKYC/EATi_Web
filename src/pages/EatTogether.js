import React, { useState } from 'react';
import './css/EatTogetherPage.css';

const mockPosts = [
  { id: 1, title: '12시 김치찌개 드실 분!', restaurant: '맛있는 김치찌개', location: '강남역 3번출구', current: 3, max: 4, time: '12:00', host: '런치왕', status: 'recruiting', category: '한식' },
  { id: 2, title: '버거킹 4달라 공구해요', restaurant: '버거킹 강남점', location: '강남역 11번출구', current: 1, max: 3, time: '12:15', host: '버거러버', status: 'recruiting', category: '패스트푸드' },
  { id: 3, title: '초밥 같이 드실 분 (여성분만)', restaurant: '스시마이', location: '역삼역 1번출구', current: 2, max: 2, time: '12:30', host: '초밥요정', status: 'closed', category: '일식' },
  { id: 4, title: '마라탕 맵찔이도 환영!', restaurant: '마라공방', location: '선릉역 5번출구', current: 2, max: 4, time: '12:00', host: '마라홀릭', status: 'recruiting', category: '중식' },
  { id: 5, title: '점심 파스타 같이 먹어요', restaurant: '더테이블', location: '강남역 10번출구', current: 1, max: 2, time: '12:30', host: '파스타조아', status: 'recruiting', category: '양식' },
  { id: 6, title: '쌀국수 좋아하시는 분', restaurant: '포36', location: '역삼역 3번출구', current: 3, max: 4, time: '11:30', host: '베트남러버', status: 'closed', category: '아시안' },
];

function EatTogetherPage() {
  const [filter, setFilter] = useState('all');

  const filteredPosts = filter === 'all'
    ? mockPosts
    : filter === 'recruiting'
      ? mockPosts.filter(p => p.status === 'recruiting')
      : mockPosts.filter(p => p.status === 'closed');

  const recruitingCount = mockPosts.filter(p => p.status === 'recruiting').length;

  return (
    <div className="eat-together-page">
      {/* 히어로 섹션 */}
      <section className="eat-hero-section">
        <div className="eat-hero-content">
          <span className="eat-badge">같이 먹기</span>
          <h1>함께라서 더 맛있는</h1>
          <p>주변 동료들과 배달비를 아끼고, 즐거운 점심 시간을 만들어보세요</p>
        </div>
        <div className="eat-hero-bg"></div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="eat-main-content">
        {/* 상단 그리드: 통계 + 글쓰기 */}
        <div className="eat-top-grid">
          {/* 왼쪽: 현황 카드 */}
          <div className="eat-stats-row">
            <div className="stat-card">
              <span className="stat-number">{recruitingCount}</span>
              <span className="stat-label">모집중</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{mockPosts.length}</span>
              <span className="stat-label">전체 모임</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">12</span>
              <span className="stat-label">오늘 참여자</span>
            </div>
          </div>

          {/* 오른쪽: 글쓰기 CTA */}
          <div className="eat-cta-card">
            <div className="cta-content">
              <h3>점심 친구를 찾고 계신가요?</h3>
              <p>모집 글을 올리고 함께 식사할 동료를 찾아보세요</p>
            </div>
            <button className="create-post-btn" onClick={() => alert('글쓰기 기능은 준비 중입니다!')}>
              모집 글 쓰기
            </button>
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="eat-filter-section">
          <h2 className="section-title">모집 현황</h2>
          <div className="filter-tabs">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              전체
            </button>
            <button
              className={filter === 'recruiting' ? 'active' : ''}
              onClick={() => setFilter('recruiting')}
            >
              모집중
            </button>
            <button
              className={filter === 'closed' ? 'active' : ''}
              onClick={() => setFilter('closed')}
            >
              마감
            </button>
          </div>
        </div>

        {/* 게시글 그리드 */}
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className={`post-card ${post.status === 'closed' ? 'closed' : ''}`}>
              <div className="post-header">
                <span className={`status-badge ${post.status}`}>
                  {post.status === 'recruiting' ? '모집중' : '마감'}
                </span>
                <span className="post-category">{post.category}</span>
              </div>

              <h3 className="post-title">{post.title}</h3>

              <div className="post-info">
                <div className="info-row">
                  <span className="info-icon">🍽</span>
                  <span>{post.restaurant}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{post.location}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🕐</span>
                  <span>{post.time}</span>
                </div>
              </div>

              <div className="post-footer">
                <div className="participant-info">
                  <span className="host-name">{post.host}</span>
                  <span className="count-text">{post.current} / {post.max}명</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(post.current / post.max) * 100}%` }}
                  ></div>
                </div>
                {post.status === 'recruiting' && (
                  <button className="join-btn">참여하기</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <p>해당하는 모임이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EatTogetherPage;
