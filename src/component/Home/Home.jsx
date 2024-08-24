import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const Home = () => {
  const [searchType, setSearchType] = useState('nickname');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null); // 현재 확장된 항목의 상태
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
        center: new window.naver.maps.LatLng(37.5132, 127.1001),
        zoom: 17,
      };

      const map = new window.naver.maps.Map('map', mapOptions);
      return map;
    };

    const addCurrentLocationMarker = (map) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = new window.naver.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            new window.naver.maps.Marker({
              position: userLocation,
              map: map,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                size: new window.naver.maps.Size(24, 24),
                scaledSize: new window.naver.maps.Size(24, 24),
              }
            });

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
        addCurrentLocationMarker(map);
      })
      .catch((err) => {
        console.error('네이버 지도 API 로드 실패:', err);
      });

    window.navermap_authFailure = function () {
      alert('네이버 지도 API 인증에 실패했습니다. Client ID를 확인하세요.');
    };
  }, []);

  const handleSelect = (type) => {
    setSearchType(type);
    setDropdownOpen(false);
  };

  const handleNavigate = () => {
    navigate('/cams');
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    const endpoint = searchType === 'plant' ? 'plantname' : 'nickname';
    
    try {
      const response = await fetch(`http://localhost:5001/${endpoint}?query=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  const handleItemClick = async (index) => {
    if (expandedItem === index) {
      setExpandedItem(null); // 이미 확장된 항목을 다시 클릭하면 축소
    } else {
      setExpandedItem(index); // 항목을 확장
      const endpoint = searchType === 'plant' ? 'plantname' : 'nickname';
      
      try {
        const response = await fetch(`http://localhost:5001/${endpoint}/${results[index].id}`);
        const data = await response.json();
        setResults(prevResults => {
          const newResults = [...prevResults];
          newResults[index] = { ...newResults[index], ...data };
          return newResults;
        });
      } catch (error) {
        console.error('세부 정보 로드 중 오류 발생:', error);
      }
    }
  };

  return (
    <div>
      {/* 상단 검색 박스 */}
      <div className="search-container">
        <input
          type="text"
          placeholder={searchType === 'plant' ? '식물을 검색해 보세요!' : '닉네임을 검색해 보세요!'}
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
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
   {/* 지도와 검색 결과 리스트 사이에 추가된 텍스트 */}
   <div className="location-text">
          해당 위치에 있는 식물 확인하기
        </div>
      {/* 검색 결과 리스트 */}
      {results.length > 0 && (
        <div className="results-list">
          {results.map((item, index) => (
            <div
              key={index}
              className={`result-item ${expandedItem === index ? 'expanded' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              {searchType === 'nickname' ? item.nickname : item.name}
              {expandedItem === index && (
                <div className="item-details">
                  <img src={item.imageUrl} alt={item.name || item.nickname} className="item-image" />
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
