import React from 'react';
import { Link } from 'react-router-dom'; // (★) 'a' 태그 대신 'Link' 태그
import '../css/LoginPage.css'

function LoginPage() {
  return (
    // (★) 'popup-overlay'나 'popup-box'가 필요 없습니다.
    <div className="page-container">
      <h2>로그인</h2>
      
      <div className="login-form">
        <input type="text" placeholder="아이디 (이메일)" />
        <input type="password" placeholder="비밀번호" />
        <button className="login-btn">로그인</button>
      </div>
      
      <hr className="divider" />
      <Link to="/signup" className="signup-link-btn">
        아직 회원이 아니신가요? 회원가입
      </Link>
    </div>
  );
}

export default LoginPage;