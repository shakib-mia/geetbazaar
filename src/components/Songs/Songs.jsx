import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import SongItem from "../Song/Song";
import { VscLoading } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import notFound from "./../../assets/images/not-found.png";
import { toast } from "react-toastify";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [openSongId, setOpenSongId] = useState(""); // To track which accordion is open
  const [loading, setLoading] = useState(true);
  const { userData, token } = useContext(ProfileContext);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  // const [detailedData, setDetailedData] = useState("")
  // console.log(openSongId);

  useEffect(() => {
    const fetchSongs = async () => {
      const config = {
        headers: {
          token: sessionStorage.getItem("token") || token,
        },
      };

      try {
        let response;
        if (userId) {
          response = await axios.get(
            `${backendUrl}songs/by-user-id/${userId}`,
            config
          );
        } else if (userData["user-id"]) {
          response = await axios.get(
            `${backendUrl}songs/by-user-id/${userData["user-id"]}`,
            config
          );
        }

        // console.log();
        if (response?.data) {
          setLoading(false);
          if (typeof response?.data !== "string") {
            // Ensure each song has a unique key
            const processedSongs = response.data.map((song, index) => ({
              ...song,
              uniqueKey: song._id || `song-${index}`,
            }));
            setSongs(processedSongs);
            setOpenSongId(processedSongs[0]._id);
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data, {
          position: "bottom-center",
        });
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [userId, userData["user-id"], userData, token]);

  if (!loading && songs.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col min-h-[200px] w-1/2 mx-auto">
        <img src={notFound} alt="not found" className="w-2/3" />
        <h6 className="text-heading-6-bold text-grey text-center">
          Ooopps!! There is Nothing to show yet !! Upload your content and let
          it shine ! If you’ve uploaded already , let it perform in the various
          platforms .{" "}
        </h6>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <VscLoading className="animate-spin text-black text-heading-1" />
      </div>
    );
  }

  const handleAccordionToggle = (songId) => {
    setOpenSongId(openSongId === songId ? null : songId); // Toggle accordion
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-black">
      {songs.map((song, index) => (
        <SongItem
          key={song._id}
          id={index}
          song={song}
          // isFirst={index === 0}
          openSongId={openSongId}
          setOpenSongId={setOpenSongId}
          isAccordionOpen={openSongId === song._id} // Pass the open state
          onToggleAccordion={() => handleAccordionToggle(song._id)} // Handle toggle
        />
      ))}
      {/* {songs.map((song, index) => (
        <SongItem
          key={song._id}
          song={song}
          isFirst={index === 0}
          openSongId={openSongId}
          setOpenSongId={setOpenSongId}
          isAccordionOpen={openSongId === song._id} // Pass the open state
          onToggleAccordion={() => handleAccordionToggle(song._id)} // Handle toggle
        />
      ))} */}
    </div>
  );
};

export default Songs;
