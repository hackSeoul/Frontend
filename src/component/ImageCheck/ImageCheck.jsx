import React from "react";
import "./style.css";

export const ImageCheck = () => {
  return (
    <div className="image-check">
      <div className="depth-frame">
        <div className="depth-frame-wrapper">
          <div className="div-wrapper">
            <div className="vector-wrapper">
              <img className="vector" alt="Vector" src="image.svg" />
            </div>
          </div>
        </div>
        <div className="div">
          <div className="text-wrapper">Palm tree</div>
        </div>
        <div className="depth-frame-2">
          <div className="text-wrapper-2">Newport Beach, CA</div>
        </div>
        <div className="depth-frame-3">
          <div className="text-wrapper-3">Disease detection</div>
        </div>
        <div className="depth-frame-4">
          <div className="depth-frame-5">
            <div className="vector-wrapper">
              <img className="img" alt="Vector" src="vector-0.svg" />
            </div>
          </div>
          <div className="depth-frame-6">
            <div className="depth-frame-7">
              <div className="text-wrapper-4">Bacterial leaf spot</div>
            </div>
            <div className="depth-frame-8">
              <div className="text-wrapper-5">Severity: 70%</div>
            </div>
          </div>
        </div>
        <div className="depth-frame-9">
          <div className="depth-frame-10">
            <div className="depth-frame-11">
              <div className="text-wrapper-6">Add to your collection</div>
            </div>
            <div className="depth-frame-12">
              <div className="text-wrapper-7">Enter your nickname</div>
            </div>
          </div>
          <div className="group">
            <div className="overlap-group">
              <div className="text-wrapper-8">random</div>
            </div>
          </div>
        </div>
        <div className="depth-frame-13">
          <div className="depth-frame-14">
            <div className="depth-frame-15">
              <div className="text-wrapper-9">Save</div>
            </div>
          </div>
        </div>
        <div className="depth-frame-16" />
      </div>
    </div>
  );
};
