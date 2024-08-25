import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

export const Inform = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const base64Image = location.state?.base64Image; // 전달된 Base64 이미지 데이터 가져오기

    const [plantInfo, setPlantInfo] = useState(null); // API 응답 데이터를 저장할 상태

    useEffect(() => {
        if (base64Image) {
            console.log('Received Base64 Image:', base64Image); // 콘솔에 Base64 인코딩된 이미지 출력
            handleSubmit(); // 페이지가 로드될 때 이미지 데이터를 서버로 전송
        }
    }, [base64Image]);

    const gotohome = () => {
        navigate('/');
    };

    const gotoImageCheck = () => {
        navigate('/image-check', {
            state: {
                base64Image,
                plantInfo
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://43.203.235.174:8080/plant/identify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageData: base64Image }),
            });

            if (!response.ok) {
                console.error('Response status:', response.status);
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            console.log('Server response:', data);

            if (data.isSuccess) {
                setPlantInfo(data.result); // API 응답에서 식물 정보를 상태로 저장
            } else {
                console.error('Error in API response:', data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    return (
        <div className="cams-container">
            <div className="header">
                <button className="back-button" onClick={gotohome}>←</button> {/* 뒤로가기 버튼 */}
            </div>

            {base64Image && (
                <div className="preview-container">
                    <img src={base64Image} alt="Captured Plant" className="preview-image" />
                </div>
            )}

            {plantInfo && (
                <div className="plant-info">
                    <h2 className="content-title">이 식물의 이름은 {plantInfo.plantName}</h2>
                    <h4>{plantInfo.plantDescription}</h4>
                    <p>{plantInfo.healthy ? '이 식물은 건강합니다.' : '이 식물은 건강하지 않습니다.'}</p>
                </div>
            )}

            <div className="content">
                <button className="upload-button" onClick={gotoImageCheck}>확인</button>
            </div>
        </div>
    );
};
