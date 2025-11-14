import React from 'react';
import { Link } from 'react-router-dom'; 
import '../css/LoginPage.css'; 
import { useNavigate } from 'react-router-dom';

function SignupPage() {

  const navigate = useNavigate(); // (★ 2. '이동' 기능 준비)
  
  const handleSignupSubmit = async () => {
    navigate('/login'); 
  };


  return (
    <div className="page-container">
      <h2>회원가입</h2>
      <div className="login-form">
        <input type="text" placeholder="아이디 (이메일)" />
        <input type="password" placeholder="비밀번호" />
        <input type="password" placeholder="비밀번호 확인" />
        <input type="text" placeholder="닉네임" />

        <button className="login-btn" onClick={handleSignupSubmit}>가입 완료</button>
      </div>
      
      <hr className="divider" />
      
      <Link to="/login" className="signup-link-btn">
        이미 계정이 있으신가요? 로그인
      </Link>
    </div>
  );
}

export default SignupPage;