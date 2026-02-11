/* src/components/KakaoMap.js */
import React, { useEffect, useState } from 'react';

function KakaoMap() {
  const [status, setStatus] = useState("⏳ 지도 로딩 대기 중...");

  useEffect(() => {
    // 카카오가 로드될 때까지 0.1초마다 확인
    const interval = setInterval(() => {
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
            
            const savedData = localStorage.getItem('eatiData');
if (savedData) {
              const stores = JSON.parse(savedData);
              console.log("📍 지도에 찍을 데이터:", stores);

              stores.forEach((store) => {
                // 저장된 좌표로 마커 위치 생성
                const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                  position: markerPosition,
                  clickable: true // 클릭 가능하게 설정
                });

                // 지도에 마커 올리기
                marker.setMap(map);

                // 마커 클릭 시 뜰 말풍선 (HTML 내용)
                const iwContent = `
                  <div style="padding:10px; min-width:150px; color:black;">
                    <h4 style="margin:0 0 5px 0; font-size:16px; font-weight:bold;">${store.name}</h4>
                    <div style="font-size:13px; color:gray;">${store.category}</div>
                    <div style="font-size:12px; margin-top:3px;">${store.address}</div>
                  </div>
                `;

                // 말풍선(InfoWindow) 객체 생성
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: iwContent,
                  removable: true // 닫기 버튼 표시
                });

                // 마커 클릭 이벤트 등록 (클릭하면 말풍선 열림)
                window.kakao.maps.event.addListener(marker, 'click', function() {
                  infowindow.open(map, marker);
                });
              });
              
              // (옵션) 데이터가 있다면 첫 번째 가게 위치로 지도 중심 이동
              if (stores.length > 0) {
                 const firstStore = stores[stores.length - 1]; // 가장 최근 등록한 가게
                 const moveLatLon = new window.kakao.maps.LatLng(firstStore.lat, firstStore.lng);
                 map.setCenter(moveLatLon);
              }

            } else {
              console.log("📭 아직 등록된 맛집이 없습니다.");
            }
            // -----------------------------------------------------------
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
        height: '100%',
        backgroundColor: '#eee',
        borderRadius: '24px',
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