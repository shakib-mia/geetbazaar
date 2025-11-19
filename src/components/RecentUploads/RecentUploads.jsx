import React, { useContext, useEffect, useState } from "react";
import { FaMusic, FaPlay, FaPause, FaArrowUp } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl, getStatusStyle } from "../../constants";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import Albums from "../Albums/Albums";

import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";
import dummyAlbumArt2 from "./../../assets/images/dummy-albums/2.webp";
import dummyAlbumArt3 from "./../../assets/images/dummy-albums/3.webp";
import dummyAlbumArt4 from "./../../assets/images/dummy-albums/4.webp";
import dummyAlbumArt5 from "./../../assets/images/dummy-albums/5.webp";
// import dummyAlbumArt1 from "./../../assets/images/dummy-albums/1.webp";

// dummy album list
const dummyAlbumArts = [
  dummyAlbumArt1,
  dummyAlbumArt2,
  dummyAlbumArt3,
  dummyAlbumArt4,
  dummyAlbumArt5,
];

const RecentUploads = () => {
  const { userData, token } = useContext(ProfileContext);
  const navigate = useNavigate();
  // const location = useLocation();
  const [songs, setSongs] = useState([]);
  const [update, setUpdate] = useState(false);
  const [albumsCount, setAlbumsCount] = useState(0);

  // const [activeView, setActiveView] = useState("grid");
  // const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    if (userData) {
      const config = {
        headers: { token: sessionStorage.getItem("token") || token },
      };
      axios
        .get(backendUrl + "recent-uploads", config)
        .then(({ data }) => {
          console.log(data);
          setSongs(data.notStreamingSongs);
        })
        .catch(() => navigate("/login"));
    }
  }, [userData, update, navigate, token]);

  const filteredSongs = songs?.filter((item) => !item?.songs) || [];

  return (
    <div className="w-full bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-3xl overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-surface-white-line z-10">
        <div className="p-2 lg:p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-subtitle-1-bold text-black-primary">
                Live Dashboard
              </span>
            </div>
          </div>
          <div className="text-paragraph-2 text-black-secondary">
            {filteredSongs.length} tracks | {albumsCount} Albums • Updated now
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[100px] h-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 h-full p-4 pt-2">
          {/* Songs Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-surface-white-line shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-2 lg:px-4 py-2 border-b border-surface-white-line flex justify-between items-center">
              <div className="flex items-center gap-3 justify-between lg:justify-normal w-full lg:w-fit">
                <div className="w-5 h-5 bg-gradient-to-br from-secondary to-secondary-dark rounded-lg flex items-center justify-center">
                  <FaMusic className="w-2 h-2 text-white" />
                </div>
                <h2 className="text-heading-5-bold text-black-primary">
                  Your Tracks
                </h2>
                <span className="px-2 py-1 bg-primary/15 text-primary text-subtitle-2-bold rounded-full">
                  {filteredSongs.length}
                </span>
              </div>
              {filteredSongs.length > 0 && (
                <aside className="hidden lg:block">
                  <Button
                    onClick={() => navigate("/plans")}
                    className="!mt-0 px-5"
                  >
                    + Add New Track
                  </Button>
                </aside>
              )}
            </div>

            {/* Songs Grid/List */}
            <div className="p-4 h-[calc(100%-80px)]">
              {filteredSongs.length > 0 ? (
                /* List View */
                <div className="space-y-2 h-full overflow-y-auto custom-scrollbar pr-2">
                  {filteredSongs.map((song, key) => (
                    <div
                      key={key}
                      className="group flex items-center gap-4 bg-gradient-to-r from-white/80 to-surface-white-surface-1/50 rounded-2xl border border-surface-white-line hover:border-interactive-light/50 hover:shadow-base transition-all duration-300"
                    >
                      <div className="overflow-hidden bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg flex items-center justify-center w-7 aspect-square">
                        {/* <FaMusic className="w-2 h-2 text-primary/80" /> */}
                        <img
                          src={dummyAlbumArts[key % dummyAlbumArts.length]}
                          className="w-7 aspect-square"
                          alt=""
                        />
                      </div>

                      <aside className="w-full flex justify-between">
                        <div className="min-w-0">
                          <h4 className="text-subtitle-1-bold text-black-primary capitalize truncate">
                            {song.songName}
                          </h4>
                          <p className="text-paragraph-2 text-black-secondary">
                            Track #{key + 1}
                          </p>
                        </div>

                        <div className="flex justify-between pr-2 items-center gap-1">
                          <span
                            className={`px-2 py-1 h-fit rounded-full text-button text-xs uppercase tracking-wider flex-shrink-0 opacity-0 group-hover:opacity-100 ${getStatusStyle(
                              song.status
                            )}`}
                          >
                            {song.status}
                          </span>
                          <Tooltip id={`status${key}`} />

                          {/* Play/Edit */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                            <button
                              data-tooltip-id={`edit${key}`}
                              data-tooltip-content="Edit Track"
                              onClick={() => navigate(`/edit-song/${song._id}`)}
                            >
                              <RiEditBoxLine className="w-4 h-4 text-black-secondary hover:text-interactive-light transition-colors duration-200" />
                            </button>
                            <Tooltip id={`edit${key}`} />
                          </div>
                        </div>
                      </aside>
                    </div>
                  ))}
                </div>
              ) : (
                // Empty State
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="relative mb-6 w-7 h-7 mx-auto">
                      {/* Main Icon */}
                      <div className="w-7 h-7 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center z-10">
                        <FaMusic className="w-5 h-5 text-primary/60" />
                      </div>

                      {/* Pulsing Circle */}
                      <div className="absolute inset-0 m-auto w-7 h-7 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full animate-ping z-0"></div>
                    </div>

                    <h3 className="text-heading-4-bold text-black-primary mb-2">
                      Ready to Share Your Music?
                    </h3>
                    <p className="text-paragraph-1 text-black-secondary mb-6 leading-relaxed">
                      Upload your first track and start building your music
                      library. Your journey begins here.
                    </p>

                    <div className="space-y-3">
                      <Button
                        onClick={() => navigate("/plans")}
                        className="bg-gradient-to-r from-interactive-light to-primary-dark text-white px-6 py-3 rounded-2xl text-button uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
                      >
                        Get Started
                        <FaArrowUp className="rotate-45 w-3 h-3" />
                      </Button>

                      <p className="text-subtitle-2 text-black-tertiary">
                        Join thousands of artists already on the platform
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Albums Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-surface-white-line shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 px-4 py-2 border-b border-surface-white-line flex items-center justify-between w-full">
              <div className="flex gap-3 items-center justify-between w-full lg:w-fit">
                <div className="w-5 h-5 bg-gradient-to-br from-secondary to-secondary-dark rounded-lg flex items-center justify-center">
                  <FaMusic className="w-2 h-2 text-white" />
                </div>
                <h2 className="text-heading-5-bold text-black-primary">
                  Albums
                </h2>
                <span className="px-2 py-1 bg-primary/15 text-primary text-subtitle-2-bold rounded-full">
                  {albumsCount || 0}
                </span>
              </div>

              <aside className="hidden lg:block">
                <Button
                  className="!mt-0 px-5"
                  onClick={() =>
                    navigate("/album-upload?geetbazaar-album?99900")
                  }
                >
                  + Add New Album
                </Button>
              </aside>
            </div>

            <div className="p-4 h-[calc(100%-80px)] lg:h-auto overflow-y-auto">
              <div className="h-full bg-gradient-to-br from-white/20 to-surface-white-surface-1/20 rounded-2xl flex justify-center">
                <Albums
                  setAlbumsCount={setAlbumsCount}
                  setUpdate={setUpdate}
                  update={update}
                  recentUploads={true}
                />
              </div>
              <div className="lg:hidden">
                <Button
                  className="!mt-0 px-5"
                  onClick={() =>
                    navigate("/album-upload?geetbazaar-album?99900")
                  }
                >
                  + Add New Album
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(225, 230, 239, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #064088, #002859);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2b52dd, #064088);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentUploads;
