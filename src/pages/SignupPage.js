import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './css/Auth.css'; 
import { authApi } from '../api/authApi'

function SignupPage() {

  const navigate = useNavigate(); // (★ 2. '이동' 기능 준비)
  
  const [formData, setFormData] = useState({
      email: '',
      emailCode:'',
      password: '',
      confirmPassword: '', // 비번 확인용 (DB엔 안 보냄)
      nickname: '',
      birthdate: '',       // (추가) 생년월일
      gender: '',          // (추가) 성별
      region: ''           // (추가) 지역
    });
  
  const [emailCheckMessage, setEmailCheckMessage] = useState(''); // 화면에 띄울 메시지
  const [isEmailAvailable, setIsEmailAvailable] = useState(false); // 사용 가능 여부 (true여야 가입 가능)
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 발송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 완료 여부
  const [passwordValid, setPasswordValid] = useState({
    length: false,  // 8자 이상
    letter: false,  // 영문 포함
    number: false,  // 숫자 포함
    special: false  // 특수문자 포함
  });

    const handleChange = (e) => { //회원가입 작성
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });

      if (name === 'email') {
      setIsEmailAvailable(false);
      setIsEmailSent(false);
      setIsEmailVerified(false);
      setEmailCheckMessage('');
      }
      if (name === 'password') {
      setPasswordValid({
        length: value.length >= 8,
        letter: /[a-zA-Z]/.test(value), // 영문 포함 확인
        number: /[0-9]/.test(value),    // 숫자 포함 확인
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value) // 특수문자 포함 확인
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
      setEmailCheckMessage('❌ 올바른 이메일 형식이 아닙니다.');
      return; // 형식이 틀리면 서버로 보내지 않고 여기서 멈춥니다!
    }

    try {
      const response = await authApi.checkEmailDuplicate(formData.email);
      
      if (response.available === true) {
        setIsEmailAvailable(true);
        setEmailCheckMessage(`✅ ${response.message || '사용 가능한 이메일입니다. 인증번호를 요청하세요'}`);
      } else {
        setIsEmailAvailable(false);
        setEmailCheckMessage(`❌ ${response.message}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.available === false) {
           setIsEmailAvailable(false);
           setEmailCheckMessage(`❌ ${errorData.message}`);
           return;
        }
      }
      alert("현재 오류가 발생했습니다. 고객센터로 문의주세요.");
      setIsEmailAvailable(false);
    }
  };


const handleSendEmail = () => { //이메일 인증번호
    if (!isEmailAvailable) {
      alert("먼저 이메일 중복 확인을 해주세요.");
      return;
    }
    // (★) 재전송임을 알리기 위해 메시지를 조금 다르게 할 수도 있습니다.
    const message = isEmailSent 
      ? `[재전송] ${formData.email}로 인증번호 '1234'를 다시 보냈습니다!`
      : `[가상] ${formData.email}로 인증번호 '1234'를 발송했습니다!`;

    alert(message);
    
    setIsEmailSent(true); // 입력칸 보이기
    setEmailCheckMessage('✅ 인증번호가 발송되었습니다. 이메일을 확인해주세요.');
    
    // (선택 사항) 재전송 시 입력칸 초기화
    setFormData(prev => ({ ...prev, emailCode: '' }));
  };

  // 6. 이메일 인증번호 확인 함수
  const handleVerifyEmail = () => {
    if (formData.emailCode === '1234') {
      alert("이메일 인증이 완료되었습니다! ✅");
      setIsEmailVerified(true);
    } else {
      alert("인증번호가 틀렸습니다. (정답: 1234)");
    }
  };

  // 4. 이메일 수정하기 (초기화 버튼)
  const handleResetEmail = () => {
    setIsEmailAvailable(false);
    setIsEmailSent(false);
    setIsEmailVerified(false);
    setEmailCheckMessage('');
    setFormData({ ...formData, email: '' }); // 입력창 비우기
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
    alert("비밀번호 조건을 모두 충족해주세요. (영문, 숫자, 특수문자 포함 8자 이상 20자리 이하)");
    return;
  }

    if (!formData.email || !formData.password || !formData.nickname) {
      alert("필수 항목(이메일, 비밀번호, 닉네임)을 모두 입력해주세요!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isEmailAvailable) {
      alert("이메일 중복 확인을 해주세요.");
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
  
    alert("🎉 회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate('/login');

    } catch (error) {
      console.error("가입 실패:", error);
      // 서버가 주는 에러 메시지 보여주기
      const serverMsg = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      alert(`❌ 실패: ${serverMsg}`);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <button className="back-button" onClick={handleGoBack} aria-label="뒤로가기">
        ←
      </button>
      <div className="auth-logo">
        <img src="/EATi.png" alt="EATI" />
      </div>
    <div className="page-container">
      <h2>회원가입</h2>
      <p style={{ fontSize: '13px', color: '#999', textAlign: 'right', maxWidth: '400px', margin: '0 auto 24px' }}>
        <span style={{ color: '#CC1213' }}>*</span> 는 필수입력항목입니다
      </p>
      <div className="login-form">
          <label className="input-label">이메일 (아이디) <span style={{ color: '#CC1213' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="email" name="email" 
                        placeholder="example@email.com"
                        value={formData.email} onChange={handleChange} 
                        // disabled={isEmailAvailable || isEmailSent}
                        disabled={isEmailVerified}
                        style={{ flex: 1 }}
                      />
                      
                      {/* (★) 상태에 따라 버튼이 바뀝니다! */}
                      {!isEmailAvailable ? (
                        // 1단계: 중복확인 버튼
                        <button type="button" className="small-btn" onClick={handleCheckEmail}>
                          중복확인
                        </button>
                      ) : (
                        // 2단계: 인증번호 전송 버튼 (중복확인 통과 시 등장)
                        <button 
                          type="button" 
                          className="small-btn" 
                          onClick={handleSendEmail}
                          disabled={isEmailVerified} // 인증 완료되면 비활성
                          style={{ backgroundColor: isEmailSent ? '#fff' : '#2577fc;', color: isEmailSent ? '#333' : '#fff' }}
                        >
                          {isEmailSent ? '재전송' : '인증번호 받기'}
                        </button>
                      )}
                    </div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          {/* (★ 수정) 인증 완료되지 않았을 때만 메시지 보여주기 */}
                          {!isEmailVerified && emailCheckMessage && (
                            <p style={{ fontSize: '12px', marginTop: '4px', color: emailCheckMessage.includes('❌') ? 'red' : 'green' }}>
                              {emailCheckMessage}
                            </p>
                          )}
                          {/* 인증 완료 메시지 (★ 신규 추가) */}
                          {isEmailVerified && (
                            <p style={{ fontSize: '12px', marginTop: '4px', color: 'green', fontWeight: 'bold' }}>
                              ✅ 이메일 인증이 완료되었습니다.
                            </p>
                          )}
                          {/* 이메일 잘못 썼을 때 되돌리는 버튼 */}
                          {isEmailAvailable && !isEmailVerified && (
                            <span onClick={handleResetEmail} style={{fontSize:'12px', color:'#999', cursor:'pointer', textDecoration:'underline'}}>
                              이메일 수정
                            </span>
                          )}
                        </div>
                      {/* 인증번호 입력칸 */}
                                {isEmailSent && !isEmailVerified && (
                                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <input 
                                      type="text" name="emailCode" 
                                      placeholder="인증번호 4자리"
                                      value={formData.emailCode} onChange={handleChange} 
                                      style={{ flex: 1 }}
                                    />
                                    <button type="button" className="small-btn" onClick={handleVerifyEmail}>
                                      확인
                                    </button>
                                  </div>
                                )}


        <label className="input-label">비밀번호 <span style={{ color: '#CC1213' }}>*</span></label>
        <input 
          type="password" name="password" 
          placeholder="비밀번호"
          value={formData.password} onChange={handleChange} 
        />
        <div style={{ display: 'flex', gap: '10px', fontSize: '12px', marginTop: '5px', marginBottom: '10px' }}>
            <span style={{ color: passwordValid.length ? '#28a745' : '#ccc' }}>
              {passwordValid.length ? '✔' : '•'} 8자 이상
            </span>
            <span style={{ color: passwordValid.letter ? '#28a745' : '#ccc' }}>
              {passwordValid.letter ? '✔' : '•'} 영문
            </span>
            <span style={{ color: passwordValid.number ? '#28a745' : '#ccc' }}>
              {passwordValid.number ? '✔' : '•'} 숫자
            </span>
            <span style={{ color: passwordValid.special ? '#28a745' : '#ccc' }}>
              {passwordValid.special ? '✔' : '•'} 특수문자
            </span>
          </div>
        <input 
          type="password" name="confirmPassword" 
          placeholder="비밀번호 확인"
          value={formData.confirmPassword} onChange={handleChange} 
        />

        <label className="input-label">닉네임 <span style={{ color: '#CC1213' }}>*</span></label>
        <input
          type="text" name="nickname"
          placeholder="별명"
          value={formData.nickname} onChange={handleChange}
        />

        <label className="input-label">생년월일 (선택)</label>
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

        <label className="input-label">성별 (선택)</label>
        <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option value="">선택 안 함</option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>

        <label className="input-label">지역 (선택)</label>
        <input type="text" name="region" placeholder="예: 서울시 강남구" value={formData.region} onChange={handleChange} />

        <button className="login-btn" onClick={handleSignupSubmit}>
          가입 완료
        </button>
      </div>
      
      <hr className="divider" />
      
      <Link to="/login" className="signup-link-btn">
        이미 계정이 있으신가요? 로그인
      </Link>
    </div>
    </div>
  );
}

export default SignupPage;