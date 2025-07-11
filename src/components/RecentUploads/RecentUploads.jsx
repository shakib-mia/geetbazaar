import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import RecentUploadsItem from "../RecentUploadsItem/RecentUploadsItem";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Albums from "../Albums/Albums";
import { FaArrowUp } from "react-icons/fa";

const RecentUploads = () => {
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("songs");

  const { userData, token } = useContext(ProfileContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };
    if (userData) {
      axios
        .get(backendUrl + "recent-uploads", config)
        .then(({ data }) => setSongs(data))
        .catch(() => navigate("/login"));
    }
  }, [userData.isrc, update]);

  return (
    <div className="w-full rounded-2xl p-2 !pt-0 lg:p-4 pb-0 text-white relative h-[688px] overflow-hidden recent-uploads">
      {/* Flex container to place Albums and Song list side by side */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-4 absolute w-full left-0 px-4 mt-4`}
        style={{
          top: document.getElementById("recent-upload-header")?.clientHeight
            ? document.getElementById("recent-upload-header").clientHeight +
              8 +
              "px"
            : "56px", // fallback height
          // height: activeTab === "albums" ? "80%" : "100%",
        }}
      >
        <aside>
          <h6 className="text-heading-6-bold text-center mb-4">Songs</h6>
          {/* Song List */}
          <div className="flex flex-col gap-2 overflow-y-auto">
            {songs.filter((item) => !item.songs).length > 0 ? (
              songs
                .filter((item) => !item.songs)
                .map((song, key) => (
                  <RecentUploadsItem
                    songData={song}
                    {...song}
                    key={key}
                    setUpdate={setUpdate}
                    update={update}
                  />
                ))
            ) : (
              <div className="flex justify-center items-center h-full text-grey-dark text-center">
                <div className="flex flex-col items-center gap-1">
                  <h4 className="text-heading-4-bold">
                    Upload Your First Song
                  </h4>
                  <Button
                    onClick={() => navigate("/plans")}
                    className="text-interactive-light flex gap-2 items-center px-5 !w-fit"
                  >
                    Get Started <FaArrowUp className="rotate-45" />
                  </Button>
                </div>
              </div>
            )}
            {location.pathname === "/" &&
              songs.filter((item) => !item.songs).length > 5 && (
                <div className="sticky bottom-0 w-full flex justify-center py-2 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                  <Button onClick={() => navigate("/all-songs")}>
                    View All Songs
                  </Button>
                </div>
              )}
          </div>
        </aside>

        {/* Albums */}
        <aside>
          <h6 className="text-heading-6-bold text-center mb-4">Albums</h6>
          <div className="h-full flex justify-center items-center">
            <Albums />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecentUploads;
