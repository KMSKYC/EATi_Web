import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/Auth.css'; 
import { authApi } from '../api/authApi'

function SignupPage() {

  const navigate = useNavigate(); // (★ 2. '이동' 기능 준비)
  
  const [formData, setFormData] = useState({
      email: '',
      emailCode: '',
      userid: '',
      password: '',
      confirmPassword: '', // 비번 확인용 (DB엔 안 보냄)
      nickname: '',
      birthdate: '',       // (추가) 생년월일
      gender: '',          // (추가) 성별
      region: ''           // (추가) 지역
    });
  
  const [userIdCheckMessage, setUserIdCheckMessage] = useState(''); // 화면에 띄울 메시지
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false); // 사용 가능 여부 (true여야 가입 가능)

  // (이메일 인증용)
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 발송 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 완료 여부

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });

      if (name === 'userid') {
      setIsUserIdAvailable(false);
      setUserIdCheckMessage('');
      }
      if (name === 'email') {
      setIsEmailSent(false);
      setIsEmailVerified(false);
    }
    };

    const handleCheckUserId = async () => {
    if (!formData.userid) {
      alert("아이디을 입력해주세요.");
      return;
    }
    try {
      // API 호출
      // const isDuplicate = await authApi.checkEmailDuplicate(formData.userid);
      const isDuplicate = formData.userid === 'admin';

      if (isDuplicate) {
        setIsUserIdAvailable(false);
        setUserIdCheckMessage('❌ 이미 사용 중인 아이디입니다.');
      } else {
        setIsUserIdAvailable(true);
        setUserIdCheckMessage('✅ 사용 가능한 아이디입니다.');
      }
    } catch (error) {
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 5. 이메일 인증번호 발송 함수
  const handleSendEmail = () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // (가짜 API 호출)
    alert(`[가상] ${formData.email}로 인증번호 '1234'를 발송했습니다!`);
    setIsEmailSent(true); // 인증번호 입력칸 보여주기
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


    const handleSignupSubmit = async () => {
    if (!formData.userid || !formData.password || !formData.nickname) {
      alert("필수 항목(아이디, 비밀번호, 닉네임)을 모두 입력해주세요!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isUserIdAvailable) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    // (★) 이메일 인증 확인
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }


    try {
      const dataToSend = {
        userId:formData.userid,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        birthdate: formData.birthdate || null,
        gender: formData.gender || null,
        region: formData.region || null,
        // status는 보통 백엔드에서 기본값('ACTIVE')으로 처리합니다.
      };

      
      alert("회원가입 성공! 로그인 해주세요.");
      navigate('/login'); // 로그인 페이지로 이동

    } catch (error) {
      console.error("가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <Link to="/">EATI</Link>
      </div>
    <div className="page-container">
      <h2>회원가입</h2>
      <div className="login-form">
        <label className="input-label">아이디 (필수)</label>
        
        {/* (★ 4. 이메일 입력 + 버튼 UI 구성 ★) */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" name="userid" 
            placeholder="아이디입력"
            value={formData.userid} onChange={handleChange} 
            style={{ flex: 1 }} // 입력창이 남은 공간 차지
          />
          <button 
            className="small-btn"
            type="button" // form submit 방지
            onClick={handleCheckUserId}
          >
            중복확인
          </button>
        </div>
        {/* (★) 메시지 출력 공간 */}
        {userIdCheckMessage && (
          <p style={{ 
            fontSize: '12px', 
            marginTop: '4px', 
            color: isUserIdAvailable ? 'green' : 'red' 
          }}>
            {userIdCheckMessage}
          </p>
        )}

        {/* === 2. 이메일 입력 (인증번호 발송) === */}
          <label className="input-label">이메일 인증 (필수)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" name="email" 
              placeholder="example@email.com"
              value={formData.email} onChange={handleChange} 
              disabled={isEmailVerified} // 인증되면 수정 불가
              style={{ flex: 1 }}
            />
            <button 
              type="button" 
              className="small-btn"
              onClick={handleSendEmail}
              disabled={isEmailVerified}
            >
              {isEmailSent ? '재전송' : '인증번호'}
            </button>
          </div>

          {/* === 3. 인증번호 입력 (발송 후에만 보임) === */}
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
          {isEmailVerified && <p style={{color:'green', fontSize:'12px', marginTop:'4px'}}>✅ 이메일 인증 완료</p>}


        <label className="input-label">비밀번호 (필수)</label>
        <input 
          type="password" name="password" 
          placeholder="비밀번호"
          value={formData.password} onChange={handleChange} 
        />
        <input 
          type="password" name="confirmPassword" 
          placeholder="비밀번호 확인"
          value={formData.confirmPassword} onChange={handleChange} 
        />

        <label className="input-label">닉네임 (필수)</label>
        <input 
          type="text" name="nickname" 
          placeholder="별명"
          value={formData.nickname} onChange={handleChange} 
        />

        <hr className="divider-small" />
        
        {/* ... (나머지 생년월일, 성별, 지역 코드는 그대로 유지) ... */}
        <label className="input-label">생년월일 (선택)</label>
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

        <label className="input-label">성별 (선택)</label>
        <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option value="">선택 안 함</option>
          <option value="M">남성</option>
          <option value="F">여성</option>
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