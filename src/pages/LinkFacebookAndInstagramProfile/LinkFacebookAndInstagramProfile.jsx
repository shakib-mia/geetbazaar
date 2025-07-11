import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";

const LinkFacebookAndInstagramProfile = () => {
  const { token, userData } = useContext(ProfileContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log(!userData?.isrc);
      // If there's no ISRC, set loading false and return
      if (!userData?.isrc) {
        // setIsLoading(false);
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

        setSongs(
          response.data.map((item) => {
            return { songName: item.Song || item.songName, ISRC: item.ISRC };
          })
        );

        // setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        // setSongs([]);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchSongs();
  }, [userData?.isrc, userData?.["user-id"], token]);

  const fields = [
    // {
    //   label: "Song Name",
    //   placeholder: "Song Name",
    //   name: "link_facebook_insta_song_name",
    //   type: "text",
    //   required: true,
    // },
    {
      label: "ISRC",
      placeholder: "ISRC",
      name: "link_facebook_insta_song_isrc",
      type: userData.isrc?.length && "dropdown",
      options: userData.isrc?.split(","),
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "emailId",
      type: "email",
      value: userData.emailId,
      disabled: userData.emailId?.length,
    },
    {
      label: "FB Artist Page URL",
      placeholder: "FB Artist Page URL",
      name: "link_facebook_insta_song_url",
      type: "text",
      required: true,
    },
    {
      label: "Instagram Handle",
      placeholder: "Enter Your Instagram Handle Here",
      name: "link_facebook_insta_song_insta",
      type: "text",
      required: true,
    },
  ];
  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header={
          <>
            Link Facebook and Instagram <br /> Profile with Songs
          </>
        }
        subheader={
          <>
            We offer this feature to everyone <br /> who distributes music from
            us.
          </>
        }
      />

      <Form
        fields={fields}
        uIdKey="link_user_id"
        id="fb-insta-profile"
        // backendUrl="http://adztronaut.com/music/admin/api/addFacebookInstaSong"
      />
    </div>
  );
};

export default LinkFacebookAndInstagramProfile;
