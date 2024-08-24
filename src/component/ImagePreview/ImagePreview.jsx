import React from "react";
import "./style.css";

export const ImagePreview = () => {
  return (
    <div className="image-preview">
      <div className="depth-frame">
        <div className="div">
          <div className="depth-frame-wrapper">
            <div className="vector-wrapper">
              <img className="vector" alt="Vector" src="image.svg" />
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
                <div className="text-wrapper-2">Location</div>
              </div>
              <div className="depth-frame-9">
                <div className="img-wrapper">
                  <img className="img" alt="Vector" src="vector-0.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depth-frame-10">
          <div className="depth-frame-11">
            <div className="depth-frame-12">
              <div className="text-wrapper-3">Identify</div>
            </div>
          </div>
        </div>
        <div className="depth-frame-13" />
      </div>
    </div>
  );
};
