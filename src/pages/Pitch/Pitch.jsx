import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { ProfileContext } from "../../contexts/ProfileContext";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Pitch = () => {
  const { userData, token } = useContext(ProfileContext);
  const [artwork, setArtwork] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const navigate = useNavigate();
  // console.log(artwork);

  const handleUploadArtwork = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Show SweetAlert with the file name instead of a preview
      Swal.fire({
        title: "File Selected",
        text: `You have selected: ${file.name}`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#22683E",
        customClass: {
          popup: "custom-swal-zindex-popup", // Custom class for the modal
          backdrop: "custom-swal-zindex-backdrop", // Custom class for the dark overlay
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("file", file);

          const config = {
            headers: {
              token,
            },
          };

          axios
            .post(backendUrl + "upload-art-work", formData, config)
            .then(({ data }) => {
              setArtwork(file.name);
              setArtworkUrl(data.artWorkUrl);
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });
        }
      });
    }
  };

  const handleUploadProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file) {
      // console.log("file select", setProfileData);
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;

        // Display the image in SweetAlert
        Swal.fire({
          title: "Your selected image",
          imageUrl: imageUrl,
          imageAlt: "Selected Image",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          confirmButtonColor: "#22683E",
          customClass: {
            popup: "custom-swal-zindex-popup", // Custom class for the modal
            backdrop: "custom-swal-zindex-backdrop", // Custom class for the dark overlay
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // const config = {
            //   headers: {
            //     authorization: token,
            //   },
            // };

            const formData = new FormData();
            formData.append("file", file);

            // console.log("before upload", setProfileData);
            const config = {
              headers: {
                token,
              },
            };
            axios
              .post(backendUrl + "upload-profile-picture", formData, config)
              .then(({ data }) => {
                setProfilePicture(e.target.files[0].name);
                setProfilePictureUrl(data.url);
                // console.log(data);
                // e.target.name
                // if (setProfileData) {
                //   setProfileData({ ...profileData, display_image: data.url });
                // } else {
                //   console.error("setProfileData is undefined after upload");
                // }
              });
          }
        });
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    {
      label: "User Name",
      placeholder: "Enter Your Name",
      name: "pitch_user_name",
      type: "text",
      value: userData["user-id"],
      disabled: userData["user-id"]?.length,
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Enter Your Email Address",
      name: "pitch_email",
      type: "email",
      value: userData.emailId,
      disabled: userData.emailId?.length,
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Enter Your Phone Number",
      name: "pitch_phone",
      type: "text",
      value: userData?.phone_no,
      disabled: userData?.phone_no?.length,
      required: true,
    },
    {
      label: "Release Date",
      placeholder: "Select Release Date",
      name: "pitch_release_date",
      type: "date",
      required: true,
    },
    {
      label: "UPC",
      placeholder: "Enter UPC",
      name: "pitch_upc",
      type: "text",
      required: true,
    },
    {
      label: "ISRC",
      placeholder: "ISRC",
      name: "pitch_isrc",
      type: userData.isrc?.length && "dropdown",
      options: userData.isrc?.split(","),
      required: true,
    },
    {
      label: "Singer/Artist Name",
      placeholder: "Enter Singer/Artist Name",
      name: "pitch_artist_name",
      type: "text",
      required: true,
    },
    {
      label: "PSD File of the Artwork",
      placeholder: artwork || "Upload PSD File of the Artwork",
      accept: ".psd",
      name: "pitch_artwork_psd",
      type: "file",
      onChange: handleUploadArtwork,
    },
    {
      label: "Artist Image",
      placeholder: profilePicture || "Upload Artist Image",
      name: "pitch_artist_image",
      type: "file",
      accept: "image/*",
      onChange: handleUploadProfilePicture,
    },
    {
      label: "Language",
      placeholder: "Enter Language",
      name: "pitch_language",
      type: "text",
      required: true,
    },
    {
      label: "JioSaavn Profile",
      placeholder: "Enter JioSaavn Profile Link",
      name: "pitch_jiosaavn_profile",
      type: "text",
    },
    {
      label: "Apple Profile",
      placeholder: "Enter Apple Profile Link",
      name: "pitch_apple_profile",
      type: "text",
    },
    {
      label: "Instagram Link",
      placeholder: "Enter Instagram Profile Link",
      name: "pitch_instagram_link",
      type: "text",
    },
    {
      label: "Facebook Link",
      placeholder: "Enter Facebook Profile Link",
      name: "pitch_facebook_link",
      type: "text",
    },
    {
      label: "YouTube Channel",
      placeholder: "Enter YouTube Channel Link",
      name: "pitch_youtube_channel",
      type: "text",
    },
    {
      label: "YouTube Hits",
      placeholder: "Enter YouTube Hits",
      name: "pitch_youtube_hits",
      type: "number",
    },
    {
      label: "YouTube Hit Playcount",
      placeholder: "Enter YouTube Hit Playcount",
      name: "pitch_youtube_hit_playcount",
      type: "number",
    },
    {
      label: "Artist Profile Link for Spotify",
      placeholder: "Enter Spotify Profile Link",
      name: "pitch_spotify_profile",
      type: "text",
    },
    {
      label: "Artist Bio",
      placeholder: "Enter Artist Bio",
      name: "pitch_artist_bio",
      type: "textarea",
    },
    {
      label: "Content Synopsis",
      placeholder: "Enter Content Synopsis",
      name: "pitch_content_synopsis",
      type: "textarea",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("pitch_upload_artwork", artworkUrl);
    formData.set("pitch_profile_picture", profilePictureUrl);

    // Convert FormData to a plain object for easier logging
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    formDataObject.pitch_name = `${userData.first_name} ${userData.last_name}`;
    formDataObject.emailId = userData.emailId;
    formDataObject.id = "pitch-for-editorial-playlist";
    delete formDataObject.pitch_artist_image;
    delete formDataObject.pitch_artwork_psd;

    axios.post(backendUrl + "submit-form", formDataObject).then(({ data }) => {
      if (data.insertedId.length) {
        toast.success("Form submitted successfully!");
        e.target.reset();
        navigate("/");
      } else {
        throw new Error(data.message || "Submission failed");
      }
    });
  };

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="Pitch For Editorial Playlist"
        // subheader={
        //   <>UPGRADE YOUR CREATOR CHANNEL TO YOUTUBE OFFICIAL ARTIST CHANNEL</>
        // }
      />

      <Form
        fields={fields}
        uIdKey={"youtube_user_id"}
        id="pitch-for-editorial-playlist"
        submitFromParent={handleSubmit}
        // backendUrl="http://adztronaut.com/music/admin/api/addYouTubeOac"
      />
    </div>
  );
};

export default Pitch;
