import { AiFillDislike, AiFillLike } from "react-icons/ai";
import React, { useContext, useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import EditSong from "../EditSong/EditSong";
import { RiEditBoxFill } from "react-icons/ri";
import { FaShareNodes } from "react-icons/fa6";
import axios from "axios";
import { backendUrl } from "../../constants";
import { BsGraphUpArrow } from "react-icons/bs";
import RevenueDetails from "../RevenueDetails/RevenueDetails";
import { formatNumber } from "../../utils/formatNumber";

import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";
import dummyAlbumArt2 from "./../../assets/images/dummy-albums/2.webp";
import dummyAlbumArt3 from "./../../assets/images/dummy-albums/3.webp";
import dummyAlbumArt4 from "./../../assets/images/dummy-albums/4.webp";
import dummyAlbumArt5 from "./../../assets/images/dummy-albums/5.webp";

const dummyAlbumArts = [
  dummyAlbumArt1,
  dummyAlbumArt2,
  dummyAlbumArt3,
  dummyAlbumArt4,
  dummyAlbumArt5,
];

const SongItem = ({ song, isFirst, openSongId, id, setOpenSongId }) => {
  const [editId, setEditId] = useState("");
  const { userData, setRefetch, dollarRate } = useContext(ProfileContext);
  const location = useLocation();
  const [expandedSocial, setExpandedSocial] = useState(false);
  const [details, setDetails] = useState("");
  const [albumArt, setAlbumArt] = useState(
    dummyAlbumArts[id % dummyAlbumArts.length]
  );

  const navigate = useNavigate();

  const {
    Song,
    songName,
    jiosaavn,
    "wynk-music": wynk,
    gaana,
    spotify,
    "apple-music": apple,
    "amazon-music": amazon,
    _id,
    image,
  } = song;

  const isAccordionOpen = isFirst
    ? openSongId === "" || openSongId === _id
    : openSongId === _id;

  const userId = userData["user-id"];

  // Image check
  useEffect(() => {
    const checkImageExists = async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) setAlbumArt(url);
      } catch (err) {
        setAlbumArt(dummyAlbumArts[id % dummyAlbumArts.length]);
      }
    };

    if (image) {
      checkImageExists(image);
    } else {
      setAlbumArt(dummyAlbumArts[id % dummyAlbumArts.length]);
    }
  }, [image, id]);

  // Handle Like
  const handleLike = (e) => {
    e.stopPropagation();
    if (!song.likes) song.likes = [];
    if (!song.dislikes) song.dislikes = [];

    if (!song.likes.includes(userId)) {
      song.likes.push(userId);
      song.dislikes = song.dislikes.filter((id) => id !== userId);
    } else {
      song.likes = song.likes.filter((id) => id !== userId);
    }

    axios
      .put(backendUrl + "songs/update-like-dislike", song)
      .then(() => setRefetch((ref) => !ref))
      .catch((err) => console.log(err.response?.data || err.message));
  };

  // Handle Dislike
  const handleDislike = (e) => {
    e.stopPropagation();
    if (!song.likes) song.likes = [];
    if (!song.dislikes) song.dislikes = [];

    if (!song.dislikes.includes(userId)) {
      song.dislikes.push(userId);
      song.likes = song.likes.filter((id) => id !== userId);
    } else {
      song.dislikes = song.dislikes.filter((id) => id !== userId);
    }

    axios
      .put(backendUrl + "songs/update-like-dislike", song)
      .then(() => setRefetch((ref) => !ref))
      .catch((err) => console.log(err.response?.data || err.message));
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setExpandedSocial(true)}
      onMouseLeave={() => setExpandedSocial(false)}
    >
      <div className="relative w-full overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={albumArt}
            alt={"Album Cover of " + (Song || songName)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />

          {location.pathname === "/profile" && (
            <div className="absolute bg-black/70 flex items-center justify-center w-fit h-fit transition-all duration-700 px-2 py-1 rounded-lg top-1 right-1 group-hover:-top-5 group-hover:-right-5">
              <div className="text-white text-lg font-semibold">
                {userData.billing_country === "India" ? "₹" : "$"}
                {formatNumber(
                  song?.revenue *
                    (userData.billing_country === "India" ? 1 : dollarRate) || 0
                )}
              </div>
            </div>
          )}

          {/* Overlay and actions */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 group">
            <div className="flex justify-between items-start relative -top-full group-hover:top-0 transition-[top] duration-700">
              <h6 className="text-white font-semibold text-heading-6 line-clamp-2">
                {Song || songName}
              </h6>
            </div>

            <div className="flex flex-col gap-3 relative top-full group-hover:top-0 transition-[top] duration-700">
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  { url: jiosaavn, src: "jiosaavn" },
                  { url: wynk, src: "wynk-music" },
                  { url: gaana, src: "gaana" },
                  { url: spotify, src: "spotify" },
                  { url: amazon, src: "amazon-music" },
                  { url: song["YouTube-Music"], src: "youtube-music" },
                ].map(
                  (platform, idx) =>
                    platform.url && (
                      <a
                        key={idx}
                        href={platform.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:scale-110 transition-transform duration-200 text-white"
                      >
                        <img
                          src={`${backendUrl}/uploads/platforms/${platform.src}.png`}
                          alt={platform.src}
                          className="w-3"
                        />
                      </a>
                    )
                )}
                {apple && (
                  <a
                    href={apple}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <FaApple className="text-white text-heading-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Like / Dislike buttons */}
        <div className="p-2 flex justify-between items-center backdrop-blur bg-gradient-to-br from-neutral-100 to-neutral-200 text-black text-sm gap-3">
          <div className="flex gap-1 relative">
            <div className="absolute -bottom-[2px] h-[2px] w-full bg-white rounded flex justify-between overflow-hidden">
              <div
                className="h-full bg-interactive-light transition-[width] duration-300"
                style={{
                  width:
                    song.likes?.length + song.dislikes?.length === 0
                      ? "0%"
                      : `${
                          (song.likes?.length * 100) /
                          (song.likes?.length + song.dislikes?.length)
                        }%`,
                }}
              ></div>
              <div
                className="h-full bg-interactive-light-destructive transition-[width] duration-300"
                style={{
                  width:
                    song.likes?.length + song.dislikes?.length === 0
                      ? "0%"
                      : `${
                          (song.dislikes?.length * 100) /
                          (song.likes?.length + song.dislikes?.length)
                        }%`,
                }}
              ></div>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-[2px] hover:text-interactive-light transition ${
                song.likes?.includes(userData["user-id"])
                  ? "text-interactive-light"
                  : ""
              }`}
            >
              <AiFillLike />
              <span>{formatNumber(song.likes?.length || 0) || 0}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-[2px] hover:text-interactive-light-destructive transition ${
                song.dislikes?.includes(userData["user-id"])
                  ? "text-interactive-light-destructive"
                  : ""
              }`}
            >
              <AiFillDislike />
              <span>{song.dislikes?.length || 0}</span>
            </button>
          </div>

          <div className="flex gap-1">
            {location.pathname === "/profile" && (
              <>
                <BsGraphUpArrow
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetails(song.isrc || song.ISRC);
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditId(song._id);
                  }}
                  className="hover:text-yellow-300 transition"
                >
                  <RiEditBoxFill />
                </button>
              </>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/share/${userData["user-id"]}/${_id}`);
              }}
              className="hover:text-cyan-300 transition"
            >
              <FaShareNodes />
            </button>
          </div>
        </div>
      </div>

      {details?.length ? (
        <RevenueDetails setDetails={setDetails} isrc={details} />
      ) : null}

      {editId === song._id && (
        <EditSong songData={song} setEditId={setEditId} />
      )}
    </div>
  );
};

export default SongItem;
