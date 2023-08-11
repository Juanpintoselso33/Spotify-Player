import React from "react";

const PlayerControls = ({
  isPlaying,
  onNextClick,
  onPrevClick,
  onPlayClick,
  decreaseVolume,
  increaseVolume,
  repeatMode,
  repeatState,
  shuffleMode,
  shuffleState,
  audioRef,
  seconds
}) => (
  <div className="bg-secondary fixed-bottom w-100 row p-3 d-flex justify-content-center align-items-center mx-0">  
    <div className="row d-flex justify-content-center align-items-center mb-4">
      <div className="col-2"></div>
      <div className="col-8">
        <input
          type="range"
          min="0"
          max={audioRef.current && !isNaN(audioRef.current.duration) ? audioRef.current.duration : 0}
          value={seconds}
          className="timeline"    
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = e.target.value;
            }
          }}
        />
      </div>
      <div className="col-2"></div>
    </div>
    <div className="col-2 d-flex align-items-center">
      <div className="d-flex">
        <i
          className={`fa-solid fa-shuffle repeat-mode-button ${
            shuffleState ? "repeat-mode-active" : ""
          }`}
          style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
          onClick={shuffleMode}
        />
        <i
          className={`fa-solid fa-repeat repeat-mode-button ${
            repeatState ? "repeat-mode-active" : ""
          }`}
          style={{ marginLeft: "50px" }}
          onClick={repeatMode}
        />
      </div>
    </div>
    <div className="col-8 d-flex justify-content-center align-items-center">
      <i
        className="fa-solid fa-square-caret-left"
        style={{ color: "#ffffff", fontSize: "40px", marginRight: "50px" }}
        onClick={onPrevClick}
      />
      <i
        className={
          isPlaying ? "fa-solid fa-pause mx-5" : "fa-solid fa-play mx-5"
        }
        style={{ color: "#ffffff", fontSize: "40px" }}
        onClick={onPlayClick}
      />
      <i
        className="fa-solid fa-square-caret-right"
        style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
        onClick={onNextClick}
      />
    </div>
    <div className="col-2 d-flex align-items-center">
      <div className="d-flex">
        <i
          className="fa-solid fa-plus"
          style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
          onClick={increaseVolume}
        />
        <i
          className="fa-solid fa-minus"
          style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
          onClick={decreaseVolume}
        />
      </div>
    </div>
  </div>
);

export default PlayerControls;
