import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";
// import axios from "axios";

const YoutubeOac = () => {
  const { userData } = useContext(ProfileContext);

  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      name: "youtube_oac_name",
      type: "text",
      required: true,
      value: userData["user-id"],
      disabled: userData["user-id"]?.length,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "emailId",
      type: "email",
      required: true,
      value: userData.emailId,
      disabled: userData.emailId?.length,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      name: "youtube_oac_phone",
      type: "text",
      required: true,
      value: userData?.phone_no,
      disabled: userData?.phone_no?.length,
      // pattern: /^((\+91)?|91|91\s|\+91\s)?[789][0-9]{9}/g,
    },
    {
      label: "Artist/Channel Name",
      placeholder: "Artist/Channel Name",
      name: "youtube_oac_channnel_name",
      type: "text",
      required: true,
    },
    {
      label: "Artist YT Channel",
      placeholder:
        "E.g. https://www.youtube.com/channel/UCSEjFhl6mzoVnJdMGwO5KZA",
      name: "youtube_oac_yt_channel",
      type: "text",
      required: true,
    },
    {
      label: "Artist Topic Channel",
      placeholder:
        "E.g. https://www.youtube.com/channel/UCSEjFhl6mzoVnJdMGwO5KZA",
      name: "youtube_oac_topic_channel",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Youtube OAC"
        subheader={
          <>UPGRADE YOUR CREATOR CHANNEL TO YOUTUBE OFFICIAL ARTIST CHANNEL</>
        }
      />

      <Form
        fields={fields}
        uIdKey={"youtube_user_id"}
        id="youtube-oac"
        // backendUrl="http://adztronaut.com/music/admin/api/addYouTubeOac"
      />
    </div>
  );
};

export default YoutubeOac;
