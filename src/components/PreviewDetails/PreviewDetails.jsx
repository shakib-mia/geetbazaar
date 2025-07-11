import React, { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumPreview from "../AlbumPreview/AlbumPreview";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";
import { backendUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ProfileContext } from "../../contexts/ProfileContext";
import Swal from "sweetalert2";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";

const PreviewDetails = ({ albumData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setScreen } = useContext(ScreenContext);
  const location = useLocation();
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { token, userData, setToken } = useContext(ProfileContext);

  const config = {
    headers: {
      token,
    },
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleUpdate = () => {
    albumData.updated = false;
    albumData.requested = true;

    console.log(albumData.status !== "submitted");

    if (albumData.status === "submitted") {
      axios
        .put(backendUrl + "songs/" + albumData._id, albumData, config)
        .then(({ data }) => {
          if (data.acknowledged) {
            // console.log("object");
            Swal.fire({
              title: `Song Updated Successfully`,
              confirmButtonText: `Let's go to home`,
              icon: "success",
              confirmButtonColor: "#22683E",
              allowOutsideClick: false,
              allowEscapeKey: false,
              // text:"You may proceed to next "
            }).then((res) => res.isConfirmed && navigate("/"));
            // axios
            //   .post(backendUrl + "send-song-status", updated)
            //   .then(({ data }) => {
            //     // if (data.acknowledged) {
            //     Swal.close();
            //     setRefetch((ref) => !ref);

            //     // }
            //   });
          }
        })
        .catch((err) => {
          // console.log(err.response);
          if (err.response.status === 401) {
            setToken("");
            sessionStorage.removeItem("token");
            // toast.error("Token has expired", {
            //   position: "bottom-center",
            // });
            navigate("/login");
          }
        });
    } else {
      if (
        albumData.paymentDate ||
        parseFloat(albumData.price) === 0 ||
        !isNaN(parseFloat(checkTheDateIsBefore(userData.yearlyPlanEndDate)))
      ) {
        axios
          .post(backendUrl + "edit-song", albumData, config)
          .then(({ data }) => {
            if (data.insertedId.length > 0) {
              toast.success("Update Request Submitted");
              navigate("/");
            }
          });
      } else {
        axios
          .put(backendUrl + "songs/" + albumData._id, albumData, config)
          .then(({ data }) => {
            if (data.acknowledged) {
              // console.log("object");
              Swal.fire({
                title: `Song Updated Successfully`,
                confirmButtonText: `Let's go to home`,
                icon: "success",
                confirmButtonColor: "#22683E",
                allowOutsideClick: false,
                allowEscapeKey: false,
                // text:"You may proceed to next "
              }).then((res) => res.isConfirmed && navigate("/"));
              // axios
              //   .post(backendUrl + "send-song-status", updated)
              //   .then(({ data }) => {
              //     // if (data.acknowledged) {
              //     Swal.close();
              //     setRefetch((ref) => !ref);

              //     // }
              //   });
            }
          })
          .catch((err) => {
            // console.log(err.response);
            if (err.response.status === 401) {
              setToken("");
              sessionStorage.removeItem("token");
              // toast.error("Token has expired", {
              //   position: "bottom-center",
              // });
              navigate("/login");
            }
          });
      }
    }
  };

  const renderArtists = (artists) => (
    <ul className="mt-2 space-y-1">
      {artists?.map((artist, index) => (
        <li
          key={index}
          className="flex items-center text-paragraph-2 text-white"
        >
          <span className="font-medium">{artist.name}</span>
          <span className="mx-1">-</span>
          <span>{artist.role}</span>
          {artist.spotifyUrl && (
            <a
              href={artist.spotifyUrl}
              className="ml-2 text-primary-light hover:text-primary-light-light"
            >
              Spotify
            </a>
          )}
          {artist.appleArtist && (
            <a
              href={artist.appleArtist}
              className="ml-2 text-primary-light hover:text-primary-light-light"
            >
              Apple Music
            </a>
          )}
          {artist.facebookUrl && (
            <a
              href={artist.facebookUrl}
              className="ml-2 text-primary-light hover:text-primary-light-light"
            >
              Facebook
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const renderSongDetails = (song) => {
    return (
      <div key={song?.isrc || "single"}>
        <div className="px-4 py-3">
          <h2 className="text-heading-6-bold text-white">{song.songName}</h2>
          <div className="mt-3 flex items-center">
            <button
              onClick={togglePlay}
              className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <audio
              ref={audioRef}
              src={song.songUrl || albumData.songUrl}
              className="ml-3"
            />
            <aside>
              <div className="ml-3 text-subtitle-2 text-black-secondary">
                Caller Tune Start Time 1:{" "}
                {song.startMinutes || albumData.startMinutes}:
                {(song.startSeconds2 || albumData.startSeconds2)
                  ?.toString()
                  ?.padStart(2, "0")}
              </div>

              <div className="ml-3 text-subtitle-2 text-black-secondary">
                Caller Tune Start Time 2:{" "}
                {song.startMinutes2 || albumData.startMinutes2}:
                {(song.startSeconds2 || albumData.startSeconds2)
                  ?.toString()
                  ?.padStart(2, "0")}
              </div>
            </aside>
          </div>
        </div>

        <div className="px-4 pb-2">
          <ul className="flex flex-col">
            {song.artists?.map((artist, index) => {
              console.log(artist);
              const {
                name,
                role,
                appleArtist,
                facebookUrl,
                instagramUrl,
                spotifyUrl,
              } = artist;
              return (
                <li key={index} className="mb-2 flex gap-1 items-center">
                  <span className="font-bold">{name}</span> - {role}
                  <div className="flex divide-x">
                    {appleArtist && (
                      <a
                        href={appleArtist}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline px-1"
                      >
                        Apple Music
                      </a>
                    )}
                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline px-1"
                      >
                        Facebook
                      </a>
                    )}
                    {instagramUrl && (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline px-1"
                      >
                        Instagram
                      </a>
                    )}

                    {spotifyUrl ? (
                      <a
                        href={spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline px-1"
                      >
                        Spotify
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-4 py-3 bg-grey-dark">
          <h2 className="text-heading-6-bold text-white">
            Additional Information
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div>
              <span className="text-subtitle-2 text-white">ISRC:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {song.isrc || albumData.isrc}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">UPC:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {albumData.UPC}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">Publisher:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {albumData.publisher}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">Record Label:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {albumData.recordLabel}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">Content Type:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {albumData.contentType}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">
                Payment Status:
              </span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {song.status || albumData.status}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">Upload Time:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {song.time || albumData.time}
              </span>
            </div>
            <div>
              <span className="text-subtitle-2 text-white">User Email:</span>{" "}
              <span className="text-subtitle-2-bold text-primary-light">
                {song.userEmail || albumData.userEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlatforms = (platforms) => (
    <div className="px-4 py-3">
      <h2 className="text-heading-6-bold text-black">Selected Platforms</h2>
      <ul className={`grid grid-cols-2 lg:grid-cols-8 gap-2 lg:gap-4`}>
        {platforms?.map((plat) => (
          <li
            className={`flex gap-2 justify-center lg:justify-normal transition items-center rounded-xl cursor-pointer p-2`}
            title={
              plat === "Meta" &&
              "Including FB & Instagram audio library, shorts, story and reels."
            }
            // onClick={() => handlePlatformSelection(plat)}
          >
            <img
              src={`${backendUrl}uploads/platforms/${
                plat === "Hungama"
                  ? "hungama-music"
                  : plat.includes(" ")
                  ? plat.split(" ").join("-").toLowerCase()
                  : plat.toLowerCase()
              }.png`}
              className={`w-3 h-3 lg:w-5 lg:h-5 transition object-contain mx-auto`}
              alt=""
            />
            {/* <h6 className="text-paragraph-2 font-bold lg:text-heading-6-bold text-grey-dark capitalize whitespace-nowrap">
              {plat}
            </h6> */}
          </li>
        ))}
      </ul>
    </div>
  );

  if (location.pathname === "/album-upload") {
    return <AlbumPreview albumData={albumData} />;
  }

  return (
    <div className="min-h-screen lg:p-4 mx-auto w-full pb-7">
      <div className="text-white rounded-lg shadow-lg overflow-hidden">
        <div
          className={`flex flex-col lg:flex-row ${
            location.pathname.includes("album") && "bg-grey-dark"
          }`}
        >
          <div className="w-full lg:w-1/4 ">
            <img
              className="object-cover w-full h-full aspect-square"
              src={albumData.artWork || albumData.artwork}
              alt={albumData.albumTitle}
            />
          </div>
          <aside className="w-full lg:w-3/4">
            <div className="p-3 lg:p-4">
              {/* <div className="uppercase tracking-wide text-subtitle-2-bold text-primary-light">
                {albumData.albumType}
              </div> */}
              <h1 className="lg:mt-2 text-heading-3-bold lg:text-heading-1-bold">
                {albumData.songs ? albumData.albumTitle : albumData.songName}
              </h1>
              <p className="lg:mt-2 text-paragraph-1">
                {albumData.description}
              </p>
              {!(albumData.songs && albumData.songs.length) ? (
                <div className="mt-1 lg:mt-3 grid grid-cols-2 gap-1 lg:gap-2">
                  <div>
                    <span className="text-subtitle-2 ">Genre:</span>{" "}
                    <span className="text-subtitle-2-bold text-primary-light">
                      {albumData.genre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2 ">Sub-Genre:</span>{" "}
                    <span className="text-subtitle-2-bold text-primary-light">
                      {albumData.subGenre}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2">Language:</span>{" "}
                    <span className="text-subtitle-2-bold text-primary-light">
                      {albumData.language}
                    </span>
                  </div>
                  <div>
                    <span className="text-subtitle-2">Mood:</span>{" "}
                    <span className="text-subtitle-2-bold text-primary-light">
                      {albumData.mood}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-1 grid grid-cols-1 gap-1 lg:gap-2 text-heading-6">
                  <aside>
                    <span className="font-bold">UPC</span>: {albumData.UPC}
                  </aside>
                  <aside>
                    <span className="font-bold">Record Label</span>:{" "}
                    {albumData.recordLabel}
                  </aside>
                  <aside>
                    <span className="font-bold">Publisher</span>:{" "}
                    {albumData.publisher}
                  </aside>
                </div>
              )}
            </div>
            {albumData.songs ? (
              <></>
            ) : (
              <div className="px-4 py-3 bg-grey-dark">
                <h2 className="text-heading-6-bold">Artists</h2>
                {renderArtists(
                  albumData.songs
                    ? albumData.songs[0]?.artists
                    : albumData.artists
                )}
              </div>
            )}
          </aside>
        </div>

        {albumData.songs
          ? // Album Logic
            albumData.songs.map((song) => renderSongDetails(song))
          : // Single Song Logic
            renderSongDetails(albumData)}

        {renderPlatforms(albumData.selectedPlatforms)}
      </div>

      <div className="flex justify-center mt-5">
        {location.pathname.includes("/edit") ? (
          <Button onClick={handleUpdate}>Confirm</Button>
        ) : (
          <Button onClick={() => setScreen("distribution")}>
            Proceed to Checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewDetails;
