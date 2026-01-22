// import React, {useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import './css/EatTogetherPage.css'; 

const mockPosts = [
  { id: 1, title: '12시 김치찌개 드실 분!', restaurant: '맛있는 김치찌개', current: 3, max: 4, time: '12:00', host: '런치왕', status: 'recruiting' },
  { id: 2, title: '버거킹 4달라 공구해요', restaurant: '버거킹 강남점', current: 1, max: 3, time: '12:15', host: '버거러버', status: 'recruiting' },
  { id: 3, title: '초밥 같이 드실 분 (여성분만)', restaurant: '스시마이', current: 2, max: 2, time: '12:30', host: '초밥요정', status: 'closed' }, // 마감됨
];

function EatTogetherPage() {


  
  return (
    <div className="eat-together-container">

      {/* 1. 페이지 헤더 */}
      <div className="eat-header">
        <h2>같이 먹기</h2>
        <p>주변 동료들과 함께 배달비를 아끼고 즐겁게 식사하세요.</p>
      </div>

      {/* 2. 글쓰기 버튼 */}
      <div className="create-post-wrapper">
        <button className="create-post-btn" onClick={() => alert('글쓰기 기능은 준비 중입니다!')}>
          모집 글 쓰기
        </button>
      </div>

      {/* 3. 리스트 그리드 */}
      <div className="posts-grid">
        {mockPosts.map(post => (
          <div key={post.id} className={`post-card ${post.status === 'closed' ? 'closed' : ''}`}>

            <div className="post-header">
              <span className={`status-badge ${post.status}`}>
                {post.status === 'recruiting' ? '모집중' : '마감'}
              </span>
              <span className="post-time">{post.time}</span>
            </div>

            <h3 className="post-title">{post.title}</h3>
            <p className="post-restaurant">{post.restaurant}</p>

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
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default EatTogetherPage;