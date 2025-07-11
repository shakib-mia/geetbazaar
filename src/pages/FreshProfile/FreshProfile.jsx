import React, { useContext, useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header"; // Assuming Header is your custom component
import Form from "../../components/Form/Form"; // Assuming Form is your custom component
import { ProfileContext } from "../../contexts/ProfileContext"; // Context for user data
import { useLocation, useNavigate } from "react-router-dom"; // React Router hook for location
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl } from "../../constants";
import { toast } from "react-toastify";

const FreshProfile = () => {
  const { userData, token } = useContext(ProfileContext); // Access user data from context
  const location = useLocation(); // Access current location from React Router
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  // const { profileData, userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  // console.log();
  // Initialize profileType to "fresh-profile" by default
  const [profileType, setProfileType] = useState("fresh-profile");

  const getFieldName = (suffix) =>
    location.pathname
      .split("-fresh-profile")[0]
      .split("/")[1]
      .split("-")
      .join("_") + suffix;

  const isrcArray = userData.isrc?.split(",") || [];
  const selectItems = isrcArray.map((item) => ({
    text: item.trim(),
    selected: false,
    name: `isrc-${item.trim()}`,
  }));

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

  const initialFields = useMemo(() => {
    const baseFields = [
      {
        label: "User Name",
        placeholder: "Name",
        name: getFieldName("_fresh_profile_name"),
        type: "text",
        required: true,
        value: userData["user-id"] || "",
        disabled: !!userData["user-id"]?.length,
      },
      {
        label: "Email Address",
        placeholder: "Email Address",
        name: "emailId",
        type: "email",
        required: true,
        value: userData.emailId || "",
        disabled: !!userData.emailId?.length,
      },
      {
        label: "ISRC",
        name: getFieldName("_fresh_profile_isrc"),
        type: "multi-select",
        selectItems,
        required: true,
        onChange: (e) => console.log(e.target.value),
      },
      {
        label: "Artist Name",
        placeholder: "Enter Artist Name",
        name: getFieldName("_fresh_profile_artist_name"),
        type: "text",
        required: true,
      },
    ];

    // Add conditional fields based on `profileType`
    if (profileType === "fresh-profile") {
      baseFields.push({
        label: "Album Url(s)",
        placeholder:
          "Album Url for " +
          location.pathname
            .split("-fresh-profile")[0]
            .split("/")[1]
            .split("-")
            .join(" "),
        name: getFieldName("_fresh_profile_urls"),
        type: "text",
        required: true,
      });
    } else if (profileType === "profile-relocate") {
      baseFields.push(
        {
          label: "Artist Profile URL",
          placeholder: "Artist Profile Link that needs to be tagged.",
          name: getFieldName("_fresh_profile_profile_relocate"),
          type: "text",
          required: true,
        },
        {
          label: "Album URL(s)",
          placeholder:
            "Album Url for " +
            location.pathname
              .split("-fresh-profile")[0]
              .split("/")[1]
              .split("-")
              .join(" "),
          name: getFieldName("_for_fresh_profile"),
          type: "text",
          required: true,
        }
      );
    }

    // Add conditional field for `Artist Image` if the path contains "jiosaavn" or "gaana"
    if (
      location.pathname.includes("jiosaavn") ||
      location.pathname.includes("gaana")
    ) {
      baseFields.push({
        label: "Artist Image",
        placeholder: profilePicture || "Upload Artist Image",
        name: "pitch_artist_image",
        type: "file",
        accept: "image/*",
        onChange: handleUploadProfilePicture,
      });
    }

    return baseFields;
  }, [profileType, userData, location.pathname, profilePicture]);

  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    setFields(initialFields);
  }, [initialFields]);

  const headerTitle = useMemo(() => {
    const base = location.pathname
      .split("-fresh-profile")[0]
      .split("/")[1]
      .split("-")
      .join(" ");
    return base !== "jiosaavn" ? base : "JioSaavn";
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    formDataObject.type = profileType;
    delete formDataObject.profile;
    formDataObject.id = location.pathname.split("/")[1];

    const selectedKeys = Object.keys(formDataObject)
      .filter((key) => formDataObject[key] === "on")
      .map((item) => item.split("-")[1]);

    Object.keys(formDataObject).map((item) => {
      if (item.includes("isrc-")) {
        // console.log(formData[item]);
        delete formDataObject[item];
      }
    });

    formDataObject.emailId = userData.emailId;

    // console.log(selectedKeys);
    formDataObject.isrcs = selectedKeys;
    delete formDataObject.pitch_artist_image;
    formDataObject.profilePicture = profilePictureUrl;

    console.log(formDataObject);

    const response = await axios.post(
      backendUrl + "submit-form",
      formDataObject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.data.insertedId.length) {
      toast.success("Form submitted successfully!");
      navigate("/");
      e.target.reset();
    } else {
      throw new Error(response.data.message || "Submission failed");
    }
  };

  return (
    <div className="bg-no-repeat form-bg">
      <Header header={`${headerTitle} Profile Relocate/Fresh Profile`} />
      <Form
        fields={fields}
        uIdKey={`${location.pathname.split("/")[1]}_user_id`}
        id={location.pathname.split("/")[1]}
        submitFromParent={handleSubmit}
      >
        <div className="flex gap-1 lg:gap-2 items-center text-white">
          <aside className="flex items-center gap-[4px] lg:gap-1">
            <input
              type="radio"
              id="fresh-profile"
              name="profile"
              checked={profileType === "fresh-profile"} // Match the state
              onChange={(e) =>
                e.target.checked && setProfileType("fresh-profile")
              }
            />
            <label htmlFor="fresh-profile">Fresh Profile</label>
          </aside>

          <aside className="flex items-center gap-[4px] lg:gap-1">
            <input
              type="radio"
              id="profile-relocate"
              name="profile"
              checked={profileType === "profile-relocate"} // Match the state
              onChange={(e) =>
                e.target.checked && setProfileType("profile-relocate")
              }
            />
            <label htmlFor="profile-relocate">Profile Relocate</label>
          </aside>
        </div>
      </Form>
    </div>
  );
};

export default FreshProfile;
