/* src/components/KakaoMap.js */
import React, { useEffect, useState, useRef, useCallback } from 'react';

function KakaoMap({ searchKeyword, onPlacesFound, onPlaceSelect, selectedPlace }) {
  const [status, setStatus] = useState("지도 로딩 중...");
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const markerMapRef = useRef({}); // place.id -> marker 매핑
  const infowindowRef = useRef(null);
  const psRef = useRef(null); // Places 서비스 객체

  // 마커 초기화 함수
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    markerMapRef.current = {};
  }, []);

  // 장소 검색 함수
  const searchPlaces = useCallback((keyword) => {
    if (!psRef.current || !mapRef.current || !keyword.trim()) return;

    // 기존 마커 제거
    clearMarkers();

    // 키워드 검색 (음식점 카테고리로 필터)
    psRef.current.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색 결과를 부모 컴포넌트에 전달
        if (onPlacesFound) {
          onPlacesFound(data);
        }

        // 검색된 장소의 좌표를 기반으로 지도 범위 설정
        const bounds = new window.kakao.maps.LatLngBounds();

        data.forEach((place, index) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: mapRef.current
          });

          markersRef.current.push(marker);
          markerMapRef.current[place.id] = { marker, place };

          // 마커 클릭 이벤트
          window.kakao.maps.event.addListener(marker, 'click', () => {
            // 기존 인포윈도우 닫기
            if (infowindowRef.current) {
              infowindowRef.current.close();
            }

            // 새 인포윈도우 생성
            const iwContent = `
              <div style="padding:12px; min-width:200px; max-width:280px;">
                <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#1a1a1a;">${place.place_name}</h4>
                <p style="margin:0 0 4px 0; font-size:12px; color:#888;">${place.category_name}</p>
                <p style="margin:0 0 8px 0; font-size:13px; color:#555;">${place.road_address_name || place.address_name}</p>
                ${place.phone ? `<p style="margin:0; font-size:13px; color:#CC1213;">${place.phone}</p>` : ''}
              </div>
            `;

            infowindowRef.current = new window.kakao.maps.InfoWindow({
              content: iwContent,
              removable: true
            });

            infowindowRef.current.open(mapRef.current, marker);

            // 부모 컴포넌트에 선택된 장소 전달
            if (onPlaceSelect) {
              onPlaceSelect(place);
            }
          });
        });

        // 검색된 장소들이 모두 보이도록 지도 범위 조정
        mapRef.current.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        if (onPlacesFound) {
          onPlacesFound([], true); // 두 번째 인자로 검색 결과 없음 표시
        }
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        if (onPlacesFound) {
          onPlacesFound([], true);
        }
      }
    }, {
      // 검색 옵션: 음식점 카테고리 우선
      category_group_code: 'FD6' // 음식점
    });
  }, [clearMarkers, onPlacesFound, onPlaceSelect]);

  // 지도 초기화
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(interval);
        setStatus("");

        window.kakao.maps.load(() => {
          const container = document.getElementById('myMap');
          if (container) {
            // 현재 위치 기반 지도 생성
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;

                  const options = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 4
                  };

                  mapRef.current = new window.kakao.maps.Map(container, options);

                  // Places 서비스 객체 생성
                  psRef.current = new window.kakao.maps.services.Places();

                  // 현재 위치 커스텀 오버레이 (마커 대신)
                  const currentPosition = new window.kakao.maps.LatLng(lat, lng);

                  const overlayContent = `
                    <div style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      transform: translateY(-50%);
                    ">
                      <div style="
                        background: #CC1213;
                        color: white;
                        padding: 6px 12px;
                        font-size: 12px;
                        font-weight: 600;
                        font-family: 'Pretendard', sans-serif;
                        white-space: nowrap;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                      ">내 위치</div>
                      <div style="
                        width: 0;
                        height: 0;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 8px solid #CC1213;
                      "></div>
                      <div style="
                        width: 12px;
                        height: 12px;
                        background: #CC1213;
                        border: 3px solid white;
                        border-radius: 50%;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                        margin-top: 4px;
                      "></div>
                    </div>
                  `;

                  new window.kakao.maps.CustomOverlay({
                    position: currentPosition,
                    content: overlayContent,
                    yAnchor: 1
                  }).setMap(mapRef.current);
                },
                () => {
                  // 위치 권한 거부시 기본 위치 (강남)
                  initDefaultMap(container);
                }
              );
            } else {
              initDefaultMap(container);
            }
          }
        });
      }
    }, 100);

    const initDefaultMap = (container) => {
      const options = {
        center: new window.kakao.maps.LatLng(37.498095, 127.027610),
        level: 4
      };
      mapRef.current = new window.kakao.maps.Map(container, options);
      psRef.current = new window.kakao.maps.services.Places();
    };

    setTimeout(() => {
      clearInterval(interval);
      if (!window.kakao) setStatus("지도 로딩 실패");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 검색어가 변경되면 검색 실행
  useEffect(() => {
    if (searchKeyword && psRef.current) {
      searchPlaces(searchKeyword);
    }
  }, [searchKeyword, searchPlaces]);

  // 선택된 장소가 바뀌면 지도에서 해당 위치로 이동
  useEffect(() => {
    if (!selectedPlace || !mapRef.current) return;

    const markerData = markerMapRef.current[selectedPlace.id];
    if (markerData) {
      const { marker, place } = markerData;

      // 지도 중심 이동
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      mapRef.current.panTo(position);

      // 기존 인포윈도우 닫기
      if (infowindowRef.current) {
        infowindowRef.current.close();
      }

      // 새 인포윈도우 생성
      const iwContent = `
        <div style="padding:12px; min-width:180px; max-width:250px;">
          <h4 style="margin:0 0 6px 0; font-size:14px; font-weight:700; color:#1a1a1a;">${place.place_name}</h4>
          <p style="margin:0 0 4px 0; font-size:11px; color:#888;">${place.category_name}</p>
          <p style="margin:0; font-size:12px; color:#555;">${place.road_address_name || place.address_name}</p>
        </div>
      `;

      infowindowRef.current = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: true
      });

      infowindowRef.current.open(mapRef.current, marker);
    }
  }, [selectedPlace]);

  return (
    <div
      id="myMap"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {status && <span style={{ color: '#888', fontSize: '14px' }}>{status}</span>}
    </div>
  );
}

export default KakaoMap;
