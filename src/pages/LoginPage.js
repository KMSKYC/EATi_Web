import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import '../css/Auth.css'

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async () => {
    // (디버깅용 로그) 여기서 입력값이 제대로 찍히는지 확인해보세요!
    console.log("입력된 값:", userId, password);

    // Context의 login 함수 실행
    const success = await login(userId, password);

    if (success) {
      navigate('/'); 
    } else {
      alert("로그인 실패!");
    }
  };
  return (
   <div className="auth-wrapper">
      <div className="auth-logo">
        <Link to="/">EATI</Link>
      </div>
    <div className="page-container">
      <h2>로그인</h2>
      
      <div className="login-form">
        <input 
          type="text" 
          placeholder="아이디" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>로그인</button>
      </div>
      
      <hr className="divider" />
      <Link to="/signup" className="signup-link-btn">
        아직 회원이 아니신가요? 회원가입
      </Link>
    </div>
    </div> 
  );
}

export default LoginPage;