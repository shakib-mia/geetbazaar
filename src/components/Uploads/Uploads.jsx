import React, { useContext, useEffect, useState } from "react";
import SongListItem from "../SongListItem/SongListItem";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import { VscLoading } from "react-icons/vsc";
import { FaArrowUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Uploads = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { userData, token, setAlbumToggled } = useContext(ProfileContext);

  // console.log(location.pathname);

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

        const response = await axios.get(
          `${backendUrl}songs/by-user-id/${userData["user-id"]}`,
          config
        );

        console.log(response.data);

        setSongs(response.data);
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

  const renderContent = () => {
    // Show loading spinner if ISRC is found and data is being fetched
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <VscLoading className="animate-spin text-heading-1 text-interactive-light" />
        </div>
      );
    }

    // Show "No songs found" if user has ISRC but no songs
    if (userData.isrc && songs.length === 0) {
      return (
        <div className="flex justify-center items-center h-full text-black text-heading-5 py-7">
          No songs found
        </div>
      );
    }

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
                  <SongListItem songData={song} {...song} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // <ReactOwlCarousel
            //   // autoplay
            //   loop
            //   // autoplayTimeout={5000}
            //   autoplayHoverPause
            //   items={1}
            // >
            //   {songs.map((song, key) => (
            //     <SongListItem songData={song} key={key} {...song} />
            //   ))}
            // </ReactOwlCarousel>
            // <Swiper>
            // songs.map((song, key) => (
            <div className="space-y-3 p-3">
              {songs.map((song, key) => (
                <SongListItem songData={song} key={key} {...song} />
              ))}
            </div> // </SwiperSlide>
            // ))
            // </Swiper>
          )}
        </div>
      );
    }

    // Fallback for users who don't have ISRC
    return (
      <div className="flex justify-center items-center h-full text-black text-center p-3">
        <div className="">
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
      className={`text-black mt-[56px] card-shadow rounded-lg overflow-hidden bg-black ${
        location.pathname === "/all-songs" ? "pb-0" : "justify-between"
      }`}
      id="song-list"
    >
      {/* {location.pathname === "/all-songs" && (
        <h4 className="text-interactive-light text-heading-4-bold mb-4 flex gap-2 items-center">
          Streaming <CiStreamOn className="w-5 h-5" />
        </h4>
      )} */}

      {renderContent()}

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
