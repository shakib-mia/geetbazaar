import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";

const YoutubeClaimRelease = () => {
  const { userData } = useContext(ProfileContext);
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [url, setUrl] = useState("");
  // alert(songs.length);
  // console.log({ songs });

  useEffect(() => {
    if (userData["user-id"]) {
      axios
        .get(backendUrl + "songs/by-user-id/" + userData["user-id"])
        .then(({ data }) => {
          // console.log(data);
          setSongs(data.map((item) => item.Song || item.songName));
        });
    }
  }, []);

  const fields = [
    {
      label: "User Name",
      placeholder: "Name",
      type: "text",
      name: "youtube_claim_release_name",
      value: userData["user-id"],
      disabled: userData["user-id"]?.length > 0,
    },
    {
      label: "Email Address",
      placeholder: "Email",
      type: "email",
      name: "emailId",
      value: userData.user_email,
      disabled: userData.user_email?.length > 0,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "text",
      name: "youtube_claim_release_phone",
      value: userData?.phone_no,
      disabled: userData?.phone_no?.length > 0,
    },
    {
      label: "Song Name",
      placeholder: "Song Name",
      type: "dropdown",
      options: songs,
      name: "youtube_claim_release_song_name",
      required: true,
      value: songName,
      onChange: (e) => setSongName(e.target.value),
    },
    {
      label: "YT Video URl",
      placeholder: "E.g. https://www.youtube.com/Zs8LFaaLa/",
      type: "text",
      required: true,
      name: "youtube_claim_release_youTube_video_url",
      onChange: (e) => console.log(e.target.value),
      value: url,
      disabled: false,
    },
  ];

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="YouTube Claim Release"
        subheader={
          <>Received a claim on your own video? here we are for you!</>
        }
      />

      <Form id="youtube-claim-release" fields={fields} />
    </div>
  );
};

export default YoutubeClaimRelease;
