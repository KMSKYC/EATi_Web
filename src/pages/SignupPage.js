import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Auth.css';
import { authApi } from '../api/authApi';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    emailCode: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    birthdate: '',
    gender: '',
    region: ''
  });

  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    letter: false,
    number: false,
    special: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setIsEmailAvailable(false);
      setIsEmailSent(false);
      setIsEmailVerified(false);
      setEmailCheckMessage('');
    }
    if (name === 'password') {
      setPasswordValid({
        length: value.length >= 8,
        letter: /[a-zA-Z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const handleCheckEmail = async () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setIsEmailAvailable(false);
      setEmailCheckMessage('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const response = await authApi.checkEmailDuplicate(formData.email);
      if (response.available === true) {
        setIsEmailAvailable(true);
        setEmailCheckMessage(response.message || '사용 가능한 이메일입니다.');
      } else {
        setIsEmailAvailable(false);
        setEmailCheckMessage(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.available === false) {
          setIsEmailAvailable(false);
          setEmailCheckMessage(errorData.message);
          return;
        }
      }
      alert("현재 오류가 발생했습니다. 고객센터로 문의주세요.");
      setIsEmailAvailable(false);
    }
  };

  const handleSendEmail = () => {
    if (!isEmailAvailable) {
      alert("먼저 이메일 중복 확인을 해주세요.");
      return;
    }
    const prefix = isEmailSent ? '[재전송] ' : '';
    const message = `${prefix}${formData.email}로 인증번호를 발송했습니다.\n\n(테스트용: 인증번호 1234를 입력해주세요)`;

    alert(message);
    setIsEmailSent(true);
    setEmailCheckMessage('인증번호가 발송되었습니다.');
    setFormData(prev => ({ ...prev, emailCode: '' }));
  };

  const handleVerifyEmail = () => {
    if (formData.emailCode === '1234') {
      alert("이메일 인증이 완료되었습니다!");
      setIsEmailVerified(true);
    } else {
      alert("인증번호가 틀렸습니다. (테스트: 1234)");
    }
  };

  const handleResetEmail = () => {
    setIsEmailAvailable(false);
    setIsEmailSent(false);
    setIsEmailVerified(false);
    setEmailCheckMessage('');
    setFormData({ ...formData, email: '' });
  };

  const handleSignupSubmit = async () => {
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    const isPasswordSafe =
      passwordValid.length &&
      passwordValid.letter &&
      passwordValid.number &&
      passwordValid.special;

    if (!isPasswordSafe) {
      alert("비밀번호 조건을 모두 충족해주세요.");
      return;
    }

    if (!formData.email || !formData.password || !formData.nickname) {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const dataToSend = {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      birthdate: formData.birthdate || null,
      gender: formData.gender || null,
      region: formData.region || null,
    };

    try {
      await authApi.signup(dataToSend);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate('/login');
    } catch (error) {
      console.error("가입 실패:", error);
      const serverMsg = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      alert(`실패: ${serverMsg}`);
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
          <span className="auth-badge">Join Us</span>
          <h1>EATi와 함께<br />맛있는 여정을</h1>
          <p>회원가입하고 나만의 맛집을 찾아보세요</p>
        </div>
        <div className="auth-hero-bg signup-bg"></div>
      </div>

      {/* 오른쪽 폼 섹션 */}
      <div className="auth-form-section">
        <button className="back-button" onClick={handleGoBack} aria-label="뒤로가기">
          ←
        </button>

        <div className="auth-form-container signup-container">
          <div className="auth-logo">
            <img src="/EATi.png" alt="EATI" />
          </div>

          <h2>회원가입</h2>
          <p className="required-notice"><span className="required-mark">*</span> 필수입력항목</p>

          <div className="auth-form">
            {/* 이메일 */}
            <div className="input-group">
              <label className="input-label">이메일 (아이디) <span className="required-mark">*</span></label>
              <div className="input-with-btn">
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isEmailVerified}
                />
                {!isEmailAvailable ? (
                  <button type="button" className="small-btn" onClick={handleCheckEmail}>
                    중복확인
                  </button>
                ) : isEmailVerified ? (
                  <button
                    type="button"
                    className="small-btn secondary"
                    onClick={handleResetEmail}
                  >
                    수정하기
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`small-btn ${isEmailSent ? 'secondary' : ''}`}
                    onClick={handleSendEmail}
                  >
                    {isEmailSent ? '재전송' : '인증요청'}
                  </button>
                )}
              </div>
              {emailCheckMessage && !isEmailVerified && (
                <p className={`input-message ${isEmailAvailable ? 'success' : 'error'}`}>
                  {emailCheckMessage}
                </p>
              )}
              {isEmailVerified && (
                <p className="input-message success">이메일 인증이 완료되었습니다.</p>
              )}

              {isEmailSent && !isEmailVerified && (
                <div className="input-with-btn" style={{ marginTop: '8px' }}>
                  <input
                    type="text"
                    name="emailCode"
                    placeholder="인증번호 4자리"
                    value={formData.emailCode}
                    onChange={handleChange}
                  />
                  <button type="button" className="small-btn" onClick={handleVerifyEmail}>
                    확인
                  </button>
                </div>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="input-group">
              <label className="input-label">비밀번호 <span className="required-mark">*</span></label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="password-checklist">
                <span className={passwordValid.length ? 'valid' : ''}>8자 이상</span>
                <span className={passwordValid.letter ? 'valid' : ''}>영문</span>
                <span className={passwordValid.number ? 'valid' : ''}>숫자</span>
                <span className={passwordValid.special ? 'valid' : ''}>특수문자</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">비밀번호 확인 <span className="required-mark">*</span></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* 닉네임 */}
            <div className="input-group">
              <label className="input-label">닉네임 <span className="required-mark">*</span></label>
              <input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력하세요"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>

            {/* 선택 항목 */}
            <div className="optional-section">
              <p className="optional-title">선택 정보</p>

              <div className="input-row">
                <div className="input-group half">
                  <label className="input-label">생년월일</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group half">
                  <label className="input-label">성별</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">선택 안 함</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">지역</label>
                <input
                  type="text"
                  name="region"
                  placeholder="예: 서울시 강남구"
                  value={formData.region}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="button" className="auth-submit-btn" onClick={handleSignupSubmit}>
              가입 완료
            </button>
          </div>

          <div className="auth-divider">
            <span>또는</span>
          </div>

          <Link to="/login" className="auth-link-btn">
            이미 계정이 있으신가요? <strong>로그인</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
