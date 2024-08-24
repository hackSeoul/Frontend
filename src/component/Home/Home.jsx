import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 임포트
import './style.css'; // 이 파일에 CSS 추가

export const Home = () => {
  const [searchType, setSearchType] = useState('nickname'); // 검색 유형 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(false);  // 드롭다운 상태 관리
  const navigate = useNavigate(); // 네비게이션 훅 초기화

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=9x6sf27vr9';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
          console.log("Naver Map script loaded");
        }
      });
    };

    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5132612, 127.1001336), // 쿠팡 본사
        zoom: 17,
      };

      const map = new window.naver.maps.Map('map', mapOptions);

      return map; // 초기화된 지도를 반환
    };

    const addCurrentLocationMarker = (map) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = new window.naver.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            console.log('현재 위치:', userLocation);

            // 현재 위치에 빨간 마커 추가
            new window.naver.maps.Marker({
              position: userLocation,
              map: map,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // 빨간색 마커
                size: new window.naver.maps.Size(24, 24),
                scaledSize: new window.naver.maps.Size(24, 24),
              }
            });

            // 지도 중심을 현재 위치로 이동
            map.setCenter(userLocation);
          },
          (error) => {
            console.error('현재 위치를 가져오는데 실패했습니다:', error);
            alert('현재 위치를 가져올 수 없습니다. 기본 위치로 지도를 표시합니다.');
          },
          { enableHighAccuracy: true }
        );
      } else {
        alert('Geolocation을 지원하지 않는 브라우저입니다.');
      }
    };

    loadNaverMapScript()
      .then(() => {
        const map = initializeMap();
        addCurrentLocationMarker(map); // 현재 위치에 마커 추가
      })
      .catch((err) => {
        console.error('네이버 지도 API 로드 실패:', err);
      });

    window.navermap_authFailure = function () {
      alert('네이버 지도 API 인증에 실패했습니다. Client ID를 확인하세요.');
    };
  }, []);

  // 드롭다운 메뉴에서 선택하는 함수
  const handleSelect = (type) => {
    setSearchType(type);
    setDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  // 버튼 클릭 시 cams.jsx로 네비게이션하는 함수
  const handleNavigate = () => {
    navigate('/cams');
  };

  return (
    <div>
      {/* 상단 검색 박스 */}
      <div className="search-container">
        <input
          type="text"
          placeholder={searchType === 'plant' ? '식물을 검색해 보세요!' : '닉네임을 검색해 보세요!'}
          className="search-box"
        />
        <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="triangle-icon"></div>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div onClick={() => handleSelect('plant')} className="dropdown-item">
              식물 이름
            </div>
            <div onClick={() => handleSelect('nickname')} className="dropdown-item">
              닉네임
            </div>
          </div>
        )}
      </div>

      {/* 지도와 버튼을 포함하는 div */}
      <div className="map-container">
        <div id="map" className="small-map"></div>

        {/* 지도 오른쪽 아래에 위치한 초록색 원형 버튼 */}
        <div className="floating-button" onClick={handleNavigate}>
          +
        </div>
      </div>
    </div>
  );
};
