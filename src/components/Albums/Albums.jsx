import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowUp, FaEdit, FaMusic } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";

import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";
import dummyAlbumArt2 from "./../../assets/images/dummy-albums/2.webp";
import dummyAlbumArt3 from "./../../assets/images/dummy-albums/3.webp";
import dummyAlbumArt4 from "./../../assets/images/dummy-albums/4.webp";
import dummyAlbumArt5 from "./../../assets/images/dummy-albums/5.webp";
import { RiEditBoxLine } from "react-icons/ri";
// import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";

// dummy album list
const dummyAlbumArts = [
  dummyAlbumArt1,
  dummyAlbumArt2,
  dummyAlbumArt3,
  dummyAlbumArt4,
  dummyAlbumArt5,
];

const Albums = ({ setAlbumsCount, recentUploads }) => {
  const [albums, setAlbums] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState("");
  const { token, userData, setAlbumToggled } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/album", { headers: { token } })
      .then(({ data }) => {
        console.log(data);
        if (recentUploads) {
          setAlbums(data?.notStreamingAlbum);
        } else {
          setAlbums(data?.streamingAlbum);
        }
        setAlbumsCount(data?.notStreamingAlbum?.length);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleDropdown = (albumId) => {
    if (expandedAlbum !== albumId) {
      setExpandedAlbum(albumId);
    } else {
      setExpandedAlbum("");
    }
  };

  const handleEdit = (albumId) => navigate("/edit-album/" + albumId);

  const handlePayNow = (albumId) => {
    const foundAlbum = albums.find((album) => album.orderId === albumId);
    navigate(`/payment?price=${foundAlbum.price}?id=${foundAlbum.orderId}`);
  };

  return (
    <div className="flex flex-col gap-4 pb-4 w-full">
      {albums?.length > 0 ? (
        albums.map((album, key) => (
          <div
            key={key}
            className={`bg-white/60 backdrop-blur-xl rounded border border-surface-white-line hover:shadow transition`}
          >
            <div
              className="flex flex-col lg:flex-row gap-4 items-center justify-between cursor-pointer relative"
              onClick={() => toggleDropdown(album._id)}
            >
              <div className="flex items-center gap-1 lg:gap-2 w-full z-0 group">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-md w-2/6 aspect-square">
                  <img
                    src={dummyAlbumArts[key % dummyAlbumArts.length]}
                    alt={album.albumTitle}
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex gap-1 w-4/6 flex-col">
                  <aside>
                    <h5 className="text-subtitle-1-bold text-black-primary">
                      {album.albumTitle}
                    </h5>
                    <p className="text-subtitle-2 flex gap-2 items-center mt-1">
                      <strong>Status:</strong>{" "}
                      {album.status === "paid" ? (
                        <span className="bg-interactive-light/15 text-interactive-light px-2 py-0.5 rounded-full flex items-center gap-1">
                          Paid
                        </span>
                      ) : album.songs.some(
                          (song) => song.status !== "streaming"
                        ) ? (
                        <span className="bg-warning/15 text-warning px-2 py-0.5 rounded-full flex items-center gap-1">
                          <TbAlertTriangleFilled /> Needs Attention
                        </span>
                      ) : album.songs.some((song) => song.status === "paid") ? (
                        <span className="bg-interactive-light/15 text-interactive-light px-2 py-0.5 rounded-full flex items-center gap-1">
                          <TbAlertTriangleFilled /> Paid
                        </span>
                      ) : (
                        <span className="bg-success/15 text-success px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FcOk /> OK
                        </span>
                      )}
                    </p>
                  </aside>
                  <aside className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <>
                      <div className="lg:flex hidden items-center gap-2">
                        {!album.payment_id &&
                        !(
                          userData.yearlyPlanEndDate &&
                          checkTheDateIsBefore(userData.yearlyPlanEndDate)
                        ) ? (
                          <Button
                            onClick={() => handlePayNow(album.orderId)}
                            className="!mt-0 !w-fit bg-gradient-to-r whitespace-nowrap from-primary to-primary-dark text-white px-4 py-1 rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            Pay Now
                          </Button>
                        ) : null}
                        <button
                          onClick={() => handleEdit(album._id)}
                          className="p-2 relative rounded-full hover:bg-primary/10 group transition"
                          title="Edit Album"
                        >
                          <RiEditBoxLine className="w-4 h-4 text-black-secondary group-hover:text-interactive-light transition-colors duration-200" />
                        </button>
                      </div>
                    </>
                  </aside>
                </div>
              </div>
            </div>
            {/* Dropdown Songs */}
            {expandedAlbum === album._id && (
              <div className="p-4 bg-white/30 border-surface-white-line rounded-b-2xl flex flex-col gap-3">
                {album.songs.map((song, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-surface-white-line hover:shadow-lg transition-all duration-200"
                  >
                    <p className="text-subtitle-1 text-interactive-light-disabled">
                      <strong>Song Name:</strong> {song.songName} ({song.status}
                      )
                    </p>
                    <p className="text-subtitle-2 text-black-primary">
                      <strong>Artists:</strong>{" "}
                      {song.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                ))}

                {
                  <div className="flex justify-end items-center gap-2 lg:w-2/6 backdrop-blur-lg z-[999999]">
                    <div className="flex lg:hidden items-center gap-2">
                      {!album.payment_id &&
                      !(
                        userData.yearlyPlanEndDate &&
                        checkTheDateIsBefore(userData.yearlyPlanEndDate)
                      ) ? (
                        <Button
                          onClick={() => handlePayNow(album.orderId)}
                          className="!mt-0 bg-gradient-to-r whitespace-nowrap from-primary to-primary-dark text-white px-4 py-1 rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          Pay Now
                        </Button>
                      ) : null}
                      <button
                        onClick={() => handleEdit(album._id)}
                        className="p-2 rounded-full hover:bg-primary/10 transition"
                        title="Edit Album"
                      >
                        <RiEditBoxLine className="w-4 h-4 text-black-secondary hover:text-interactive-light transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative mb-6 w-7 h-7 mx-auto">
              {/* Main Icon */}
              <div className="w-7 h-7 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center z-10">
                <FaMusic className="w-5 h-5 text-primary/60" />
              </div>

              {/* Pulsing Circle */}
              <div className="absolute inset-0 m-auto w-7 h-7 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full animate-ping z-0"></div>
            </div>{" "}
            <h4 className="text-heading-4-bold text-black-primary">
              Upload Your First Album
            </h4>
            <p className="max-w-md mx-auto">
              Upload your first Album and start building your music library.
              Your journey begins here.
            </p>
            <Button
              onClick={() => {
                navigate("/plans");
                setAlbumToggled(true);
              }}
              className="bg-gradient-to-r from-interactive-light to-primary-dark text-white px-6 py-3 rounded-2xl text-button uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started <FaArrowUp className="rotate-45 w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
