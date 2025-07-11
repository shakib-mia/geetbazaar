import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { backendUrl } from "../../constants";
import Swal from "sweetalert2";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PromotionalTool = () => {
  const { token, userData } = useContext(ProfileContext);
  const [artwork, setArtwork] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const navigate = useNavigate();
  // const [selectedIsrc, setSelectedIsrc] = useState("");
  console.log(userData);

  // useEffect(() => {
  //   // console.log(selectedIsrc);
  //   axios
  //     .get(backendUrl + "songs/by-isrc/" + selectedIsrc)
  //     .then(({ data }) => console.log(data));
  // }, [selectedIsrc]);

  const handleUploadArtwork = (e) => {
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
              .post(backendUrl + "upload-art-work", formData, config)
              .then(({ data }) => {
                setArtwork(e.target.files[0].name);
                setArtworkUrl(data.artWorkUrl);
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
      placeholder: "Your Name",
      name: "promotional_tool_name",
      type: "text",
      value: userData["user-id"],
      disabled: userData["user-id"]?.length,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "emailId",
      type: "email",
      value: userData.emailId || userData.user_email,
      disabled: userData.emailId?.length || userData.user_email?.length,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      name: "promotional_tool_phone",
      type: "text",
      value: userData.phone_no,
      disabled: userData.phone_no?.length,
    },
    {
      label: "ISRC",
      name: "promotional_tool_isrc",
      type: userData.isrc?.length && "dropdown",
      options: userData.isrc?.split(","),
      placeholder: "Select an ISRC from here",
      required: true,
      // onChange: (e) => setSelectedIsrc(e.target.value),
    },
    {
      label: "Artist Name",
      placeholder: "Artist Name",
      name: "promotional_tool_artist_nm",
      type: "text",
      required: true,
    },
    {
      label: "Artist Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist_fb_url",
      type: "text",
      required: false,
    },
    {
      label: "Artist Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra_url",
      type: "text",
      required: false,
    },
    {
      label: "Artist Twitter URL",
      placeholder: "Artist Twitter URL",
      name: "promotional_tool_artist_twiter_url",
      type: "text",
      required: false,
    },

    {
      label: "Artist Name 2",
      placeholder: "Artist Name 2",
      name: "promotional_tool_artist_nm2",
      type: "text",
      required: false,
    },
    {
      label: "Artist 2 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist2_fb_url",
      type: "text",
      required: false,
    },
    {
      label: "Artist 2 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra2_url",
      type: "text",
      required: false,
    },
    {
      label: "Artist Name 3",
      placeholder: "Artist Name 3",
      name: "promotional_tool_artist_nm3",
      type: "text",
      required: false,
    },

    {
      label: "Artist 3 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist3_fb_url",
      type: "text",
      required: false,
    },
    {
      label: "Artist 3 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra3_url",
      type: "text",
      required: false,
    },

    {
      label: "Artist Name 4",
      placeholder: "Artist Name 4",
      name: "promotional_tool_artist_nm4",
      type: "text",
      required: false,
    },
    {
      label: "Artist 4 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist4_fb_url",
      type: "text",
      required: false,
    },

    {
      label: "Artist 4 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra4_url",
      type: "text",
      required: false,
    },

    {
      label: "Others Artist",
      placeholder: "Others Artist",
      name: "promotional_tool_other_artist",
      type: "text",
      required: false,
    },
    {
      label: "Others URL",
      placeholder: "Use comma (,) for multiple",
      name: "promotional_tool_artist_other_url",
      type: "text",
      required: true,
    },

    {
      label: "Song Name",
      placeholder: "Song Name",
      name: "promotional_tool_song_nm",
      type: "text",
      required: true,
    },
    {
      label: "Song URL",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "promotional_tool_song_url",
      type: "text",
      required: true,
    },
    {
      label: "Producer",
      placeholder: "Producer Name",
      name: "promotional_tool_producer",
      type: "text",
      required: true,
    },

    {
      label: "Upload Artwork",
      placeholder: artwork || "Upload Your Artwork File",
      name: "promotional_tool_upload_artwork",
      type: "file",
      accept: "images/*",
      required: true,
      onChange: (e) => handleUploadArtwork(e),
      // value: artwork,
    },

    {
      label: "Description",
      placeholder: "Description",
      name: "promotional_tool_artist_desc",
      type: "text",
      required: true,
    },

    {
      label: "Promotion Type",
      name: "promotional_tool_promotion_type",
      type: "multi-select",
      onChange: (e) => console.log(e.target.value),
      selectItems: [
        {
          text: "Editors Daily",
          name: "Editors Daily",
          id: "Editors Daily",
          selected: false,
        },
        {
          text: "New Release",
          name: "New Release",
          id: "New Release",
          selected: false,
        },
        // {
        //   text: "Yes I agree with the privacy policy and terms and conditions",
        //   <>
        //     Yes, I agree with the{" "}
        //     <a
        //       className="text-primary underline hover:no-underline"
        //       href="https://GeetBazaar.com/privacy-policy/"
        //     >
        //       privacy policy
        //     </a>{" "}
        //     and{" "}
        //     <a
        //       className="text-primary underline hover:no-underline"
        //       href="https://GeetBazaar.com/digital-distribution-agreement/"
        //     >
        //       terms and conditions
        //     </a>
        //     .{" "}
        //   </>
        //   ),
        //   selected: false,
        // },
      ],
      // selectedItems: [],
      required: true,
    },

    // {
    //   label: "Editors Daily",
    //   placeholder: "Editors Daily",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },

    // {
    //   label: "New Releases",
    //   placeholder: "New Releases",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },

    // {
    //   label: (
    //     <>
    //       Yes, I agree with the{" "}
    //       <a href="https://GeetBazaar.com/privacy-policy/">
    //         privacy policy
    //       </a>{" "}
    //       and{" "}
    //       <a href="https://GeetBazaar.com/digital-distribution-agreement/">
    //         terms and conditions
    //       </a>
    //       .{" "}
    //  </>
    //   ),
    //   placeholder: "",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("promotional_tool_upload_artwork", artworkUrl);

    // Convert FormData to a plain object for easier logging
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    const selectedKeys = Object.keys(formDataObject)
      .filter((key) => formDataObject[key] === "on")
      .map((item) => item.split("-")[1]);

    formDataObject.emailId = userData.emailId || userData.user_email;
    formDataObject.id = "promotional-tool";
    formDataObject.promotionTypes = Object.keys(formDataObject).filter(
      (key) => formDataObject[key] === "on"
    );
    Object.keys(formDataObject).forEach((key) => {
      if (formDataObject[key] === "on") {
        delete formDataObject[key];
      }
    });

    // console.log(formDataObject);

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
        header="GeetBazaar Promotions"
        subheader={<>Submit your song for GeetBazaar Promotions</>}
      />

      <Form
        fields={fields}
        // handleSubmit={handleSubmit}
        submitFromParent={handleSubmit}
        id="promotional-tool"
        uIdKey={"promotional_tool_user_id"}
        // backendUrl={"http://adztronaut.com/music/admin/api/addPromotionalToool"}
      />
    </div>
  );
};

export default PromotionalTool;
