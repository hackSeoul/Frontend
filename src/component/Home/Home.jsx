import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const Home = () => {
  const [searchType, setSearchType] = useState('nickname');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
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


    const addMarker = (map, location) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.latitude, location.longitude),
        map: map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          size: new window.naver.maps.Size(24, 24),
          scaledSize: new window.naver.maps.Size(24, 24),
        }
      });
    };

    const fetchPlantDataAndAddMarker = async (map, id) => {
      try {
        const response = await fetch(`http://43.203.235.174:8080/plant/${id}`);
        const data = await response.json();

        if (data.isSuccess && data.result) {
          setResult(data.result);
          addMarker(map, data.result);

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

        fetchPlantDataAndAddMarker(map, 1);

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


  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const url = searchType === 'nickname'
        ? `http://43.203.235.174:8080/plant/nickName/${encodedSearchTerm}`
        : `http://43.203.235.174:8080/plant/${encodedSearchTerm}`;

      const response = await fetch(url);
      const textData = await response.text();
      const data = textData ? JSON.parse(textData) : null;

      if (data && data.isSuccess && data.result) {
        setResult(data.result.plantListsDTO || []);
      } else {
        console.error('검색 중 오류 발생:', data ? data.message : '응답 데이터가 없습니다.');
        setResult([]);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setResult([]);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"

          placeholder={searchType === 'plantName' ? '식물을 검색해 보세요!' : '닉네임을 검색해 보세요!'}

          className="search-box"
        />

        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
        <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="triangle-icon"></div>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div onClick={() => handleSelect('plantName')} className="dropdown-item">
              식물 이름
            </div>
            <div onClick={() => handleSelect('nickname')} className="dropdown-item">
              닉네임
            </div>
          </div>
        )}

      </div>

      <div className="map-container">
        <div id="map" className="small-map"></div>

        <div className="floating-button" onClick={handleNavigate}>
          +
        </div>
      </div>

      
      <div className="location-text">
        해당 위치에 있는 식물 확인하기
      </div>

      {result && result.length > 0 && (
        <div className="result-details">
          {result.map((plant, index) => (
            <div key={index} className="plant-item">
              <h3>{plant.nickName}</h3>
              <p>{plant.plantName}</p>
              <p>{plant.plantDescription}</p>
              <p>질병: {plant.disease}</p>
              <p>건강 상태: {plant.healthy ? '건강함' : '건강하지 않음'}</p>
              <img src={plant.imageDirectory} alt={plant.plantName} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
