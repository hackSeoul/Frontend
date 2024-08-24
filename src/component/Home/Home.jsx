import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import photo from "./photo.svg";
import vector from "./Vector.svg";
import group from "./Group.png";
import hwasall from "./hwasall.svg";

export const Home = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = () => {
    navigate("/image-preview");
  };

  const fetchSearchResults = async (prompt) => {
    try {
      const responses = await Promise.all([
        fetch(`http://localhost:5001/ping?query=${prompt}`),
        fetch(`http://localhost:5001/name?query=${prompt}`),
        fetch(`http://localhost:5001/nickname?query=${prompt}`),
      ]);
  
      const results = await Promise.all(responses.map((res) => res.json()));
      
      const uniqueResults = Array.from(new Set(results.flat().map(item => JSON.stringify(item))))
                                  .map(item => JSON.parse(item));
  
      return uniqueResults;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };
  
  const handleSearch = async () => {
    if (!prompt) return;

    const results = await fetchSearchResults(prompt);
    setResults(results);
  };

  return (
    <div className="home">
      <div className="depth-frame">
        <div className="div">
          <div className="depth-frame-2">
            <div className="div-wrapper">
              <div className="text-wrapper">Home</div>
            </div>
            <div className="depth-frame-3" />
          </div>
          <div className="depth-frame-wrapper">
            <div className="depth-frame-4">
              <div className="depth-frame-5">
                <div className="depth-frame-6">
                  <div className="depth-frame-7">
                    <div className="vector-wrapper">
                      <img className="vector" src={hwasall} alt="Vector" />
                    </div>
                  </div>
                  <div className="depth-frame-8">
                    <div className="text-wrapper-2">검색</div>
                  </div>
                </div>
              </div>
              <div className="depth-frame-9">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  style={{ width: '80%', padding: '10px', marginBottom: '10px' }} // 인라인 스타일 추가
                />
                <button 
                  onClick={handleSearch} 
                  style={{ width: '80%', padding: '10px' }} // 인라인 스타일 추가
                >
                  검색
                </button>
              </div>
            </div>
          </div>
          <div className="depth-frame-15">
            <div className="text-wrapper-3">Found Plants</div>
          </div>
          <div className="depth-frame-16">
            {results.map((result, index) => (
              <div key={index} className="depth-frame-17" style={{ width: '90%', margin: '5px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <div className="depth-frame-21">
                  <div className="div">
                    <div className="text-wrapper-4">{result.name}</div>
                  </div>
                  <div className="depth-frame-22">
                    <div className="text-wrapper-5">{result.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img className="vector-4" alt="Vector" src={vector} style={{ maxWidth: '100%', height: 'auto' }} />
        <img className="photo" src={photo} alt="Photo" onClick={handleClick} style={{ maxWidth: '100%', height: 'auto' }} />
        <img className="group" src={group} alt="Group" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};
