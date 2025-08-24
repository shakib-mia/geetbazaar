import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import profile from "./../../assets/images/profile-baul.webp";
import Swal from "sweetalert2";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import { FaRegUserCircle } from "react-icons/fa";

const ProfilePicture = ({
  imageUrl,
  editable,
  profileData,
  setProfileData,
  modal,
}) => {
  const { token } = useContext(ProfileContext);
  const [error, setError] = useState(false);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;

        Swal.fire({
          title: "Your selected image",
          imageUrl: imageUrl,
          imageAlt: "Selected Image",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          confirmButtonColor: "#22683E",
          customClass: {
            popup: "custom-swal-zindex-popup",
            backdrop: "custom-swal-zindex-backdrop",
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

            axios
              .post(backendUrl + "upload-profile-picture", formData, config)
              .then(({ data }) => {
                if (setProfileData) {
                  setProfileData({ ...profileData, display_image: data.url });
                } else {
                  console.error("setProfileData is undefined after upload");
                }
              });
          }
        });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!imageUrl) return; // যদি imageUrl না থাকে fetch করবেন না

    axios
      .get(imageUrl)
      .then(() => setError(false)) // ইমেজ ঠিক আছে, error false করে দিবে
      .catch(() => setError(true)); // ইমেজ নেই বা error, true করে দিবে
  }, [imageUrl]);

  return (
    <div
      className={`relative ${
        modal ? "w-7 lg:w-[231px]" : "w-7"
      } aspect-square mx-auto`}
    >
      <div
        className={`border-4 ${
          modal ? "lg:border-[10px]" : "lg:border-[5px]"
        } border-white rounded-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100`}
      >
        {!error && imageUrl ? (
          <img
            className="w-full aspect-square object-cover"
            src={imageUrl}
            alt="Profile"
            onError={() => setError(true)} // ভুল ছিল: আগে setError(error) যেটা চলবে না, এখানে true দিতে হবে
          />
        ) : (
          <img
            className="w-full aspect-square object-cover"
            src={profile}
            alt="Profile"
            onError={() => setError(true)} // ভুল ছিল: আগে setError(error) যেটা চলবে না, এখানে true দিতে হবে
          />
        )}
      </div>

      {editable && (
        <>
          <label
            htmlFor="profilePicture"
            className="text-black cursor-pointer bg-primary flex justify-center items-center text-heading-5 w-4 h-4 absolute bottom-1 right-1 lg:bottom-[30px] lg:right-[23px] rounded-full"
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
