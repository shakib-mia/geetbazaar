import { useContext, useEffect, useState } from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import { VscLoading } from "react-icons/vsc";
import { FaArrowUp, FaMusic } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SongItem from "../Song/Song";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";

import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";
import dummyAlbumArt2 from "./../../assets/images/dummy-albums/2.webp";
import dummyAlbumArt3 from "./../../assets/images/dummy-albums/3.webp";
import dummyAlbumArt4 from "./../../assets/images/dummy-albums/4.webp";
import dummyAlbumArt5 from "./../../assets/images/dummy-albums/5.webp";
import { RiEditBoxLine } from "react-icons/ri";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FcOk } from "react-icons/fc";

// dummy album list
const dummyAlbumArts = [
  dummyAlbumArt1,
  dummyAlbumArt2,
  dummyAlbumArt3,
  dummyAlbumArt4,
  dummyAlbumArt5,
];

const Uploads = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { userData, token, setAlbumToggled } = useContext(ProfileContext);
  const [expandedAlbum, setExpandedAlbum] = useState("");

  const toggleDropdown = (albumId) => {
    if (expandedAlbum !== albumId) {
      setExpandedAlbum(albumId);
    } else {
      setExpandedAlbum("");
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      // If there's no ISRC, set loading false and return
      if (!userData?.isrc) {
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            token: sessionStorage.getItem("token") || token,
          },
        };

        const response = await axios.get(`${backendUrl}recent-uploads`, config);

        console.log(response.data);

        setSongs(response.data.streamingSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [userData?.isrc, userData?.["user-id"], token]);

  const handleEdit = (albumId) => navigate("/edit-album/" + albumId);

  const handlePayNow = (albumId) => {
    const foundAlbum = songs
      .filter((item) => item.songs)
      .find((album) => album.orderId === albumId);
    navigate(`/payment?price=${foundAlbum.price}?id=${foundAlbum.orderId}`);
  };

  const renderContent = (type) => {
    // Show loading spinner if ISRC is found and data is being fetched
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full py-7 card-shadow rounded-lg">
          <VscLoading className="animate-spin text-heading-1 text-interactive-light" />
        </div>
      );
    }

    // Show "No songs found" if user has ISRC but no songs
    // if (userData.isrc && songs.length === 0) {
    //   return (
    //     <div className="flex justify-center items-center h-full text-black text-heading-5 py-7 card-shadow rounded-lg">
    //       No songs found
    //     </div>
    //   );
    // }

    // Show songs if they exist
    if (userData.isrc && songs.length > 0) {
      return (
        <div className="h-full overflow-y-auto">
          {location.pathname === "/" ? (
            <Swiper className="h-full">
              {songs.map((song, key) => (
                <SwiperSlide
                  key={key}
                  slidesPerView={1}
                  modules={[Autoplay]}
                  autoplay
                >
                  <SongListItem index={key} songData={song} {...song} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : type === "albums" ? (
            // console.log(songs)
            // console.log(songs.filter((item) => item.songs))

            songs
              .filter((item) => item.songs)
              .map((album, key) => (
                <div
                  key={key}
                  className={`bg-white/60 backdrop-blur-xl rounded border border-surface-white-line hover:shadow transition`}
                >
                  {/* Header */}
                  <div
                    className="flex flex-col lg:flex-row gap-4 items-center justify-between cursor-pointer"
                    onClick={() => toggleDropdown(album._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-md">
                        <img
                          src={dummyAlbumArts[key % dummyAlbumArts.length]}
                          alt={album.albumTitle}
                          className="w-7 h-7 object-cover rounded"
                        />
                      </div>
                      <div>
                        <h5 className="text-heading-5-bold text-black-primary">
                          {album.albumTitle}
                        </h5>
                        <p className="text-subtitle-2 flex gap-2 items-center mt-1">
                          <strong>Status:</strong>{" "}
                          {album.songs.some(
                            (song) => song.status !== "streaming"
                          ) ? (
                            <span className="bg-warning/15 text-warning px-2 py-0.5 rounded-full flex items-center gap-1">
                              <TbAlertTriangleFilled /> Needs Attention
                            </span>
                          ) : (
                            <span className="bg-success/15 text-success px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FcOk /> OK
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
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

                  {/* Dropdown Songs */}
                  {expandedAlbum === album._id && (
                    <div className="p-4 bg-white/30 border-surface-white-line rounded-b-2xl flex flex-col gap-3">
                      {album.songs.map((song, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-surface-white-line hover:shadow-lg transition-all duration-200"
                        >
                          <p className="text-subtitle-1 text-interactive-light-disabled">
                            <strong>Song Name:</strong> {song.songName} (
                            {song.status})
                          </p>
                          <p className="text-subtitle-2 text-black-primary">
                            <strong>Artists:</strong>{" "}
                            {song.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="p-3 grid grid-cols-2 gap-3">
              {songs
                .filter((item) => !item.songs)
                .map((song, key) => (
                  <SongItem id={key} song={song} key={key} {...song} />
                ))}
            </div>
          )}
        </div>
      );
    }

    // Fallback for users who don't have ISRC
    return (
      <div className="flex justify-center items-center h-full text-black text-center p-3 card-shadow rounded-lg">
        <div className="mt-6">
          <h5 className=" text-heading-5-bold">Upload Your First Song</h5>{" "}
          {/* <br /> */}
          <div className="w-1/2 mx-auto">
            <Button
              // small={true}
              onClick={() => {
                navigate("/plans");
                setAlbumToggled(false);
              }}
              className="text-interactive-light flex gap-2 items-center"
            >
              Get Started <FaArrowUp className="rotate-45" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`text-black ${
        location.pathname === "/all-songs" ? "pb-2" : "justify-between"
      }`}
      id="song-list"
    >
      {/* {location.pathname === "/all-songs" && (
        <h4 className="text-interactive-light text-heading-4-bold mb-4 flex gap-2 items-center">
          Streaming <CiStreamOn className="w-5 h-5" />
        </h4>
      )} */}

      {location.pathname === "/" ? (
        renderContent()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <aside className="card-shadow rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 p-2 justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <FaMusic className="w-2 h-2 text-white" />
              </div>
              <h2 className="text-heading-5-bold text-black-primary">
                Your Tracks
              </h2>
              <span className="px-2 py-1 bg-primary/15 text-primary text-subtitle-2-bold rounded-full">
                {songs.filter((item) => !item.songs).length || 0}
              </span>
            </div>
            {renderContent()}
          </aside>

          <aside className="p-2 card-shadow rounded-lg overflow-hidden">
            <div className="flex gap-3 items-center justify-center p-3">
              <div className="w-5 h-5 bg-gradient-to-br from-secondary to-secondary-dark rounded-lg flex items-center justify-center">
                <FaMusic className="w-2 h-2 text-white" />
              </div>
              <h2 className="text-heading-5-bold text-black-primary">Albums</h2>
              <span className="px-2 py-1 bg-primary/15 text-primary text-subtitle-2-bold rounded-full">
                {songs.filter((item) => item.songs).length || 0}
              </span>
            </div>

            {renderContent("albums")}
          </aside>
        </div>
      )}

      {/* {location.pathname === "/" && (
        <div className="flex items-end justify-between">
          <h5 className="text-heading-6-bold lg:text-heading-4-bold text-black">
            Your Uploads
          </h5>
          <Button className={"!w-1/3"} onClick={() => navigate("/revenue")}>
            Visit Dashboard
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default Uploads;
