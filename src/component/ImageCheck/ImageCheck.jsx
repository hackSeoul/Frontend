import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import vector from "./back.svg"; // SVG 파일 경로는 프로젝트에 맞게 수정
import "./style.css";

export const ImageCheck = () => {
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();
  const state = useLocation().state;
  const base64Image = state?.base64Image;
  const plantInfo = state?.plantInfo;

  const adjectives = [
    "껑충 뛰는", "장난꾸러기인", "휘파람 부는", "보물찾기 하는", "깔깔 웃는", "비눗방울 터뜨리는",
    "아이스크림 녹이는", "햇살 즐기는", "번개같이 빠른", "웃음소리 나는", "물총 싸움하는", "강아지처럼 뛰는",
    "낙엽 밟는", "모험을 즐기는", "피크닉 가는", "도토리 줍는", "일기 쓰는", "코믹댄스 추는", "버터바 먹는",
    "길고양이 따라가는", "무지개 잡는", "나비 따라가는", "눈사람 만드는", "바람 따라 걷는", "달빛 받는",
    "폭신한 구름 타는", "별자리 찾는", "공룡처럼 걷는", "꼬리를 흔드는", "웃음꽃 피우는"
  ];

  const nouns = [
    "금낭화", "삼지구엽초", "참나리", "으름덩굴", "자란", "박하꽃", "황정", "쥐손이풀", "수리취", "개쑥부쟁이",
    "한련초", "애기동백", "돌단풍", "생강나무", "기린초", "갈매빛나리", "갯기름나물", "용담", "까치수염",
    "물레나물", "매자나무", "무늬비비추", "들현호색", "참꽃나무", "두루미꽃", "붉은새우풀", "섬초롱꽃",
    "순비기나무", "모란", "꽃다지"
  ];

  const handleInputChange = (event) => {
    setNickname(event.target.value);
  };

  const generateRandomNickname = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    setNickname(`${randomAdjective} ${randomNoun}`);
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation API 사용 권한이 없습니다.", error);
          alert("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("Geolocation API를 지원하지 않는 브라우저입니다.");
    }
  };

  const handleSave = async () => {
    if (!nickname || !location.latitude || !location.longitude) {
      alert("닉네임 또는 위치 정보가 누락되었습니다.");
      return;
    }

    try {
      const response = await fetch('http://43.203.235.174:8080/plant/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: base64Image,
          nickName: nickname,
          longitude: location.longitude,
          latitude: location.latitude,
        }),
      });

      if (!response.ok) {
        console.error('Response status:', response.status);
        throw new Error('Failed to save data');
      }

      const data = await response.json();
      console.log('Server response:', data);

      if (data.isSuccess) {
        alert('식물 정보가 성공적으로 저장되었습니다.');
        navigate('/');
      } else {
        alert('식물 정보를 저장하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('식물 정보를 저장하는 데 오류가 발생했습니다.');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="image-check">
      <div className="header">
        <img className="vector" alt="Vector" src={vector} onClick={goToHome} />
      </div>
      <h1>닉네임을 입력하거나 익명으로 식물정보를 공유해보세요</h1>
      <h2>닉네임으로 등록하면 나중에 찾아볼 수 있어요</h2>
      <div className="content">
        <input
          className="input"
          type="text"
          value={nickname}
          onChange={handleInputChange}
          placeholder="닉네임 입력하기"
        />
        <button className="random-btn" onClick={generateRandomNickname}>익명으로 등록하기</button>
      </div>
      <div className="footer">
        <button className="save-btn" onClick={() => { fetchLocation(); handleSave(); }}>확인</button>
      </div>
    </div>
  );
};
