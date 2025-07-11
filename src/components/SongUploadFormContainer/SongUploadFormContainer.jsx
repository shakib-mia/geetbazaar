import React, { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import AlbumDetails from "../AlbumDetails/AlbumDetails";
// import Audio from "../Audio/Audio";
import Platform from "../Platform/Platform";
import Distribution from "../Distribution/Distribution";
import AudioUI from "../Audio/Audio";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Preview from "../Preview/Preview";
import { PlanContext } from "../../contexts/PlanContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { ProfileContext } from "../../contexts/ProfileContext";

const SongUploadFormContainer = ({ screen, setScreen }) => {
  const [artistCount, setArtistCount] = useState(1);
  const location = useLocation();
  const { token } = useContext(ProfileContext);
  const { planStore } = useContext(PlanContext);
  const [data, setData] = useState({});
  // console.log();

  const intiFormData = JSON.parse(localStorage.getItem("song-data"))?.artists
    ? JSON.parse(localStorage.getItem("song-data"))
    : location.pathname === "/song-upload"
    ? {
        artists: [
          { name: "", role: "Singer/Primary Artist" },
          { name: "", role: "Lyricist" },
          { name: "", role: "Composer" },
        ],
        selectedPlatforms: [],
        file: {},
        price: location.search.split("?")[2],
      }
    : [
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
        {
          artists: [
            { name: "", role: "Singer/Primary Artist" },
            { name: "", role: "Lyricist" },
            { name: "", role: "Composer" },
          ],
          selectedPlatforms: [],
          file: {},
        },
      ];

  // let [logicalData, setLogicalData] = useState({});

  const [formData, setFormData] = useState(intiFormData);

  useEffect(() => {
    if (location.pathname.includes("edit-song")) {
      axios
        .get(backendUrl + "songs/" + location.pathname.split("/")[2])
        .then(({ data }) => setFormData(data))
        .catch((data) => toast.error(data.response.data.message));
    }
  }, []);

  // useEffect(() => {
  //   console.log(screen);
  // }, [screen]);

  const navigate = useNavigate();
  // console.log(planStore.price.toString().length);
  if (planStore.price?.toString()?.length === 0) {
    // navigate("/plans");
    return <Navigate to={"/plans"} state={{ from: location }} replace />;
  }

  const config = {
    headers: { token },
  };

  // useEffect(() => {
  const fetchData = async () => {
    if (!location.pathname.includes("edit-song")) {
      try {
        const { data } = await axios.get(
          backendUrl + "generate-order-id",
          config
        );
        formData.orderId = data.orderId;
      } catch (error) {
        console.error("Error generating order ID:", error);
      }
    }
  };

  fetchData(); // Calling the async function
  // }, [location.pathname]);

  console.log(formData);

  return (
    <div className={`mt-5 px-2 lg:px-0 lg:py-6 lg:shadow`}>
      <ScreenContext.Provider
        value={{ screen, setScreen, setFormData, formData }}
      >
        {screen === "albumDetails" ? <AlbumDetails /> : <></>}{" "}
        {screen === "audio" ? (
          <AudioUI artistCount={artistCount} setArtistCount={setArtistCount} />
        ) : (
          <></>
        )}{" "}
        {screen === "preview" ? <Preview /> : <></>}{" "}
        {screen === "platform" ? <Platform /> : <></>}{" "}
        {(location.pathname.includes("/song-upload") ||
          location.pathname.includes("/album-upload")) &&
        screen === "distribution" ? (
          <Distribution />
        ) : (
          <></>
        )}
      </ScreenContext.Provider>
    </div>
  );
};

export default SongUploadFormContainer;
