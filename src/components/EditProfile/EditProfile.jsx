import React, { useContext, useEffect, useState } from "react";
import AuthBody from "../../components/AuthBody/AuthBody";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import check from "./../../assets/icons/checkbox.webp";
import { ProfileContext } from "../../contexts/ProfileContext";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import cover from "./../../assets/images/artist-cover.webp";
import axios from "axios";
import { backendUrl } from "../../constants";
import { TbCameraUp } from "react-icons/tb";
import Swal from "sweetalert2";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const EditProfile = ({ handleClose }) => {
  const { userData, token, setUpdated, updated } = useContext(ProfileContext);
  const [formData, setFormData] = useState(userData);
  const [originalData] = useState(userData); // Store the initial user data for comparison
  const [isChanged, setIsChanged] = useState(false); // Track if form data has changed
  const [available, setAvailable] = useState(true);
  const [hideNote, setHideNote] = useState(false);
  const [userIds, setUserIds] = useState([]);
  // const [profileData, setProfileData] = useState(formData);

  useEffect(() => {
    axios
      .get(backendUrl + "generate-user-id")
      .then(({ data }) => setUserIds(data));
  }, []);

  const handleUserIdChange = (e) => {
    const updatedFormData = { ...formData, "user-id": e.target.value };
    setFormData(updatedFormData);
    checkForChanges(updatedFormData);

    if (e.target.value === userData["user-id"]) {
      setHideNote(true);
    } else {
      setHideNote(false);
      setAvailable(!userIds.includes(e.target.value));
    }
  };

  useEffect(() => {
    checkForChanges(formData);
    // console.log(formData);
  }, [formData]);

  const handleFieldChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    checkForChanges(updatedFormData);
  };

  const checkForChanges = (updatedFormData) => {
    const isDataChanged = Object.keys(updatedFormData).some(
      (key) => updatedFormData[key] !== originalData[key]
    );
    setIsChanged(isDataChanged);
  };

  const fields = [
    {
      id: "firstName",
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "First Name",
      required: true,
      value: formData.first_name,
      onChange: (e) => handleFieldChange("first_name", e.target.value),
    },
    {
      id: "lastName",
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Last Name",
      required: true,
      value: formData.last_name,
      onChange: (e) => handleFieldChange("last_name", e.target.value),
    },
    // {
    //   id: "userId",
    //   name: "user-id",
    //   label: "User ID",
    //   type: "text",
    //   placeholder: "abc123",
    //   required: false,
    //   disabled: true,
    //   value: formData["user-id"],
    //   onChange: handleUserIdChange,
    //   note: hideNote || (available ? "Available" : "Already in Use"),
    //   dangerNote: !available,
    //   successNote: available,
    // },
    {
      id: "recordLabel",
      name: "company_label",
      label: "Company/Record label",
      type: "text",
      placeholder: "Example: GeetBazaar",
      required: false,
      value: formData.company_label,
      onChange: (e) => handleFieldChange("company_label", e.target.value),
    },
    // {
    //   id: "address",
    //   name: "billing_address",
    //   label: "Address",
    //   type: "text",
    //   placeholder: "Enter Here",
    //   required: true,
    //   value: formData.billing_address,
    //   onChange: (e) => handleFieldChange("billing_address", e.target.value),
    // },
    // {
    //   id: "city",
    //   name: "billing_city",
    //   label: "City",
    //   type: "text",
    //   placeholder: "City Name",
    //   required: true,
    //   value: formData.billing_city,
    //   onChange: (e) => handleFieldChange("billing_city", e.target.value),
    // },
    // {
    //   id: "country",
    //   name: "billing_country",
    //   label: "Country",
    //   type: "text",
    //   placeholder: "India",
    //   required: true,
    //   value: formData.billing_country,
    //   onChange: (e) => handleFieldChange("billing_country", e.target.value),
    // },
    {
      id: "postalCode",
      name: "postal_code",
      label: "Postal Code",
      type: "number",
      placeholder: "700001",
      required: true,
      value: formData.postal_code,
      onChange: (e) => handleFieldChange("postal_code", e.target.value),
    },
    {
      id: "phone",
      name: "phone_no",
      label: "Phone",
      type: "text",
      placeholder: "+91",
      required: true,
      value: formData.phone_no,
      onChange: (e) => handleFieldChange("phone_no", e.target.value),
    },
  ];

  const edit = (e) => {
    e.preventDefault();
    if (isChanged) {
      // Perform the save operation as form data has changed
      axios
        .put(backendUrl + "profile/" + formData.user_email, formData)
        .then(({ data }) => {
          if (data.acknowledged) {
            // window.location.reload();
            setUpdated(!updated);
            handleClose();
            toast.success("Profile updated", { position: "bottom-center" });
          }
        });
    } else {
      Swal.fire("No changes detected, not submitting.");
    }
  };

  const handleCoverPhotoUpload = (e) => {
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
            const config = {
              headers: {
                authorization: token,
              },
            };

            const coverFile = new FormData();
            coverFile.append("file", file);

            // console.log("before upload", setProfileData);
            axios
              .post(backendUrl + "upload-cover-photo", coverFile, config)
              .then(({ data }) => {
                // // console.log("After upload:", setProfileData);
                // // if (setProfileData) {
                // setFormData({ ...formData, display_image: data.url });
                // // } else {
                // //   console.error("setProfileData is undefined after upload");
                // // }

                // formData.cover_photo = data.url;
                setFormData({ ...formData, cover_photo: data.url });
                // formData;
              });
          }
        });
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  // console.log(formData["short-bio"]);

  return (
    <AuthBody
      heading="Edit Profile"
      onSubmit={edit}
      className="backdrop-blur fixed top-0 left-0 z-[9999]"
      id="edit-profile"
      closeIcon={true}
      handleClose={handleClose}
      whiteContainerClass="h-3/4 overflow-y-auto overflow-x-hidden relative lg:!w-1/2 !mx-auto"
    >
      <div className="relative">
        {/* Cover Photo */}
        <div className="relative h-7 lg:h-[12rem]">
          <img
            src={formData.cover_photo || cover}
            className="rounded-t-lg w-full h-full object-cover"
            alt=""
          />

          <p className="w-7/12 ml-auto lg:w-full text-right mt-1 text-interactive-light-destructive-focus">
            Image size should be 1788&times;280
          </p>

          <label
            // htmlFor=""
            className="absolute bottom-1 right-1 cursor-pointer bg-white p-1 rounded-md group overflow-hidden transition"
          >
            <div className="relative flex items-center gap-1 text-primary">
              <TbCameraUp className="text-heading-6" />
              <span className="absolute group-hover:static whitespace-nowrap left-4 transition">
                Upload Cover Photo
              </span>
            </div>

            <input
              type="file"
              onChange={handleCoverPhotoUpload}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        {/* Profile Picture */}
        <div className="absolute -bottom-4 left-2 lg:bottom-0 lg:top-5 lg:left-2">
          <ProfilePicture
            imageUrl={formData.display_image}
            profileData={formData}
            editable={true}
            setProfileData={setFormData}
            modal={true}
          />
        </div>
      </div>
      <div
        className="flex flex-col lg:flex-row flex-wrap mt-5 lg:mt-7"
        id="form"
      >
        {fields.map((props, id) =>
          (id + 1) % 3 === 0 ? (
            <div className="w-full">
              <InputField
                {...fields[id]}
                key={id}
                containerId={id}
                containerClassName={`mt-3 w-full`}
              />
            </div>
          ) : (
            <div className="w-full lg:w-1/2">
              <InputField
                {...props}
                containerId={id}
                key={id}
                containerClassName={`mt-3 !w-full ${
                  (id - 1) % 3 === 0 ? "lg:pl-1" : "lg:pr-1"
                }`}
                // fieldClassName="mr-2"
              />
            </div>
          )
        )}
        <div className="w-full lg:w-1/3">
          <InputField
            label={
              <FaFacebook className="text-[#506fdf] relative -top-[4px]" />
            }
            hideRequired={true}
            placeholder={"Enter Facebook Link Here"}
            onChange={(e) =>
              handleFieldChange("facebook_profile_link", e.target.value)
            }
            value={formData.facebook_profile_link}
            labelClassName={"mb-0"}
            containerClassName={`mt-3 lg:mr-2`}
            note="Don't forget to enter your link with https://"
            noteLeftAligned
            noteClassName="right-2"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <InputField
            label={
              <FaInstagram className="text-[#ff5757] relative -top-[4px]" />
            }
            placeholder={"Enter Instagram Link Here"}
            onChange={(e) =>
              handleFieldChange("instagram_profile_link", e.target.value)
            }
            value={formData.instagram_profile_link}
            hideRequired={true}
            labelClassName={"mb-0"}
            containerClassName={`mt-3 lg:mr-2`}
            note="Don't forget to enter your link with https://"
            noteLeftAligned
            noteClassName="right-2"
          />{" "}
        </div>
        <div className="w-full lg:w-1/3">
          <InputField
            label={<FaXTwitter className="text-black relative -top-[4px]" />}
            placeholder={"Enter Twitter Link Here"}
            onChange={(e) =>
              handleFieldChange("twitter_profile_link", e.target.value)
            }
            value={formData.twitter_profile_link}
            hideRequired={true}
            labelClassName={"mb-0"}
            containerClassName={`mt-3`}
            note="Don't forget to enter your link with https://"
            noteLeftAligned
          />{" "}
        </div>
      </div>

      <InputField
        label={"Short Bio"}
        id={"short-bio"}
        placeholder={"Add/Edit your Short Bio Here"}
        onChange={(e) => handleFieldChange("short-bio", e.target.value)}
        containerClassName={"mt-3"}
        maxLength={180}
        value={formData["short-bio"]}
        note={`${formData["short-bio"]?.length || 0}/180`}
      />

      <InputField
        textarea={true}
        label={"Your Bio"}
        placeholder={"Add/Edit your Bio Here"}
        onChange={(e) => handleFieldChange("bio", e.target.value)}
        value={formData.bio || ""}
        hideRequired={true}
        labelClassName={"mb-0"}
        containerClassName={`mt-3 w-full`}
        note={`${formData.bio?.length || 0}/500`}
        maxLength={500}
        rows={5}
        fieldClassName="resize-none"
      />

      <div className="mt-5 mb-2 text-center">
        <Button
          type="submit"
          text="Submit"
          disabled={!isChanged || !available}
        />
      </div>
    </AuthBody>
  );
};

export default EditProfile;
