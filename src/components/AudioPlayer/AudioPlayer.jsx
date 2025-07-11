import React, { useState, useEffect, useContext, useRef } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { ScreenContext } from "../../contexts/ScreenContext";
import play from "./../../assets/icons/play.webp";
import pause from "./../../assets/icons/pause.webp";
import sound from "./../../assets/icons/sound.webp";
import mute from "./../../assets/icons/muted.webp";
import { formatTime } from "../../utils/formatTime";
import { useLocation } from "react-router-dom";

function AudioPlayer({ src, id }) {
  const { formData } = useContext(ScreenContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(40);
  // console.log( formData.songUrl);
  const [songUrl, setSongUrl] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      setSongUrl(formData.songs[id].songUrl);
      // setSongUrl
    } else {
      setSongUrl(formData.songUrl);

      // setFormData({ ...formData, songName: e.target.value });
    }
  }, []);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
    // console.log(volume);
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    // nst handleProgress = (e) => {
    const progressElement = e.target; // This should refer to the progress bar element
    // console.log(e.clientX - progressElement.getBoundingClientRect().left);
    const containerWidth =
      e.clientX - progressElement.getBoundingClientRect().left; // Calculate the relative position
    // console.log((containerWidth * 100) / progressElement.offsetWidth);
    const percent = (containerWidth * 100) / progressElement.offsetWidth;
    // // const progress = e.target.value;
    // console.log(position);
    // console.log(audioRef.current.duration);
    audioRef.current.currentTime = (audioRef.current.duration * percent) / 100;
    // // console.log(audioRef.current.currentTime);
    // setProgress(percent);
  };

  const handleVolumeChange = (e) => {
    const progressElement = e.target; // This should refer to the progress bar element
    // console.log(e.clientX - progressElement.getBoundingClientRect().left);
    const containerWidth =
      e.clientX - progressElement.getBoundingClientRect().left; // Calculate the relative position
    // console.log(containerWidth * 100);
    const percent =
      Math.abs(containerWidth * 100) / progressElement.offsetWidth;

    audioRef.current.volume = Math.abs(percent) / 100;
    // console.log(percent );
    setVolume(percent);
  };

  const updateProgress = () => {
    // console.log(e);
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  // useEffect(() => {
  //   console.log(progress);
  // }, [progress]);

  // console.log(formData.songUrl);

  // console.log(audioRef.current?.duration);
  // console.log(
  //   formData.songs[id].artists.find(
  //     ({ role }) => role === "Singer/Primary Artist"
  //   ).name
  // );

  // const primaryArtistName =
  //    location.pathname === "/album-upload" ||
  // location.search.split("?")[1] === "yearly-plan" ||
  // location?.pathname.includes("edit-album")&& formData.songs.length > 0 &&
  //   formData.songs[id]?.artists?.find(
  //     ({ role }) => role === "Singer/Primary Artist"
  //   )?.name
  //     ? formData.songs[id].artists.find(
  //         ({ role }) => role === "Singer/Primary Artist"
  //       ).name
  //     : formData.artists?.find(({ role }) => role === "Singer/Primary Artist")
  //         ?.name;

  return (
    <div className="p-3 bg-grey-dark rounded-xl text-grey-dark h-full inline-block w-full relative overflow-hidden">
      {/* {src.length > 0 || (
        <div className="w-full h-full absolute top-0 left-0 backdrop-blur z-[9999999999]">
          No songs has been uploaded yet
        </div>
      )} */}
      <div className="flex flex-col gap-2">
        {(formData.artWork || formData.artwork) && (
          <img
            src={formData.artWork || formData.artwork}
            alt="album-art"
            className="w-full aspect-square mx-auto rounded-xl"
          />
        )}
        {/* </div> */}
        <aside className="w-full mx-auto flex flex-col justify-between">
          <audio
            ref={audioRef}
            src={src || songUrl}
            onTimeUpdate={updateProgress}
          ></audio>
          <aside>
            <h5 className="text-heading-5-bold text-white">
              {(location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")) &&
              formData.songs.length
                ? formData.songs[id].songName
                : formData.songName}
            </h5>
            {(() => {
              const hasSongs =
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                (location?.pathname.includes("edit-album") &&
                  formData.songs.length > 0);
              const primaryArtist = hasSongs
                ? formData.songs[id]?.artists?.find(
                    ({ role }) => role === "Singer/Primary Artist"
                  )
                : formData.artists?.find(
                    ({ role }) => role === "Singer/Primary Artist"
                  );

              return primaryArtist?.name ? (
                <h6 className="text-heading-6-bold mt-2 text-white">
                  <span className="font-normal">By</span> {primaryArtist.name}
                </h6>
              ) : null;
            })()}
          </aside>
        </aside>
      </div>
      {src?.length || songUrl?.length ? (
        <div className="w-full mx-auto flex items-center gap-3 mt-2">
          <span onClick={togglePlayPause} className="cursor-pointer w-1/12">
            {isPlaying && progress !== 100 ? (
              <FaPause className="text-white" />
            ) : (
              <FaPlay className="text-white" />
            )}
          </span>

          {/* Progress */}
          <div
            className="progress-bar w-7/12 h-1 bg-grey relative overflow-visible rounded-full cursor-pointer"
            onClick={handleProgressChange}
          >
            <div className="absolute top-[12px] w-full flex justify-between text-white">
              <aside>{formatTime(audioRef.current?.currentTime)}</aside>
              <aside>{formatTime(audioRef.current?.duration)}</aside>
            </div>

            <div
              className="absolute left-0 top-0 h-full bg-interactive-light rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              id="circle"
              className="w-2 h-2 rounded-full absolute bg-primary top-0 bottom-0 my-auto pointer-events-none"
              style={{
                // height: "20px",
                // width: "20px",
                // backgroundColor: "blue",
                // position: "absolute",
                left: `${progress - 3}%`,
                // width: `${progress}%`,
              }}
            ></div>
          </div>

          {/* Volume */}
          <div className="w-4/12 flex gap-1 items-center text-heading-6">
            {/* <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                // className="mt-4"
                value={volume}
                onChange={handleVolumeChange}
              /> */}
            {volume > 0 ? (
              <FaVolumeUp
                className="cursor-pointer text-white"
                onClick={() => {
                  setVolume(0);

                  audioRef.current.volume = 0;
                }}
              />
            ) : (
              <FaVolumeMute
                className="cursor-pointer"
                onClick={() => {
                  setVolume(40);
                  audioRef.current.volume = 0.4;
                }}
              />
            )}
            <div
              className="w-full h-1 rounded-full bg-interactive-light-confirmation-disabled relative cursor-pointer"
              onClick={handleVolumeChange}
            >
              <div
                className="bg-interactive-light-confirmation-focus h-full rounded-full pointer-events-none"
                style={{ width: `${Math.abs(volume) - 5}%` }}
              ></div>
              <div
                className="h-2 bg-interactive-light-confirmation rounded-full w-2 absolute top-0 bottom-0 m-auto cursor-pointer pointer-events-none"
                style={{ left: `${Math.abs(volume) - 15}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AudioPlayer;
