import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowUp, FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa"; // React Icons
import { ProfileContext } from "../../contexts/ProfileContext";
import { backendUrl } from "../../constants";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FcOk } from "react-icons/fc";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [expandedAlbum, setExpandedAlbum] = useState(null); // State for active dropdown
  const { token, userData, setAlbumToggled } = useContext(ProfileContext);
  // const {userData} = useContext(AppCont)
  const navigate = useNavigate();

  console.log(userData);

  const config = {
    headers: {
      token,
    },
  };

  useEffect(() => {
    axios
      .get(backendUrl + "recent-uploads/album", config)
      .then(({ data }) => {
        setAlbums(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleDropdown = (albumId) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  const handleEdit = (albumId) => {
    // console.log(`Edit album with ID: ${albumId}`);
    navigate("/edit-album/" + albumId);
    // Add your navigation or edit logic here
  };

  const handlePayNow = (albumId) => {
    // console.log(`Pay Now for album with ID: ${albumId}`);
    // Add your payment logic here
    // console.log(albums);
    const foundAlbum = albums.find((album) => album.orderId === albumId);

    navigate(`/payment?price=${foundAlbum.price}?id=${foundAlbum.orderId}`);
  };

  return (
    <div className="flex flex-col gap-4 pb-4 w-full">
      {albums.length > 0 ? (
        albums.map((album, key) => (
          <div
            key={key}
            className={`bg-grey-lighter rounded-xl shadow-sm flex flex-col gap-4 transition ${
              expandedAlbum ? "shadow" : "shadow-none"
            }`}
          >
            {/* Album Header: Clickable Image and Title */}
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between cursor-pointer">
              {/* Left: Image and Title */}
              <div
                className="flex items-center gap-2 lg:gap-4"
                onClick={() => toggleDropdown(album._id)}
              >
                <img
                  src={album.artwork}
                  alt={album.albumTitle}
                  className="w-7 aspect-square object-cover rounded-lg shadow-md"
                />
                <div>
                  <h5 className="text-heading-5-bold">{album.albumTitle}</h5>
                  <p className="text-sm text-white-secondary flex gap-2 items-center">
                    <strong>Status:</strong>{" "}
                    {album.songs.some((song) => song.status !== "streaming") ? (
                      <span className="text-warning inline-flex gap-1 items-center">
                        <TbAlertTriangleFilled /> Needs Attention
                      </span>
                    ) : (
                      (
                        <span className="text-interactive-light-confirmation-focus inline-flex gap-1 items-center">
                          <FcOk />
                          OK
                        </span>
                      ) || "No Status"
                    )}
                  </p>

                  {/* Pay Now Button */}
                  {album.payment_id ||
                  (userData.yearlyPlanEndDate &&
                    checkTheDateIsBefore(userData.yearlyPlanEndDate)) ? (
                    <></>
                  ) : (
                    <Button
                      onClick={() => handlePayNow(album.orderId)}
                      className="px-3 py-1"
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>

              {/* Right: Icons and Buttons */}
              <div className="flex items-center gap-2 justify-between w-full lg:w-fit">
                {/* Pay Now Button
                {album.payment_id ||
                (userData.yearlyPlanEndDate &&
                  checkTheDateIsBefore(userData.yearlyPlanEndDate)) ? (
                  <></>
                ) : (
                  <Button
                    onClick={() => handlePayNow(album.orderId)}
                    className="px-3 py-1"
                  >
                    Pay Now
                  </Button>
                )} */}

                <aside className="flex gap-2">
                  {/* Edit Icon */}
                  <button
                    onClick={() => handleEdit(album._id)}
                    title="Edit Album"
                  >
                    <FaEdit size={24} />
                  </button>

                  {/* Chevron
                <button className="text-primary order-3">
                  {expandedAlbum === album._id ? (
                    <FaChevronUp size={24} />
                  ) : (
                    <FaChevronDown size={24} />
                  )}
                </button> */}
                </aside>
              </div>
            </div>

            {/* Dropdown Content */}
            {expandedAlbum === album._id && (
              <div className="p-4 bg-grey-lighter flex flex-col gap-2 border-t border-grey-light">
                {/* Songs List */}
                {album.songs.map((song, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-subtitle-1 text-interactive-light-disabled">
                      <strong>Song Name:</strong> {song.songName} ({song.status}
                      )
                    </p>
                    <p className="text-subtitle-2 text-white">
                      <strong>Artists:</strong>{" "}
                      {song.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="h-full relative">
          <div className="flex justify-center items-center h-full text-grey-dark text-center">
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-heading-4-bold">Upload Your First Album</h4>
              <Button
                // small={true}
                onClick={() => {
                  navigate("/plans");
                  setAlbumToggled(true);
                }}
                className="text-interactive-light flex gap-2 items-center !w-fit px-5"
              >
                Get Started <FaArrowUp className="rotate-45" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
