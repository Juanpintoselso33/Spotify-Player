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
  seconds,
  currTime,
  duration,
}) => (
  <div className="bg-secondary fixed-bottom w-100 p-3 mx-0">
    <div className="row d-flex justify-content-center align-items-center mb-5">
      <div className="col-2"></div>
      <div className="col-8">
        <div className="timeline-container">
          <div className="timeline-time">
            <span>
              {currTime.min}:
              {currTime.sec < 10 ? `0${currTime.sec}` : currTime.sec}
            </span>
            <span>
              {Math.floor(duration / 60)}:
              {Math.floor(duration % 60) < 10
                ? `0${Math.floor(duration % 60)}`
                : Math.floor(duration % 60)}
            </span>
          </div>
          <div
            className="timeline-played"
            style={{ width: `${(seconds / duration) * 100}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={seconds}
            className="timeline"
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
            }}
          />
        </div>
      </div>
      <div className="col-2"></div>
    </div>
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
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
      <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
        <i
          className="fa-solid fa-square-caret-left"
          style={{ color: "#ffffff", fontSize: "40px", marginRight: "50px" }}
          onClick={onPrevClick}
        />
        <i
          className={isPlaying ? "fa-solid fa-pause mx-5" : "fa-solid fa-play mx-5"}
          style={{ color: "#ffffff", fontSize: "40px" }}
          onClick={onPlayClick}
        />
        <i
          className="fa-solid fa-square-caret-right"
          style={{ color: "#ffffff", fontSize: "40px", marginLeft: "50px" }}
          onClick={onNextClick}
        />
      </div>
      <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
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
  </div>
);

export default PlayerControls;
