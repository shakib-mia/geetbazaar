import React, { useContext } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { ProfileContext } from "../../contexts/ProfileContext";

const SuggestedUser = ({
  facebook_profile_link,
  instagram_profile_link,
  twitter_profile_link,
}) => {
  //   const { userData } = useContext(ProfileContext);

  return (
    <div className="flex gap-1 items-center pl-1">
      <img
        src="https://server.forevisiondigital.in/uploads/profile-pictures/file-abc-1739018255451-WhatsApp-Image-2024-12-10-at-7.jpg"
        alt="profile"
        className="!w-1/3"
      />

      <aside className="w-2/3">
        <h6 className=" text-heading-6-bold">Md. Shakib Mia</h6>
        <p className="text-paragraph-1 font-medium">Short Bio</p>
        <div className="flex gap-1 mt-2 pb-2">
          {
            <a
              href={facebook_profile_link}
              className="inline-flex justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
          }
          {
            <a
              href={instagram_profile_link}
              className="inline-flex justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          }
          {
            <a
              href={twitter_profile_link}
              className="inline-flex justify-center items-center w-4 aspect-square rounded-full shadow-xl bg-interactive-light hover:bg-interactive-light-hover active:bg-interactive-light-active focus:bg-interactive-light-focus transition"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
          }
        </div>
      </aside>
    </div>
  );
};

export default SuggestedUser;
