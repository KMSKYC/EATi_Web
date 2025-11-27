import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MyPage from './pages/MyPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';

import './index.css';
import SearchMapPage from './pages/SearchMapPage';
import MainLayout from './layouts/MainLayout';
import EatTogether from './pages/EatTogether';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage />} />
      <Route path="/menu" element={<SearchPage />} />
      <Route path="/menu/map" element={<SearchMapPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/together" element={<EatTogether />} />
      </Route>
    </Routes>  
    // <main className="main-content">
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/mypage" element={<MyPage />} />
    //     <Route path="/searchpage" element={<SearchPage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/signup" element={<SignupPage />} />
    //     <Route path="/searchpage/map" element={<SearchMapPage />} />
    //   </Routes>
    // </main>

  );
}

export default App;