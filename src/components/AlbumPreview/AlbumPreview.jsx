import React, { useState, useRef, useContext } from "react";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";

const AlbumPreview = ({ albumData }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setScreen } = useContext(ScreenContext);
  const audioRef = useRef(null);
  const location = useLocation();
  // console.log(albumData);
  const togglePlay = (song) => {
    // song;
    if (currentSong === song && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      audioRef.current.src = song.songUrl; // In a real scenario, use the actual file URL
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen p-2 lg:p-4 text-white">
      <div className="mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* <div className="md:flex-shrink-0"> */}
          <img
            className="w-full lg:w-1/6 object-cover aspect-square"
            //   className="object-cover"
            src={albumData.artwork}
            alt={albumData.albumTitle}
          />
          {/* </div> */}
          <div className="p-2 lg:p-4 w-full lg:w-3/4">
            <div className="uppercase tracking-wide text-subtitle-1-bold text-white">
              {albumData.albumType}
            </div>
            <h1 className="mt-2 text-heading-4-bold text-white">
              {albumData.albumTitle}
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="text-subtitle-1 text-white-secondary">
                  UPC:
                </span>{" "}
                <span className="text-subtitle-1-bold text-white">
                  {albumData.UPC}
                </span>
              </div>
              <div>
                <span className="text-subtitle-1 text-white-secondary">
                  Publisher:
                </span>{" "}
                <span className="text-subtitle-1-bold text-white">
                  {albumData.publisher}
                </span>
              </div>
              <div>
                <span className="text-subtitle-1 text-white-secondary">
                  Record Label:
                </span>{" "}
                <span className="text-subtitle-1-bold text-white">
                  {albumData.recordLabel}
                </span>
              </div>
              <div>
                <span className="text-subtitle-1 text-white-secondary">
                  Content Type:
                </span>{" "}
                <span className="text-subtitle-1-bold text-white">
                  {albumData.contentType}
                </span>
              </div>
              <div>
                <span className="text-subtitle-1 text-white-secondary">
                  Upload Time:
                </span>{" "}
                <span className="text-subtitle-1-bold text-white">
                  {albumData.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 lg:px-4 py-3 bg-grey-dark">
          <h2 className="text-heading-5-bold text-white -mb-2">Songs</h2>
          {albumData.songs.map((song, index) => (
            <div key={index} className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-heading-6 font-bold text-white">
                {song.songName}
              </h3>
              <div className="flex flex-col lg:flex-row">
                <div className="mt-2 grid grid-cols-2 gap-2 w-full lg:w-2/3">
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      ISRC:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.isrc}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Genre:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.genre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Sub-Genre:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.subGenre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Language:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.language || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Mood:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.mood}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Release Date:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.releaseDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Live Date:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.liveDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Instrumental:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.instrumental ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-1 text-white-secondary">
                      Parental Advisory:
                    </span>{" "}
                    <span className="text-subtitle-1-bold text-white">
                      {song.parentalAdvisory ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 w-full lg:w-1/3">
                  <h4 className="text-heading-6 font-bold text-white">
                    Artists
                  </h4>
                  <ul className="mt-1 space-y-1">
                    {song.artists.map((artist, artistIndex) => (
                      <li
                        key={artistIndex}
                        className="text-subtitle-1 text-white-secondary"
                      >
                        <span className="font-medium">{artist.name}</span> -{" "}
                        <span>{artist.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-heading-6 font-bold text-white">
                  Description
                </h4>
                <p className="mt-1 text-subtitle-1 text-white-tertiary">
                  {song.description}
                </p>
              </div>
              <div className="mt-3 flex items-center">
                <button
                  onClick={() => togglePlay(song)}
                  className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
                >
                  {currentSong === song && isPlaying ? "Pause" : "Play"}
                </button>
                {/* <span className="ml-3 text-subtitle-1 text-white-secondary">
                  Start Time: {song.startMinutes}:
                  {song.startSeconds.toString().padStart(2, "0")} -
                  {song.startMinutes2}:
                  {song.startSeconds2.toString().padStart(2, "0")}
                </span> */}
              </div>
            </div>
          ))}
          <audio ref={audioRef} className="hidden" />
        </div>

        <div className="px-4 py-3">
          <h2 className="text-heading-6-bold text-white">Selected Platforms</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {albumData?.selectedPlatforms?.map((platform, index) => (
              <Button className={"!w-fit px-2 !py-1 !rounded-full"} key={index}>
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        {location.pathname.includes("edit-album") ? (
          <Button onClick={() => setScreen("distribution")}>
            Proceed to Checkout
          </Button>
        ) : (
          <Button onClick={() => setScreen("distribution")}>Confirm</Button>
        )}
      </div>
    </div>
  );
};

export default AlbumPreview;
