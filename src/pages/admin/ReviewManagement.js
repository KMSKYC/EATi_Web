import React, { useState } from 'react';
import './css/MemberManagement.css'; // 기존 테이블 스타일 재사용 (효율적!)

function ReviewManagement() {
  // 더미 데이터: status가 'report'인 것은 신고된 리뷰
  const [reviews, setReviews] = useState([
    { id: 1, restaurant: '오레노 라멘', user: '지민', content: '국물이 진짜 진하고 맛있어요! 인생 라멘 등극 🍜', rating: 5, date: '2024-12-20', status: 'normal' },
    { id: 2, restaurant: '마라공방', user: '불만제로', content: '위생 상태가 별로인 것 같습니다. 머리카락 나옴 ㅡㅡ', rating: 1, date: '2024-12-19', status: 'report' }, // 신고됨
    { id: 3, restaurant: '다운타우너', user: '먹방요정', content: '버거가 너무 커서 먹기 힘들어요 ㅠㅠ 맛은 있음', rating: 4, date: '2024-12-18', status: 'normal' },
    { id: 4, restaurant: '랜디스 도넛', user: '빵순이', content: '줄이 너무 길어서 포기했어요.. 평점 1점 드립니다.', rating: 1, date: '2024-12-15', status: 'normal' },
    { id: 5, restaurant: '경양카츠', user: '익명123', content: '욕설욕설욕설 맛없어!', rating: 1, date: '2024-12-10', status: 'report' }, // 신고됨
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // 리뷰 삭제 기능
  const handleDelete = (id) => {
    if (window.confirm('이 리뷰를 영구 삭제하시겠습니까? (복구 불가)')) {
      setReviews(reviews.filter(r => r.id !== id));
      alert('리뷰가 삭제되었습니다.');
    }
  };

  // 검색 필터
  const filteredReviews = reviews.filter(r => 
    r.restaurant.includes(searchTerm) || r.content.includes(searchTerm) || r.user.includes(searchTerm)
  );

  return (
    <div className="member-manage-container">
      
      {/* 헤더 */}
      <div className="page-header">
        <div className="header-left">
            <h3>⭐ 리뷰 관리</h3>
            <span className="member-count">총 {reviews.length}개</span>
        </div>
        <div className="search-box">
            <input 
                type="text" 
                placeholder="식당명, 내용, 작성자 검색" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* 테이블 */}
      <div className="table-container">
        <table className="member-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>식당 이름</th>
              <th>작성자</th>
              <th style={{width: '40%'}}>내용</th>
              <th>평점</th>
              <th>날짜</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(review => (
              <tr key={review.id} style={{ backgroundColor: review.status === 'report' ? '#fff5f5' : 'white' }}>
                <td>{review.id}</td>
                <td style={{fontWeight:'bold'}}>{review.restaurant}</td>
                <td>{review.user}</td>
                <td>
                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {review.content}
                    </div>
                </td>
                <td>
                    <span style={{color: '#fcc419'}}>★</span> {review.rating}
                </td>
                <td className="text-gray">{review.date}</td>
                <td>
                  {review.status === 'report' ? (
                    <span className="status-badge red">🚨 신고됨</span>
                  ) : (
                    <span className="status-badge green">게시중</span>
                  )}
                </td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(review.id)}>
                    🗑️ 삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ReviewManagement;