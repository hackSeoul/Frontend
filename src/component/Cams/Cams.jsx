import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // 스타일을 정의한 CSS 파일

export const Cams = () => {
    const [base64Image, setBase64Image] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false); // 이미지 업로드 상태 관리
    const navigate = useNavigate();

    const gotohome = () => {
        navigate('/');
    }

    // 사진 찍기 또는 파일 선택 시 호출되는 함수
    const handleCapture = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64Image(reader.result); // Base64 인코딩된 이미지 데이터 저장
            console.log('Base64 인코딩된 이미지:', reader.result); // 콘솔에 Base64 인코딩된 이미지 출력
            setIsImageUploaded(true); // 이미지 업로드 완료 상태로 설정
        };

        if (file) {
            reader.readAsDataURL(file); // 파일을 Base64로 인코딩
        }
    };

    // 버튼 클릭 시 동작을 관리하는 함수
    const handleButtonClick = () => {
        if (isImageUploaded) {
            // 이미지가 업로드된 상태라면 다음 페이지로 이동하고, 상태로 이미지 데이터 전달
            navigate('/inform', { state: { base64Image } });
        } else {
            // 그렇지 않다면 카메라를 활성화
            document.getElementById('cameraInput').click();
        }
    };

    return (
        <div className="cams-container">
            {/* 페이지 상단의 제목 */}
            <div className="header">
                <button className="back-button" onClick={gotohome}>←</button> {/* 뒤로가기 버튼 */}
                <h1 className="header-title">식물 찾기</h1>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="content">
                {/* Base64 인코딩된 이미지 미리보기 */}
                {base64Image && (
                    <div className="preview-container">
                        <img src={base64Image} alt="Captured" className="preview-image" />
                    </div>
                )}

                <h2 className="content-title">식물을 발견하셨나요?</h2>
                <p className="content-description">
                    사진을 올려<br />
                    식물에 대한 정보를 공유해보세요.
                </p>

                {/* 사진 올리기/확인 버튼 */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }} // input 요소 숨김
                    id="cameraInput"
                    onChange={handleCapture}
                />
                <button
                    className="upload-button"
                    onClick={handleButtonClick} // 클릭 시 동작 관리
                >
                    {isImageUploaded ? "확인" : "사진 올리기"}
                </button>
            </div>
        </div>
    );
};
