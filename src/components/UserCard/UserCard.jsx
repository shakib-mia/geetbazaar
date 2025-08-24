import React, { useContext, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { FaChevronDown, FaChevronUp, FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import cover from "./../../assets/images/artist-cover.webp";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const UserCard = () => {
  const { userData } = useContext(ProfileContext);
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the bio expansion
  const toggleBio = () => {
    setIsExpanded(!isExpanded);
  };

  // Truncate bio if not expanded (limit to 150 characters)
  const truncatedBio =
    userData.bio?.length > 150
      ? `${userData.bio.slice(0, 150)}...`
      : userData.bio;

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-xl h-full card-shadow overflow-y-auto bg-white">
        {userData.cover_photo ? (
          <img
            src={userData.cover_photo}
            alt="cover"
            className="h-7 w-full object-cover object-center rounded-b-lg"
          />
        ) : (
          <img
            src={cover}
            alt="cover"
            className="h-7 w-full object-cover object-center rounded-b-lg"
          />
        )}
        <div className="relative">
          {/* <img
            src={userData.display_image}
            alt="profile"
            className="h-6 aspect-square rounded-full object-cover object-center absolute -top-4 left-0 right-0 mx-auto"
          /> */}
          <div className="absolute -top-[80px] left-0 right-0 mx-auto">
            <ProfilePicture
              imageUrl={userData.display_image}
              editable={false}
              modal={false}
              profileData={userData}
              setProfileData={() => {}}
            />
          </div>
        </div>

        <div className="mt-6 p-1 text-center">
          <Link to={"/profile"} className="text-heading-6-bold text-center">
            {userData.first_name} {userData.last_name}
          </Link>

          <p className="text-paragraph-1 text-center font-semibold mb-1">
            {userData["short-bio"]}
          </p>

          <div className="bg-gradient-to-r from-transparent via-interactive-light to-transparent w-1/2 mx-auto rounded-full h-[2px]" />

          {/* Render truncated or full bio */}
          <p className="text-center mt-1">
            {isExpanded ? userData.bio : truncatedBio}
          </p>

          {/* Toggle Read More / Show Less */}
          {userData.bio && userData.bio.length > 150 && (
            <p
              className="text-center text-blue-500 cursor-pointer"
              onClick={toggleBio}
            >
              {isExpanded ? (
                <span className="flex gap-1 items-center justify-center">
                  Show less <FaChevronUp />
                </span>
              ) : (
                <span className="flex gap-1 items-center justify-center">
                  Show more <FaChevronDown />
                </span>
              )}
            </p>
          )}

          <div className="flex justify-center gap-1 mt-2 pb-2">
            {userData.facebook_profile_link && (
              <a
                href={userData.facebook_profile_link}
                className="inline-flex text-white justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
            )}
            {userData.instagram_profile_link && (
              <a
                href={userData.instagram_profile_link}
                className="inline-flex text-white justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            )}
            {userData.twitter_profile_link && (
              <a
                href={userData.twitter_profile_link}
                className="inline-flex text-white justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
