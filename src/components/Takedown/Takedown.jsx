import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../AuthBody/AuthBody";
import SelectOptions from "../SelectOptions/SelectOptions";
import Button from "../Button/Button";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl, config } from "../../constants";
import InputField from "../InputField/InputField";

const Takedown = ({ setEditId, songData }) => {
  const [reason, setReason] = useState("");
  const { userData } = useContext(ProfileContext);
  // console.log(songData);
  const [platformsToDelete, setPlatformsToDelete] = useState("");

  const handleTakedown = (e) => {
    e.preventDefault();

    const formData = {};

    formData.isrc = songData.ISRC;
    formData.reason = reason;
    formData.emailId = userData.emailId;
    formData.platformsToDelete = platformsToDelete;

    // formData;
    axios
      .post(backendUrl + "takedown-requests", formData, config)
      .then(({ data }) => data.acknowledged && setEditId(""));
  };

  // useEffect(() => {} , [])

  return (
    <AuthBody
      heading="Takedown"
      // altDescription="Already Have an Account?"
      // altText="Log in"
      // altLink="/login"
      // onSubmit={edit}
      className="backdrop-blur fixed top-0 left-0 z-[9999]"
      id="edit-song"
      closeIcon={true}
      onSubmit={handleTakedown}
      handleClose={() => setEditId("")}
      whiteContainerClass="relative lg:!w-1/3 !mx-auto overflow-y-auto overflow-x-hidden"
    >
      {/* <EditSongForm updatedData={updatedData} setUpdatedData={setUpdatedData} /> */}
      {/* <SelectOptions
        options={[1, 2, 3, 4, 5, 6]}
        onChange={(e) => setReason(e.target.value)}
        label={"Reason"}
        hideRequired={true}
        note={"Enter a Reason for Taking Down your song"}
      /> */}
      <InputField
        onChange={(e) => setReason(e.target.value)}
        label={"Reason"}
        required={true}
        hideRequired={true}
        placeholder={"Reason for Taking Down your song"}
      />

      <InputField
        onChange={(e) => setPlatformsToDelete(e.target.value)}
        textarea={true}
        label={"Platforms"}
        placeholder={"Platforms to Takedown"}
        note={"Use comma (,) to separate the platforms"}
        containerClassName={"mt-2"}
        required={true}
        hideRequired={true}
        id={"platformsToDelete"}
      />

      <div className="flex justify-center mt-4">
        <Button
          // containerClassName={"border-interactive-light-destructive"}
          className={
            "bg-interactive-light-destructive hover:!bg-interactive-light-destructive-hover active:!bg-interactive-light-destructive-active focus:!bg-interactive-light-destructive-focus shadow-interactive-light-destructive"
          }
          type={"submit"}
          // onClick={() => console.log(platformsToDelete)}
        >
          Submit
        </Button>
      </div>
    </AuthBody>
  );
};

export default Takedown;
