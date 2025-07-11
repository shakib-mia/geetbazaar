import React, { useContext } from "react";
import { backendUrl } from "../../constants";
import profile from "./../../assets/images/profile.png";
import Swal from "sweetalert2";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";

const ProfilePicture = ({
  imageUrl,
  editable,
  profileData,
  setProfileData,
  modal,
}) => {
  // console.log(setProfileData);
  const { token } = useContext(ProfileContext);
  // console.log(setProfileData);
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // "file select", setProfileData;
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

            const formData = new FormData();
            formData.append("file", file);

            // "before upload", setProfileData;
            axios
              .post(backendUrl + "upload-profile-picture", formData, config)
              .then(({ data }) => {
                // "After upload:", setProfileData;
                if (setProfileData) {
                  setProfileData({ ...profileData, display_image: data.url });
                } else {
                  console.error("setProfileData is undefined after upload");
                }
              });
          }
        });
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative ${
        modal ? "w-7 lg:w-[231px]" : "w-6"
      } aspect-square mx-auto`}
    >
      <div
        className={`border-4 ${
          modal ? "lg:border-[10px]" : "lg:border-[5px]"
        } border-white rounded-full aspect-square overflow-hidden flex items-center justify-center`}
      >
        {imageUrl ? (
          <img
            className="w-full aspect-square object-cover"
            src={imageUrl}
            alt=""
          />
        ) : (
          <img
            className={`w-full aspect-square object-cover ${
              profileData?.first_name || "blur-md"
            }`}
            src={profile}
            alt="Demo"
          />
        )}
      </div>

      {editable && (
        <>
          <label
            htmlFor="profilePicture"
            className="text-white cursor-pointer bg-primary flex justify-center items-center text-heading-5 w-4 h-4 absolute bottom-1 right-1 lg:bottom-[30px] lg:right-[23px] rounded-full"
          >
            +
          </label>
          <input
            onChange={handleProfilePictureUpload}
            type="file"
            className="absolute hidden"
            accept="image/*"
            id="profilePicture"
          />
        </>
      )}
    </div>
  );
};

export default ProfilePicture;
