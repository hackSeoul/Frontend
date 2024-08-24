import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import vector from "./Vector - 0.svg";
import xxxxxx from "./xxxxxx.svg";
import axios from "axios";

export const ImagePreview = () => {
  // 상태 변수를 정의하여 주소를 관리
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const gotoImagecheck = () => {
    navigate('/image-check');
  };

  const handleClick = () => {
    // Geolocation API 사용하여 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          // 네이버 지도 Reverse Geocoding API 요청
          const response = await axios.get(
            `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`, {
            headers: {
              'X-NCP-APIGW-API-KEY-ID': '9x6sf27vr9',
              'X-NCP-APIGW-API-KEY': 'f5txzKT4a70AnRVDqEC9IJjNIB4qGCeU1uMMKckI', // 환경 변수 사용
            },
            params: {
              coords: `${longitude},${latitude}`,
              output: 'json',
              orders: 'addr',
            }
          });

          const foundAddress = response.data.results?.[0]?.region?.area1?.name + " " +
            response.data.results?.[0]?.region?.area2?.name + " " +
            response.data.results?.[0]?.region?.area3?.name;

          console.log("주소:", foundAddress);

          // 주소 상태 업데이트
          setAddress(foundAddress);

          // 위치 정보를 백엔드로 전송
          await axios.post('https://your-backend-api.com/location', {
            latitude,
            longitude,
            address: foundAddress,
          });

          alert(`위치가 저장되었습니다: ${foundAddress}`);
        } catch (error) {
          console.error("위치 정보를 가져오는데 실패했습니다.", error);
          alert("위치 정보를 가져오는데 실패했습니다.");
        }
      }, (error) => {
        console.error("Geolocation API 사용 권한이 없습니다.", error);
        alert("위치 정보 사용 권한이 없습니다.");
      });
    } else {
      alert("Geolocation API를 지원하지 않는 브라우저입니다.");
    }
  };

  return (
    <div className="image-preview">
      <div className="depth-frame">
        <div className="div">
          <div className="depth-frame-wrapper">
            <div className="vector-wrapper">
              <img className="vector" alt="Vector" src={xxxxxx} />
            </div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper">Plant Identification</div>
          </div>
        </div>
        <div className="depth-frame-2">
          <div className="depth-frame-3">
            <div className="depth-frame-4" />
          </div>
        </div>
        <div className="depth-frame-5">
          <div className="depth-frame-6">
            <div className="depth-frame-7">
              <div className="depth-frame-8">
                <div className="text-wrapper-2">Location: {address}</div>
              </div>
              <div className="depth-frame-9">
                <div className="img-wrapper">
                  <img
                    className="img"
                    alt="Vector"
                    src={vector}
                    onClick={handleClick} // 클릭 이벤트 추가
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depth-frame-10">
          <div className="depth-frame-11">
            <div className="depth-frame-12">
              <div className="text-wrapper-3" onClick={gotoImagecheck}>Identify</div>
            </div>
          </div>
        </div>
        <div className="depth-frame-13" />
      </div>
    </div>
  );
};
