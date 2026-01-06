/* src/components/KakaoMap.js */
import React, { useEffect, useState } from 'react';

function KakaoMap() {
  const [status, setStatus] = useState("⏳ 지도 로딩 대기 중...");

  useEffect(() => {
    // 카카오가 로드될 때까지 0.1초마다 확인
    const interval = setInterval(() => {
      // 1. 카카오 객체가 있는지 확인
      if (window.kakao && window.kakao.maps) {
        clearInterval(interval); // 확인 중단
        setStatus("✅ 지도 로딩 성공!");
        
        // 2. 지도 그리기
        window.kakao.maps.load(() => {
          const container = document.getElementById('myMap');
          if (container) {
            const options = {
              center: new window.kakao.maps.LatLng(37.498095, 127.027610),
              level: 3
            };
            const map = new window.kakao.maps.Map(container, options);
            
            // 마커
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(37.498095, 127.027610)
            });
            marker.setMap(map);
          }
        });
      }
    }, 100); // 0.1초 간격

    // 10초가 지나도 안 뜨면 포기 (무한 루프 방지)
    setTimeout(() => {
      clearInterval(interval);
      if (!window.kakao) setStatus("❌ 로딩 실패 (새로고침 해주세요)");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="myMap" 
      style={{ 
        width: '100%', 
        height: '500px', 
        backgroundColor: '#eee', 
        borderRadius: '20px',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      {/* 지도가 뜨면 이 글씨는 덮여서 안 보이게 됩니다 */}
      <span style={{color: '#666'}}>{status}</span>
    </div>
  );
}

export default KakaoMap;