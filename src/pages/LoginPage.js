import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Auth.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    const success = await login(formData.email, formData.password);

    if (success) {
      alert("로그인 성공! 환영합니다.");
      navigate('/');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      {/* 왼쪽 히어로 섹션 */}
      <div className="auth-hero">
        <div className="auth-hero-content">
          <span className="auth-badge">Welcome Back</span>
          <h1>다시 만나서<br />반가워요</h1>
          <p>EATi와 함께 오늘도 맛있는 하루 되세요</p>
        </div>
        <div className="auth-hero-bg"></div>
      </div>

      {/* 오른쪽 폼 섹션 */}
      <div className="auth-form-section">
        <button className="back-button" onClick={handleGoBack} aria-label="뒤로가기">
          ←
        </button>

        <div className="auth-form-container">
          <div className="auth-logo">
            <img src="/EATi.png" alt="EATI" />
          </div>

          <h2>로그인</h2>

          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label className="input-label">이메일</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="input-label">비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-submit-btn">로그인</button>
          </form>

          <div className="auth-divider">
            <span>또는</span>
          </div>

          <Link to="/signup" className="auth-link-btn">
            아직 회원이 아니신가요? <strong>회원가입</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
