import React from 'react';
import { Link } from 'react-router-dom'; // (★ 1. 'Link'를 import ★)
import '../css/Header.css'

// (★ 2. 'props'가 더 이상 필요 없음 ★)
function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        {/* (★ 3. 로고도 '홈(/)'으로 가는 'Link'로 ★) */}
        <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
          <h1>런치 메이트</h1>
        </Link>
      </div>
      <nav className="auth-nav">
        {/* (★ 4. 'button'을 'Link'로 변경 ★) */}
        <Link to="/login" className="nav-btn">
          로그인
        </Link>
      </nav>
    </header>
  );
}

export default Header;