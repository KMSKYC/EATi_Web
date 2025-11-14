import React from 'react';
function LoginModal(props) {
  const { onClose } = props;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        
        <h2>로그인</h2>
        <div className="login-form">
          <input type="text" placeholder="아이디 (이메일)" />
          <input type="password" placeholder="비밀번호" />
          
          <button className="login-btn">로그인</button>
        </div>
        
        <hr className="divider" />
        
        {/* (★ 5. 회원가입 버튼 ★) */}
        <button className="signup-link-btn" onClick={() => alert('회원가입 화면으로 이동!')}>
          아직 회원이 아니신가요? 회원가입
        </button>
        
      </div>
    </div>
  );
}

export default LoginModal;