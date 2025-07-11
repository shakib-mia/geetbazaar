import React, { useContext, useEffect, useState } from "react";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import { ScreenContext } from "../../contexts/ScreenContext";
import AudioUI from "../../components/Audio/Audio";
import Platform from "../../components/Platform/Platform";
import Distribution from "../../components/Distribution/Distribution";
import { useLocation } from "react-router-dom";
import SongUploadProgress from "../../components/SongUploadProgress/SongUploadProgress";
import AlbumAudio from "../../components/AlbumAudio/AlbumAudio";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Preview from "../../components/Preview/Preview";
import { PlanContext } from "../../contexts/PlanContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";

const AlbumUpload = () => {
  const [initFormData, setInitFormData] = useState([
    {
      songName: "",
      isrc: "",
      artists: [
        { name: "", role: "Singer/Primary Artist" },
        { name: "", role: "Lyricist" },
        { name: "", role: "Composer" },
      ],
      selectedPlatforms: [],
      file: {},
      startMinutes: 0,
      startMinutes2: 0,
      startSeconds: 0,
      startSeconds2: 0,
      parentalAdvisory: false,
      instrumental: false,
      language: "",
    },
  ]);

  const location = useLocation();
  const [previousFormData, setPreviousFormData] = useState({});
  const [formData, setFormData] = useState(
    location.pathname.split("/")[1] === "edit-album"
      ? previousFormData // Placeholder for async update
      : { songs: initFormData }
  );
  const [screen, setScreen] = useState("albumDetails");
  const [artistCount, setArtistCount] = useState(0);
  const [modal, showModal] = useState(false);
  const { userData, token } = useContext(ProfileContext);

  console.log("Form Data:", formData);

  // Fetch previous album data if in edit mode
  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit-album") {
      axios
        .get(
          backendUrl +
            "recent-uploads/album/" +
            location.pathname.split("/")[2],
          {
            headers: { token },
          }
        )
        .then(({ data }) => setPreviousFormData(data))
        .catch((err) => console.error("Error fetching album data:", err));
    }
  }, [location.pathname, token]);

  // Update formData reactively when previousFormData or initFormData changes
  useEffect(() => {
    if (location.pathname.split("/")[1] === "edit-album" && previousFormData) {
      setFormData(previousFormData);
    } else if (formData === null) {
      // Only update if formData hasn't been initialized yet
      setFormData({ songs: initFormData });
    }
  }, [previousFormData, initFormData, location.pathname, formData]);

  const config = {
    headers: { token },
  };

  useEffect(() => {
    if (!location.pathname.includes("edit-song")) {
      axios
        .get(backendUrl + "generate-order-id", config)
        .then(({ data }) => (formData.orderId = data.orderId));
    }
  }, []);

  console.log(formData);

  return (
    <div className="ml-auto pt-5 h-full pb-7">
      <SongUploadProgress screen={screen} setScreen={setScreen} />
      <div className={`mt-2 px-2 lg:mt-5 lg:px-5 lg:py-6 shadow`}>
        <h4 className="text-heading-4-bold text-grey capitalize mb-4">
          Plan : {/* {} */}
          {userData.yearlyPlanEndDate
            ? "Yearly Plan"
            : location.search.split("?")[1]?.includes("-")
            ? location.search.split("?")[1]?.split("-")?.join(" ")
            : location.search.split("?")[1]}
        </h4>

        {modal && (
          <Modal>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            culpa enim eligendi veritatis ipsam quas quis quaerat ipsa
            voluptates. Saepe corporis reprehenderit soluta magnam temporibus!
            Iste unde exercitationem quaerat ipsa?
          </Modal>
        )}
        <ScreenContext.Provider
          value={{ screen, setScreen, setFormData, formData }}
        >
          {screen === "albumDetails" ? <AlbumDetails /> : <></>}{" "}
          {screen === "audio" ? (
            <AlbumAudio
              artistCount={artistCount}
              setArtistCount={setArtistCount}
              setScreen={setScreen}
              setInitFormData={setInitFormData}
              initFormData={initFormData}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <></>
          )}
          {screen === "preview" ? <Preview /> : <></>}
          {screen === "platform" ? <Platform /> : <></>}{" "}
          {screen === "distribution" ? <Distribution /> : <></>}
        </ScreenContext.Provider>
      </div>
    </div>
  );
};

export default AlbumUpload;
