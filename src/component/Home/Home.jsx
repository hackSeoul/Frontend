import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const Home = () => {
  const [map, setMap] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

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
        }
      });
    };

    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5132, 127.1001), // 기본 위치 설정
        zoom: 17,
      };

      const map = new window.naver.maps.Map('map', mapOptions);
      setMap(map);
      return map;
    };

    const addMarkers = (map, plantList) => {
      plantList.forEach(plant => {
        const markerLocation = new window.naver.maps.LatLng(plant.latitude, plant.longitude);

        new window.naver.maps.Marker({
          position: markerLocation,
          map: map,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            size: new window.naver.maps.Size(24, 24),
            scaledSize: new window.naver.maps.Size(24, 24),
          },
        });
      });
    };

    const fetchPlantDataAndAddMarkers = async (map) => {
      try {
        const response = await fetch('http://43.203.235.174:8080/plant/list'); // 실제 API URL로 변경하세요
        const data = await response.json();

        if (data.isSuccess && data.result.plantListsDTO) {
          const plantList = data.result.plantListsDTO;
          setResults(plantList);
          addMarkers(map, plantList);
        } else {
          console.error('API 응답에 문제가 있습니다:', data.message);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    loadNaverMapScript()
      .then(() => {
        const map = initializeMap();
        fetchPlantDataAndAddMarkers(map);
      })
      .catch((err) => {
        console.error('네이버 지도 API 로드 실패:', err);
      });

    window.navermap_authFailure = function () {
      alert('네이버 지도 API 인증에 실패했습니다. Client ID를 확인하세요.');
    };
  }, []);

  const handleNavigate = () => {
    navigate('/cams');
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="식물을 검색해 보세요!"
          className="search-box"
        />
        <button className="search-button">검색</button>
      </div>

      <div className="map-container">
        <div id="map" className="small-map"></div>

        <div className="floating-button" onClick={handleNavigate}>
          +
        </div>
      </div>
    </div>
  );
};
