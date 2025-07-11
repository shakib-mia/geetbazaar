import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import { FaApple, FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa";
import SelectOptions from "../SelectOptions/SelectOptions";
import Button from "../Button/Button";
import { TbLinkMinus, TbLinkPlus } from "react-icons/tb";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";

const ArtistProfile = ({
  id,
  // handleArtistNameChange,
  // handleArtistRoleChange,
  handleRemoveArtist,
  artist,
  formId,
}) => {
  const { setScreen, setFormData, formData } = useContext(ScreenContext);
  const [showPlats, setShowPlats] = useState(false);
  const location = useLocation();
  console.log(formData);

  // const handlePlatformUrl = (e, profile) => {
  //   console.log(
  //        location.pathname === "/album-upload" ||
  // location.search.split("?")[1] === "yearly-plan" ||
  // location?.pathname.includes("edit-album")
  //       ? formData.songs[formId]
  //       : formData.artists[id]
  //   );
  //   // console.log(   location.pathname === "/album-upload" ||
  // location.search.split("?")[1] === "yearly-plan" ||
  // location?.pathname.includes("edit-album") ? formData.songs[formId] : formData.artists[id]);
  //   const artistData =
  //        location.pathname === "/album-upload" ||
  // location.search.split("?")[1] === "yearly-plan" ||
  // location?.pathname.includes("edit-album")
  //       ? formData.songs[formId]
  //       : formData.artists[id];
  //   artistData[profile] = e.target.value;
  //   setFormData(formData);
  //   // console.log(   location.pathname === "/album-upload" ||
  // location.search.split("?")[1] === "yearly-plan" ||
  // location?.pathname.includes("edit-album") ? formData.songs[formId] : formData.artists);
  // };

  // console.log(artist);
  // console.log(formData.find);
  // console.log(formData);
  // const found = formData?.find((item) =>
  //   item.artists.find((ar) => ar.name === artist.name)
  // );
  let found;
  // console.log(formData);
  if (
    (formData && location.pathname === "/album-upload") ||
    location.search.split("?")[1] === "yearly-plan" ||
    location?.pathname.includes("edit-album")
  ) {
    // console.log(formData);
    found = formData?.songs?.find((item) =>
      item?.artists?.find((ar) => ar.name === artist.name)
    );
  }

  // console.log(formData);

  const handleArtistNameChange = (index, value) => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      formData.songs[formId].artists[index].name = value;
      setFormData({ ...formData });
    } else {
      formData.artists[index].name = value;
      setFormData({ ...formData });
    }
  };
  const handleArtistRoleChange = (index, value) => {
    if (
      location.pathname === "/album-upload" ||
      location.search.split("?")[1] === "yearly-plan" ||
      location?.pathname.includes("edit-album")
    ) {
      formData.songs[formId].artists[index].role = value;
      setFormData({ ...formData });
    } else {
      formData.artists[index].role = value;
      setFormData({ ...formData });
    }
  };

  return (
    <div
      // id={id}
      className={`flex flex-col lg:flex-row gap-2 relative items-start ${
        id === 0 ? "" : "mt-4"
      }`}
    >
      <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-2 relative">
        <InputField
          label={"Artist Name"}
          placeholder={"Artist Name"}
          containerClassName={"w-full"}
          required={true}
          value={
            location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location?.pathname.includes("edit-album")
              ? formData.songs[formId]?.artists[id]?.name
              : formData.artists[id].name
          }
          onChange={(e) => {
            handleArtistNameChange(id, e.target.value);
          }}
        />
        <SelectOptions
          containerClassName={"w-full"}
          placeholder={"Select..."}
          options={[
            "Singer/Primary Artist",
            "Ft Artist",
            "Composer",
            "Lyricist",
            "Producer",
            "Star Cast",
          ]}
          value={
            location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location?.pathname.includes("edit-album")
              ? formData.songs[formId]?.artists[id]?.role
              : formData.artists[id].role
          }
          onChange={(e) => handleArtistRoleChange(id, e.target.value)}
          required={true}
          label={"Select Role"}
        />

        {id >= 3 && (
          <button
            className={
              "text-interactive-light-destructive text-heading-5-bold absolute -left-4 top-0 bottom-0"
            }
            // className="absolute bottom-2 -left-2 z-[99999999]"
            type="button"
            onClick={() => {
              if (
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
              ) {
                // Update songs immutably
                const updatedSongs = [...formData.songs];
                updatedSongs[formId].artists = updatedSongs[
                  formId
                ].artists.filter((_, artistIdx) => artistIdx !== id);
                setFormData({ ...formData, songs: updatedSongs });
              } else {
                // Update general artists immutably
                const updatedArtists = formData.artists.filter(
                  (_, artistIdx) => artistIdx !== id
                );
                setFormData({ ...formData, artists: updatedArtists });
              }
            }}
          >
            &times;
          </button>
        )}
      </div>

      <Button
        type={"button"}
        onClick={() => setShowPlats(!showPlats)}
        disabled={
          location.pathname === "/album-upload" ||
          location.search.split("?")[1] === "yearly-plan" ||
          location?.pathname.includes("edit-album")
            ? !formData.songs[formId]?.artists[id]?.name?.length
            : !formData.artists[id]?.name?.length
        }
        // onBlur={() => setShowPlats(false)}
        containerClassName={"w-full lg:w-1/3 h-fit"}
        className={"flex gap-1 items-center justify-center !mt-3 !w-1/3"}
        title="Add Artist Profile"
      >
        {showPlats ? (
          <TbLinkMinus className="font-semibold text-heading-6-bold" />
        ) : (
          <TbLinkPlus className="font-semibold text-heading-6-bold" />
        )}
        Add Artist's Profile
      </Button>

      {showPlats && (
        <Modal
          whiteContainerClass={"!w-1/3"}
          handleClose={() => setShowPlats(false)}
        >
          <h5 className="text-heading-5-bold text-center text-white">
            {location.pathname === "/album-upload" ||
            location.search.split("?")[1] === "yearly-plan" ||
            location?.pathname.includes("edit-album") ? (
              <>
                {formData.songs[formId]?.artists[id]?.name} -
                {formData.songs[formId]?.artists[id]?.role}
              </>
            ) : (
              <>
                {formData.artists[id]?.name} - {formData.artists[id]?.role}
              </>
            )}
          </h5>
          <div className="gap-x-2 mt-2 w-full p-0 rounded right-0 grid grid-cols-1 lg:grid-cols-2">
            {/* <aside className="h-[42px] rounded aspect-square flex items-center">
                <FaSpotify className="text-heading-5 text-[#1db954]" />
              </aside> */}
            <InputField
              label="Spotify Artist Profile URL"
              containerClassName={"w-full"}
              onChange={(e) => {
                // console.log(found.artists[id]);
                // if (found) {
                //   found.artists[id].spotifyUrl = e.target.value;
                //   setFormData({ ...found });
                //   console.log(found);
                // }

                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? (formData.songs[formId].artists[id].spotifyUrl =
                      e.target.value)
                  : (formData.artists[id].spotifyUrl = e.target.value);

                // console.log(formData);
              }}
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? found?.artists[id].spotifyUrl
                  : formData.artists[id].spotifyUrl
              }
            />
            {/* <aside className="h-[42px] rounded aspect-square flex items-center">
                <FaApple className="text-heading-5" />
              </aside> */}
            <InputField
              containerClassName={"w-full"}
              label={"Apple Artist Profile URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(   location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album");
                //     ? formData.songs[formId]
                //     : formData.artists),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   appleArtist: e.target.value,
                // };
                // setFormData({ ...formData, artists });
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? (formData.songs[formId].artists[id].appleArtist =
                      e.target.value)
                  : (formData.artists[id].appleArtist = e.target.value);
              }}
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? formData.songs[formId]?.artists[id]?.appleArtist
                  : formData.artists[id].appleArtist
              }
            />
            {/* <aside className="h-[42px] rounded aspect-square flex items-center">
                <FaFacebook className="text-heading-5 text-[#0081fb]" />
              </aside> */}
            <InputField
              containerClassName={"w-full"}
              label={"Facebook Artist Page URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(   location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album");
                //     ? formData.songs[formId].artists
                //     : formData.artists),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   facebookUrl: e.target.value,
                // };
                // setFormData({ ...formData, artists });
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? (formData.songs[formId].artists[id].facebookUrl =
                      e.target.value)
                  : (formData.artists[id].facebookUrl = e.target.value);
              }}
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? formData.songs[formId].artists[id].facebookUrl
                  : formData.artists[id].facebookUrl
              }
            />
            <InputField
              containerClassName={"w-full"}
              label={"Instagram Artist Profile URL"}
              onChange={(e) => {
                // const artists = [
                //   ...(   location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                  location?.pathname.includes("edit-album");
                //     ? formData.songs[formId].artists[id].instagramUrl
                //     : formData.artists[id].instagramUrl),
                // ];
                // artists[id] = {
                //   ...artists[id],
                //   instagramUrl: e.target.value,
                // };
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? (formData.songs[formId].artists[id].instagramUrl =
                      e.target.value)
                  : (formData.artists[id].instagramUrl = e.target.value);
                // console.log(formData.songs[formId].artists[id]);
                // setFormData({ ...formData, artists });
              }}
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location?.pathname.includes("edit-album")
                  ? formData.songs[formId].artists[id].instagramUrl
                  : formData.artists[id].instagramUrl
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ArtistProfile;
