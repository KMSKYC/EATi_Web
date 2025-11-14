import React from 'react';
// (★) 'a' 태그 대신 'Link' 태그를 씁니다.
import { Link } from 'react-router-dom'; 
import '../css/Header.css'; // (CSS 파일 import)

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <h1>EATI</h1> 
        </Link>
      </div>
      <nav className="main-nav">
        <Link to="/" className="nav-link">
          홈
        </Link>
        <Link to="/searchpage" className="nav-link">
          메뉴 찾기
        </Link>
        <Link to="/eattogether" className="nav-link">
          같이 먹기
        </Link>
        <Link to="/mypage" className="nav-link">
          마이페이지
        </Link>
      </nav>

    </header>
  );
}
export default Header;