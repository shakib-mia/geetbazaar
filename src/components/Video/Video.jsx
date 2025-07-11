import React, { useEffect, useRef, useState } from "react";
import video from "./../../assets/videos/Piper - Atividade PNAIC 2017.mp4";
import play from "./../../assets/icons/play.webp";
import pause from "./../../assets/icons/pause.webp";
import sound from "./../../assets/icons/sound.webp";
import mute from "./../../assets/icons/muted.webp";
import expand from "./../../assets/icons/expand.webp";
import settings from "./../../assets/icons/navbar/settings.webp";
import check from "./../../assets/icons/check-mark.webp";

const Video = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState("");
  const [currentTime, setCurrentTime] = useState(videoRef.current?.currentTime);
  const [speedVisible, setSpeedVisible] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0);
  // console.log(volume);

  setTimeout(() => setVolume(videoRef.current?.volume * 100), 100);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.6;
    }
    // console.log(videoRef.current);
  }, []);

  const videoHandler = (control) => {
    switch (control) {
      case "play":
        videoRef.current.play();
        setPlaying(true);
        break;

      case "pause":
        videoRef.current.pause();
        setPlaying(false);
        break;
      case "mute":
        setMuted(true);
        setVolume(0);
        break;
      case "unmute":
        setMuted(false);
        break;

      default:
        break;
    }
  };

  setTimeout(() => {
    setDuration(
      Math.floor(videoRef.current?.duration / 60) +
      ":" +
      Math.floor(videoRef.current?.duration % 60)
    );
  }, 100);

  setTimeout(() => {
    setCurrentTime(videoRef.current?.currentTime);
  }, 1000);

  const handleProgress = (e) => {
    const position = e.clientX - e.target.getBoundingClientRect().left;
    document.getElementById("circle").style.left =
      (position * 100) / e.target.offsetWidth + "%";

    const percent = (position * 100) / e.target.offsetWidth;

    videoRef.current.currentTime = (videoRef.current.duration * percent) / 100;
  };

  const handlePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setSpeedVisible(false);
  };

  // console.log(videoRef.current?.volume);

  const handleSound = (e) => {
    const volume = e.clientX - e.target.getBoundingClientRect().left;
    const volumePercent =
      (volume * 100) / e.target.getBoundingClientRect().width;

    setVolume(volumePercent);
    // console.log(volumePercent);
    videoRef.current.volume = volumePercent / 100;
  };

  return (
    <div className="w-1/2 mx-auto relative">
      <video
        src={video}
        className="w-full mb-4 rounded-lg cursor-pointer"
        onClick={() => (playing ? videoHandler("pause") : videoHandler("play"))}
        id="video"
        ref={videoRef}
        muted={muted}
      />
      {/* ====================== control section ======================== */}
      <div className="absolute bottom-0 left-0 right-0 m-auto p-4 pt-0">
        <div className="bg-white rounded-[4px] w-full flex items-center gap-2 p-1">
          {/* ================= play section ===================== */}
          <div id="play-section">
            {playing ? (
              <img
                className="cursor-pointer w-[10.6px] h-[13.33px]"
                src={pause}
                onClick={() => videoHandler("pause")}
                alt=""
              />
            ) : (
              <img
                className="cursor-pointer w-[10.6px] h-[13.33px]"
                src={play}
                onClick={() => videoHandler("play")}
                alt=""
              />
            )}
          </div>
          {/* ================= mute section ===================== */}
          <div
            id="mute-section"
            className="flex gap-1 items-center"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            {muted ? (
              <img
                className="cursor-pointer w-[14px] h-[10px]"
                src={mute}
                onClick={() => setMuted(false)}
                alt=""
              />
            ) : (
              <img
                className="cursor-pointer w-[14px] h-[10px]"
                src={sound}
                onClick={() => setMuted(true)}
                alt=""
              />
            )}
            {/* {showVolume && ( */}
            <div
              className={`${showVolume ? "w-7" : "w-0"
                } bg-white transition-all`}
            >
              <div
                className="relative w-full h-[4px] bg-grey-light cursor-pointer"
                onClick={handleSound}
              >
                <div
                  className="h-full absolute bottom-0 pointer-events-none overflow-hidden"
                  style={{ width: volume + "%" }}
                >
                  {/* <div className="w-full h-full"> */}
                  <div className="absolute w-7 h-full bg-gradient-to-r from-interactive-light-confirmation-focus via-interactive-light-confirmation to-interactive-light-destructive-focus"></div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* )} */}
          </div>

          {/* ===================== Current Time Section ===================== */}
          <h6>
            {Math.floor(currentTime / 60)}:
            {Math.ceil(currentTime % 60) === 60
              ? "00"
              : Math.ceil(currentTime % 60) >= 10
                ? Math.ceil(currentTime % 60)
                : "0" + Math.ceil(currentTime % 60)}
          </h6>

          {/* ===================== Progress Section =========================*/}
          <div
            className="w-[85%] bg-grey-light h-[4px] rounded-full relative overflow-visible cursor-pointer"
            onClick={handleProgress}
          >
            <div
              className="h-full bg-primary pointer-events-none"
              style={{
                width: (currentTime * 100) / videoRef.current?.duration + "%",
              }}
            ></div>

            <div
              className="absolute w-2 h-2 rounded-full bg-white border-[2px] border-primary top-0 bottom-0 m-auto"
              id="circle"
              style={{
                left:
                  (currentTime * 100) / videoRef.current?.duration - 1 + "%",
              }}
            ></div>
          </div>
          {/* ===================== duration section ========================= */}
          <h6>{duration}</h6>
          <div className="relative">
            {speedVisible && (
              <ul className="absolute top-[-13.5rem] -left-4 bg-white rounded overflow-hidden">
                <li
                  className="py-1 px-4 hover:bg-grey-light cursor-pointer flex items-center gap-1 relative"
                  onClick={() => handlePlaybackSpeed(0.5)}
                >
                  {videoRef.current.playbackRate === 0.5 && (
                    <img
                      src={check}
                      className="w-2 left-1 absolute"
                      alt="check"
                    />
                  )}
                  0.5
                </li>
                <li
                  className="py-1 px-4 hover:bg-grey-light cursor-pointer flex items-center gap-1 relative"
                  onClick={() => handlePlaybackSpeed(1)}
                >
                  {videoRef.current.playbackRate === 1 && (
                    <img
                      src={check}
                      className="w-2 left-1 absolute"
                      alt="check"
                    />
                  )}
                  1
                </li>
                <li
                  className="py-1 px-4 hover:bg-grey-light cursor-pointer flex items-center gap-1 relative"
                  onClick={() => handlePlaybackSpeed(1.5)}
                >
                  {videoRef.current.playbackRate === 1.5 && (
                    <img
                      src={check}
                      className="w-2 left-1 absolute"
                      alt="check"
                    />
                  )}
                  1.5
                </li>
                <li
                  className="py-1 px-4 hover:bg-grey-light cursor-pointer flex items-center gap-1 relative"
                  onClick={() => handlePlaybackSpeed(2)}
                >
                  {videoRef.current.playbackRate === 2 && (
                    <img
                      src={check}
                      className="w-2 left-1 absolute"
                      alt="check"
                    />
                  )}
                  2
                </li>
                <li
                  className="py-1 px-4 hover:bg-grey-light cursor-pointer flex items-center gap-1 relative"
                  onClick={() => handlePlaybackSpeed(2.5)}
                >
                  {videoRef.current.playbackRate === 2.5 && (
                    <img
                      src={check}
                      className="w-2 left-1 absolute"
                      alt="check"
                    />
                  )}
                  2.5
                </li>
              </ul>
            )}
            <img
              src={settings}
              className="w-2 h-2 cursor-pointer hover:rotate-90 duration-200"
              onClick={() => setSpeedVisible(true)}
              alt=""
            />
          </div>
          <img
            src={expand}
            className="w-[13px] h-[13px] cursor-pointer"
            alt=""
            onClick={() => document.getElementById("video").requestFullscreen()}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
