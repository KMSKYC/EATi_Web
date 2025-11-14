import React from 'react';
import { Outlet } from 'react-router-dom'; // (★) '자식 페이지'를 보여줄 구멍
import Header from '../components/Header'; // (★) 헤더 import

function MainLayout() {
  return (
    <div>
      <Header />
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default MainLayout;