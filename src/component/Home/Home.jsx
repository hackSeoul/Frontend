import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import photo from './photo.svg';
import vector0 from './Vector - 0.svg';
import vector from './Vector.svg';
import group from './Group.png';
import hwasall from './hwasall.svg';
import hyunjae from './hyunjae.svg';
import minus from './minus.svg';

export const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/image-preview');
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
                  <div className="depth-frame-10">
                    <div className="depth-frame-11">
                      <div className="depth-frame-12">
                        <div className="img-wrapper">
                          <img className="img" src={vector0} alt="Vector" />
                        </div>
                      </div>
                    </div>
                    <div className="depth-frame-13">
                      <div className="depth-frame-12">
                        <div className="img-wrapper">
                          <img className="vector-2" alt="Vector" src={minus} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="depth-frame-14">
                    <div className="depth-frame-12">
                      <div className="img-wrapper">
                        <img className="vector-3" alt="Vector" src={hyunjae} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="depth-frame-15">
            <div className="text-wrapper-3">Found Plants</div>
          </div>
          <div className="depth-frame-16">
            <div className="depth-frame-17">
              <div className="depth-frame-18">
                <div className="depth-frame-19" />
                <div className="depth-frame-20" />
              </div>
              <div className="depth-frame-21">
                <div className="div">
                  <div className="text-wrapper-4">Rosa californica</div>
                </div>
                <div className="depth-frame-22">
                  <div className="text-wrapper-5">19 days ago</div>
                </div>
              </div>
            </div>
            <div className="depth-frame-17">
              <div className="depth-frame-23">
                <div className="depth-frame-24" />
                <div className="depth-frame-19" />
                <div className="depth-frame-20" />
              </div>
              <div className="depth-frame-21">
                <div className="div">
                  <div className="text-wrapper-4">Baccharis pilularis</div>
                </div>
                <div className="depth-frame-22">
                  <div className="text-wrapper-5">2 months ago</div>
                </div>
              </div>
            </div>
            <div className="depth-frame-17">
              <div className="depth-frame-25">
                <div className="depth-frame-24" />
                <div className="depth-frame-19" />
              </div>
              <div className="depth-frame-21">
                <div className="div">
                  <div className="text-wrapper-4">Pseudotsuga menziesii</div>
                </div>
                <div className="depth-frame-22">
                  <div className="text-wrapper-5">3 months ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div">
          <div className="depth-frame-26" />
        </div>
        <img className="vector-4" alt="Vector" src={vector} />
        <img className="photo" src={photo} alt="Photo" onClick={handleClick} />
        <img className="group" src={group} alt="Group" />
      </div>
    </div>
  );
};
