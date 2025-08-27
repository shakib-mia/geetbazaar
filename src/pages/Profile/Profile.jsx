import React, { useContext, useEffect, useState } from "react";
import cover from "./../../assets/images/artist-cover.webp";
import downArrowWhite from "./../../assets/icons/down-arrow-white.webp";
// import VerticalCarousel from "../../components/VerticalCarousel/VerticalCarousel";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation } from "react-router-dom";
import profileEdit from "./../../assets/icons/profile-edit.webp";
import LoadingPulse from "../../components/LoadingPulse/LoadingPulse";
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Songs from "../../components/Songs/Songs";
import axios from "axios";
import { backendUrl } from "../../constants";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaXTwitter,
} from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaLink } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { MdModeEdit } from "react-icons/md";

const Profile = () => {
  const { userData } = useContext(ProfileContext);
  const location = useLocation();
  const [profileData, setProfileData] = useState(
    location.pathname === "/profile" ? { ...userData } : {}
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const maxLength = 150; // character limit for collapsed text
  const bio = profileData.bio;
  const [copied, setCopied] = useState(false);
  // console.log(profileData);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 5000);
    }
  }, [copied]);

  useEffect(() => {
    // Extract the userId from the URL
    const userId = location.pathname.split("/")[2];

    if (userId) {
      // Fetch the profile data using the userId
      axios
        .get(`${backendUrl}profile/${userId}`)
        .then(({ data }) => {
          setProfileData(data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    } else if (location.pathname === "/profile") {
      // If no userId in the URL and pathname is "/profile", use userData
      console.log(userData);
      setProfileData(userData);
    }
  }, [location.pathname, userData]); // Add dependencies

  // console.log(profileData);

  const route = location.pathname.split("/");
  const [edit, setEdit] = useState(false);

  // const handleFollow = () => {
  //   ("follow");
  // };
  // console.log({ profileData, userData });

  return (
    <div
      className={`mx-auto relative pt-4 flex flex-col lg:flex-row gap-4 pb-3 lg:pb-7`}
      id="profile-container"
      style={{
        marginTop: document.getElementById("topbar")?.clientHeight + "px",
      }}
    >
      {/* <div className=""> */}
      <div
        className="lg:sticky w-full lg:w-4/12 h-full shadow-lg rounded-lg overflow-hidden text-black"
        style={{
          top: document.getElementById("topbar")?.clientHeight + 32 + "px",
        }}
      >
        <aside className="relative p-2">
          <img
            src={profileData.cover_photo || cover}
            className="w-full absolute h-7 left-0 top-0 object-cover"
            alt=""
            id="cover-photo"
          />

          <div className="absolute top-6">
            <ProfilePicture
              imageUrl={profileData.display_image}
              profileData={profileData}
            />
          </div>
          <div className="mt-[200px]">
            <div className="flex gap-1 items-center">
              <h6 className="text-heading-6 underline">
                {profileData.first_name} {profileData.last_name}
              </h6>
              <MdModeEdit
                onClick={() => setEdit(true)}
                data-tooltip-id="edit"
                data-tooltip-content="Edit Profile"
                className="cursor-pointer text-heading-6 focus:outline-none"
              />
            </div>

            <h6 className="text-paragraph-1 font-bold">
              {profileData["short-bio"] || ""}
            </h6>
            <p>
              {bio
                ? isExpanded
                  ? bio
                  : `${bio?.slice(0, maxLength)}${
                      bio?.length > maxLength ? "..." : " "
                    }`
                : ""}
              {bio?.length > maxLength && (
                <span
                  onClick={toggleReadMore}
                  className="text-blue-600 cursor-pointer hover:underline mt-2"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
              )}
            </p>

            <ul className="mt-3 flex flex-col gap-1">
              {profileData.facebook_profile_link && (
                <li className="flex gap-1">
                  <FaSquareFacebook />
                  <a
                    href={profileData.facebook_profile_link}
                    className="text-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {
                      profileData.facebook_profile_link.split(
                        "https://www.facebook.com/"
                      )[1]
                    }
                  </a>
                </li>
              )}
              {profileData.instagram_profile_link && (
                <li className="flex gap-1">
                  <FaSquareInstagram />
                  <a
                    href={profileData.instagram_profile_link}
                    className="text-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {
                      profileData.instagram_profile_link.split(
                        "https://www.instagram.com/"
                      )[1]
                    }
                  </a>
                </li>
              )}
              {profileData.twitter_profile_link && (
                <li className="flex gap-1">
                  <FaXTwitter />
                  <a
                    href={profileData.twitter_profile_link}
                    className="text-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {
                      profileData.twitter_profile_link.split(
                        "https://www.x.com/"
                      )[1]
                    }
                  </a>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <div className="w-full lg:w-8/12">
        <Songs />
      </div>

      {edit && <EditProfile handleClose={() => setEdit(false)} />}
      {/* </div> */}
    </div>
  );
};

export default Profile;
