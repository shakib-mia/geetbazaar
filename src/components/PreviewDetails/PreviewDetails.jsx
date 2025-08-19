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

  const config = { headers: { token } };

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleUpdate = async () => {
    albumData.updated = false;
    albumData.requested = true;

    try {
      if (albumData.status === "submitted") {
        const { data } = await axios.put(
          `${backendUrl}songs/${albumData._id}`,
          albumData,
          config
        );
        if (data.acknowledged) {
          await Swal.fire({
            title: `Song Updated Successfully`,
            confirmButtonText: `Let's go to home`,
            icon: "success",
            confirmButtonColor: "#22683E",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          navigate("/");
        }
      } else {
        if (
          albumData.paymentDate ||
          parseFloat(albumData.price) === 0 ||
          !isNaN(parseFloat(checkTheDateIsBefore(userData.yearlyPlanEndDate)))
        ) {
          const { data } = await axios.post(
            `${backendUrl}edit-song`,
            albumData,
            config
          );
          if (data.insertedId.length > 0) {
            toast.success("Update Request Submitted");
            navigate("/");
          }
        } else {
          const { data } = await axios.put(
            `${backendUrl}songs/${albumData._id}`,
            albumData,
            config
          );
          if (data.acknowledged) {
            await Swal.fire({
              title: `Song Updated Successfully`,
              confirmButtonText: `Let's go to home`,
              icon: "success",
              confirmButtonColor: "#22683E",
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            navigate("/");
          }
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setToken("");
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const renderArtists = (artists) => (
    <ul className="mt-2 space-y-1">
      {artists?.map((artist, index) => (
        <li
          key={index}
          className="flex flex-wrap gap-2 items-center text-gray-800"
        >
          <span className="font-bold">{artist.name}</span> - {artist.role}
          {artist.spotifyUrl && (
            <a
              href={artist.spotifyUrl}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Spotify
            </a>
          )}
          {artist.appleArtist && (
            <a
              href={artist.appleArtist}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Apple Music
            </a>
          )}
          {artist.facebookUrl && (
            <a
              href={artist.facebookUrl}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          )}
          {artist.instagramUrl && (
            <a
              href={artist.instagramUrl}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Instagram
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const renderSongDetails = (song) => (
    <div
      key={song._id || song.isrc}
      className="mt-6 max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="flex flex-col gap-2">
          <button
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <audio ref={audioRef} src={song.songUrl || albumData.songUrl} />
          <div className="text-gray-600 mt-2">
            <div>
              Caller Tune Start 1: {song.startMinutes || albumData.startMinutes}
              :
              {(song.startSeconds2 || albumData.startSeconds2)
                ?.toString()
                .padStart(2, "0")}
            </div>
            <div>
              Caller Tune Start 2:{" "}
              {song.startMinutes2 || albumData.startMinutes2}:
              {(song.startSeconds2 || albumData.startSeconds2)
                ?.toString()
                .padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900">{song.songName}</h3>
          <div className="mt-2">{renderArtists(song.artists)}</div>

          {/* Additional Info */}
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
            <div>
              <span className="font-semibold text-gray-900">ISRC:</span>{" "}
              {song.isrc || albumData.isrc}
            </div>
            <div>
              <span className="font-semibold text-gray-900">UPC:</span>{" "}
              {albumData.UPC}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Publisher:</span>{" "}
              {albumData.publisher}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Record Label:</span>{" "}
              {albumData.recordLabel}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Content Type:</span>{" "}
              {albumData.contentType}
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                Payment Status:
              </span>{" "}
              {song.status || albumData.status}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Upload Time:</span>{" "}
              {song.time || albumData.time}
            </div>
            <div>
              <span className="font-semibold text-gray-900">User Email:</span>{" "}
              {song.userEmail || albumData.userEmail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlatforms = (platforms) => (
    <div className="mt-6 max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="font-bold text-xl mb-4">Selected Platforms</h2>
      <ul className="flex flex-wrap gap-4">
        {platforms?.map((plat, i) => (
          <li
            key={i}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
          >
            <img
              src={`${backendUrl}uploads/platforms/${
                plat === "Hungama"
                  ? "hungama-music"
                  : plat.toLowerCase().replace(" ", "-")
              }.png`}
              alt={plat}
              className="w-5 h-5 object-contain"
            />
            <span className="text-gray-800 font-medium">{plat}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (location.pathname === "/album-upload")
    return <AlbumPreview albumData={albumData} />;

  return (
    <div className="min-h-screen bg-gray-50 lg:p-6">
      {/* Album Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <img
            src={albumData.artWork || albumData.artwork}
            alt={albumData.albumTitle}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="lg:w-3/4 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
              {albumData.songs ? albumData.albumTitle : albumData.songName}
            </h1>
            <p className="mt-3 text-gray-700">{albumData.description}</p>

            {/* Meta Info */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
              <div>
                <span className="font-semibold text-gray-900">Genre:</span>{" "}
                {albumData.genre || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Sub-Genre:</span>{" "}
                {albumData.subGenre || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Language:</span>{" "}
                {albumData.language || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Mood:</span>{" "}
                {albumData.mood || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs */}
      {albumData.songs
        ? albumData.songs.map(renderSongDetails)
        : renderSongDetails(albumData)}

      {/* Platforms */}
      {renderPlatforms(albumData.selectedPlatforms)}

      {/* Footer Button */}
      <div className="max-w-6xl mx-auto flex justify-center mt-6">
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
