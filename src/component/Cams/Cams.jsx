import React from 'react';
import './style.css'; // 스타일을 정의한 CSS 파일

export const Cams = () => {
    return (
        <div className="cams-container">
            {/* 페이지 상단의 제목 */}
            <div className="header">
                <button className="back-button">←</button> {/* 뒤로가기 버튼 */}
                <h1 className="header-title">식물 찾기</h1>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="content">
                <h2 className="content-title">식물을 발견하셨나요?</h2>
                <p className="content-description">
                    사진을 올려<br />
                    식물에 대한 정보를 공유해보세요.
                </p>
                <button className="upload-button">사진 올리기</button>
            </div>
        </div>
    );
};


